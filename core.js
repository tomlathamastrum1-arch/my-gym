(function(root){
const id=()=>globalThis.crypto?.randomUUID?.()||Date.now().toString(36)+Math.random().toString(36).slice(2);
const exercise=(name)=>({id:id(),name,sets:3,min:8,max:12,step:2.5});
const defaults=()=>({version:1,unit:'kg',rest:90,routines:[{id:id(),name:'Full body A',exercises:['Goblet squat','Dumbbell bench press','One-arm dumbbell row'].map(exercise)},{id:id(),name:'Full body B',exercises:['Romanian deadlift','Overhead press','Lat pulldown'].map(exercise)}],history:[],active:null,timerEnd:null});
const validNum=(x,min,max)=>typeof x==='number'&&Number.isFinite(x)&&x>=min&&x<=max;
function validate(d){
if(!d||d.version!==1||!['kg','lb'].includes(d.unit)||!validNum(d.rest,10,900)||!Array.isArray(d.routines)||!Array.isArray(d.history)||d.routines.length>200||d.history.length>20000)throw Error('Unsupported or invalid backup.');
const str=x=>typeof x==='string'&&x.length>0&&x.length<=200;
const ex=e=>e&&str(e.id)&&str(e.name)&&validNum(e.sets,1,20)&&Number.isInteger(e.sets)&&Number.isInteger(e.min)&&Number.isInteger(e.max)&&validNum(e.min,1,100)&&validNum(e.max,e.min,100)&&validNum(e.step,0.1,100);
const feedback=f=>f&&['unknown','easy','steady','hard'].includes(f.effort)&&['unknown','confident','unsure'].includes(f.form)&&typeof f.pain==='boolean';
const logged=e=>ex(e)&&(e.feedback===undefined||feedback(e.feedback))&&(e.bodyweight===undefined||typeof e.bodyweight==='boolean')&&(e.rest===undefined||validNum(e.rest,10,900))&&Array.isArray(e.log)&&e.log.length<=100&&e.log.every(s=>s&&validNum(s.weight,0,10000)&&Number.isInteger(s.reps)&&validNum(s.reps,0,1000)&&typeof s.done==='boolean'&&(s.warmup===undefined||typeof s.warmup==='boolean'));
const session=s=>s&&str(s.id)&&str(s.name)&&Number.isFinite(Date.parse(s.started))&&(s.notes===undefined||(typeof s.notes==='string'&&s.notes.length<=2000))&&Array.isArray(s.exercises)&&s.exercises.length<=100&&s.exercises.every(logged);
if(!d.routines.every(r=>r&&str(r.id)&&str(r.name)&&Array.isArray(r.exercises)&&r.exercises.length<=100&&r.exercises.every(ex))||!d.history.every(s=>session(s)&&Number.isFinite(Date.parse(s.finished)))||(d.active!==null&&!session(d.active))||(d.timerEnd!==null&&!validNum(d.timerEnd,0,1e15)))throw Error('Backup contents are invalid.');
if(d.lastExport!==undefined&&d.lastExport!==null&&!validNum(d.lastExport,0,1e15))throw Error('Invalid backup timestamp.');
if(d.profile!==undefined)(typeof module!=='undefined'?require('./coach.js'):root.Coach).validateProfile(d.profile);
if(d.personal!==undefined)(typeof module!=='undefined'?require('./body.js'):root.Body).validatePersonal(d.personal);
if(d.bodyLogs!==undefined){if(!Array.isArray(d.bodyLogs)||d.bodyLogs.length>10000)throw Error('Invalid body check-ins.');d.bodyLogs.forEach(l=>(typeof module!=='undefined'?require('./body.js'):root.Body).validateLog(l));}
for(const s of [...d.history,...(d.active?[d.active]:[])])if((s.coached!==undefined&&typeof s.coached!=='boolean')||(s.readiness!==undefined&&!['good','tired','poor'].includes(s.readiness)))throw Error('Invalid coaching data.');
return d;
}
const completed=e=>e.log.filter(s=>s.done&&s.reps>0);
const done=e=>completed(e).filter(s=>!s.warmup);
function seed(e,previous){const sets=previous?done(previous):[];return Array.from({length:e.sets},(_,i)=>({weight:sets[i]?.weight??sets.at(-1)?.weight??0,reps:sets[i]?.reps??e.min,done:false,warmup:false}));}
const backupDue=(d,now=Date.now())=>d.history.length>0&&(!d.lastExport||now-d.lastExport>=7*86400000);
function recommend(e,previous){if(!previous)return {weight:0,text:'Choose a comfortable starting weight. Keep 1–3 reps in reserve.'};const sets=done(previous);if(!sets.length)return {weight:0,text:'No completed sets yet. Choose a comfortable load.'};const weight=Math.max(...sets.map(s=>s.weight));const ready=sets.length>=e.sets&&sets.every(s=>s.weight===weight&&s.reps>=e.max);return {weight:ready?Math.round((weight+e.step)*100)/100:weight,text:ready?`All target sets reached ${e.max} reps at the same load. Try +${e.step} next time.`:`Keep the load and work toward ${e.sets} sets of ${e.max}. Reduce it if form breaks down.`};}
const estimate=s=>s.weight*(1+s.reps/30);
const api={id,exercise,defaults,validate,done,completed,seed,backupDue,recommend,estimate};if(typeof module!=='undefined')module.exports=api;else root.Gym=api;
})(globalThis);
