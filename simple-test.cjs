const assert=require('node:assert/strict'),fs=require('node:fs'),G=require('./core.js');let count=0;function test(name,fn){fn();count++;console.log('PASS',name);}
const vm=require('node:vm');const elements=new Map();const listeners={};const memory=new Map();const context=vm.createContext({FormData:class{constructor(target){this.values=target.values||{};}get(k){return this.values[k]??null;}has(k){return this.values[k]!==undefined&&this.values[k]!==null;}getAll(k){const v=this.values[k];return v===undefined?[]:Array.isArray(v)?v:[v];}},Vault:{isUnlocked:()=>true,state:()=>({pending:0}),saveData:d=>{memory.set('iron-local-data-v1',JSON.stringify(d));return Promise.resolve();}},SecurityUI:{boot:()=>{},covered:()=>false,securityPanel:()=>'',exportObject:()=>Promise.resolve()},Gym:G,TrainingPlus:require('./training-plus.js'),Trainer:require('./trainer.js'),PrivatePhotos:require('./photos.js'),ExerciseGuides:require('./exercise-guides.js'),ExerciseArt:require('./exercise-art.js'),Body:require("./body.js"),Coach:require("./coach.js"),structuredClone,console,Date,JSON,Number,String,Set,Math,Blob,URL,setTimeout:()=>0,clearTimeout:()=>{},setInterval:()=>0,confirm:()=>true,navigator:{onLine:true},document:{querySelector:s=>{if(!elements.has(s))elements.set(s,{style:{},showModal(){this.open=true;},close(){this.open=false;},focus(){}});return elements.get(s);},querySelectorAll:()=>[],addEventListener:(event,fn)=>(listeners[event]??=[]).push(fn)},window:{addEventListener:()=>{}},localStorage:{getItem:k=>memory.get(k)||null,setItem:(k,v)=>memory.set(k,v)}});
vm.runInContext(fs.readFileSync(__dirname+'/body-ui.js','utf8'),context);
vm.runInContext(fs.readFileSync(__dirname+'/coach-ui.js','utf8'),context);
vm.runInContext(fs.readFileSync(__dirname+'/exercise-guide-ui.js','utf8'),context);
vm.runInContext(fs.readFileSync(__dirname+'/trainer-ui.js','utf8'),context);
vm.runInContext(fs.readFileSync(__dirname+'/interface.js','utf8'),context);
vm.runInContext(fs.readFileSync(__dirname+'/training-plus-ui.js','utf8'),context);
vm.runInContext(fs.readFileSync(__dirname+'/app.js','utf8'),context);
vm.runInContext(fs.readFileSync(__dirname+'/simple-ui.js','utf8'),context);vm.runInContext('data=G.defaults();render()',context);
const run=s=>vm.runInContext(s,context);
const click=dataset=>listeners.click.forEach(fn=>fn({target:{closest:()=>({dataset})}}));

const html=()=>elements.get('#app').innerHTML;
test('simple home has one setup action and no advanced dashboard',()=>{assert.ok(html().includes('Set up my plan'));assert.ok(!html().includes('RECOVERY & READINESS'));assert.ok(!html().includes('Muscle report'));});
test('three bottom navigation destinations',()=>{const nav=fs.readFileSync(__dirname+'/index.html','utf8').match(/<nav[\s\S]*?<\/nav>/)[0];assert.equal((nav.match(/data-tab=/g)||[]).length,3);});
test('extra tools are closed and data remains unchanged through navigation',()=>{const before=run('JSON.stringify(data)');click({tab:'settings'});assert.ok(html().includes('<details class="card simple-extra">'));assert.ok(html().includes('Back up my data'));assert.equal(run('JSON.stringify(data)'),before);});
test('profile always returns to the simple settings home',()=>{click({profile:'security'});click({tab:'settings'});assert.equal(run('profileSection'),'home');assert.ok(html().includes('Extra tools'));});
test('progress chart returns to simple overview through navigation',()=>{click({tab:'progress'});click({simple:'showChart'});click({tab:'progress'});assert.ok(html().includes('workouts completed'));});
test('daily check-in remains required with no assessment gate',()=>{run('data.profile={goal:"muscle",days:3,minutes:45,age:"adult",restrictions:false,equipment:["machines","dumbbells","bodyweight"],avoid:[]}');click({action:'startCoached'});assert.equal(run('trainerView'),'checkin');assert.equal(run('data.active'),null);assert.ok(html().includes('Four quick checks'));});
const submit=values=>listeners.submit.forEach(fn=>fn({target:{id:'trainerCheckIn',values},preventDefault(){}}));
test('pain still prevents a workout',()=>{submit({energy:'good',soreness:'mild',pain:'yes',illness:'no',minutes:'45',sleep:'',stress:'unknown'});click({action:'startCoached'});assert.equal(run('data.active'),null);});
test('safe check-in starts training without an assessment',()=>{submit({energy:'good',soreness:'mild',pain:'no',illness:'no',minutes:'45',sleep:'',stress:'unknown'});click({action:'startCoached'});assert.ok(run('data.active'));assert.ok(!run('data.trainer.assessment'));assert.ok(html().includes('MOVEMENT 01'));assert.ok(!html().includes('class="card exercise-card"'));});
test('simple logging retains completion, timer, and encrypted save path',()=>{run('data.active.exercises[0].log[0].weight=5;data.active.exercises[0].log[0].reps=8');click({action:'done',i:'0',j:'0'});assert.equal(run('data.active.exercises[0].log[0].done'),true);assert.ok(memory.has('iron-local-data-v1'));assert.ok(html().includes('Optional set feedback'));assert.ok(run('data.timerEnd')>0);});
test('exercise navigation does not change records',()=>{const before=run('JSON.stringify(data)');click({action:'focusExercise',index:'1'});assert.equal(run('JSON.stringify(data)'),before);assert.ok(html().includes('MOVEMENT 02'));});
test('locking cleanup resets simple view flags',()=>{run('data.active=null');click({tab:'coach'});click({simple:'editPlan'});run('SimpleUI.clear();render()');assert.ok(html().includes('Change my goal'));});
console.log(count+' simple UI tests passed');

