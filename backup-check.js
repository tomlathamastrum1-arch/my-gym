(function(root){
'use strict';
const B=typeof module!=='undefined'?require('./crypto-box.js'):root.CryptoBox,G=typeof module!=='undefined'?require('./core.js'):root.Gym,P=typeof module!=='undefined'?require('./photos.js'):root.PrivatePhotos;
async function inspect(envelope,password){B.validateBackup(envelope);if(envelope.scope==='workout-summary')throw Error('This is a reference workout summary, not a restorable app backup.');const value=await B.decryptBackup(envelope,password);let d=null,photos=[];if(envelope.scope==='full'){if(!value||!value.data)throw Error('Invalid complete backup.');d=G.validate(value.data);photos=P.validateBackup({kind:'iron-local-photos',version:1,photos:value.photos});}else if(envelope.scope==='workouts')d=G.validate(value);else photos=P.validateBackup(value);return {scope:envelope.scope,sessions:d?.history.length??0,routines:d?.routines.length??0,active:!!d?.active,photos:photos.length,measurements:d?.bodyLogs?.length??0,health:d?.trainer?.health?.length??0};}
const api={inspect};if(typeof module!=='undefined')module.exports=api;else root.BackupCheck=api;
})(globalThis);

