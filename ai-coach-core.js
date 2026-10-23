(function(root){
'use strict';
const MAX_MESSAGES=100,MAX_BYTES=16000;
function endpoint(value){const u=new URL(value);if(u.protocol!=='https:'||u.username||u.password||u.search||u.hash||u.pathname!=='/coach')throw Error('Use your trusted HTTPS backend address ending in /coach, without a query or password.');return u.href;}
function token(value){if(typeof value!=='string'||!/^[-_A-Za-z0-9]{43,128}$/.test(value)||value.startsWith('sk-'))throw Error('Use the private backend access token, not an OpenAI API key or your vault passphrase.');return value;}
function defaults(){return {version:1,config:null,messages:[]};}
function validate(a){if(!a||a.version!==1||!Array.isArray(a.messages)||a.messages.length>MAX_MESSAGES)throw Error('Invalid AI coach history.');if(a.config!==null){if(!a.config||endpoint(a.config.endpoint)!==a.config.endpoint)throw Error('Invalid AI coach connection.');token(a.config.token);}for(const m of a.messages)if(!m||!['user','assistant'].includes(m.role)||typeof m.content!=='string'||!m.content.trim()||m.content.length>30000||!Number.isFinite(Date.parse(m.at))||!['sent','pending','failed','received'].includes(m.status))throw Error('Invalid AI coach message.');return a;}
function messages(previous,question,includeHistory=false){if(typeof question!=='string'||!question.trim())throw Error('Write a question or prepare a workout summary first.');const input=[...(includeHistory?previous.filter(m=>['sent','received'].includes(m.status)).slice(-4).map(m=>({role:m.role,content:m.content})):[]),{role:'user',content:question.trim()}];if(new TextEncoder().encode(JSON.stringify(input)).length>MAX_BYTES)throw Error('This message is too long. Select fewer workouts, omit previous chat, or shorten the preview (16 KB total limit).');return input;}
const api={defaults,validate,endpoint,token,messages,MAX_MESSAGES,MAX_BYTES};if(typeof module!=='undefined')module.exports=api;else root.AICoachCore=api;
})(globalThis);
