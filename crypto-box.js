(function(root){
'use strict';
const web=root.crypto,encoder=new TextEncoder(),decoder=new TextDecoder('utf-8',{fatal:true}),ITERATIONS=600000;
function b64(bytes){let out='';for(let i=0;i<bytes.length;i+=16384)out+=String.fromCharCode(...bytes.subarray(i,i+16384));return btoa(out);}
function bytes(s,max=50000000){if(typeof s!=='string'||s.length>max||s.length%4||!/^[A-Za-z0-9+/]*={0,2}$/.test(s))throw Error('Invalid encrypted file.');const binary=atob(s);return Uint8Array.from(binary,c=>c.charCodeAt(0));}
function available(){return !!web?.subtle&&!!web?.getRandomValues;}
function password(p){if(typeof p!=='string'||p.length<14||p.length>1024)throw Error('Use a passphrase of 14–1024 characters. Several unrelated words are better than a short PIN.');}
function kdf(){return {name:'PBKDF2',hash:'SHA-256',iterations:ITERATIONS,salt:b64(web.getRandomValues(new Uint8Array(16)))};}
function validKdf(k){if(!k||k.name!=='PBKDF2'||k.hash!=='SHA-256'||!Number.isInteger(k.iterations)||k.iterations<ITERATIONS||k.iterations>2000000||bytes(k.salt,64).length!==16)throw Error('Unsupported encryption settings.');return k;}
async function derive(p,k){validKdf(k);if(typeof p!=='string'||p.length>1024)throw Error('Invalid password.');const material=await web.subtle.importKey('raw',encoder.encode(p),'PBKDF2',false,['deriveKey']);return web.subtle.deriveKey({name:'PBKDF2',hash:'SHA-256',iterations:k.iterations,salt:bytes(k.salt)},material,{name:'AES-GCM',length:256},false,['encrypt','decrypt']);}
async function seal(key,value,context){const plain=encoder.encode(JSON.stringify(value));if(plain.length>36000000)throw Error('Encrypted payload exceeds 36 MB. Export and reduce stored data.');const iv=web.getRandomValues(new Uint8Array(12));try{return {iv:b64(iv),ciphertext:b64(new Uint8Array(await web.subtle.encrypt({name:'AES-GCM',iv,additionalData:encoder.encode(context),tagLength:128},key,plain)))};}finally{plain.fill(0);}}
async function open(key,record,context){if(!record||bytes(record.iv,24).length!==12)throw Error('Invalid encrypted record.');let plain;try{plain=new Uint8Array(await web.subtle.decrypt({name:'AES-GCM',iv:bytes(record.iv),additionalData:encoder.encode(context),tagLength:128},key,bytes(record.ciphertext)));return JSON.parse(decoder.decode(plain));}catch{throw Error('Password incorrect, or encrypted data is damaged. Nothing was replaced.');}finally{plain?.fill(0);}}
async function hash(value){return b64(new Uint8Array(await web.subtle.digest('SHA-256',encoder.encode(value))));}
function header(){return {version:1,id:b64(web.getRandomValues(new Uint8Array(16))),revision:0,kdf:kdf()};}
function validateHeader(h){if(!h||h.version!==1||bytes(h.id,32).length!==16||!Number.isSafeInteger(h.revision)||h.revision<0)throw Error('Unsupported vault.');validKdf(h.kdf);return h;}
const context=(h,id)=>JSON.stringify(['iron-local-vault',1,h.id,id]);
async function backup(key,h,payload,scope){if(!['workouts','photos','full','workout-summary'].includes(scope))throw Error('Unsupported backup scope.');const result={kind:'iron-local-encrypted-backup',version:1,scope,vaultId:h.id,kdf:h.kdf,algorithm:'AES-256-GCM'};return {...result,...await seal(key,payload,JSON.stringify([result.kind,1,result.scope,result.vaultId]))};}
function validateBackup(b){if(!b||b.kind!=='iron-local-encrypted-backup'||b.version!==1||b.algorithm!=='AES-256-GCM'||!['workouts','photos','full','workout-summary'].includes(b.scope)||bytes(b.vaultId,32).length!==16||bytes(b.iv,24).length!==12)throw Error('Unsupported encrypted backup.');validKdf(b.kdf);if(typeof b.ciphertext!=='string'||b.ciphertext.length>50000000)throw Error('Encrypted backup exceeds supported size.');return b;}
async function decryptBackup(b,p,key){validateBackup(b);return open(key||await derive(p,b.kdf),b,JSON.stringify([b.kind,1,b.scope,b.vaultId]));}
const api={available,password,kdf,derive,seal,open,hash,header,validateHeader,context,backup,validateBackup,decryptBackup,ITERATIONS};if(typeof module!=='undefined')module.exports=api;else root.CryptoBox=api;
})(globalThis);
