(function(root){
'use strict';
const G=typeof module!=='undefined'?require('./core.js'):root.Gym;
const catalog=[
['legpress','Leg press','machines','legs','Adjust the seat with gym staff; keep feet planted and use a comfortable range.'],
['chestpress','Seated chest press','machines','push','Set handles around chest height; keep your back supported.'],
['row','Seated cable row','machines','pull','Sit tall; pull without rocking your torso.'],
['curl','Seated leg curl','machines','hinge','Align the machine pivot with your knee; move slowly.'],
['pulldown','Lat pulldown','machines','pull','Pull toward the upper chest without leaning far back.'],
['goblet','Goblet squat','dumbbells','legs','Practice sitting toward a bench first; keep the load close.'],
['dbpress','Dumbbell floor press','dumbbells','push','Use light dumbbells; lower elbows gently to the floor.'],
['dbrow','Supported dumbbell row','dumbbells','pull','Support one hand on a stable bench; avoid twisting. Log load per dumbbell and reps per side.'],
['bridge','Glute bridge','bodyweight','hinge','Keep ribs relaxed; lift only as far as comfortable.'],
['chair','Chair squat','bodyweight','legs','Use a stable bench or chair; sit and stand under control.'],
['wall','Wall push-up','bodyweight','push','Place hands on a stable wall; keep your body aligned.'],
['prone','Prone W raise','bodyweight','pull','Lie face down and gently lift hands into a W; do not force the range.'],
['deadbug','Dead bug','bodyweight','core','Move opposite arm and leg slowly; keep your back comfortable. Log reps per side.']
].map(([id,name,equipment,pattern,cue])=>({id,name,equipment,pattern,cue}));
function validateProfile(p){if(!p||!['muscle','fat','fitness','strength'].includes(p.goal)||![2,3,4,5].includes(p.days)||![30,45,60,75].includes(p.minutes)||!['adult','under18'].includes(p.age)||typeof p.restrictions!=='boolean'||!Array.isArray(p.equipment)||!p.equipment.length||p.equipment.some(x=>!['machines','dumbbells','bodyweight'].includes(x))||!Array.isArray(p.avoid)||p.avoid.some(id=>!catalog.some(e=>e.id===id)))throw Error('Complete all setup fields.');return p;}
function feedbackValid(f){return f&&['unknown','easy','steady','hard'].includes(f.effort)&&['unknown','confident','unsure'].includes(f.form)&&typeof f.pain==='boolean';}
function combinedFeedback(e){const work=G.done(e),any=e.log.some(s=>s.feedback?.pain);if(any)return {effort:'unknown',form:'unknown',pain:true};if(!work.some(s=>s.feedback))return e.feedback;const fs=work.map(s=>s.feedback);return {effort:fs.some(f=>f?.effort==='hard')?'hard':fs.every(f=>f?.effort==='easy')?'easy':fs.every(f=>f&&f.effort!=='unknown')?'steady':'unknown',form:fs.some(f=>f?.form==='unsure')?'unsure':fs.every(f=>f?.form==='confident')?'confident':'unknown',pain:e.feedback?.pain||false};}
function historyFor(data,name){return data.history.slice().sort((a,b)=>Date.parse(b.finished)-Date.parse(a.finished)).flatMap(s=>s.exercises.filter(e=>e.name===name&&(G.done(e).length||e.feedback?.pain||e.log.some(s=>s.feedback?.pain))).map(e=>({e:{...e,feedback:combinedFeedback(e)},session:s})));}
function targets(data,profile,entry,readiness){const history=historyFor(data,entry.name),latest=history[0],feedback=latest?.e.feedback;const bodyweight=entry.equipment==='bodyweight';const step=bodyweight?0:(entry.loadStep??(data.unit==='kg'?1:2));let sets=1;
const recovered=h=>h.e.feedback&&feedbackValid(h.e.feedback)&&!h.e.feedback.pain&&h.e.feedback.form==='confident'&&h.e.feedback.effort!=='hard'&&h.e.feedback.effort!=='unknown';
if(history.length>=2&&history.slice(0,2).every(recovered))sets=2;
if(profile.goal==='muscle'&&profile.minutes>=60&&history.length>=6&&history.slice(0,3).every(recovered))sets=3;
const base={...G.exercise(entry.name),id:entry.id,sets,min:8,max:12,step:step||1,cue:entry.cue,bodyweight,rest:entry.pattern==='core'?60:120,weight:null,reason:'First exposure: find a light, comfortable load. No maximum testing.',blocked:false};
if(readiness==='tired'){base.sets=Math.max(1,sets-1);base.reason='Low energy: fewer sets today; no load increase.';}
if(!latest){if(bodyweight){base.weight=0;base.reason='Start with the easiest comfortable version. Reps are per side where noted.';}return base;}
if(feedback?.pain){return {...base,blocked:true,reason:'Pain was reported last time. Pause this movement; get appropriate in-person guidance before restarting.'};}
const logs=G.done(latest.e),load=Math.max(...logs.map(s=>s.weight));base.weight=load;base.reason='Repeat your last working load; build controlled reps within the range.';
if(bodyweight){base.weight=0;base.reason='Keep this movement at bodyweight; add controlled reps within the range.';return base;}
if(!feedback||feedback.form!=='confident'||feedback.effort==='unknown'){base.reason='Repeat or choose a lighter load. Confirm comfortable technique and record effort before increasing.';return base;}
if(readiness==='tired')return {...base,reason:'Low energy: fewer sets, repeat the load or choose a lighter one. No increase.'};
const qualifies=h=>{const work=G.done(h.e);return recovered(h)&&h.e.sets===base.sets&&work.length>=base.sets&&work.every(s=>s.reps>=base.max&&s.weight===load);};
if(history.length>=2&&history.slice(0,2).every(qualifies))return {...base,weight:Math.round((load+step)*100)/100,reason:`Two sessions met all ${base.sets} set targets at ${load} ${data.unit}, with comfortable technique and effort. Optional +${step} ${data.unit}; use it only if your equipment allows.`};
if(history.length>=3&&history.slice(0,3).every(h=>h.e.feedback?.effort==='hard'))base.reason='Three difficult sessions: do not increase. Consider a lighter load and ask gym staff to check setup and technique.';
return base;
}
function plan(data,p,readiness='good',now=Date.now()){
validateProfile(p);if(!['good','tired','poor'].includes(readiness))throw Error('Choose readiness.');
if(p.age!=='adult'||p.restrictions)return {blocked:true,reason:'This automatic beginner planner is for adults without reported restrictions. Discuss suitable training with a qualified professional before generating a plan; custom routines remain available.'};
if(readiness==='poor')return {blocked:true,reason:'Take a recovery day. Reassess when you feel better; do not train through illness, pain, or poor recovery.'};
const last=data.history.filter(s=>s.coached).slice().sort((a,b)=>Date.parse(b.finished)-Date.parse(a.finished))[0];
if(last&&now-Date.parse(last.finished)<48*3600000)return {blocked:true,reason:'Allow at least 48 hours between these full-body strength sessions. Use today for rest or comfortable light activity.'};
const available=catalog.filter(e=>(p.equipment.includes(e.equipment)||e.equipment==='bodyweight')&&!p.avoid.includes(e.id));
const patterns=['legs','push','pull','hinge',...(p.minutes>=45?['core']:[])];
const entries=patterns.map(pattern=>available.find(e=>e.pattern===pattern));
if(entries.some(e=>!e))return {blocked:true,reason:'No available exercise for each movement group. Adjust your equipment or exclusions, or build a custom routine.'};
const exercises=entries.map(e=>targets(data,p,e,readiness));
return {blocked:exercises.some(e=>e.blocked),reason:exercises.some(e=>e.blocked)?'A movement is paused after a pain report. Review the feedback and get appropriate guidance; no automatic substitution for pain.':'',name:'Your beginner full-body plan',exercises,week:p.days>=4?['Mon: strength','Tue: optional easy activity','Wed: strength',p.days===5?'Thu: optional easy activity':'Thu: rest','Fri: strength','Sat: rest','Sun: rest']:null,days:p.days===2?'Monday / Thursday':'Monday / Wednesday / Friday',summary:`${p.days===2?2:3} strength days per week, separated by rest. ${p.days>=4?`Your ${p.days===5?'two additional days are':'fourth day is'} optional comfortable walking or mobility. `:''}${p.goal==='fat'?'Strength work supports muscle retention; this app does not estimate fat loss or prescribe a diet. ':''}${p.goal==='strength'?'Build technique and consistency before heavier strength work. ':''}About ${p.minutes} minutes, including setup and warmup; stop when your time is up rather than rushing.`};
}
const api={catalog,validateProfile,feedbackValid,combinedFeedback,targets,plan};if(typeof module!=='undefined')module.exports=api;else root.Coach=api;
})(globalThis);
