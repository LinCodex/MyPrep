const rad=Math.PI/180;
const wrap=n=>((n%360)+360)%360;
function number(v,key,min=0,max=Infinity){const raw=v[key];if(raw===''||raw===null||raw===undefined)throw Error('Enter all required values.');const n=Number(raw);if(!Number.isFinite(n)||n<min||n>max)throw Error(`Check ${key.replaceAll('_',' ')} (${min}–${max===Infinity?'positive':max}).`);return n;}
function positive(v,key){const n=number(v,key);if(n===0)throw Error(`${key.replaceAll('_',' ')} must be greater than zero.`);return n;}
export function computeE6B(mode,v,solve='time'){
 if(mode==='wind'){
  const course=number(v,'course',0,360),tas=positive(v,'tas'),from=number(v,'wind_from',0,360),wind=number(v,'wind_speed'),angle=(from-course)*rad,cross=wind*Math.sin(angle),head=wind*Math.cos(angle);
  if(Math.abs(cross)>tas)throw Error('This wind cannot maintain the selected course at this airspeed.');
  const correction=Math.asin(cross/tas)/rad,gs=tas*Math.cos(correction*rad)-head;
  if(gs<=1e-9)throw Error('No forward groundspeed on this course.');
  return {rows:[['True heading',wrap(course+correction),'°T'],['Groundspeed',gs,'kt'],['Wind correction',correction,'°'],['Headwind (+) / tailwind (−)',head,'kt']],note:'Wind is FROM the entered direction. Use true course and true wind. Positive correction is right.',diagram:{course,heading:wrap(course+correction),from,wind,tas,gs}};
 }
 if(mode==='time'){
  let speed,time,distance;
  if(solve==='time'){speed=positive(v,'speed');distance=number(v,'distance');time=distance/speed*60;}
  if(solve==='distance'){speed=positive(v,'speed');time=number(v,'time');distance=speed*time/60;}
  if(solve==='speed'){distance=number(v,'distance');time=positive(v,'time');speed=distance/time*60;}
  return {rows:[['Groundspeed',speed,'kt'],['Time en route',time,'min'],['Distance',distance,'NM']],note:'Distance = groundspeed × time in hours.'};
 }
 if(mode==='fuel'){
  let rate,time,fuel;
  if(solve==='time'){rate=positive(v,'rate');fuel=number(v,'fuel');time=fuel/rate*60;}
  if(solve==='fuel'){rate=positive(v,'rate');time=number(v,'time');fuel=rate*time/60;}
  if(solve==='rate'){fuel=number(v,'fuel');time=positive(v,'time');rate=fuel/time*60;}
  return {rows:[['Fuel flow',rate,'gal/h'],['Endurance / flight time',time,'min'],['Fuel',fuel,'US gal']],note:'Use usable fuel. Endurance shown is before reserves.'};
 }
 if(mode==='altitude'){
  const elevation=number(v,'elevation',-1500,20000),setting=number(v,'altimeter',28,31.5),temp=number(v,'temperature',-60,60),pa=elevation+(29.92-setting)*1000,isa=15-1.98*pa/1000,da=pa+120*(temp-isa);
  return {rows:[['Pressure altitude',pa,'ft'],['Density altitude',da,'ft'],['ISA temperature',isa,'°C']],note:'Approximation: PA = elevation + (29.92 − setting) × 1,000; DA ≈ PA + 120 × (OAT − ISA).'};
 }
 if(mode==='dial'){const factor=positive(v,'factor'),input=positive(v,'input');return {rows:[['Multiply',input*factor,''],['Divide',input/factor,'']],note:'Align inner 10 with the multiplier on the outer scale. Values repeat each decade.'};}
 throw Error('Unknown E6B function.');
}
export function dialAngle(factor){if(!Number.isFinite(factor)||factor<=0)throw Error('Invalid ratio.');return Math.log10(factor)*360;}
export function factorAtAngle(angle,decade=0){return 10**(angle/360+decade);}
