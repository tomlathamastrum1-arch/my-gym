(function(root){
'use strict';
const G=typeof module!=='undefined'?require('./core.js'):root.Gym,C=typeof module!=='undefined'?require('./coach.js'):root.Coach;
const day=now=>{const d=new Date(now);return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;};
const num=(n,a,b)=>typeof n==='number'&&Number.isFinite(n)&&n>=a&&n<=b;
const text=(s,max=1000)=>typeof s==='string'&&s.length<=max;
const date=s=>typeof s==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(s)&&!isNaN(Date.parse(s))&&new Date(s+'T12:00:00Z').toISOString().slice(0,10)===s;
function validate(t){
if(!t||t.version!==1||!t.equipment||typeof t.equipment!=='object'||Array.isArray(t.equipment)||Object.keys(t.equipment).length>100||!Array.isArray(t.reviews)||t.reviews.length>2000||!Array.isArray(t.health)||t.health.length>10000)throw Error('Invalid trainer data.');
if(t.loadSteps!==undefined)(typeof module!=='undefined'?require('./training-plus.js'):root.TrainingPlus).validateSteps(t.loadSteps);
if(t.assessment){const a=t.assessment;if(!['new','returning'].includes(a.experience)||!['low','medium','high'].includes(a.confidence)||!['not-yet','practice-done'].includes(a.baseline)||!['machines','dumbbells','mixed'].includes(a.preferred)||!text(a.focus,500)||!text(a.barrier,500)||!date(a.date))throw Error('Invalid assessment.');}
if(t.checkIn){const c=t.checkIn;if(!date(c.date)||!['unknown','low','okay','good'].includes(c.energy)||!['unknown','mild','moderate','high'].includes(c.soreness)||!['unknown','low','medium','high'].includes(c.stress)||!['unknown','yes','no'].includes(c.pain)||!['unknown','yes','no'].includes(c.illness)||!(c.sleep===null||num(c.sleep,0,24))||![30,45,60,75].includes(c.minutes))throw Error('Invalid daily check-in.');}
for(const [id,e] of Object.entries(t.equipment)){if(!C.catalog.some(c=>c.id===id)||!e||!text(e.variant,100)||!text(e.setup)||!text(e.note)||typeof e.verified!=='boolean')throw Error('Invalid equipment memory.');}
for(const r of t.reviews)if(!r||!text(r.id,200)||!date(r.date)||!['repeat','easier','easierWeek'].includes(r.decision)||!text(r.note,1000))throw Error('Invalid review.');
if(t.goalReview&&(!date(t.goalReview.date)||!text(t.goalReview.note,1000)))throw Error('Invalid goal review.');
if(t.appliedReview!==undefined&&!text(t.appliedReview,200))throw Error('Invalid review status.');
if(new Set(t.health.map(h=>h.date)).size!==t.health.length)throw Error('Use one health summary per date.');for(const h of t.health)validateHealth(h);
return t;
}
function defaults(){return {version:1,equipment:{},reviews:[],health:[]};}
function validateHealth(h){if(!h||!date(h.date)||!text(h.source,100)||!h.source.length||!Object.keys(h).some(k=>['steps','sleepHours','weightKg'].includes(k))||(h.steps!==undefined&&(!num(h.steps,0,200000)||!Number.isInteger(h.steps)))||(h.sleepHours!==undefined&&!num(h.sleepHours,0,24))||(h.weightKg!==undefined&&!num(h.weightKg,1,500)))throw Error('Invalid health summary. Use a date, source, and valid selected metrics.');return h;}
function extras(d){
if(d.trainer!==undefined)validate(d.trainer);
for(const s of [...d.history,...(d.active?[d.active]:[])]){
if(s.timeBudget!==undefined&&![30,45,60,75].includes(s.timeBudget))throw Error('Invalid session time budget.');
if(s.warmupDone!==undefined&&typeof s.warmupDone!=='boolean')throw Error('Invalid warmup status.');
for(const e of s.exercises){if(e.incrementConfirmed!==undefined&&typeof e.incrementConfirmed!=='boolean')throw Error('Invalid equipment increment confirmation.');if(e.variant!==undefined&&!text(e.variant,100))throw Error('Invalid equipment variant.');if(e.practice&&(!['setup','range','control'].every(k=>typeof e.practice[k]==='boolean')))throw Error('Invalid technique checklist.');for(const set of e.log)if(set.feedback!==undefined&&!C.feedbackValid(set.feedback))throw Error('Invalid set feedback.');}
}
}
function readiness(d,fallback='good',now=Date.now()){
const c=d.trainer?.checkIn;if(!c||c.date!==day(now))return {value:fallback,complete:false,reason:'Complete today’s check-in; no recovery score is guessed.'};
if(c.pain==='yes'||c.illness==='yes'||c.soreness==='high')return {value:'poor',complete:true,reason:'Reported pain, illness, or high soreness: take a recovery day and reassess.'};
if(c.pain==='unknown'||c.illness==='unknown'||c.energy==='unknown'||c.soreness==='unknown')return {value:'poor',complete:false,reason:'Answer pain, illness, energy, and soreness before the coached session.'};
return {value:c.energy==='low'||c.soreness==='moderate'||c.stress==='high'||(c.sleep!==null&&c.sleep<6)?'tired':fallback,complete:true,reason:'Uses your reported recovery; sleep and stress never diagnose readiness.'};
}
function target(d,p,entry,ready){const variant=d.trainer?.equipment[entry.id]?.variant||'';const filtered={...d,history:d.history.map(s=>({...s,exercises:s.exercises.filter(e=>e.name!==entry.name||(e.variant||'')===variant)}))};const plus=typeof module!=='undefined'?require('./training-plus.js'):root.TrainingPlus,step=plus.increment(d,entry.id,variant);return {...C.targets(filtered,p,step===null?entry:{...entry,loadStep:step},ready),variant,incrementConfirmed:step!==null};}
function prepare(d,p,fallback='good',now=Date.now()){
const r=readiness(d,fallback,now),base=C.plan(d,p,r.value,now);if(base.blocked)return {...base,reason:!r.complete&&d.trainer?.checkIn?.date===day(now)?r.reason:base.reason};
const review=d.trainer?.reviews.at(-1),easyWeek=review?.decision==='easierWeek'&&now>=Date.parse(review.date+'T00:00:00')&&now-Date.parse(review.date+'T00:00:00')<7*86400000,easy=easyWeek||(review?.decision==='easier'&&review.id!==d.trainer?.appliedReview);
const minutes=d.trainer?.checkIn?.date===day(now)?Math.min(p.minutes,d.trainer.checkIn.minutes):p.minutes;
const preferred=d.trainer?.assessment?.preferred;
const last=d.history.filter(s=>s.coached&&s.exercises.some(e=>G.done(e).length)).sort((a,b)=>Date.parse(b.finished)-Date.parse(a.finished))[0],returning=last&&now-Date.parse(last.finished)>=14*86400000;
let exercises=base.exercises.map(e=>{let entry=C.catalog.find(x=>x.id===e.id);if(preferred&&preferred!=='mixed'){entry=C.catalog.find(x=>x.pattern===entry.pattern&&x.equipment===preferred&&p.equipment.includes(x.equipment)&&!p.avoid.includes(x.id))||entry;}return target(d,{...p,minutes},entry,easy||minutes<p.minutes||returning?'tired':r.value);});
if(exercises.some(e=>e.blocked))return {...base,blocked:true,reason:'A selected movement is paused after a pain report. Get appropriate in-person guidance before restarting.'};
if(minutes===30)exercises=exercises.filter(e=>C.catalog.find(x=>x.id===e.id)?.pattern!=='core').map(e=>({...e,sets:1,reason:e.reason+' Short session: one working set; keep rest and setup time.'}));
if(easy)exercises=exercises.map(e=>({...e,sets:1,reason:easyWeek?'Your seven-day easier period is active. One working set, no increase; stop or reduce further if needed.':'You chose an easier next session in your review. One working set, no load increase; reduce further or stop if needed.'}));
if(returning)exercises=exercises.map(e=>({...e,sets:1,reason:'Returning after at least 14 days: one working set, no increase. Recheck setup with practice sets and choose a lighter comfortable load as needed.'}));
return {...base,exercises,minutes,reviewId:easy&&!easyWeek?review.id:null,readiness:r.value,learning:d.history.filter(s=>s.coached&&s.exercises.some(e=>G.done(e).length)).length<3,summary:base.summary+` Today’s budget: ${minutes} minutes. Missed sessions are never added as catch-up volume.`};
}
function alternatives(d,e,p,ready='good'){
const entry=C.catalog.find(c=>c.name===e.name);if(!entry||e.feedback?.pain||e.log.some(s=>s.feedback?.pain))return [];
return C.catalog.filter(c=>c.pattern===entry.pattern&&c.id!==entry.id&&!p.avoid.includes(c.id)&&(p.equipment.includes(c.equipment)||c.equipment==='bodyweight')).map(c=>target(d,p,c,ready)).filter(e=>!e.blocked);
}
function nextSet(e,s,unit){
const f=s?.feedback;if(f?.pain||e.feedback?.pain||e.log?.some(s=>s.feedback?.pain))return {action:'stop',weight:null,reason:'Stop this movement. Do not try a different load or substitute to work around pain.'};
if(!s?.done||!f||f.effort==='unknown'||f.form==='unknown')return {action:'ask',weight:null,reason:'I need effort and technique feedback before suggesting a change.'};
if(f.form==='unsure')return {action:'review',weight:null,reason:'Ask for a form check. Keep technique practice light; no load increase.'};
if(f.effort==='hard'||(!s.warmup&&s.reps<e.min))return {action:'reduce',weight:e.bodyweight?0:Math.max(0,Math.round((s.weight-e.step)*100)/100),reason:e.bodyweight?'Rest, use an easier comfortable range, or stop. No added weight.':'Rest and consider one smaller available load. The preview is optional; choose your equipment’s actual setting.'};
if(s.warmup&&s.reps<e.min)return {action:'ask',weight:null,reason:'This short warmup does not establish a working load. For first-load calibration, use light practice at the lower working-rep target, then reassess. If a working load is already planned, review it after warming up.'};
if(s.warmup&&f.effort==='easy'&&!e.bodyweight)return {action:'practice',weight:Math.round((s.weight+e.step)*100)/100,reason:'That practice set felt easy and controlled. After resting, optionally try ONE small available increment as another practice set. Do not chase a maximum.'};
return {action:'repeat',weight:s.weight,reason:'Repeat this load after resting. Keep controlled reps within the target; working-set ease alone does not trigger an immediate increase.'};
}
function warmups(e){if(e.bodyweight)return [{weight:0,reps:5,done:false,warmup:true}];if(e.weight===null||!num(e.weight,.01,10000))return [{weight:0,reps:e.min,done:false,warmup:true}];return [{weight:Math.round(e.weight*.5*100)/100,reps:5,done:false,warmup:true},{weight:Math.round(e.weight*.75*100)/100,reps:3,done:false,warmup:true}];}
function report(d,now=Date.now()){
const sessions=d.history.filter(s=>Date.parse(s.finished)<=now).sort((a,b)=>Date.parse(b.finished)-Date.parse(a.finished));const recent=sessions.filter(s=>now-Date.parse(s.finished)<7*86400000);const targetDays=d.profile?.days===2?2:3;
const coached=recent.filter(s=>s.coached&&s.exercises.some(e=>G.done(e).length));const latest=sessions.find(s=>s.coached&&s.exercises.some(e=>G.done(e).length));
const gap=latest?Math.floor((now-Date.parse(latest.finished))/86400000):null;
const names=[...new Set(sessions.flatMap(s=>s.exercises.filter(e=>G.done(e).length).map(e=>e.name)))];
const trends=names.map(name=>{const entries=sessions.flatMap(s=>s.exercises.filter(e=>e.name===name&&G.done(e).length).map(e=>({e,s})));const a=entries[0],same=entries.filter(x=>(x.e.variant||'')===(a?.e.variant||'')),b=same[1],signature=x=>JSON.stringify(G.done(x.e).map(s=>[s.weight,s.reps])),plateau=same.length>=3&&same.slice(0,3).every(x=>signature(x)===signature(a));return {name,latest:a,previous:b,plateau,change:b?G.done(a.e).reduce((n,x)=>n+x.reps,0)-G.done(b.e).reduce((n,x)=>n+x.reps,0):null,hard:entries.slice(0,3).length===3&&entries.slice(0,3).every(x=>x.e.feedback?.effort==='hard')};});
const pain=sessions.slice(0,1).some(s=>s.exercises.some(e=>e.feedback?.pain||e.log.some(l=>l.feedback?.pain)));
const hard=sessions.filter(s=>s.coached).slice(0,3);const fatigue=hard.length===3&&hard.every(s=>s.exercises.filter(e=>G.done(e).length).some(e=>e.feedback?.effort==='hard'));
return {recent,coached:coached.length,target:targetDays,gap,trends,pain,fatigue,sets:recent.reduce((n,s)=>n+s.exercises.reduce((n,e)=>n+G.done(e).length,0),0),reviewDue:!d.trainer?.goalReview||now-Date.parse(d.trainer.goalReview.date+'T12:00:00')>=28*86400000};
}
function schedule(d,count=3,now=Date.now()){
const last=d.history.filter(s=>s.coached&&s.exercises.some(e=>G.done(e).length)).sort((a,b)=>Date.parse(b.finished)-Date.parse(a.finished))[0];
const start=d.personal?.sessionStart||'07:15',dates=[];let cursor=new Date(now);cursor.setSeconds(0,0);const [h,m]=start.split(':').map(Number);cursor.setHours(h,m,0,0);if(cursor.getTime()<now)cursor.setDate(cursor.getDate()+1);
const days=d.profile?.days===2?[1,4]:[1,3,5];for(let i=0;i<35&&dates.length<count;i++){if(days.includes(cursor.getDay())&&(!last||cursor.getTime()-Date.parse(last.finished)>=48*3600000))dates.push(new Date(cursor));cursor.setDate(cursor.getDate()+1);}return dates;
}
function calendar(d,now=Date.now()){
const stamp=v=>v.toISOString().replace(/[-:]/g,'').slice(0,15)+'Z',duration=d.profile?.minutes||45;
return ['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Iron Local//Personal Training//EN',...schedule(d,d.profile?.days===2?2:3,now).flatMap((v,i)=>['BEGIN:VEVENT',`UID:iron-local-${day(v)}-${i}@local`,`DTSTAMP:${stamp(new Date(now))}`,`DTSTART:${stamp(v)}`,`DTEND:${stamp(new Date(v.getTime()+duration*60000))}`,'SUMMARY:Personal training','DESCRIPTION:Check readiness in Iron Local. Reschedule if you need recovery.','BEGIN:VALARM','TRIGGER:-PT15M','ACTION:DISPLAY','DESCRIPTION:Training check-in','END:VALARM','END:VEVENT']),'END:VCALENDAR'].join('\r\n')+'\r\n';
}
const api={day,date,validate,defaults,extras,validateHealth,readiness,target,prepare,alternatives,nextSet,warmups,report,schedule,calendar};if(typeof module!=='undefined')module.exports=api;else root.Trainer=api;
})(globalThis);
