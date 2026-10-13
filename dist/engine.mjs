export const VERSION='2026.10.13.8';
export const CATEGORIES=[
 ['regulations','Regulations & Privileges','Rules for the pilot in command',60,'shield','#7471e8'],
 ['airspace','Airspace & VFR','Know where you can fly',60,'layers','#498cea'],
 ['airports','Airports & Communications','Signs, lights, and the radio',50,'tower','#e79c40'],
 ['aerodynamics','Aerodynamics','The principles behind flight',50,'wing','#37a792'],
 ['systems','Aircraft Systems','Know your airplane',40,'gear','#7c8ea9'],
 ['instruments','Flight Instruments','Read and interpret the panel',40,'gauge','#5899b3'],
 ['weather','Weather','Theory, reports, and forecasts',80,'cloud','#4a93d6'],
 ['performance','Aircraft Performance','Limits, charts, and planning',50,'chart','#9d77d8'],
 ['weightbalance','Weight & Balance','Loading, moments, and CG',40,'balance','#ca889d'],
 ['navigation','Navigation & Charts','Find your way with confidence',60,'compass','#6a99a4'],
 ['planning','Cross-Country Planning','Time, fuel, and flight calculations',40,'route','#72905f'],
 ['human','Human Factors & ADM','Better decisions in the cockpit',30,'heart','#ce8881']
].map(([id,name,subtitle,count,icon,color])=>({id,name,subtitle,count,icon,color}));
export const freshState=()=>({schema:1,contentVersion:VERSION,attempts:[],bookmarks:[],reviews:{},generated:[],packs:[],extras:{},exams:[],boldmethodHistory:[],session:null,lastResult:null,settings:{theme:'system',daily:20}});
export const shuffle=(items,random=Math.random)=>{const out=[...items];for(let i=out.length-1;i>0;i--){let j=Math.floor(random()*(i+1));[out[i],out[j]]=[out[j],out[i]];}return out;};
export const allQuestions=(base,state)=>[...base,...state.packs,...state.generated];
export function validateQuestion(q){
 if(!q || typeof q!=='object'||typeof q.id!=='string'||!q.id||q.id==='__proto__'||q.id==='constructor'||q.id==='prototype'||!CATEGORIES.some(c=>c.id===q.category))throw Error('Invalid question identity or category.');
 if(typeof q.prompt!=='string'||q.prompt.length<12||q.prompt.length>4000||typeof q.objective!=='string'||!/^[a-z0-9-]{1,100}$/.test(q.objective))throw Error('Invalid question text or learning objective.');
 if(!Array.isArray(q.choices)||q.choices.length!==3||new Set(q.choices.map(c=>c.id)).size!==3||new Set(q.choices.map(c=>c.text)).size!==3||q.choices.some(c=>!['a','b','c'].includes(c.id)||typeof c.text!=='string'||!c.text||typeof c.why!=='string'||!c.why))throw Error('Each question needs three distinct choices and rationales.');
 if(!q.choices.some(c=>c.id===q.answer)||typeof q.explanation!=='string'||q.explanation.length<15||typeof q.acs!=='string'||!/^PA\./.test(q.acs)||!Array.isArray(q.references)||!q.references.length)throw Error('Missing answer, explanation, ACS code, or references.');
 q.references.forEach(r=>{let u;try{u=new URL(r.url);}catch{throw Error('Invalid reference URL.');}const official=['faa.gov','ecfr.gov','govinfo.gov'].some(host=>u.hostname===host||u.hostname.endsWith('.'+host));if(u.protocol!=='https:'||!official||!r.locator||!r.title||!r.edition||!r.verified)throw Error('Reference must identify an official source, edition, location, and verification date.');});
 if(q.figure && (!/^assets\/[a-zA-Z0-9._-]+$/.test(q.figure.src)||!q.figure.caption||!q.figure.alt))throw Error('Invalid local figure.');
 if(q.template && !['time','speed','distance','fuel','weightbalance'].includes(q.template))throw Error('Unknown calculation template.');
 return true;
}
export function validateBank(bank){if(!Array.isArray(bank))throw Error('Question pack must be an array.');bank.forEach(validateQuestion);if(new Set(bank.map(q=>q.id)).size!==bank.length||new Set(bank.map(q=>q.prompt.trim().toLowerCase())).size!==bank.length)throw Error('Duplicate question IDs or prompts.');return true;}
export function validateBackup(input){
 if(!input||input.format!=='private-pilot-prep'||input.version!==1)throw Error('This is not a supported Private Pilot Prep backup.');
 const s=input.state;if(!s||s.schema!==1||!Array.isArray(s.attempts)||!Array.isArray(s.bookmarks)||!Array.isArray(s.generated)||!Array.isArray(s.packs)||!Array.isArray(s.exams)||!s.settings||!s.reviews||!s.extras)throw Error('Backup is incomplete.');
 validateBank([...s.generated,...s.packs]);
 if(s.attempts.some(a=>typeof a.questionId!=='string'||typeof a.correct!=='boolean'||!Number.isFinite(a.at)||!['quiz','exam'].includes(a.mode)))throw Error('Invalid attempt history.');
 if(s.bookmarks.some(x=>typeof x!=='string')||!['light','dark','system'].includes(s.settings.theme)||![10,20,30,40,60].includes(s.settings.daily))throw Error('Invalid preferences or bookmarks.');
 Object.entries(s.reviews).forEach(([id,r])=>{if(['__proto__','constructor','prototype'].includes(id)||!Number.isFinite(r.due)||!Number.isInteger(r.streak)||r.streak<0)throw Error('Invalid review schedule.');});
 if(s.boldmethodHistory!==undefined){if(!Array.isArray(s.boldmethodHistory))throw Error('Invalid Boldmethod journal.');s.boldmethodHistory.forEach(e=>{let u;try{u=new URL(e.url);}catch{throw Error('Invalid Boldmethod URL.');}if(u.protocol!=='https:'||!['boldmethod.com','www.boldmethod.com'].includes(u.hostname)||typeof e.title!=='string'||e.title.length>180||!Number.isFinite(e.at)||(e.score!==null&&(!Number.isFinite(e.score)||e.score<0||e.score>100)))throw Error('Invalid Boldmethod journal entry.');});}
 Object.entries(s.extras).forEach(([id,e])=>{if(!/^[a-z0-9-]{1,100}$/.test(id)||!Array.isArray(e.ids)||e.ids.some(v=>typeof v!=='string')||typeof e.review!=='boolean')throw Error('Invalid extra-practice queue.');});
 function checkSession(x,finished=false){if(!x||!['quiz','memorize','exam'].includes(x.mode)||!Array.isArray(x.questions)||!x.questions.length||!x.answers||!x.orders||!Array.isArray(x.flags)||!Array.isArray(x.recorded)||!Number.isInteger(x.index)||x.index<0||x.index>=x.questions.length)throw Error('Invalid saved session.');validateBank(x.questions);if(x.mode==='exam'&&(!Number.isFinite(x.deadline)||x.questions.length!==60))throw Error('Invalid exam timer.');for(const q of x.questions){if(!Array.isArray(x.orders[q.id])||x.orders[q.id].length!==3||new Set(x.orders[q.id]).size!==3||!x.orders[q.id].every(c=>q.choices.some(z=>z.id===c)))throw Error('Invalid saved answer order.');if(x.answers[q.id]&&!q.choices.some(c=>c.id===x.answers[q.id]))throw Error('Invalid saved answer.');}if(finished && (!Number.isFinite(x.score)||!Number.isFinite(x.finishedAt)))throw Error('Invalid completed exam.');}
 if(s.session)checkSession(s.session);s.exams.forEach(e=>checkSession(e,true));if(s.lastResult)checkSession(s.lastResult,true);
 return structuredClone(s);
}
export function stats(state,category=null){
 const attempts=state.attempts.filter(a=>!category||a.category===category),first=new Map();attempts.forEach(a=>{if(!first.has(a.questionId))first.set(a.questionId,a);});
 const primary=[...first.values()];return {answered:primary.length,total:attempts.length,first:primary.length?Math.round(primary.filter(a=>a.correct).length/primary.length*100):null,review:attempts.length?Math.round(attempts.filter(a=>a.correct).length/attempts.length*100):null,recent:attempts.slice(-20),missed:new Set(attempts.filter(a=>!a.correct).map(a=>a.questionId))};
}
export function recordAnswer(state,q,choice,mode='quiz',now=Date.now()){
 const correct=choice===q.answer;state.attempts.push({questionId:q.id,category:q.category,objective:q.objective,choice,correct,mode,at:now});
 const previous=state.reviews[q.id]||{streak:0};const streak=correct?previous.streak+1:0;const days=correct?[1,3,7,14][Math.min(streak-1,3)]:0;
 state.reviews[q.id]={streak,due:now+(correct?days*86400000:600000),lastCorrect:correct};return correct;
}
export function selectPractice(bank,state,{category=null,filter='all',count=20,search='',today=false}={}){
 const attempted=new Set(state.attempts.map(a=>a.questionId));let candidates=bank.filter(q=>(!category||q.category===category)&&(!search||`${q.prompt} ${q.choices.map(c=>c.text).join(' ')} ${q.objective}`.toLowerCase().includes(search.toLowerCase())));
 if(filter==='unseen')candidates=candidates.filter(q=>!attempted.has(q.id));if(filter==='missed')candidates=candidates.filter(q=>state.reviews[q.id]?.lastCorrect===false);if(filter==='bookmarked')candidates=candidates.filter(q=>state.bookmarks.includes(q.id));if(filter==='added')candidates=candidates.filter(q=>q.kind==='generated'||state.packs.some(p=>p.id===q.id));if(filter==='figures')candidates=candidates.filter(q=>q.figure);
 const weak=new Map(CATEGORIES.map(c=>{const a=stats(state,c.id).recent;return [c.id,a.length?a.filter(a=>a.correct).length/a.length:0.5];}));
 if(today){const now=Date.now();const priority=q=>{const r=state.reviews[q.id];if(r&&r.due<=now)return (r.lastCorrect?1:0);if(!attempted.has(q.id))return 2+weak.get(q.category);return 4;};candidates=shuffle(candidates).sort((a,b)=>priority(a)-priority(b));}else candidates=shuffle(candidates);
 return candidates.slice(0,count==='all'?candidates.length:count);
}
export function createSession(questions,mode='quiz',now=Date.now()){
 const copy=structuredClone(questions);return {id:`s-${now}-${Math.random().toString(36).slice(2,7)}`,mode,questions:copy,orders:Object.fromEntries(copy.map(q=>[q.id,(mode==='exam'?shuffle(q.choices):q.choices).map(c=>c.id)])),answers:{},recorded:[],flags:[],index:0,startedAt:now,deadline:mode==='exam'?now+7200000:null,revealed:false};
}
export function createExam(base,now=Date.now()){
 const questions=CATEGORIES.flatMap(c=>shuffle(base.filter(q=>q.category===c.id&&q.kind!=='generated')).slice(0,c.count/10));if(questions.length!==60)throw Error('Not enough verified questions for a complete mock exam.');return createSession(shuffle(questions),'exam',now);
}
export function finishSession(state,now=Date.now()){
 const s=state.session;if(!s)return null;
 if(s.mode==='exam'){for(const q of s.questions){if(!s.recorded.includes(q.id)){recordAnswer(state,q,s.answers[q.id]||null,'exam',now);s.recorded.push(q.id);}}}
 if(s.mode==='quiz')for(const q of s.questions)if(!s.recorded.includes(q.id))delete s.answers[q.id];
 const correct=s.questions.filter(q=>s.answers[q.id]===q.answer).length;
 const result={...structuredClone(s),finishedAt:now,score:s.mode==='memorize'?0:Math.round(correct/s.questions.length*100),correct,total:s.questions.length};
 if(s.mode==='exam')state.exams.push(result);state.lastResult=result;state.session=null;return result;
}
const rint=(min,max,random)=>min+Math.floor(random()*(max-min+1));
export function generateVariant(origin,random=Math.random){
 const t=origin.template;if(!t)return null;let prompt,value,unit,work,params;
 if(t==='time'){const nm=rint(25,220,random),knots=rint(65,165,random);value=nm/knots*60;unit='minutes';params={nm,knots};prompt=`A ${nm} NM leg is flown at a groundspeed of ${knots} knots. What is the time en route, rounded to the nearest minute?`;work=`Time = distance ÷ groundspeed × 60 = ${nm} ÷ ${knots} × 60 = ${value.toFixed(2)} minutes.`;}
 if(t==='speed'){const nm=rint(30,210,random),minutes=rint(20,100,random);value=nm/minutes*60;unit='knots';params={nm,minutes};prompt=`You travel ${nm} NM in ${minutes} minutes. What is your average groundspeed, rounded to the nearest knot?`;work=`Groundspeed = distance ÷ time in hours = ${nm} ÷ (${minutes}/60) = ${value.toFixed(2)} knots.`;}
 if(t==='distance'){const knots=rint(65,165,random),minutes=rint(15,100,random);value=knots*minutes/60;unit='NM';params={knots,minutes};prompt=`At ${knots} knots groundspeed, how far will you travel in ${minutes} minutes, rounded to the nearest NM?`;work=`Distance = groundspeed × time in hours = ${knots} × (${minutes}/60) = ${value.toFixed(2)} NM.`;}
 if(t==='fuel'){const gallons=rint(15,60,random),gph=rint(6,15,random);value=gallons/gph*60;unit='minutes';params={gallons,gph};prompt=`With ${gallons} gallons of usable fuel and a constant ${gph} gallon-per-hour consumption, what is the mathematical endurance to fuel exhaustion, rounded to the nearest minute? This excludes required reserves.`;work=`Endurance = usable fuel ÷ consumption = ${gallons} ÷ ${gph} × 60 = ${value.toFixed(2)} minutes. Legal reserves and operational margins must be subtracted when planning a flight.`;}
 if(t==='weightbalance'){const weight=rint(16,23,random)*100,arm=rint(35,45,random),addedWeight=rint(1,4,random)*40,addedArm=rint(55,95,random);value=(weight*arm+addedWeight*addedArm)/(weight+addedWeight);unit='inches aft of datum';params={weight,arm,addedWeight,addedArm};prompt=`An airplane weighs ${weight} lb with its CG at ${arm} inches aft of datum. Add ${addedWeight} lb at an arm of ${addedArm} inches aft of datum. What is the new CG, rounded to 0.1 inch?`;work=`Original moment = ${weight} × ${arm} = ${weight*arm} lb-in. Added moment = ${addedWeight} × ${addedArm} = ${addedWeight*addedArm} lb-in. New CG = ${weight*arm+addedWeight*addedArm} ÷ ${weight+addedWeight} = ${value.toFixed(2)} inches. Compare the result to the aircraft loading envelope before flight.`;}
 if(!params)return null;const decimals=t==='weightbalance'?1:0;const answer=Number(value.toFixed(decimals));const step=decimals?2:rint(8,25,random);
 const numbers=[answer,Number((answer+step).toFixed(decimals)),Number((Math.max(decimals?0.1:1,answer-step)).toFixed(decimals))];if(new Set(numbers).size!==3)return null;
 const offset=Object.values(params).reduce((sum,n)=>sum+n,0)%3;const ordered=[...numbers.slice(offset),...numbers.slice(0,offset)];const choices=ordered.map((n,i)=>({id:['a','b','c'][i],text:`${n.toFixed(decimals)} ${unit}`,why:n===answer?work:'This value does not follow from the stated inputs. '+work}));const fingerprint=t+'-'+Object.values(params).join('-');
 return {...structuredClone(origin),id:'added-'+fingerprint,prompt,choices,answer:choices[ordered.indexOf(answer)].id,explanation:work,memoryCue:t==='weightbalance'?'CG = total moment ÷ total weight.':'Keep time units consistent: knots are nautical miles per hour.',figure:null,kind:'generated',params,template:t,createdAt:Date.now(),sourceQuestionId:origin.id};
}
export function prepareExtra(state,bank,origin,random=Math.random){
 if(state.extras[origin.objective])return state.extras[origin.objective];const attempted=new Set(state.attempts.map(a=>a.questionId));const excluded=new Set(state.session?.questions.map(q=>q.id)||[]);
 let qs=shuffle(bank.filter(q=>q.objective===origin.objective&&!attempted.has(q.id)&&!excluded.has(q.id)),random).slice(0,10);const ids=new Set(bank.map(q=>q.id)),prompts=new Set(bank.map(q=>q.prompt));
 const templateOrigin=origin.template?origin:bank.find(q=>q.objective===origin.objective&&q.template);
 if(templateOrigin){for(let i=0;qs.length<10&&i<300;i++){const q=generateVariant({...templateOrigin,category:origin.category},random);if(q&&!ids.has(q.id)&&!prompts.has(q.prompt)){validateQuestion(q);state.generated.push(q);qs.push(q);ids.add(q.id);prompts.add(q.prompt);}}}
 let review=false;if(qs.length<10){review=true;const have=new Set(qs.map(q=>q.id));const repeat=shuffle(bank.filter(q=>q.objective===origin.objective&&!have.has(q.id)),random);qs.push(...repeat.slice(0,10-qs.length));}
 state.extras[origin.objective]={ids:qs.map(q=>q.id),review,category:origin.category};return state.extras[origin.objective];
}
export function readiness(state){const last=state.exams.slice(-3);return {ready:last.length===3&&last.every(x=>x.score>=90),scores:last.map(x=>x.score),weak:CATEGORIES.filter(c=>{const a=stats(state,c.id).recent;return a.length<20||a.filter(x=>x.correct).length/a.length<.8;}).map(c=>c.id)};}
