(function(){'use strict';
/* ---- sprites: procedural creature generator (original designs) ---- */
const PAL={
 fire:["#ed8655","#953f48","#ffe9b3","#f9c753"],water:["#55bbdf","#235a85","#daf8f9","#f5c96c"],
 plant:["#4eae70","#245c4b","#d1f5b9","#f0bd62"],earth:["#cba36c","#715b58","#f9e4ad","#7bc6c1"],
 spark:["#8c91e8","#454176","#fff4bc","#f9cb56"],norm:["#ccadc7","#765a83","#fff0da","#8bd6c2"],
 ice:["#8fdcf5","#2f6a8f","#eafcff","#c6a8ff"],wind:["#9fe3c4","#2f7a6a","#f2fff6","#ffe27a"],
 bug:["#b4d94a","#4f6a1c","#f2ffc0","#ff9a4a"],shadow:["#8a74c9","#2e2058","#d9cfff","#ff6ac0"],
 light:["#ffe27a","#b4772a","#fffbe0","#ff9ac0"],metal:["#b4bfd0","#4a5568","#f2f6ff","#ff7a4a"],
 fight:["#e0745a","#6a2a22","#ffe3c8","#ffd04a"],dragon:["#7a7af0","#2a2a80","#d8d8ff","#ffb04a"],
 sound:["#ff9ad0","#8a2a68","#ffe3f4","#6ad8ff"],venom:["#b46ad8","#512a6a","#f0d4ff","#a4ff5a"]};
function drawCreature(c,sp){
 const p=sp.p||PAL[sp.t],[M,D,Lt,AC]=p,st=sp.st||0,v=sp.v||'',T=sp.t;
 c.lineJoin='round';c.lineCap='round';
 const K=1+0.12*st;
 const ell=(x,y,rx,ry,f,rot=0,ol=true)=>{c.beginPath();c.ellipse(x,y,rx,ry,rot,0,6.2832);c.fillStyle=f;c.fill();if(ol){c.strokeStyle=D;c.lineWidth=.8;c.stroke()}};
 const poly=(pts,f,ol=true,close=true)=>{c.beginPath();c.moveTo(pts[0],pts[1]);for(let i=2;i<pts.length;i+=2)c.lineTo(pts[i],pts[i+1]);if(close)c.closePath();c.fillStyle=f;c.fill();if(ol){c.strokeStyle=D;c.lineWidth=.8;c.stroke()}};
 const ln=(pts,col=D,w=1,close=false)=>{c.beginPath();c.moveTo(pts[0],pts[1]);for(let i=2;i<pts.length;i+=2)c.lineTo(pts[i],pts[i+1]);if(close)c.closePath();c.strokeStyle=col;c.lineWidth=w;c.stroke()};
 const gr=(x,y,r,a=Lt,b=M,d=D)=>{const g=c.createRadialGradient(x-r*.35,y-r*.45,r*.08,x,y,r*1.15);g.addColorStop(0,a);g.addColorStop(.5,b);g.addColorStop(1,d);return g};
 const eye=(x,y,r=3.4,look=0)=>{ell(x,y,r,r*1.12,'#fff',0,false);ell(x+look,y+.3,r*.62,r*.78,'#241a2e',0,false);ell(x+look-r*.18,y-r*.28,r*.26,r*.26,'#fff',0,false)};
 const eyes=(x,y,gap,r,look)=>{eye(x-gap,y,r,look);eye(x+gap,y,r,look)};
 const blush=(x,y,gap,r=2.6)=>{c.globalAlpha=.5;ell(x-gap,y,r,r*.6,'#ff8fa0',0,false);ell(x+gap,y,r,r*.6,'#ff8fa0',0,false);c.globalAlpha=1};
 const mouth=(x,y,w=3,open=false)=>{if(open){ell(x,y+1,w*.7,w*.6,'#7a2a3a',0,false);ell(x,y+2,w*.4,w*.3,'#ff8aa0',0,false)}else{ln([x-w,y,x-w*.4,y+w*.55,x,y,x+w*.4,y+w*.55,x+w,y],D,.9)}};
 const shine=(x,y,rx,ry,rot=-.5)=>{c.globalAlpha=.55;ell(x,y,rx,ry,'#fff',rot,false);c.globalAlpha=1};
 const spiky=(cx,cy,n,r1,r2,col,a0=0)=>{const pts=[];for(let i=0;i<n*2;i++){const a=a0+i*Math.PI/n,r=i%2?r1:r2;pts.push(cx+Math.cos(a)*r,cy+Math.sin(a)*r)}poly(pts,col)};
 // elemental ornament: attached to head/back according to type and stage
 const orn=(x,y,s=1)=>{c.save();c.translate(x,y);c.scale(s,s);
  if(T==='fire'){poly([0,0,-4,-6,-1,-5,0,-12,2,-6,4,-7],AC);poly([0,-1,-2,-5,0,-8,1,-5],'#fff4a8',false)}
  else if(T==='water'){ell(0,-3,3.2,5,AC,0.2);ell(-1,-4,1,2,'#fff',0,false)}
  else if(T==='plant'){ell(-3,-3,4,2.2,AC,-.8);ell(3,-3,4,2.2,AC,.8);ln([0,0,0,-3],D,.8)}
  else if(T==='spark'){poly([0,-12,-4,-3,-1,-3,-3,4,4,-5,1,-5,3,-12],AC)}
  else if(T==='earth'){poly([-4,0,-2,-7,2,-7,4,0],AC);}
  else if(T==='ice'){spiky(0,-5,4,2.2,6.5,'#eafcff')}
  else if(T==='wind'){ln([-5,-2,-2,-6,2,-3,5,-7],AC,1.6)}
  else if(T==='bug'){ln([0,0,-4,-8],D,1);ln([0,0,4,-8],D,1);ell(-4,-9,1.6,1.6,AC,0,false);ell(4,-9,1.6,1.6,AC,0,false)}
  else if(T==='shadow'){c.globalAlpha=.8;ell(0,-5,4,6,AC,0);ell(-1,-6,1.2,2,'#fff',0,false);c.globalAlpha=1}
  else if(T==='light'){spiky(0,-5,6,2.4,6,AC)}
  else if(T==='metal'){poly([-3,0,-3,-8,3,-8,3,0],AC);}
  else if(T==='fight'){poly([-5,0,-3,-7,0,-3,3,-7,5,0],AC)}
  else if(T==='dragon'){poly([-3,0,-1,-9,1,0],AC);}
  else if(T==='sound'){ell(-2,-2,2.5,2,AC,0);ln([0,-2,0,-9,4,-7],AC,1.4)}
  else if(T==='venom'){ell(0,-3,3.4,3.4,AC);ell(-1,-4,1,1,'#fff',0,false)}
  c.restore()};
 const nubs=(y)=>{ell(-8,y,5,3.4,M);ell(8,y,5,3.4,M)};
 const tpl=sp.tpl;
 c.save();
 if(tpl==='fox'){ // fox / cat / lion / cub
  const lion=v==='lion',cat=v==='cat',ear=cat?1.25:1;
  // tail
  c.save();c.translate(15,10);c.rotate(.5);ell(0,-7,6*K,13*K,gr(0,-7,12),0);ell(0,-16,4,5,Lt);c.restore();
  if(st>=1)orn(18,-8,1.2);
  ell(0,10,15*K,13*K,gr(0,10,15));ell(0,13,8,8,Lt,0,false);
  nubs(22);
  if(lion){for(let i=0;i<10;i++){const a=i/10*6.2832;ell(Math.cos(a)*15,-8+Math.sin(a)*13,5,5,AC)}}
  // ears
  for(const s of[-1,1]){poly([s*7,-14,s*15*ear,-31*ear,s*15,-12],M);poly([s*9,-15,s*14*ear,-27*ear,s*14,-14],cat?AC:Lt,false)}
  ell(0,-7,16*K,14*K,gr(0,-7,16));
  if(st>=2){for(const s of[-1,1])poly([s*14,-4,s*23,-8,s*18,2],AC)}
  eyes(0,-8,6.5,3.6);blush(0,-2,10);ell(0,-3,1.8,1.3,D,0,false);mouth(0,-1,2.4);shine(-7,-16,3,1.6);
  if(st>=1)orn(0,-21,1.3);
  if(v==='cat'){ln([-12,-3,-19,-4,-12,-1,-19,0],D,.6);ln([12,-3,19,-4,12,-1,19,0],D,.6)}
 }
 else if(tpl==='hare'){
  for(const s of[-1,1]){c.save();c.translate(s*8,-24);c.rotate(s*.18);ell(0,-4,5.4,16*(1+.05*st),gr(0,-4,12),0);ell(0,-3,2.6,11,AC);c.restore()}
  ell(0,11,15*K,13*K,gr(0,11,15));ell(0,14,8,7,Lt,0,false);
  ell(-9,24,6,3.4,M);ell(9,24,6,3.4,M);ell(14,18,5,5,Lt);
  ell(0,-5,15*K,13*K,gr(0,-5,15));ell(-9,0,5,4,Lt,0,false);ell(9,0,5,4,Lt,0,false);
  eyes(0,-7,6,3.4);blush(0,0,10);ell(0,-1,1.7,1.3,AC,0,false);mouth(0,1,2.2);
  if(st>=1)orn(0,-19,1.2);
  if(st>=2){spiky(0,16,5,3,6.5,Lt)}
 }
 else if(tpl==='bird'){
  const f=st>=1;
  // tail feathers
  for(let i=-1;i<=1;i++)c.save(),c.translate(i*4,18),c.rotate(i*.35),ell(0,8,3,9+f*3,i?M:AC),c.restore();
  ell(0,6,16*K,16*K,gr(0,6,16));ell(0,10,10,10,Lt,0,false);
  for(const s of[-1,1]){c.save();c.translate(s*15,6);c.rotate(s*(.5+(f?.15:0)));ell(0,6,6*K,(13+3*st)*K,gr(0,6,12,M,M,D),0);ell(0,10,3,8*K,AC);c.restore()}
  ell(0,-9,13*K,12*K,gr(0,-9,13));
  poly([-3,-6,0,1,3,-6],'#ffb040');ln([-3,-6,0,-4,3,-6],D,.6);
  eyes(0,-11,6,3.3);blush(0,-5,9);
  if(f)orn(0,-21,1.3);
  ln([-4,22,-4,28,-7,29,-4,28,-1,29],'#d08a30',1.3);ln([4,22,4,28,1,29,4,28,7,29],'#d08a30',1.3);
  shine(-6,-16,3,1.6);
 }
 else if(tpl==='ghost'){
  const w=14*K;
  c.globalAlpha=.95;
  c.beginPath();c.moveTo(-w,18);c.bezierCurveTo(-w-4,-14,-8,-27,0,-27);c.bezierCurveTo(8,-27,w+4,-14,w,18);
  for(let i=0;i<4;i++){const x=w-(i+.5)*(w*2/4);c.quadraticCurveTo(x+w/4,26+(i%2?-3:4),x-w/4+0,18+(i%2?5:-1))}
  c.closePath();c.fillStyle=gr(0,-4,24);c.fill();c.strokeStyle=D;c.lineWidth=.8;c.stroke();c.globalAlpha=1;
  if(st>=1){c.beginPath();c.moveTo(-w-1,-6);c.quadraticCurveTo(0,-36,w+1,-6);c.quadraticCurveTo(0,-14,-w-1,-6);c.fillStyle=D;c.fill();}
  ell(-w-4,6,4,6,M,.3);ell(w+4,6,4,6,M,-.3);
  eyes(0,-6,5.5,4,0);ell(-5.5,-6,1.5,1.5,AC,0,false);ell(5.5,-6,1.5,1.5,AC,0,false);
  mouth(0,3,3,true);
  if(st>=1)orn(0,-24,1.3);
  shine(-7,-16,3,1.8);
 }
 else if(tpl==='orb'){
  if(v==='crystal'){
   const h=22*K;poly([0,-h-6,13*K,-6,9*K,h*.9,-9*K,h*.9,-13*K,-6],gr(0,0,22));
   poly([0,-h-6,0,h*.9,9*K,h*.9,13*K,-6],'rgba(255,255,255,.18)',false);
   ln([0,-h-6,-4,-4,-9*K,h*.9],'rgba(255,255,255,.55)',.9);ln([-13*K,-6,-4,-4,13*K,-6],'rgba(255,255,255,.45)',.8);
   for(const s of[-1,1]){poly([s*13*K,-4,s*(22+4*st),-12-4*st,s*15*K,4],M)}
   eyes(0,0,5,3.4);mouth(0,7,2.6);blush(0,5,8);
   if(st>=1){spiky(0,-26,5,3,7,Lt)}
  }else if(v==='jelly'){
   for(let i=-2;i<=2;i++){const x=i*5.4;c.beginPath();c.moveTo(x,6);c.bezierCurveTo(x+4,14,x-4,22,x+(i%2?3:-3),30);c.strokeStyle=i%2?M:AC;c.lineWidth=3;c.stroke();c.strokeStyle=D;c.lineWidth=.5;c.stroke()}
   c.beginPath();c.moveTo(-20*K,8);c.bezierCurveTo(-22*K,-30,22*K,-30,20*K,8);c.quadraticCurveTo(0,13,-20*K,8);c.fillStyle=gr(0,-8,22);c.fill();c.strokeStyle=D;c.lineWidth=.8;c.stroke();
   c.globalAlpha=.4;ell(0,-14,10,6,Lt,0,false);c.globalAlpha=1;
   eyes(0,-3,6.5,3.6);blush(0,2,11);mouth(0,3,2.6);
   if(st>=1){for(let i=0;i<5;i++)ell(-16+i*8,-20+(i%2)*3,2,2,AC)}
  }else if(v==='balloon'){
   ln([0,22,-3,29,3,33],D,1.1);
   ell(0,-3,20*K,22*K,gr(0,-3,24));poly([-3,20,3,20,0,25],M);
   for(const s of[-1,1])ln([s*6,-24,s*10*K,-4,s*8,18],'rgba(255,255,255,.35)',1);
   eyes(0,-5,7,3.8);blush(0,2,12);mouth(0,3,3,true);shine(-9,-14,4,2.4);
   if(st>=1){for(const s of[-1,1])ell(s*20,6,5,3,Lt,s*.7)}
  }else{ // star
   spiky(0,-1,5,11,27*K,gr(0,0,26),-1.57);
   ell(0,0,13,13,gr(0,0,13));eyes(0,-2,5,3.4);blush(0,3,8);mouth(0,3,2.2);
   for(let i=0;i<3;i++)ell(-18+i*18,-26+(i%2)*4,1.3,1.3,'#fff',0,false);
  }
 }
 else if(tpl==='insect'){
  if(v==='worm'){
   for(let i=3;i>=0;i--){ell(-14+i*0,22-i*9,(11-i*1.1)*K,(7.5-i*.5)*K,i%2?gr(0,0,10,Lt,M,D):gr(0,0,10),0);}
   ell(0,-10,14*K,12*K,gr(0,-10,14));
   for(let i=0;i<3;i++)ell(-8+i*8,19-i*0,2,2,AC,0,false);
   ln([-4,-20,-9,-29],D,1.2);ln([4,-20,9,-29],D,1.2);ell(-9,-29,2,2,AC);ell(9,-29,2,2,AC);
   eyes(0,-11,6,3.6);blush(0,-4,10);mouth(0,-3,2.4);
  }else if(v==='cocoon'){
   ell(0,4,17*K,27*K,gr(0,4,28));for(let i=-3;i<=3;i++)ln([-16+Math.abs(i)*1,i*7,16-Math.abs(i),i*7+3],D,.7);
   ell(0,-2,9,7,'#2a2030',0,false);eyes(0,-2,4,2.6,0);shine(-6,-12,3,5);
   if(st>=1)ln([0,-30,0,-34],D,1);
  }else if(v==='moth'){
   for(const s of[-1,1]){c.save();c.translate(s*8,-4);c.rotate(s*.35);ell(s*10,-6,17*K,22*K,gr(s*10,-6,20),0);ell(s*10,-6,8,12,Lt);ell(s*11,-8,3.5,3.5,AC);ell(s*10,10,4,5,AC);c.restore()}
   ell(0,6,9*K,18*K,gr(0,6,14));for(let i=0;i<3;i++)ln([-8,2+i*6,8,2+i*6],D,.6);
   ell(0,-14,10*K,9*K,gr(0,-14,10));
   ln([-3,-21,-10,-32,-6,-34],D,1.1);ln([3,-21,10,-32,6,-34],D,1.1);ell(-6,-34,2,2,AC);ell(6,-34,2,2,AC);
   eyes(0,-14,4.6,3.2);mouth(0,-9,2);
  }else if(v==='ant'){
   ell(0,22,15*K,11*K,gr(0,22,14));ell(0,6,9*K,8*K,gr(0,6,9));
   for(const s of[-1,1]){ln([s*8,8,s*18,12,s*20,24],D,1.6);ln([s*8,4,s*19,2,s*24,12],D,1.6);ln([s*8,12,s*17,22,s*16,30],D,1.6)}
   ell(0,-10,12*K,11*K,gr(0,-10,12));
   ln([-4,-19,-12,-30],D,1.2);ln([4,-19,12,-30],D,1.2);ell(-12,-30,2,2,AC);ell(12,-30,2,2,AC);
   for(const s of[-1,1])poly([s*4,-2,s*9,-1,s*5,3],'#3a2a20');
   eyes(0,-11,5.5,3.4);
   if(st>=1){poly([-9,-21,-5,-29,0,-23,5,-29,9,-21],AC)}
  }else{ // mantis
   for(const s of[-1,1]){ln([s*6,2,s*18,-8,s*12,-22],M,3.4);ln([s*6,2,s*18,-8,s*12,-22],D,.5);poly([s*12,-22,s*20,-30,s*16,-18],AC);}
   ell(0,16,10*K,20*K,gr(0,16,20));for(let i=0;i<3;i++)ln([-8,10+i*7,8,10+i*7],D,.6);
   poly([-8,-4,0,-24*K,8,-4],gr(0,-12,12));
   ell(0,-14,10*K,9*K,gr(0,-14,10));poly([-10,-14,-5,-26,0,-18,5,-26,10,-14],M);
   eyes(0,-14,5,3.3);mouth(0,-9,2);
  }
 }
 else if(tpl==='golem'){
  if(v==='cog'){
   spiky(0,4,10,17*K,23*K,gr(0,4,22,M,M,D),0);ell(0,4,16*K,16*K,gr(0,4,17));
   ell(0,4,11,11,'#2a3040',0);eyes(0,2,5,3.6);mouth(0,9,3,true);
   for(const s of[-1,1]){ell(s*21,22,5,3.4,M);}
   ell(0,-21,3,5,AC);ell(0,-27,2.4,2.4,AC);
   if(st>=1){for(const s of[-1,1])poly([s*17,-14,s*26,-26,s*22,-10],AC)}
  }else if(v==='knight'){
   ell(0,16,13*K,15*K,gr(0,16,16));poly([-12,6,12,6,8,26,-8,26],gr(0,16,16,Lt,M,D));
   for(const s of[-1,1]){ell(s*17,12,6,7,M);ell(s*17,20,4,4,Lt)}
   ell(-6,28,5,3.4,M);ell(6,28,5,3.4,M);
   ell(0,-8,13*K,13*K,gr(0,-8,14));poly([-11,-8,11,-8,11,-3,-11,-3],'#2a3040',false);
   ell(-5,-6,2.4,1.6,'#ffe27a',0,false);ell(5,-6,2.4,1.6,'#ffe27a',0,false);
   poly([-2,-22,0,-33,2,-22],AC);for(const s of[-1,1])poly([s*11,-14,s*17,-20,s*13,-8],M);
   ln([0,0,0,22],D,.7);
   if(st>=1){ln([22,-2,22,30],'#cfd6e3',2.4);poly([19,-2,22,-9,25,-2],AC)}
  }else{ // block golem
   ell(0,16,15*K,14*K,gr(0,16,16));
   for(const s of[-1,1]){ell(s*20,10,6,9,gr(0,0,8));ell(s*21,20,5.4,5.4,gr(0,0,6,Lt,M,D))}
   ell(-7,28,6,3.6,M);ell(7,28,6,3.6,M);
   poly([-14,-18,14,-18,16,0,-16,0],gr(0,-9,16));
   for(const q of[[-9,-12],[9,-12],[-9,-4],[9,-4]])ell(q[0],q[1],1.1,1.1,Lt,0,false);
   eyes(0,-9,5,3.2);mouth(0,-2,3);
   for(const s of[-1,1])ell(s*8,14,3,3,AC,0,false);
   ln([-10,18,10,18],D,.8);
   if(st>=1){poly([-8,-18,-5,-26,-1,-18],AC);poly([1,-18,5,-26,8,-18],AC)}
   if(st>=2){for(const s of[-1,1])poly([s*14,-2,s*25,-14,s*21,0],AC)}
  }
 }
 else if(tpl==='biped'){
  if(v==='rooster'){
   for(let i=-1;i<=1;i++){c.save();c.translate(i*5,14);c.rotate(i*.4);ell(0,-10,3.4,13,i?M:AC);c.restore()}
   ell(0,8,14*K,15*K,gr(0,8,16));ell(0,12,8,9,Lt,0,false);
   for(const s of[-1,1]){c.save();c.translate(s*14,6);c.rotate(s*.7);ell(0,6,5,10,M);ell(0,14,5.4,5.4,gr(0,0,6,AC,AC,D));c.restore()}
   ell(0,-12,12*K,11*K,gr(0,-12,12));
   poly([-3,-14,0,-8,3,-14],'#ffb040');
   for(let i=-1;i<=1;i++)ell(i*4,-24+Math.abs(i)*1.5,3.6,5.5,AC);
   ell(0,-7,2.4,4,'#e24a3a');
   eyes(0,-14,5.2,3);poly([-7,-17,-3,-15,-7,-14],D,false);poly([7,-17,3,-15,7,-14],D,false);
   ln([-5,22,-5,29],'#d08a30',1.6);ln([5,22,5,29],'#d08a30',1.6);
   if(st>=1)orn(0,-29,1.1);
  }else{ // monkey
   ell(0,4,11,10,AC);ln([12,22,22,24,26,14,22,8],M,3.2);
   ell(0,14,13*K,14*K,gr(0,14,15));ell(0,16,7,9,Lt,0,false);
   for(const s of[-1,1]){ln([s*12,6,s*20,12,s*18,20],M,5);ln([s*12,6,s*20,12,s*18,20],D,.4);
    ell(s*18,21,(5+st)*1,(5+st),gr(0,0,6,AC,AC,D));ell(s*7,28,5,3.4,M)}
   ell(0,-9,13*K,12*K,gr(0,-9,13));ell(-14,-9,4.5,4.5,M);ell(14,-9,4.5,4.5,M);ell(-14,-9,2.4,2.4,Lt,0,false);ell(14,-9,2.4,2.4,Lt,0,false);
   ell(0,-5,8,6,Lt);eyes(0,-11,5.6,3.2);ell(-1.8,-6,.9,.9,D,0,false);ell(1.8,-6,.9,.9,D,0,false);mouth(0,-3,2.6);
   poly([-9,-16,0,-12,9,-16],AC,false);
   if(st>=1)orn(0,-22,1.2);
   if(st>=2){ln([-12,2,12,2],AC,2.2)}
  }
 }
 else if(tpl==='drake'){
  const w=st>=1;
  c.save();c.translate(-14,16);c.rotate(-.5);ell(-4,8,6,14*K,gr(0,0,14),.3);poly([-9,18,-4,26,-1,17],AC);c.restore();
  if(w)for(const s of[-1,1]){c.save();c.translate(s*12,-2);c.rotate(s*.5);poly([0,0,s*22*K,-18,s*26*K,0,s*20*K,10,0,10],gr(s*10,0,16,M,M,D));ln([0,4,s*22,-12],D,.7);ln([0,6,s*24,0],D,.7);c.restore()}
  ell(0,12,14*K,15*K,gr(0,12,16));
  for(let i=0;i<4;i++)ell(0,2+i*5.5,7,2.4,Lt,0,false);
  for(const s of[-1,1]){ell(s*13,14,4,7,M);ell(s*8,28,5.4,3.4,M)}
  ell(0,-10,13*K,12*K,gr(0,-10,13));ell(0,-4,8,6,Lt);
  for(const s of[-1,1]){poly([s*7,-18,s*(12+st*2),-30-st*3,s*13,-15],AC);ell(s*3.2,-3,1,1.2,D,0,false)}
  eyes(0,-13,5.4,3.2);mouth(0,0,2.4);
  if(st>=1)for(let i=-1;i<=1;i++)poly([i*4-2,-21,i*4,-27,i*4+2,-21],AC);
  if(st>=2)spiky(0,10,6,3,6,AC);
 }
 else if(tpl==='bell'){
  if(v==='frog'){
   ell(0,12,18*K,15*K,gr(0,12,18));ell(0,16,11,8,Lt,0,false);
   for(const s of[-1,1]){ell(s*17,22,7,4,M);ell(s*10,-8,6,6,gr(0,0,6));}
   ell(0,-2,16*K,12*K,gr(0,-2,16));
   for(const s of[-1,1]){ell(s*10,-12,5.4,5.4,'#fff');ell(s*10,-12,2.8,3.6,'#241a2e',0,false);ell(s*9,-13,.9,.9,'#fff',0,false)}
   ln([-9,0,0,4,9,0],D,1);ell(0,8,9,5,AC,0);ell(0,8,5,2.4,'#fff',0,false);
   blush(0,-2,12);
   if(st>=1){for(const s of[-1,1]){ell(s*20,6,4,4,AC);ell(s*20,6,2,2,Lt,0,false)}}
  }else{ // bell
   ln([0,-28,0,-22],D,1.2);ell(0,-29,3,3,AC);
   c.beginPath();c.moveTo(-18*K,18);c.bezierCurveTo(-20*K,-6,-12,-24,0,-24);c.bezierCurveTo(12,-24,20*K,-6,18*K,18);c.closePath();
   c.fillStyle=gr(0,-2,24);c.fill();c.strokeStyle=D;c.lineWidth=.8;c.stroke();
   ell(0,19,19*K,4.4,AC);ell(0,24,4,4,AC);
   eyes(0,-3,6.5,3.6);blush(0,3,11);mouth(0,4,2.6,true);shine(-9,-13,3.4,6);
   for(const s of[-1,1]){ell(s*21,6,4,6,M,s*.2);ln([s*24,-6,s*28,-10],AC,1.2);ln([s*25,2,s*30,0],AC,1.2)}
   if(st>=1){for(let i=0;i<3;i++)ell(-10+i*10,-30-(i%2)*2,1.8,1.8,AC)}
  }
 }
 else if(tpl==='scorp'){
  c.beginPath();c.moveTo(-14,22);c.bezierCurveTo(-30,10,-24,-28,2,-30);c.strokeStyle=M;c.lineWidth=7;c.stroke();c.strokeStyle=D;c.lineWidth=.6;c.stroke();
  poly([-2,-34,6,-32,2,-24],AC);
  for(const s of[-1,1]){ln([s*10,14,s*20,10],D,1.4);ln([s*11,18,s*21,20],D,1.4);ln([s*10,22,s*18,28],D,1.4);
   ln([s*8,2,s*20,-4],M,3.6);ell(s*23,-8,6,4.4,gr(0,0,6),s*.6);poly([s*21,-9,s*29,-12,s*25,-4],AC)}
  ell(0,14,14*K,13*K,gr(0,14,14));for(let i=0;i<3;i++)ln([-10,9+i*6,10,9+i*6],D,.6);
  ell(0,-2,11*K,10*K,gr(0,-2,11));eyes(0,-3,4.4,3);mouth(0,3,2);
  if(st>=1)orn(0,-12,1.1);
 }
 else if(tpl==='serpent'){
  c.beginPath();c.moveTo(18,26);c.bezierCurveTo(32,16,6,16,0,10);c.bezierCurveTo(-22,4,-18,22,-4,22);c.strokeStyle=M;c.lineWidth=9*K;c.stroke();c.strokeStyle=D;c.lineWidth=.9;c.stroke();
  c.beginPath();c.moveTo(18,26);c.bezierCurveTo(32,16,6,16,0,10);c.bezierCurveTo(-22,4,-18,22,-4,22);c.strokeStyle=Lt;c.lineWidth=2.6;c.setLineDash([3,3]);c.stroke();c.setLineDash([]);
  if(st>=1)for(const s of[-1,1])poly([s*8,-8,s*(25+st*2),-16,s*(22+st*2),-2,s*9,2],gr(s*14,-6,14,AC,AC,D));
  ell(0,-8,13*K,11*K,gr(0,-8,14));ell(0,-3,9,5,Lt);
  eyes(0,-10,5.4,3.2);for(const s of[-1,1])ell(s*3,-3,.9,.9,D,0,false);
  ln([0,0,0,6,-2,9,0,6,2,9],'#ff4a6a',1);
  if(st>=1)orn(0,-19,1.1);
 }
 c.restore();
}
/* ---- new species (original) ---- */
// [key,name,type,tpl,variant,stage,hp,atk,def,spd,flavor,habitat]
// habitat: [maps...] + time ('day'|'night'|'any') or null (not wild)
const NEWSP=[
 ['cub','קפיצון','norm','fox','cub',0,52,50,48,58,'גור מקפץ עם זנב פרוותי. הוא נולד בלי סוג מיוחד, וקורה משהו קסום כשהוא נוגע באבן התפתחות. כל אבן מוציאה ממנו צורה אחרת!',[['meadow-town','route-flower','lake-town'],'day']],
 ['cubF','להבזנב','fire','fox','lion',1,70,82,62,76,'הזנב שלו בוער בלהבה חמה ונעימה שלא שורפת חברים.',null],
 ['cubW','גלזנב','water','fox','cub',1,86,66,70,62,'הזנב שלו זורם כמו גל קטן. הוא אוהב לשחות עם החברים.',null],
 ['cubP','עלזנב','plant','fox','cub',1,76,64,78,60,'על הזנב שלו צומחים עלים ירוקים שמסתובבים אחרי השמש.',null],
 ['cubS','ברקזנב','spark','fox','cat',1,62,78,58,92,'כשהוא רץ, הזנב משאיר שביל ניצוצות צהוב.',null],
 ['cubI','כפרזנב','ice','fox','cat',1,74,70,76,70,'הזנב שלו עשוי מגבישי קרח נוצצים. הוא תמיד קריר למגע.',null],
 ['cubL','אורזנב','light','fox','cat',1,72,70,72,78,'הזנב שלו זוהר בלילה כמו פנס קטן שמראה את הדרך.',null],
 ['cubD','צלזנב','shadow','fox','cat',1,70,80,66,80,'הוא מתחבא בצללים וצלו נראה גדול ממנו. חבר נאמן ושקט.',null],

 ['hare','פתיתון','ice','hare','',0,48,48,44,66,'ארנבון שלג קטן שקשה לראות על השלג. אוזניו מזהות כל צעד.',[['route-frost','frost-village'],'day']],
 ['hare2','שלגרנב','ice','hare','',1,74,76,66,90,'רץ על הקרח בקלילות ונשאר ללא שריטה. אוזניו ארוכות במיוחד.',null],
 ['crys','גבישוש','ice','orb','crystal',0,50,54,56,46,'גביש חי קטן שמרחף בין הסלעים בכפור. הוא מצלצל כשהוא שמח.',[['route-frost','frost-village'],'night']],
 ['crys2','גבישאל','ice','orb','crystal',1,78,84,82,60,'כשגבישוש נוגע באבן הכפור, הוא גדל לקריסטל גדול ומבריק.',null],

 ['wbird','צופית','wind','bird','',0,44,46,42,70,'ציפור קטנה שנישאת על כל משב רוח. שרה כשהיא מרוצה.',[['route-storm','storm-city','route-flower'],'day']],
 ['wbird2','רוחית','wind','bird','',1,62,66,58,88,'כנפיה יוצרות רוח קטנה שמניעה עננים לאורך שבילי ההרים.',null],
 ['wbird3','סופית','wind','bird','',2,84,92,76,108,'ציפור הסופה. הכנפיים שלה מעיפות עננים ומשאירות שמיים נקיים.',null],
 ['ball','בלונון','wind','orb','balloon',0,60,40,50,52,'בלון חי ועגול. מרחף ברוח ומחייך לכל מי שעובר.',[['route-storm','lake-town','route-desert'],'day']],
 ['ball2','ענננון','wind','orb','balloon',1,92,58,78,60,'בלון ענק ורך. חברים קטנים נחים עליו כמו על ענן.',null],

 ['worm','זחלי','bug','insect','worm',0,46,40,48,40,'זחל ירוק ושמח שאוכל עלים כל היום. חולם יום אחד לעוף.',[['route-flower','meadow-town','route-forest'],'day']],
 ['cocoon','פקעון','bug','insect','cocoon',1,60,36,74,28,'עטוף בפקעת רכה. מבפנים כבר נשמעים נפנופי כנפיים קטנים.',null],
 ['moth','כנפרור','bug','insect','moth',2,72,78,62,84,'כנפיים גדולות ומנצנצות. אבקה נוצצת נופלת בכל נפנוף.',null],
 ['ant','נמלון','bug','insect','ant',0,52,56,50,50,'נמלה חזקה שסוחבת פי עשרים ממשקלה. אף פעם לא מוותרת.',[['hills','route-desert','forest-village'],'day']],
 ['ant2','נמלגל','bug','insect','ant',1,76,82,72,64,'המלכה של הנמלים. כתר קטן על ראשה והיא מנהיגה מצוינת.',null],

 ['gh','צללון','shadow','ghost','',0,46,50,40,62,'צל קטן ועליז שרודף אחרי הפנס של הלילה. אוהב משחקי מחבואים.',[['swamp','route-swamp','forest-village'],'night']],
 ['gh2','צלמון','shadow','ghost','',1,74,80,62,80,'עטוף בברדס כהה. מגן על ילדים שהולכים לאיבוד בערפל.',null],
 ['cat','חתצל','shadow','fox','cat',0,50,58,44,74,'חתול הצללים. עיניו זוהרות והוא נעלם כשמנסים ללטף אותו.',[['route-forest','forest-village','route-swamp'],'night']],
 ['cat2','פנתרצל','shadow','fox','cat',1,76,88,64,96,'פנתר חלק ושקט. קופץ בין הצללים בלי לעשות רעש.',null],

 ['star','זוהרון','light','orb','star',0,48,52,46,62,'כוכבון קטן שנפל מהשמיים. הוא זוהר חזק יותר כשהוא מחייך.',[['storm-city','route-storm','desert-town'],'night']],
 ['star2','כוכבית','light','orb','star',1,80,88,70,84,'כשזוהרון נוגע באבן השמש הוא הופך לכוכב מלא ומסנוור.',null],
 ['lion','שמשון','light','fox','lion',0,54,60,50,60,'גור אריות עם רעמה שזורחת כמו שקיעה.',[['route-desert','desert-town'],'day']],
 ['lion2','אריאור','light','fox','lion',1,84,90,74,76,'אריה אור. השאגה שלו מפזרת צללים ומרגיעה את כולם.',null],

 ['iron','ברזלון','metal','golem','',0,52,54,66,34,'גולם קטן מברזל. איטי אבל קשה מאוד לשבור.',[['hills','route-volcano','volcano-village'],'day']],
 ['iron2','ברזלן','metal','golem','',1,72,76,88,42,'שריון עבה ויציב. הוא שומר על הכפר במשך כל היום.',null],
 ['iron3','ברזלמוט','metal','golem','',2,92,98,108,50,'ענק ברזל. כשהוא צועד כל האדמה מרגישה את זה.',null],
 ['cog','גלגלון','metal','golem','cog',0,50,58,58,52,'גלגל שיניים חי שמסתובב בשמחה. תמיד עסוק בתיקונים.',[['storm-city','route-storm','desert-town'],'day']],
 ['cog2','מכונון','metal','golem','cog',1,78,86,80,68,'מכונה קטנה וחכמה. הגלגלים בתוכה מזמזמים שיר.',null],

 ['monk','אגרופי','fight','biped','monkey',0,50,60,44,64,'קוף קטן שמתאמן בכל בוקר. הכפות שלו קטנות אבל מהירות.',[['hills','route-volcano','route-forest'],'day']],
 ['monk2','אגרופן','fight','biped','monkey',1,72,84,62,82,'אמן אגרוף צעיר. הוא מכבד את כל מי שנלחם בהגינות.',null],
 ['monk3','מתאגרף','fight','biped','monkey',2,92,106,78,92,'אלוף אגרוף. הצעדים שלו קלים והאגרוף שלו נעצר רגע לפני.',null],
 ['roos','תרנגולון','fight','biped','rooster',0,54,62,50,56,'תרנגול גאה שקורא בבוקר. מאמן את הקול ואת האגרופים.',[['meadow-town','route-flower','route-desert'],'day']],
 ['roos2','לוחמוש','fight','biped','rooster',1,80,92,70,72,'לוחם הנוצות. יוצא לקרב רק כדי להגן על המשפחה שלו.',null],

 ['drk','דרקוני','dragon','drake','',0,56,58,52,52,'דרקון קטן וסקרן. מנפח עשן כשהוא נרגש, בלי אש.',[['route-storm','storm-city'],'night']],
 ['drk2','דרקונר','dragon','drake','',1,80,86,76,70,'כנפיים נפתחות. עף נמוך מעל ההרים ומסתכל על הנוף.',null],
 ['drk3','דרקונדור','dragon','drake','',2,100,108,96,86,'מלך הדרקונים. נדיר מאוד ורק מאמנים אמיצים פוגשים אותו.',null],

 ['bell','פעמונית','sound','bell','bell',0,50,44,52,56,'פעמון קטן שמצלצל כשהוא צוחק. הצליל מרגיע כל טלטל.',[['lake-town','meadow-town','route-flower'],'day']],
 ['bell2','פעמונצל','sound','bell','bell',1,80,70,78,64,'הצלצול שלו נשמע לכל הכפר. ילדים באים להקשיב.',null],
 ['frog','צפרדוף','sound','bell','frog',0,56,52,50,48,'צפרדע תופים. מתופפת על הבטן שלה בקצב מצחיק.',[['swamp','route-swamp','lake-town'],'any']],
 ['frog2','תופרדע','sound','bell','frog',1,86,78,74,60,'מתופפת על בטן גדולה ושרה. כל הביצה רוקדת איתה.',null],

 ['scor','עקרבון','venom','scorp','',0,50,56,50,54,'עקרב זעיר עם עוקץ ארסי חלש. מתבייש מכולם.',[['route-desert','desert-town','hills'],'night']],
 ['scor2','עקרבור','venom','scorp','',1,78,84,72,68,'צבע עמוק וצבתות חזקות. הוא שומר על המדבר בלילה.',null],
 ['snk','נחשוש','venom','serpent','',0,48,54,44,66,'נחש קטן וחמוד. הארס שלו חלש, רק מספיק לעשות עקצוץ.',[['swamp','route-swamp','forest-village'],'day']],
 ['snk2','צפעור','venom','serpent','',1,76,86,66,84,'צפע חכם עם ברדס רחב. תוקף רק כשמאיימים עליו.',null],
 ['fos1','קדמון','earth','golem','block',0,60,58,70,34,'טלטל עתיק שהתעורר ממאובן. מתפלא על העולם החדש.',null],
 ['fos1b','קדמונר','earth','golem','knight',1,84,82,92,46,'שומר קדום עם שריון סלע. נאמן עד הסוף.',null],
 ['fos2','עתיקון','earth','drake','',0,56,64,54,56,'זוחל עתיק עם גב מחוספס. אוהב להתחמם בשמש.',null],
 ['fos2b','עתיקדרק','earth','drake','',1,80,90,70,70,'הצורה המלאה של העתיקון. הצל שלו מכסה את כל החצר.',null],
];
// evolution wiring: key -> [targetKey, level]
const EVO={hare:['hare2',24],wbird:['wbird2',20],wbird2:['wbird3',36],ball:['ball2',30],worm:['cocoon',9],cocoon:['moth',20],ant:['ant2',26],
 gh:['gh2',25],cat:['cat2',30],lion:['lion2',32],iron:['iron2',24],iron2:['iron3',40],cog:['cog2',30],monk:['monk2',22],monk2:['monk3',38],
 roos:['roos2',30],drk:['drk2',30],drk2:['drk3',45],bell:['bell2',24],frog:['frog2',30],scor:['scor2',28],snk:['snk2',30],fos1:['fos1b',30],fos2:['fos2b',32]};
// stone evolution: key -> {stoneKey: targetKey}
const STONEEVO={cub:{flame:'cubF',wave:'cubW',leaf:'cubP',bolt:'cubS',frost:'cubI',sun:'cubL',moon:'cubD'},crys:{frost:'crys2'},star:{sun:'star2'}};
const STONES=[
 {k:'flame',n:'אבן להבה',i:'🔥',c:'#ff7a2f',cost:350},{k:'wave',n:'אבן גל',i:'💧',c:'#3aa0ff',cost:350},
 {k:'leaf',n:'אבן עלה',i:'🌿',c:'#4cc24a',cost:350},{k:'bolt',n:'אבן ברק',i:'⚡',c:'#ffd83a',cost:350},
 {k:'frost',n:'אבן כפור',i:'❄️',c:'#8fdcf5',cost:400},{k:'sun',n:'אבן שמש',i:'☀️',c:'#ffe27a',cost:400},
 {k:'moon',n:'אבן ירח',i:'🌙',c:'#8a74c9',cost:400}];
/* ---- game integration ---- */
function TL63main(K){
 const {f,H,o,r,c,d,qn,Sn,$n,y,ua,Ct}=K;
 const $q=s=>document.querySelector(s);
 const MU=K.Y; // sfx
 const F0=()=>K.F;
 // ===== CSS =====
 const css=document.createElement('style');css.textContent=`
 #tlov{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:3}
 #hud .bt.tl{font-size:16px}
 .tlpop{position:absolute;z-index:12;pointer-events:none;font:900 22px system-ui,Arial;color:#fff;text-shadow:0 2px 0 #000,0 0 6px #000;animation:tlpop 1s ease-out forwards;white-space:nowrap;transform:translate(-50%,-50%)}
 .tlpop.crit{font-size:30px;color:#ffe14a}.tlpop.weak{color:#c8d0d8;font-size:18px}.tlpop.sup{color:#ff6a4a}
 .tlpop small{display:block;font-size:12px;font-weight:800;text-align:center}
 @keyframes tlpop{0%{opacity:0;transform:translate(-50%,-30%) scale(.6)}15%{opacity:1;transform:translate(-50%,-70%) scale(1.25)}100%{opacity:0;transform:translate(-50%,-190%) scale(1)}}
 .tlcard{background:linear-gradient(135deg,#2b5a8a,#1b2f56 55%,#3a2a6a);border:3px solid #ffe27a;border-radius:16px;padding:12px;text-align:right;box-shadow:0 0 18px #ffe27a55 inset}
 .tlcard h3{margin:0 0 6px;font-size:20px;color:#ffe27a}
 .tlbadges{display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin:8px 0}
 .tlb{background:#0004;border:2px solid #ffffff33;border-radius:12px;padding:6px 2px;text-align:center;font-size:11px}
 .tlb.on{background:linear-gradient(#ffe27a,#ffb347);color:#3a2200;border-color:#fff}
 .tlb i{display:block;font-style:normal;font-size:24px;filter:grayscale(1) opacity(.5)}.tlb.on i{filter:none}
 .tlhof{background:#ffffff14;border-radius:12px;padding:8px;margin:6px 0}
 .tlhof .team{display:flex;justify-content:center;flex-wrap:wrap}.tlhof canvas{width:48px;height:48px}
 .tlrow{display:flex;align-items:center;gap:8px;background:#ffffff14;border-radius:12px;padding:8px;margin:5px 0;text-align:right}
 .tlrow>div{flex:1}.tlrow .btn{min-height:40px;padding:6px 10px;font-size:14px}
 .tlin{width:100%;padding:10px;border-radius:10px;border:2px solid #fff6;background:#0006;color:#fff;font-size:17px;text-align:right;-webkit-user-select:text;user-select:text}
 `;document.head.appendChild(css);
 const esc=s=>String(s).replace(/[&<>"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m]));
 // ===== types =====
 const NEWT={ice:['קרח','#8fdcf5'],wind:['רוח','#9fe3c4'],bug:['חרק','#b4d94a'],shadow:['צל','#8a74c9'],light:['אור','#ffe27a'],metal:['ברזל','#b4bfd0'],fight:['לוחם','#e0745a'],dragon:['דרקון','#7a7af0'],sound:['צליל','#ff9ad0'],venom:['ארס','#b46ad8']};
 for(const k in NEWT){o[k]={n:NEWT[k][0],c:NEWT[k][1]};r[k]=r[k]||{}}
 const STR={fire:'plant ice bug metal',water:'fire earth',plant:'water earth',spark:'water wind',earth:'spark fire metal venom',norm:'',
  ice:'plant earth wind dragon',wind:'plant bug fight',bug:'plant shadow sound',shadow:'light shadow sound',light:'shadow venom ice bug',metal:'ice bug sound',
  fight:'norm ice metal shadow',dragon:'dragon wind sound',sound:'fight earth venom',venom:'plant bug sound'};
 const RES={fire:'dragon',water:'dragon',plant:'wind bug venom metal',spark:'dragon',earth:'bug wind',norm:'metal shadow',
  ice:'fire water ice metal',wind:'spark metal',bug:'fire wind fight metal venom',shadow:'norm metal',light:'light metal',metal:'fire water spark metal',
  fight:'wind bug sound venom',dragon:'metal light',sound:'metal sound',venom:'earth venom metal'};
 const isNew=t=>!!NEWT[t];
 const allT=Object.keys(STR);
 for(const a of allT)for(const dfn of allT){ if(!isNew(a)&&!isNew(dfn))continue; // keep old-old pairs untouched
   r[a]=r[a]||{}; if((STR[a]||'').split(' ').includes(dfn))r[a][dfn]=2; else if((RES[a]||'').split(' ').includes(dfn))r[a][dfn]=.5; }
 window.__TLX=Object.keys(NEWT);
 const MV={ice:['רסיס קרח','סופת שלג'],wind:['משב רוח','טורנדו'],bug:['עקיצה קטנה','נחיל זנבות'],shadow:['צל חולף','לילה אפל'],light:['קרן אור','התפרצות אור'],metal:['מכת פלדה','פטיש ברזל'],fight:['אגרוף מהיר','אגרוף על'],dragon:['נשיפת דרקון','זעם הדרקון'],sound:['צליל חד','גל קול'],venom:['עקיצה ארסית','ענן ארס']};
 for(const k in MV){c[k+'1']={n:MV[k][0],t:k,p:44,a:100};c[k+'2']={n:MV[k][1],t:k,p:80,a:90}}
 // ===== species =====
 const base0=f.length,KEY={},KI=[];
 NEWSP.forEach((s,i)=>{KEY[s[0]]=base0+i;KI[base0+i]=s[0]});
 const ZONE={};for(const m in ua)ZONE[m]=ua[m].zone;
 const SPAWN=[];
 NEWSP.forEach((s,i)=>{const idx=base0+i,st=s[5];
  const e={n:s[1],t:s[2],b:[s[6],s[7],s[8],s[9]],cr:st===0?.62:st===1?.32:.18,xp:st===0?60:st===1?118:170,f:s[10],h:'A'};
  if(s[11]){const z=[...new Set(s[11][0].map(m=>ZONE[m]))];e.h=z.join(', ')}
  f.push(e);
 });
 NEWSP.forEach((s,i)=>{const idx=base0+i,e=f[idx],ev=EVO[s[0]];
  if(ev){e.evo=KEY[ev[0]];e.at=ev[1];y[idx]=e.evo;f[KEY[ev[0]]].base=idx;$n[KEY[ev[0]]]='התפתחות של '+s[1]+' ברמה '+ev[1]}
  if(STONEEVO[s[0]]){e.stone=STONEEVO[s[0]];for(const sk in e.stone){const tg=KEY[e.stone[sk]];f[tg].base=idx;const st=STONES.find(q=>q.k===sk);$n[tg]='מתפתח מ'+s[1]+' בעזרת '+st.n+' '+st.i}}
  if(s[11]){const tm=s[11][1];$n[idx]='בשטח: '+s[11][0].join(', ')+(tm==='day'?' · יום במשחק':tm==='night'?' · לילה במשחק':' · כל היום');SPAWN.push({sp:idx,maps:s[11][0],time:tm})}
 });
 // sprites
 NEWSP.forEach((s,i)=>{const idx=base0+i,cv=document.createElement('canvas');cv.width=cv.height=192;const g=cv.getContext('2d');
  g.translate(96,98);const k=s[5]?2.4:2.05;g.scale(k,k);drawCreature(g,{tpl:s[3],v:s[4],st:s[5],t:s[2]});
  H[idx]=(ctx,ph)=>{const q=.8*Math.sin(2.5*(ph||0)+idx);ctx.drawImage(cv,-38.4,-39.2+q,76.8,76.8)}});
 // ===== wild spawn wrapper =====
 const bn0=K.getBn();
 K.setBn(async function(t,e){
  try{ if(t==null&&!K.an().wild&&Math.random()<.22){
    const night=K.m(),cand=SPAWN.filter(q=>q.maps.includes(K.en)&&(q.time==='any'||q.time===(night?'night':'day')));
    if(cand.length){const q=cand[Math.floor(Math.random()*cand.length)],zn=K.nn(),dz=d[zn];
     const lv=F0().party.map(p=>p.lv).filter(v=>Number.isFinite(v)&&v>=1);let rng=dz.lv.slice();
     if(lv.length){const avg=lv.reduce((p,q2)=>p+q2,0)/lv.length,l2=Math.round((avg+Math.max(...lv))/2),bonus={A:1,B:1,E:2,C:2,D:3,F:3,G:3,H:2,I:4}[zn]||1,top=Math.min(dz.lv[1],l2+bonus);rng=[Math.max(1,Math.min(dz.lv[0],top-2)),top]}
     return bn0(q.sp,rng)}}}catch(err){console.error(err)}
  return bn0(t,e)});
 // ===== damage popups =====
 window.__TLpop=function(playerHit,dd){try{const stage=$q('#stage');if(!stage||F0().popOff)return;
  const pos=playerHit?{x:240,y:90}:{x:104,y:190},h=(Ct.height/2)||288;
  const el=document.createElement('div');el.className='tlpop'+(dd.crit?' crit':dd.eff>1?' sup':dd.eff<1?' weak':'');
  el.style.left=(pos.x/352*100)+'%';el.style.top=(pos.y/h*100)+'%';
  el.innerHTML=(dd.crit?'💥 ':'')+'-'+dd.dmg+(dd.crit?'<small>קריטי!</small>':dd.eff>1?'<small>סופר יעיל!</small>':dd.eff<1?'<small>חלש</small>':'');
  stage.appendChild(el);setTimeout(()=>el.remove(),1100)}catch(e){}};
 // ===== companion + weather overlay =====
 const ov=document.createElement('canvas');ov.id='tlov';$q('#stage').insertBefore(ov,$q('#hud'));
 const WX=[['auto','🌤','אוטומטי - לפי שעון המשחק'],['sunset','🌇','שקיעה'],['night','🌙','לילה כוכבים'],['rain','🌧','גשם'],['snow','❄️','שלג'],['storm','⛈','סופת רעמים'],['fog','🌫','ערפל']];
 let trail=[],comp={x:0,y:0,init:false},lastMap='',heartT=0,lastMoveT=0,flash=0,nextFlash=0;
 const drops=Array.from({length:70},(_,i)=>({x:Math.random()*352,y:Math.random()*288,s:.6+Math.random()*.8})),flakes=Array.from({length:50},(_,i)=>({x:Math.random()*352,y:Math.random()*288,s:.3+Math.random()*.7,p:Math.random()*6}));
 const shinyCv={};
 function ovLoop(ts){
  requestAnimationFrame(ovLoop);
  try{
   const F=K.F,cx=ov.getContext('2d'),W=Ct.width,Hh=Ct.height;
   if(ov.width!==W||ov.height!==Hh){ov.width=W;ov.height=Hh}
   cx.setTransform(1,0,0,1,0,0);cx.clearRect(0,0,W,Hh);
   if(!F||K.Et!=='map')return;
   const Z=K.Z,Rt=K.Rt;let n=Rt.px*Z+16-176,s=Rt.py*Z+16-(K.tt*Z)/2;
   n=Math.round(2*K.l(n,0,K.dt*Z-352))/2;s=Math.round(2*K.l(s,0,K.ft*Z-K.tt*Z))/2;
   const indoor=!!K.an().indoor;
   // companion trail
   if(K.en!==lastMap){lastMap=K.en;trail=[];comp.init=false}
   const lt=trail[trail.length-1];
   if(!lt||Math.hypot(lt.x-Rt.px,lt.y-Rt.py)>.12){ if(lt&&Math.hypot(lt.x-Rt.px,lt.y-Rt.py)>3){trail=[];comp.init=false} trail.push({x:Rt.px,y:Rt.py});lastMoveT=ts; if(trail.length>80)trail.shift()}
   const dist=1.3;let tx,ty;
   {const dv={up:[0,1],down:[0,-1],left:[1,0],right:[-1,0]}[Rt.dir]||[0,1];let px=Rt.px,py=Rt.py,acc=0,found=false;
    for(let i=trail.length-1;i>=0;i--){const q=trail[i],sg=Math.hypot(px-q.x,py-q.y);if(acc+sg>=dist){const k=(dist-acc)/(sg||1);tx=px+(q.x-px)*k;ty=py+(q.y-py)*k;found=true;break}acc+=sg;px=q.x;py=q.y}
    if(!found){const rem=dist-acc;tx=px+dv[0]*rem;ty=py+dv[1]*rem}}
   if(!comp.init){comp.x=tx;comp.y=ty;comp.init=true}else{comp.x+=(tx-comp.x)*.35;comp.y+=(ty-comp.y)*.35}
   cx.setTransform(2,0,0,2,0,0);
   const lead=F.party&&F.party.find(p=>p.hp>0);
   if(lead&&F.follow!==false&&!(K.an().indoor&&0)){
    const moving=ts-lastMoveT<250,bob=moving?Math.abs(Math.sin(ts/110))*2.5:Math.sin(ts/500)*.8;
    const X=comp.x*Z-n+16,Y=comp.y*Z-s+22-bob;
    cx.fillStyle='rgba(0,0,0,.22)';cx.beginPath();cx.ellipse(X,Y+7,9,3.2,0,0,6.3);cx.fill();
    K.z(cx,lead,X,Y,24,ts/1000);
    if(!moving&&ts-lastMoveT>5000){heartT=(heartT+1);const ph=(ts%3000)/3000;cx.globalAlpha=1-ph;cx.font='12px system-ui';cx.textAlign='center';cx.fillText('❤️',X+8,Y-16-ph*10);cx.globalAlpha=1}
   }
   // weather
   const mode=F.wx||'auto';
   if(mode!=='auto'&&!indoor){
    const w=352,h=Hh/2,t=ts/1000;
    if(mode==='sunset'){const g=cx.createLinearGradient(0,0,0,h);g.addColorStop(0,'rgba(255,90,60,.28)');g.addColorStop(.6,'rgba(255,150,60,.2)');g.addColorStop(1,'rgba(120,40,90,.28)');cx.fillStyle=g;cx.fillRect(0,0,w,h);cx.fillStyle='rgba(255,220,120,.9)';cx.beginPath();cx.arc(300,28,10,0,6.3);cx.fill()}
    else if(mode==='night'){cx.fillStyle='rgba(8,18,70,'+(K.m()?.12:.42)+')';cx.fillRect(0,0,w,h);for(let i=0;i<22;i++){cx.globalAlpha=.4+.6*Math.abs(Math.sin(t*1.3+i));cx.fillStyle='#fff';cx.fillRect((97*i+21)%w,(61*i+17)%h,1.3,1.3)}cx.globalAlpha=1;cx.fillStyle='#fff3b5';cx.beginPath();cx.arc(318,26,8,0,6.3);cx.fill();cx.fillStyle='rgba(8,18,70,.9)';cx.beginPath();cx.arc(322,23,7,0,6.3);cx.fill()}
    else if(mode==='rain'||mode==='storm'){const st=mode==='storm';cx.fillStyle='rgba(30,45,70,'+(st?.35:.2)+')';cx.fillRect(0,0,w,h);cx.strokeStyle='rgba(190,215,255,.7)';cx.lineWidth=1;cx.beginPath();
      for(const dp of drops){dp.y+=dp.s*(st?7:5);dp.x-=dp.s*(st?2.4:1.4);if(dp.y>h){dp.y=-10;dp.x=Math.random()*(w+40)}if(dp.x<-10)dp.x=w;cx.moveTo(dp.x,dp.y);cx.lineTo(dp.x+(st?3:2),dp.y-(st?10:7))}cx.stroke();
      if(st){if(ts>nextFlash){flash=1;nextFlash=ts+4000+Math.random()*6000}if(flash>0){cx.fillStyle='rgba(255,255,255,'+flash*.55+')';cx.fillRect(0,0,w,h);flash-=.06}}}
    else if(mode==='snow'){cx.fillStyle='rgba(200,225,255,.1)';cx.fillRect(0,0,w,h);cx.fillStyle='#fff';for(const fl of flakes){fl.y+=fl.s*1.1;fl.x+=Math.sin(t+fl.p)*.4;if(fl.y>h){fl.y=-4;fl.x=Math.random()*w}cx.beginPath();cx.arc(fl.x,fl.y,1+fl.s*1.2,0,6.3);cx.fill()}}
    else if(mode==='fog'){for(let i=0;i<4;i++){const g=cx.createLinearGradient(0,0,w,0),off=((t*8*(1+i*.3))%w);cx.save();cx.translate(off-w/2,0);g.addColorStop(0,'rgba(235,240,245,0)');g.addColorStop(.5,'rgba(235,240,245,.28)');g.addColorStop(1,'rgba(235,240,245,0)');cx.fillStyle=g;cx.fillRect(0,i*h/4,w*1.5,h/3);cx.restore()}cx.fillStyle='rgba(220,228,235,.12)';cx.fillRect(0,0,w,h)}
   }
  }catch(e){if(!window.__ovE){window.__ovE=1;console.error('TLov',e&&e.message)}}
 }
 requestAnimationFrame(ovLoop);
 // ===== HUD buttons =====
 const mb=$q('#bmute'),mus=document.createElement('button'),wxb=document.createElement('button');
 mus.className='bt tl';wxb.className='bt tl';mus.id='tlmus';wxb.id='tlwx';
 mb.parentNode.insertBefore(wxb,mb);mb.parentNode.insertBefore(mus,mb);
 const upd=()=>{const F=K.F||{};mus.textContent=F.music===false?'🔇':'🎵';wxb.textContent=(WX.find(w=>w[0]===(F.wx||'auto'))||WX[0])[1]};
 mus.onclick=()=>{const F=K.F;F.music=F.music===false;upd();K._();K.Bt(F.music===false?'🎵 מוזיקה כבויה':'🎵 מוזיקה פועלת',1600);if(window.TLMusic)window.TLMusic.kick()};
 wxb.onclick=()=>{const F=K.F,i=WX.findIndex(w=>w[0]===(F.wx||'auto'));const nx=WX[(i+1)%WX.length];F.wx=nx[0];upd();K._();K.Bt(nx[1]+' מזג אוויר: '+nx[2],1800)};
 setInterval(upd,1500);upd();
 window.TLK=K; window.TLX={KEY,KI,base0,STONES,STONEEVO,SPAWN,WX,esc,upd};
 // ===== extras =====
 if(window.TL63_extras)window.TL63_extras(K,window.TLX);
}
/* ---- extras: menu, shop, stones, trainer card, saves, guide ---- */
window.TL63_extras=function(K,X){
 const {f,H}=K,{KEY,KI,STONES,STONEEVO,esc}=X;
 const $q=s=>document.querySelector(s);
 const stones=()=>{const F=K.F;F.stones=F.stones||{};return F.stones};
 const Ie=(h,cb)=>K.Ie(h,cb);
 const closeM=()=>{K.He();K.Et='map'};
 // ---- stone store ----
 function openStore(){
  const F=K.F,st=stones();
  Ie(`<h2>💎 חנות אבני התפתחות</h2><div class="flav">אבן מתפתחת נוגעת בטלטל מתאים, והוא מתפתח מיד לצורה חדשה - בלי לחכות לרמה! 🪙 ${F.coins} מטבעות</div>`+
   STONES.map(s=>`<div class="tlrow"><span style="font-size:30px">${s.i}</span><div><b>${s.n}</b><br><small>${stoneWho(s.k)}<br>בתיק: ${st[s.k]||0}</small></div><button class="btn" data-s="${s.k}" ${F.coins<s.cost?'disabled':''}>${s.cost} 🪙</button></div>`).join('')+
   `<button class="btn sec" id="tlsx" style="width:100%;margin-top:8px">סגור</button>`,
   m=>{m.querySelector('#tlsx').onclick=closeM;
    m.querySelectorAll('[data-s]').forEach(b=>b.onclick=()=>{const s=STONES.find(q=>q.k===b.dataset.s);if(F.coins<s.cost)return;F.coins-=s.cost;st[s.k]=(st[s.k]||0)+1;K.Y('buy');K.ie();K._();openStore()})});
 }
 function stoneWho(k){const out=[];for(const key in STONEEVO){const tg=STONEEVO[key][k];if(tg)out.push(f[KEY[key]].n+' ← '+f[KEY[tg]].n)}return out.join(' · ')||''}
 // inject into shops
 const mbox=$q('#mbox');
 new MutationObserver(()=>{
  if(!mbox.querySelector('#s3,#h3')||mbox.querySelector('#tlshop'))return;
  const cl=mbox.querySelector('#sc,#h4');if(!cl)return;
  const b=document.createElement('button');b.className='btn grn';b.id='tlshop';b.innerHTML='💎 אבני התפתחות<small>אבן אחת והטלטל מתפתח מיד · חדש!</small>';
  b.onclick=openStore;cl.parentNode.insertBefore(b,cl)}).observe(mbox,{childList:true,subtree:false});
 // ---- stone use from monster card ----
 const Ne0=K.getNe();
 K.setNe(function(t){Ne0(t);try{
  const key=KI[t.sp];if(!key||!STONEEVO[key])return;
  const st=stones(),opts=Object.keys(STONEEVO[key]).filter(k=>st[k]>0);
  const b=document.createElement('button');b.className='btn grn';
  b.innerHTML='💎 אבן התפתחות<small>'+(opts.length?'יש לכם '+opts.map(k=>STONES.find(s=>s.k===k).i+'×'+st[k]).join(' '):'אין אבנים - קונים במכולת')+'</small>';
  b.onclick=()=>stonePick(t,key);
  const mb=$q('#mbox'),cl=mb.querySelector('#d3');(cl?cl.parentNode:mb).insertBefore(b,cl||null)}catch(e){console.error(e)}});
 function stonePick(t,key){
  const st=stones();
  Ie(`<h2>💎 אבן התפתחות</h2><div class="flav">בחרו אבן עבור ${esc(K.Yt(t))}. כל אבן מפתחת אותו לצורה אחרת!</div>`+
   Object.keys(STONEEVO[key]).map(k=>{const s=STONES.find(q=>q.k===k),tg=f[KEY[STONEEVO[key][k]]];return `<button class="btn ${st[k]>0?'':'sec'}" data-k="${k}" ${st[k]>0?'':'disabled'} style="width:100%;margin:5px 0">${s.i} ${s.n} ← ${tg.n} ${K.E(tg.t)}<small>בתיק: ${st[k]||0}</small></button>`}).join('')+
   `<button class="btn sec" id="tlsc" style="width:100%;margin-top:6px">ביטול</button>`,
   m=>{m.querySelector('#tlsc').onclick=()=>{K.He();K.Ne(t)};
    m.querySelectorAll('[data-k]').forEach(b=>b.onclick=()=>stoneEvolve(t,key,b.dataset.k))});
 }
 async function stoneEvolve(t,key,k){
  const st=stones();if(!(st[k]>0))return;const tg=KEY[STONEEVO[key][k]];K.He();
  const stage=$q('#stage'),ovl=document.createElement('div');
  ovl.style.cssText='position:absolute;inset:0;z-index:16;background:radial-gradient(circle,#53768a,#141c3dee);display:flex;flex-direction:column;align-items:center;justify-content:center;color:#fff';
  const sp0=K.L(t,90);ovl.appendChild(sp0);const h2=document.createElement('h2');h2.textContent='✨ האבן זוהרת! ✨';ovl.appendChild(h2);stage.appendChild(ovl);K.Y('lvl');
  const t0=performance.now();await new Promise(res=>{const tick=()=>{const p=Math.min(1,(performance.now()-t0)/1600);sp0.style.transform='scale('+(1+.12*Math.sin(16*p))+') rotate('+7*Math.sin(10*p)+'deg)';sp0.style.filter='brightness('+(1+3*Math.sin(p*Math.PI))+')';p<1?requestAnimationFrame(tick):res()};tick()});
  const old=K.x(t),was=f[t.sp].n;st[k]--;t.sp=tg;t.hp=Math.min(K.x(t),t.hp+K.x(t)-old);K.F.seen[tg]=1;K.F.caught[tg]=1;
  sp0.replaceWith(K.L(t,100));h2.textContent=f[tg].n;K.Y('ok');K._();await K.i(1400);ovl.remove();
  K.Et='map';K.ie();K.Ie(`<h2>✨ התפתחות!</h2><p>${was} התפתח ל${f[tg].n}!</p><button class="btn grn" id="tlok" style="width:100%">יש!</button>`,m=>m.querySelector('#tlok').onclick=closeM);
 }
 // ---- trainer card + hall of fame ----
 const GYMS=[['gym1','🌿','עלים'],['gym2','🌊','גלים'],['gym3','❄️','כפור'],['gymE','🐸','ביצה'],['gymH','🌫️','ערפל'],['gymF','🔥','להבה'],['gymG','🏜️','חול'],['gymI','⚡','סערה']];
 const TITLES=['מאמן מתחיל','מאמן צעיר','מאמן מנוסה','מאמן בכיר','מומחה היכלים','אלוף צעיר','אלוף היכלות','אגדת הטלטלים','אלוף העולם'];
 const bcount=F=>GYMS.filter(g=>F.defeated&&F.defeated[g[0]]).length;
 function recordHof(){const F=K.F;if(!F||!F.started||!F.party||!F.party.length)return;F.hof=F.hof||[];
  for(const id of['champion','champion2']){if(F.defeated&&F.defeated[id]&&!F.hof.some(h=>h.id===id)){F.hof.push({id,ts:Date.now(),title:id==='champion'?'אלוף היכל הזוהר':'אלוף היכל הסופה',team:F.party.slice(0,6).map(p=>({sp:p.sp,lv:p.lv,shiny:!!p.shiny,nick:p.nick||''}))});K._();K.Bt('🏆 נכנסתם להיכל התהילה!',3500)}}}
 setInterval(recordHof,2000);
 function trainerCard(){
  const F=K.F,nm=K.D()?.name||'מאמן',bc=bcount(F),cau=Object.keys(F.caught||{}).length,seen=Object.keys(F.seen||{}).length,tot=f.length;
  const types=new Set(K.F.party.concat(F.box||[]).map(p=>f[p.sp].t)).size,hr=Math.floor((F.clock||0)/3600),mn=Math.floor((F.clock||0)/60)%60;
  const title=TITLES[Math.min(TITLES.length-1,bc+(F.defeated&&F.defeated.champion?1:0)+(F.defeated&&F.defeated.champion2?1:0))];
  const hof=(F.hof||[]);
  Ie(`<h2>🪪 כרטיס מאמן והיכל התהילה</h2><div class="tlcard"><h3>${esc(nm)}</h3><div style="font-size:14px">🎖 דרגה: <b>${title}</b></div>
   <div style="font-size:13px;margin-top:6px;line-height:1.6">📖 נתפסו ${cau}/${tot} · נראו ${seen}<br>🌈 סוגים באוסף: ${types}/16 · ✨ בוהקים: ${F.shinyCaught||0}<br>🪙 ${F.coins} מטבעות · ⏱ זמן משחק: ${hr?hr+' שעות ו־':''}${mn} דקות</div>
   <div class="tlbadges">${GYMS.map(g=>`<div class="tlb ${F.defeated&&F.defeated[g[0]]?'on':''}"><i>${g[1]}</i>${g[2]}</div>`).join('')}</div>
   <div style="font-size:13px">👑 אלופים: ${F.defeated&&F.defeated.champion?'✅ הזוהר':'⬜ הזוהר'} · ${F.defeated&&F.defeated.champion2?'✅ הסופה':'⬜ הסופה'}</div></div>
   <h3 style="margin:12px 0 4px">🏆 היכל התהילה</h3>`+(hof.length?hof.map(h=>`<div class="tlhof"><b>${esc(h.title)}</b><br><small>${new Date(h.ts).toLocaleDateString('he-IL')}</small><div class="team" data-h="${h.id}"></div></div>`).join(''):'<div class="flav">עדיין ריק. נצחו את אלוף אצטדיון הזוהר או את אלוף הסופה והצוות שלכם יירשם כאן לתמיד!</div>')+
   `<button class="btn sec" id="tlcx" style="width:100%;margin-top:8px">סגור</button>`,
   m=>{m.querySelector('#tlcx').onclick=()=>{K.He();K.Et='map'};
    hof.forEach(h=>{const tm=m.querySelector('[data-h="'+h.id+'"]');h.team.forEach(p=>{const cv=K.W(p.sp,24,false);cv.title=f[p.sp].n+' רמה '+p.lv;tm.appendChild(cv)})})});
 }
 // ---- named save slots ----
 const SK='tl63_slots_v1';
 const slots=()=>{try{return JSON.parse(localStorage.getItem(SK))||{}}catch(e){return{}}};
 const saveSlots=o=>{try{localStorage.setItem(SK,JSON.stringify(o));return true}catch(e){K.Bt('אין מקום לשמירה נוספת במכשיר',3500);return false}};
 const pid=()=>K.N.active;
 const summ=F=>`${(F.party||[]).length} בצוות · ${Object.keys(F.caught||{}).length} נתפסו · ${bcount(F)} תגים · ${F.coins||0} 🪙`;
 function snapshot(name,auto){const s=slots(),p=pid();s[p]=s[p]||[];const F=K.F;K._();const rec={id:auto?'auto':'s'+Date.now(),name,ts:Date.now(),sum:summ(F),state:JSON.stringify(F),auto:!!auto};
  if(auto){const i=s[p].findIndex(q=>q.auto);if(i>=0)s[p][i]=rec;else s[p].unshift(rec)}else s[p].push(rec);return saveSlots(s)}
 setInterval(()=>{try{const F=K.F;if(F&&F.started&&K.Et==='map')snapshot('גיבוי אוטומטי',true)}catch(e){}},180000);
 function savesUI(){
  const s=slots()[pid()]||[],man=s.filter(q=>!q.auto);
  Ie(`<h2>💾 שמירות בשם</h2><div class="flav">שומרים את ההרפתקה בשם שאתם בוחרים, וחוזרים אליה בכל רגע. עד 6 שמירות לכל שחקן. יש גם גיבוי אוטומטי כל 3 דקות.</div>
   <input class="tlin" id="tlnm" maxlength="20" placeholder="שם לשמירה, למשל: לפני האלוף">
   <button class="btn grn" id="tlsv" style="width:100%;margin:8px 0" ${man.length>=6?'disabled':''}>💾 שמרו עכשיו</button>`+
   s.map(q=>`<div class="tlrow"><div><b>${esc(q.name)}</b><br><small>${new Date(q.ts).toLocaleString('he-IL')}<br>${q.sum}</small></div><button class="btn" data-l="${q.id}">טעינה</button>${q.auto?'':`<button class="btn red" data-d="${q.id}">🗑</button>`}</div>`).join('')+
   `<button class="btn sec" id="tlsx2" style="width:100%;margin-top:8px">סגור</button>`,
   m=>{m.querySelector('#tlsx2').onclick=()=>{K.He();K.Et='map'};
    m.querySelector('#tlsv').onclick=()=>{const nm=(m.querySelector('#tlnm').value||'').trim()||'שמירה '+(man.length+1);if(snapshot(nm)){K.Y('ok');K.Bt('💾 נשמר: '+nm,2200);savesUI()}};
    m.querySelectorAll('[data-d]').forEach(b=>b.onclick=()=>{Ie(`<h2>למחוק את השמירה?</h2><p>השמירה תימחק לתמיד. ההרפתקה הנוכחית לא תושפע.</p><button class="btn red" id="y1" style="width:100%">כן, למחוק</button><button class="btn sec" id="n1" style="width:100%;margin-top:8px">לא</button>`,mm=>{mm.querySelector('#n1').onclick=savesUI;mm.querySelector('#y1').onclick=()=>{const all=slots();all[pid()]=(all[pid()]||[]).filter(q=>q.id!==b.dataset.d);saveSlots(all);savesUI()}})});
    m.querySelectorAll('[data-l]').forEach(b=>b.onclick=()=>{const q=s.find(z=>z.id===b.dataset.l);Ie(`<h2>לטעון את "${esc(q.name)}"?</h2><p>ההרפתקה הנוכחית תוחלף בשמירה הזו. כדי לא לאבד אותה, שמרו אותה קודם בשם. (הטעינה מפעילה את המשחק מחדש.)</p><button class="btn grn" id="y2" style="width:100%">כן, לטעון</button><button class="btn sec" id="n2" style="width:100%;margin-top:8px">לא</button>`,mm=>{mm.querySelector('#n2').onclick=savesUI;mm.querySelector('#y2').onclick=()=>restore(q)})})});
 }
 function restore(q){try{
  snapshot('לפני טעינה ('+q.name+')',false);
  window.__TLfreeze=true;const raw=JSON.parse(localStorage.getItem(K.B));const pl=raw.players.find(p=>p.id===raw.active);pl.state=JSON.parse(q.state);localStorage.setItem(K.B,JSON.stringify(raw));location.reload()}catch(e){window.__TLfreeze=false;K.Bt('הטעינה נכשלה, ההרפתקה הנוכחית שלמה',4000)}}
 const _0=K.get_();K.set_(function(){if(window.__TLfreeze)return;return _0()});
 // ---- settings + whats new ----
 function settings(){
  const F=K.F;
  Ie(`<h2>⚙️ מוזיקה, חבר ומזג אוויר</h2>
   <button class="btn" id="o1" style="width:100%;margin:5px 0">🎵 מוזיקת רקע: ${F.music===false?'כבויה':'פועלת'}</button>
   <button class="btn" id="o2" style="width:100%;margin:5px 0">🐾 הטלטל המוביל הולך אחריכם: ${F.follow===false?'כבוי':'פועל'}</button>
   <button class="btn" id="o3" style="width:100%;margin:5px 0">💥 מספרי נזק בקרב: ${F.popOff?'כבויים':'פועלים'}</button>
   <button class="btn" id="o4" style="width:100%;margin:5px 0">${(X.WX.find(w=>w[0]===(F.wx||'auto'))||X.WX[0])[1]} מזג אוויר: ${(X.WX.find(w=>w[0]===(F.wx||'auto'))||X.WX[0])[2]}<small>מחליפים גם עם הכפתור בראש המסך</small></button>
   <button class="btn sec" id="o9" style="width:100%;margin-top:8px">סגור</button>`,
   m=>{const re=()=>{K._();X.upd();settings()};
    m.querySelector('#o1').onclick=()=>{F.music=F.music===false;re();if(window.TLMusic)window.TLMusic.kick()};
    m.querySelector('#o2').onclick=()=>{F.follow=F.follow===false;re()};
    m.querySelector('#o3').onclick=()=>{F.popOff=!F.popOff;re()};
    m.querySelector('#o4').onclick=()=>{const i=X.WX.findIndex(w=>w[0]===(F.wx||'auto'));F.wx=X.WX[(i+1)%X.WX.length][0];re()};
    m.querySelector('#o9').onclick=()=>{K.He();K.Et='map'}});
 }
 function whatsNew(first){
  const F=K.F;F.seen63=1;K._();
  const gift=!F.gift63;
  Ie(`<h2>🆕 גרסה 6.3 - הכל חדש!</h2><div style="text-align:right;font-size:14px;line-height:1.55">
  <p>🦊 <b>${f.length} טלטלים!</b> נוספו ${f.length-X.base0} חדשים בעיצוב חדש לגמרי, וגם <b>10 סוגים חדשים</b>: קרח, רוח, חרק, צל, אור, ברזל, לוחם, דרקון, צליל וארס. בסך הכל 16 סוגים! טבלת הסוגים המלאה בתפריט האוסף.</p>
  <p>💎 <b>אבני התפתחות</b> במכולת: קפיצון מתפתח ל־7 צורות שונות, תלוי באבן! נוגעים באבן מכרטיס הטלטל באוסף.</p>
  <p>🐾 <b>חבר בדרך:</b> הטלטל המוביל שלכם הולך אחריכם על המפה.</p>
  <p>🎵 <b>מוזיקה</b> לכל אזור ולכל קרב. 🎵 בראש המסך מכבה ומדליק.</p>
  <p>🌇 <b>מזג אוויר:</b> הכפתור בראש המסך מחליף בין שקיעה, לילה, גשם, שלג, סערה וערפל.</p>
  <p>💥 <b>מספרי נזק</b> קופצים בקרב, ומכה קריטית נראית גדולה.</p>
  <p>🪪 <b>כרטיס מאמן והיכל תהילה</b> בתפריט: תגים, דרגה, וצוות האלופים שלכם.</p>
  <p>💾 <b>שמירות בשם</b> בתפריט: שומרים לפני קרב קשה וחוזרים.</p>
  <p>🎣 <b>חכה</b> ו־🚲 <b>אופניים</b> בתפריט ← ציוד הרפתקנים. עם חכה עומדים מול מים ולוחצים על כפתור הפעולה כדי לדוג טלטלי מים.</p>
  <p>🏡 <b>מעון היום</b> בתפריט: משאירים טלטל אצל סבתא חכמה והוא עולה רמה כל 12 דקות אמיתיות.</p></div>`+
  (gift?`<div class="tlrow"><span style="font-size:28px">🎁</span><div><b>מתנת עדכון!</b><br><small>אבן התפתחות אחת לבחירה</small></div></div><div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px">${STONES.map(s=>`<button class="btn" data-g="${s.k}" style="min-height:48px;padding:4px;font-size:22px">${s.i}</button>`).join('')}</div>`:'')+
  `<button class="btn grn" id="tlwn" style="width:100%;margin-top:10px">מעולה, יוצאים להרפתקה!</button>`,
  m=>{m.querySelector('#tlwn').onclick=()=>{if(K.Et==='menu'&&first)K.Et='map';K.He();K.Et='map'};
   m.querySelectorAll('[data-g]').forEach(b=>b.onclick=()=>{const st=stones();st[b.dataset.g]=(st[b.dataset.g]||0)+1;F.gift63=1;K._();K.Y('buy');whatsNew(first)})});
 }
 // ---- menu injection ----
 const Xe0=K.getXe();
 K.setXe(function(){Xe0();try{
  if(K.Et!=='menu')return;const mn=$q('#mnu');if(mn.querySelector('#tlmenu'))return;
  const box=document.createElement('div');box.id='tlmenu';box.style.cssText='display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:10px';
  const add=(t,fn,cls)=>{const b=document.createElement('button');b.className='btn '+(cls||'');b.innerHTML=t;b.onclick=()=>{K.Pe('mnu');fn()};box.appendChild(b)};
  add('🪪 כרטיס מאמן והיכל תהילה',trainerCard,'grn');add('💾 שמירות בשם',savesUI);add('⚙️ מוזיקה, חבר ומזג אוויר',settings);add('🆕 מה חדש בגרסה 6.3',()=>whatsNew(false),'grn');add('💎 חנות אבני התפתחות',()=>{K.Et='menu';openStore()});
  mn.insertBefore(box,mn.children[1])}catch(e){console.error(e)}});
 // the closers return to the menu: re-open menu panel when modals close from menu context
 const He0=K.He;
 // first-run notice
 setInterval(()=>{const F=K.F;if(F&&F.started&&!F.seen63&&K.Et==='map'){K.Et='menu';whatsNew(true)}},2500);
};
/* ---- music: original procedural chiptune (WebAudio, look-ahead scheduler) ---- */
(function(){
 const NOTE=(deg,root,scale,oct)=>{const o=Math.floor(deg/scale.length),i=((deg%scale.length)+scale.length)%scale.length;return 440*Math.pow(2,(root+scale[i]+12*(o+oct)-9)/12)};
 const MAJ=[0,2,4,5,7,9,11],MIN=[0,2,3,5,7,8,10],DOR=[0,2,3,5,7,9,10],MIX=[0,2,4,5,7,9,10],PHR=[0,1,3,5,7,8,10];
 // each track: bpm, root(semitones from C), scale, prog (8 bars: chord root degree), lead (8 bars x 8 eighths, -99 rest), wave, drums(0/1/2)
 const R=-99;
 const T={
  meadow:{bpm:116,root:0,sc:MAJ,prog:[0,4,5,3,0,4,3,4],lead:[[4,R,5,R,7,R,5,4],[4,R,2,R,4,R,R,R],[5,R,7,R,9,R,7,5],[5,R,3,R,5,R,R,R],[7,R,9,R,11,9,7,R],[6,R,4,R,6,R,R,R],[5,R,4,R,3,R,2,R],[4,R,R,R,R,R,R,R]],wave:'square',dr:1,vol:.55},
  water:{bpm:96,root:5,sc:MAJ,prog:[0,5,3,4,0,5,3,4],lead:[[7,R,9,R,11,R,9,R],[7,R,5,R,4,R,R,R],[5,R,7,R,9,R,11,R],[9,R,7,R,R,R,R,R],[7,R,9,R,11,R,14,R],[12,R,11,R,9,R,R,R],[7,R,5,R,4,R,5,R],[4,R,R,R,R,R,R,R]],wave:'triangle',dr:0,vol:.7},
  hills:{bpm:108,root:2,sc:DOR,prog:[0,0,3,4,0,0,3,4],lead:[[4,R,4,R,5,R,4,2],[0,R,2,R,4,R,R,R],[4,R,4,R,5,R,7,R],[6,R,5,R,4,R,R,R],[7,R,7,R,9,R,7,R],[5,R,4,R,2,R,R,R],[4,R,2,R,0,R,2,R],[0,R,R,R,R,R,R,R]],wave:'square',dr:1,vol:.5},
  frost:{bpm:84,root:9,sc:MIN,prog:[0,5,3,4,0,5,6,4],lead:[[7,R,R,R,9,R,R,R],[10,R,R,9,7,R,R,R],[9,R,R,R,10,R,R,R],[12,R,R,10,9,R,R,R],[7,R,R,R,9,R,R,R],[10,R,12,R,14,R,R,R],[12,R,10,R,9,R,7,R],[7,R,R,R,R,R,R,R]],wave:'sine',dr:0,vol:.8},
  dark:{bpm:88,root:4,sc:PHR,prog:[0,0,5,4,0,0,1,4],lead:[[0,R,R,2,R,R,3,R],[4,R,R,3,R,R,R,R],[0,R,R,2,R,R,4,R],[5,R,R,4,R,R,R,R],[7,R,R,5,R,R,4,R],[3,R,R,2,R,R,R,R],[0,R,2,R,3,R,2,R],[0,R,R,R,R,R,R,R]],wave:'triangle',dr:0,vol:.7},
  fire:{bpm:126,root:7,sc:MIN,prog:[0,0,5,6,0,0,5,4],lead:[[7,R,7,9,10,R,9,7],[5,R,7,R,R,R,R,R],[7,R,7,9,10,R,12,10],[9,R,7,R,R,R,R,R],[12,R,12,R,10,R,9,R],[10,R,9,R,7,R,R,R],[5,7,9,10,12,10,9,7],[7,R,R,R,R,R,R,R]],wave:'sawtooth',dr:2,vol:.38},
  storm:{bpm:136,root:2,sc:MIN,prog:[0,5,3,4,0,5,6,4],lead:[[7,9,10,12,10,9,7,R],[5,7,9,R,R,R,R,R],[9,10,12,14,12,10,9,R],[10,9,7,R,R,R,R,R],[14,R,12,R,10,R,12,R],[10,R,9,R,7,R,R,R],[7,9,10,12,14,12,10,9],[7,R,R,R,R,R,R,R]],wave:'sawtooth',dr:2,vol:.36},
  indoor:{bpm:92,root:7,sc:MAJ,prog:[0,3,0,4,0,3,4,0],lead:[[4,R,R,R,7,R,R,R],[9,R,R,7,R,R,R,R],[4,R,R,R,7,R,R,R],[9,R,11,R,R,R,R,R],[7,R,R,R,9,R,R,R],[5,R,R,4,R,R,R,R],[2,R,4,R,5,R,2,R],[0,R,R,R,R,R,R,R]],wave:'triangle',dr:0,vol:.7},
  wild:{bpm:152,root:9,sc:MIN,prog:[0,0,5,4,0,0,6,4],lead:[[7,R,7,9,7,R,5,R],[4,R,5,R,7,R,R,R],[7,R,7,9,10,R,9,R],[7,R,5,R,4,R,R,R],[12,R,10,9,7,9,10,R],[9,R,7,R,5,R,R,R],[7,9,7,5,4,5,7,R],[4,R,R,R,R,R,R,R]],wave:'square',dr:2,vol:.4},
  trainer:{bpm:164,root:4,sc:MIN,prog:[0,5,6,4,0,5,3,4],lead:[[9,R,9,10,12,R,10,9],[7,R,9,R,10,R,R,R],[12,R,12,14,15,R,14,12],[10,R,9,R,7,R,R,R],[14,12,10,9,10,12,14,R],[12,10,9,7,9,10,12,R],[9,10,12,R,14,R,15,R],[14,R,R,R,R,R,R,R]],wave:'square',dr:2,vol:.38},
  boss:{bpm:172,root:11,sc:PHR,prog:[0,1,0,5,0,1,4,5],lead:[[7,R,8,R,7,R,5,R],[7,8,10,R,R,R,R,R],[12,R,13,R,12,R,10,R],[12,13,15,R,R,R,R,R],[14,R,12,R,13,R,12,R],[10,R,8,R,7,R,R,R],[7,8,10,12,13,12,10,8],[7,R,R,R,R,R,R,R]],wave:'sawtooth',dr:2,vol:.34},
 };
 const ZT={A:'meadow',B:'water',C:'hills',D:'frost',E:'dark',F:'fire',G:'hills',H:'dark',I:'storm'};
 let ctx=null,master=null,cur=null,curName='',nextT=0,step=0,timer=null,noiseBuf=null,unlocked=false;
 function init(){if(ctx)return;try{const AC=window.AudioContext||window.webkitAudioContext;ctx=new AC();master=ctx.createGain();master.gain.value=0;master.connect(ctx.destination);
  noiseBuf=ctx.createBuffer(1,ctx.sampleRate*.5,ctx.sampleRate);const d=noiseBuf.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1}catch(e){ctx=null}}
 function tone(f,t,dur,type,vol,att=.008){const o=ctx.createOscillator(),g=ctx.createGain();o.type=type;o.frequency.value=f;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(vol,t+att);g.gain.exponentialRampToValueAtTime(.0008,t+dur);o.connect(g);g.connect(master);o.start(t);o.stop(t+dur+.02)}
 function noise(t,dur,vol,hp){const s=ctx.createBufferSource();s.buffer=noiseBuf;const g=ctx.createGain(),fl=ctx.createBiquadFilter();fl.type='highpass';fl.frequency.value=hp;g.gain.setValueAtTime(vol,t);g.gain.exponentialRampToValueAtTime(.0008,t+dur);s.connect(fl);fl.connect(g);g.connect(master);s.start(t);s.stop(t+dur+.02)}
 function kickD(t,vol){const o=ctx.createOscillator(),g=ctx.createGain();o.frequency.setValueAtTime(150,t);o.frequency.exponentialRampToValueAtTime(40,t+.12);g.gain.setValueAtTime(vol,t);g.gain.exponentialRampToValueAtTime(.0008,t+.16);o.connect(g);g.connect(master);o.start(t);o.stop(t+.18)}
 function sched(){
  if(!ctx||!cur)return;const tr=cur,e8=60/tr.bpm/2;
  while(nextT<ctx.currentTime+.35){
   const bar=Math.floor(step/8)%8,k=step%8,t=nextT,ch=tr.prog[bar],vol=tr.vol*.11;
   const ld=tr.lead[bar][k];if(ld!==R)tone(NOTE(ld,tr.root,tr.sc,1),t,e8*1.7,tr.wave,vol*1.25);
   // arpeggio on chord
   const arp=[0,2,4,2,0,2,4,7][k%8];if(tr.dr===0||k%2===0)tone(NOTE(ch+arp,tr.root,tr.sc,0),t,e8*1.2,'triangle',vol*.55);
   // bass
   if(k%4===0)tone(NOTE(ch,tr.root,tr.sc,-1),t,e8*3.2,'triangle',vol*1.5);
   else if(tr.dr===2&&k%2===1)tone(NOTE(ch,tr.root,tr.sc,-1),t,e8*.8,'triangle',vol);
   // drums
   if(tr.dr>=1){if(k%4===0)kickD(t,vol*2);if(k%4===2)noise(t,.09,vol*1.1,2500);if(tr.dr===2&&k%2===1)noise(t,.04,vol*.5,7000)}
   nextT+=e8;step++}
 }
 function setTrack(n){if(n===curName||!ctx)return;curName=n;const now=ctx.currentTime;master.gain.cancelScheduledValues(now);master.gain.setTargetAtTime(0,now,.08);
  setTimeout(()=>{cur=T[n];step=0;nextT=ctx.currentTime+.05;apply()},260)}
 function wantOn(){const K=window.TLK;if(!K||!K.F)return false;return K.F.snd!==false&&K.F.music!==false&&!document.hidden&&unlocked}
 function apply(){if(!ctx)return;const now=ctx.currentTime;master.gain.cancelScheduledValues(now);master.gain.setTargetAtTime(wantOn()?.9:0,now,.15)}
 function pick(){const K=window.TLK;if(!K||!K.F)return null;const Et=K.Et;
  if(Et==='battle'||(Et==='trans'&&K.Nt&&K.Nt.e)){const tid=K.Nt&&K.Nt.trainer&&K.Nt.trainer.id;if(!K.Nt||!K.Nt.trainer)return 'wild';return /^(gym|champ|boss)/i.test(String(tid))||/champion/.test(String(tid))||K.Nt.trainer.gym||K.Nt.trainer.boss?'boss':'trainer'}
  if(Et==='title')return 'meadow';
  const m=K.an();return m.indoor?'indoor':(ZT[m.zone]||'meadow')}
 function tick(){try{if(!ctx)return;if(wantOn()&&ctx.state==='suspended')ctx.resume();if(!wantOn()){apply();return}const n=pick();if(n&&n!==curName)setTrack(n);else apply()}catch(e){}}
 function unlock(){unlocked=true;init();if(ctx&&ctx.state==='suspended')ctx.resume();if(!timer){timer=setInterval(sched,90);setInterval(tick,400)}tick()}
 ['pointerdown','touchstart','keydown','click'].forEach(ev=>window.addEventListener(ev,unlock,{passive:true}));
 document.addEventListener('visibilitychange',()=>{if(ctx){if(document.hidden)ctx.suspend();else ctx.resume()}});
 window.TLMusic={kick:()=>{tick()},tracks:T,debug:()=>({curName,state:ctx&&ctx.state,gain:master&&master.gain.value,unlocked})};
})();
/* ---- tranche 2: rod, bike, daycare ---- */
window.TL63_more=function(K,X){
 const $q=s=>document.querySelector(s),f=K.f;
 const DIR={up:[0,-1],down:[0,1],left:[-1,0],right:[1,0]};
 const closeM=()=>{K.He();K.Et='map'};
 const GEAR=[{k:'rod',i:'🎣',n:'חכת דייגים',cost:300,d:'עומדים מול מים ולוחצים על כפתור הפעולה כדי לדוג טלטלי מים!'},
             {k:'bike',i:'🚲',n:'אופניים מתקפלים',cost:600,d:'הולכים מהר יותר בחוץ. מדליקים ומכבים בתפריט (ציוד הרפתקנים).'}];
 function gear(){
  const F=K.F;
  K.Ie(`<h2>🎒 ציוד הרפתקנים</h2><div class="flav">🪙 ${F.coins} מטבעות</div>`+
   GEAR.map(g=>{const own=F[g.k];return `<div class="tlrow"><span style="font-size:30px">${g.i}</span><div><b>${g.n}</b><br><small>${g.d}</small></div>`+(own?(g.k==='bike'?`<button class="btn ${F.bikeOn?'grn':''}" data-t="bike">${F.bikeOn?'פועלות ✓':'כבויות'}</button>`:'<button class="btn sec" disabled>יש לך ✓</button>'):`<button class="btn" data-b="${g.k}" ${F.coins<g.cost?'disabled':''}>${g.cost} 🪙</button>`)+`</div>`}).join('')+
   `<button class="btn sec" id="tlgx" style="width:100%;margin-top:8px">סגור</button>`,
   m=>{m.querySelector('#tlgx').onclick=closeM;
    m.querySelectorAll('[data-b]').forEach(b=>b.onclick=()=>{const g=GEAR.find(q=>q.k===b.dataset.b);if(F.coins<g.cost)return;F.coins-=g.cost;F[g.k]=1;if(g.k==='bike')F.bikeOn=1;K.Y('buy');K.ie();K._();gear()});
    const t=m.querySelector('[data-t]');if(t)t.onclick=()=>{F.bikeOn=F.bikeOn?0:1;K._();gear()}});
 }
 // ---- fishing ----
 let fishing=false;
 function avgLv(){const p=K.F.party.filter(m=>m.hp>0);return p.length?Math.round(p.reduce((s,m)=>s+m.lv,0)/p.length):5}
 function waterPool(){const z=K.an().zone;let L=[];f.forEach((s,i)=>{if(s&&s.t==='water'&&(!s.evo||s.evo.length===undefined||1)&&String(s.h||'').includes(z)&&!(s.base!==undefined&&s.base!==i&&0))L.push(i)});
  if(!L.length)f.forEach((s,i)=>{if(s&&s.t==='water')L.push(i)});
  // favour first stages
  const first=L.filter(i=>f[i].base===undefined||f[i].base===i);return first.length?first:L}
 $q('#abtn').addEventListener('click',ev=>{
  try{
   if(K.Et!=='map'||K.Rt.moving||fishing)return;
   const d=DIR[K.Rt.dir];if(!d)return;const x=K.Rt.x+d[0],y=K.Rt.y+d[1];
   if(!K.ct[y]||K.ct[y][x]!==2)return;
   // an NPC or sign in front takes priority is not needed: water tiles have none
   ev.stopImmediatePropagation();ev.preventDefault();
   const F=K.F;
   if(!F.rod){K.Bt('🎣 צריך חכה! קונים בתפריט ☰ ← ציוד הרפתקנים',3500);return}
   if(!F.party.some(m=>m.hp>0)){K.Bt('הצוות עייף - קודם לבית החולים',2500);return}
   fishing=true;K.Bt('🎣 משליכים חכה...',1600);K.Y('throw');
   const wait=1400+Math.random()*2200;
   setTimeout(async()=>{
    try{
     if(K.Et!=='map'){fishing=false;return}
     if(Math.random()<.78){const pool=waterPool(),sp=pool[Math.floor(Math.random()*pool.length)],lv=avgLv();K.Bt('❗ משהו נגס!',900);K.Y('enc');
      await K.i(700);fishing=false;if(K.Et==='map')await K.getBn()(sp,[Math.max(2,lv-2),lv+1])}
     else{K.Bt('🌊 לא נגס כלום. נסו שוב!',1800);fishing=false}
    }catch(e){fishing=false;console.error(e)}
   },wait);
  }catch(e){console.error(e)}
 },true);
 // ---- bike ----
 let last=performance.now();
 (function loop(ts){requestAnimationFrame(loop);const dt=Math.min(.05,(ts-last)/1000);last=ts;
  try{const F=K.F;if(F&&F.bike&&F.bikeOn&&K.Et==='map'&&K.Rt.moving&&!K.an().indoor)K.Rt.mt+=dt/.17*.75}catch(e){}})(last);
 // ---- daycare ----
 const PER=12*60*1000,MAXG=6; // one level per 12 real minutes, up to +6
 function dcGain(dc){return Math.min(MAXG,Math.floor((Date.now()-dc.t0)/PER))}
 function daycare(){
  const F=K.F,dc=F.daycare;
  if(dc){const g=dcGain(dc),m=dc.mon,left=g>=MAXG?0:Math.ceil((PER-(Date.now()-dc.t0)%PER)/60000);
   K.Ie(`<h2>🏡 מעון היום של סבתא חכמה</h2><div class="flav">${K.Yt(m)} משחק בגינה ולומד המון.</div><div class="tlrow"><div style="width:76px"></div><div><b>${K.Yt(m)}</b> · רמה ${m.lv}<br><small>עלה עד עכשיו: +${g} רמות ${g>=MAXG?'(הגיע לגג!)':'· הרמה הבאה בעוד כ-'+left+' דקות'}</small></div></div><button class="btn grn" id="tlg" style="width:100%;margin-top:8px">🧺 לאסוף את ${K.Yt(m)}</button><button class="btn sec" id="tlgx" style="width:100%;margin-top:8px">סגור</button>`,
    mb=>{mb.querySelector('#tlgx').onclick=closeM;mb.querySelector('#tlg').onclick=()=>{const g2=dcGain(dc);m.lv=Math.min(40,m.lv+g2);m.xp=0;m.hp=K.x(m);F.party.push(m);F.daycare=null;K._();K.Y('lvl');K.He();K.Et='map';K.Bt('🧺 '+K.Yt(m)+' חזר'+(g2?' ועלה '+g2+' רמות!':'!'),3500)}});return}
  const cand=F.party.filter((m,i)=>i>0||F.party.length>1);
  if(F.party.length<2){K.Ie(`<h2>🏡 מעון היום</h2><div class="flav">סבתא חכמה שומרת על טלטלים בזמן שאתם מטיילים - כל 12 דקות אמיתיות הם עולים רמה (עד 6). צריך לפחות שני טלטלים בצוות כדי להשאיר אחד.</div><button class="btn sec" id="tlgx" style="width:100%">סגור</button>`,mb=>mb.querySelector('#tlgx').onclick=closeM);return}
  K.Ie(`<h2>🏡 מעון היום של סבתא חכמה</h2><div class="flav">את מי משאירים? כל 12 דקות אמיתיות הוא עולה רמה (עד 6 רמות). גם כשסוגרים את המשחק!</div>`+F.party.map((m,i)=>i===0?'':`<button class="btn" data-i="${i}" style="width:100%;margin:4px 0">${K.Yt(m)} · רמה ${m.lv}</button>`).join('')+`<button class="btn sec" id="tlgx" style="width:100%;margin-top:8px">סגור</button>`,
   mb=>{mb.querySelector('#tlgx').onclick=closeM;mb.querySelectorAll('[data-i]').forEach(b=>b.onclick=()=>{const i=+b.dataset.i,m=F.party.splice(i,1)[0];F.daycare={mon:m,t0:Date.now()};K._();daycare()})});
 }
 // ---- menu ----
 const Xe1=K.getXe();
 K.setXe(function(){Xe1();try{
  if(K.Et!=='menu')return;const mn=$q('#mnu');if(mn.querySelector('#tlmenu2'))return;
  const box=document.createElement('div');box.id='tlmenu2';box.style.cssText='display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:8px';
  const add=(t,fn,cls)=>{const b=document.createElement('button');b.className='btn '+(cls||'');b.innerHTML=t;b.onclick=()=>{K.Pe('mnu');fn()};box.appendChild(b)};
  add('🎒 ציוד: חכה ואופניים',gear);add('🏡 מעון היום',daycare);
  const ref=mn.querySelector('#tlmenu');mn.insertBefore(box,ref?ref.nextSibling:mn.children[1])}catch(e){console.error(e)}});
};
/* ---- round 2: dual types, learnsets, TMs, stat stages, four champions, line-of-sight trainers, fossil lab ---- */
window.TL63_r2=function(K,X){
 const f=K.f,c=K.c,o=K.o,KEY=X.KEY,$q=s=>document.querySelector(s);
 const esc=X.esc,closeM=()=>{K.He();K.Et='map'};
 // ---- dual types ----
 const T2={cubF:'light',cubW:'ice',cubP:'bug',cubS:'wind',cubI:'wind',cubL:'fire',cubD:'venom',crys2:'light',ball2:'sound',moth:'wind',ant2:'metal',cat2:'fight',star2:'wind',lion2:'fire',cog2:'earth',monk3:'dragon',roos2:'wind',bell2:'shadow',frog2:'water',drk3:'metal',iron3:'earth',snk2:'shadow',scor2:'bug',hare2:'wind',gh2:'light',fos1b:'dragon',fos2b:'water'};
 for(const k in T2)if(KEY[k]!==undefined)f[KEY[k]].t2=T2[k];
 const TYPES=Object.keys(o);
 // ---- moves ----
 const M3={fire:'סערת להבות',water:'צונאמי',plant:'סופת עלים',spark:'רעם גדול',earth:'רעש אדמה',norm:'התרסקות',ice:'סופת קרח',wind:'ציקלון',bug:'נחיל זנבות',shadow:'ליל צללים',light:'קרן שמש',metal:'פטיש ענק',fight:'אגרוף על',dragon:'נשיפת דרקון',sound:'צלצול גדול',venom:'ענן ארסי'};
 const MT={fire:'כדור אש',water:'סילון מים',plant:'חץ עלים',spark:'קשת חשמל',earth:'סלע נופל',norm:'מכת כוח',ice:'רסיס כפור',wind:'משב חד',bug:'עקיצה צורבת',shadow:'מכת צל',light:'הבזק אור',metal:'להב ברזל',fight:'בעיטה',dragon:'זנב דרקון',sound:'קול שובר',venom:'קוץ ארסי'};
 TYPES.forEach(t=>{if(M3[t])c[t+'3']={n:M3[t],t,p:92,a:85};if(MT[t])c['tm_'+t]={n:MT[t],t,p:78,a:95}});
 c.guard={n:'מגן',t:'norm',p:0,a:100,st:'def+'};c.scare={n:'בהלה',t:'norm',p:0,a:100,st:'def-'};
 window.__TLstLabel=m=>m.st==='def+'?'מחזק הגנה':m.st==='def-'?'מחליש הגנה של היריב':'מחזק התקפה';
 const foeOf=(e,s)=>s?K.Nt.e:K.F.party[K.Nt.pi];
 window.__TLstage=(e,n,s)=>{const st=c[n]&&c[n].st;if(!st)return e.bst=Math.min((e.bst||0)+1,3);
  if(st==='def+')e.dst=Math.min((e.dst||0)+1,3);else if(st==='def-'){const t=foeOf(e,s);if(t)t.dst=Math.max((t.dst||0)-1,-3)}};
 window.__TLstageMsg=(e,n,s)=>{const st=c[n]&&c[n].st;if(st==='def+')return 'ההגנה של '+K.Yt(e)+' עלתה!';
  if(st==='def-'){const t=foeOf(e,s);return 'ההגנה של '+(t?K.Yt(t):'היריב')+' ירדה!'}return 'ההתקפה של '+K.Yt(e)+' עלתה!'};
 window.__TLdm=m=>{const d=m&&m.dst||0;return d>=0?1+.35*d:1/(1+.3*-d)};
 window.__TLeff=(att,sp,r)=>{const s=f[sp],a=r[att]||{};let v=(a[s.t]||1)*(s.t2?(a[s.t2]||1):1);return Math.min(2.5,Math.max(.35,v))};
 window.__TLmoves=(sp,lv,m,C0)=>{const s=f[sp],l=C0(sp,lv).slice();
  if(m&&m.id){ // learnsets apply to the player's own tammed monsters only, enemies stay as before
   if(lv>=16&&c[s.t+'3'])l.push(s.t+'3');
   if(s.t2){if(lv>=5&&c[s.t2+'1'])l.push(s.t2+'1');if(lv>=12&&c[s.t2+'2'])l.push(s.t2+'2')}
   (m.tm||[]).forEach(k=>{if(c[k]&&!l.includes(k))l.push(k)});
  }else if(s.t2){if(lv>=5&&c[s.t2+'1'])l.push(s.t2+'1');if(lv>=12&&c[s.t2+'2'])l.push(s.t2+'2')}
  while(l.length>6){const i=l.indexOf('tackle');l.splice(i>=0?i:1,1)}
  return l};
 // reset stat stages out of battle
 setInterval(()=>{try{if(K.Et!=='battle'&&K.Et!=='trans'&&K.F&&K.F.party)K.F.party.forEach(m=>{if(m.dst)m.dst=0})}catch(e){}},1500);
 // ---- TM shop ----
 const TMS=[...TYPES.map(t=>({k:'tm_'+t,n:'💿 '+MT[t],t,cost:250})),{k:'guard',n:'🛡 מגן',t:null,cost:150},{k:'scare',n:'😱 בהלה',t:null,cost:150}];
 const tms=()=>{const F=K.F;F.tms=F.tms||{};return F.tms};
 const tmLine=k=>{const m=c[k];return m.st?(m.st==='def+'?'מחזק הגנה (עד 3 פעמים)':'מחליש הגנה של היריב'):'עוצמה '+m.p+' · דיוק '+m.a+'%'};
 function tmShop(){
  const F=K.F,st=tms();
  K.Ie(`<h2>💿 חנות מכונות מהלך</h2><div class="flav">מכונה מלמדת טלטל מהלך חדש (עד 2 מכונות לטלטל, אחת לשימוש). מכונות סוג מתאימות לטלטלים מאותו סוג, 🛡 ו־😱 מתאימות לכולם. 🪙 ${F.coins}</div>`+
   TMS.map(s=>`<div class="tlrow"><div><b>${s.n}</b> ${s.t?K.E(s.t):''}<br><small>${tmLine(s.k)} · בתיק: ${st[s.k]||0}</small></div><button class="btn" data-m="${s.k}" ${F.coins<s.cost?'disabled':''}>${s.cost} 🪙</button></div>`).join('')+
   `<button class="btn sec" id="tlmx" style="width:100%;margin-top:8px">סגור</button>`,
   m=>{m.querySelector('#tlmx').onclick=closeM;m.querySelectorAll('[data-m]').forEach(b=>b.onclick=()=>{const s=TMS.find(q=>q.k===b.dataset.m);if(F.coins<s.cost)return;F.coins-=s.cost;st[s.k]=(st[s.k]||0)+1;K.Y('buy');K.ie();K._();const sc=m.scrollTop;tmShop();$q('#mbox').scrollTop=sc})});
 }
 function tmPick(mon){
  const st=tms(),sp=f[mon.sp],list=TMS.filter(s=>(st[s.k]||0)>0&&(!s.t||s.t===sp.t||s.t===sp.t2));
  K.Ie(`<h2>💿 מכונת מהלך</h2><div class="flav">${esc(K.Yt(mon))} למד מהלך חדש. אם יש לו כבר 2 מכונות, הישנה ביותר תוחלף. מכונות לא מתאימות לא מופיעות.</div>`+
   (list.length?list.map(s=>`<button class="btn" data-m="${s.k}" style="width:100%;margin:4px 0">${s.n} · ${tmLine(s.k)} (בתיק ${st[s.k]})</button>`).join(''):'<p>אין לכם מכונה מתאימה. אפשר לקנות בתפריט ☰ ← חנות מכונות מהלך.</p>')+`<button class="btn sec" id="tlmx" style="width:100%;margin-top:6px">ביטול</button>`,
   m=>{m.querySelector('#tlmx').onclick=()=>{K.He();K.Ne(mon)};m.querySelectorAll('[data-m]').forEach(b=>b.onclick=()=>{const k=b.dataset.m;mon.tm=mon.tm||[];if(mon.tm.includes(k)){K.Bt('כבר למד את זה',1800);return}
    st[k]--;mon.tm.push(k);if(mon.tm.length>2)mon.tm.shift();K.Y('lvl');K._();K.He();K.Ne(mon);K.Bt('💿 '+K.Yt(mon)+' למד '+c[k].n+'!',2800)})});
 }
 const Ne1=K.getNe();
 K.setNe(function(t){Ne1(t);try{
  const mb=$q('#mbox'),sp=f[t.sp];
  const chip=mb.querySelector('h2 .chip');if(chip&&sp.t2&&!mb.querySelector('.tl2chip')){const s=document.createElement('span');s.innerHTML=K.E(sp.t2);const ch=s.firstChild;ch.classList.add('tl2chip');ch.style.marginInlineStart='4px';chip.after(ch)}
  if(K.F.party.includes(t)||true){if(mb.querySelector('#tltm'))return;const cl=mb.querySelector('#d3');const b=document.createElement('button');b.className='btn';b.id='tltm';b.innerHTML='💿 מכונת מהלך'+((t.tm&&t.tm.length)?'<small>למד: '+t.tm.map(k=>c[k]&&c[k].n).join(', ')+'</small>':'');b.onclick=()=>tmPick(t);(cl?cl.parentNode:mb).insertBefore(b,cl||null)}
 }catch(e){console.error(e)}});
 // shops: add TM button
 const mbox=$q('#mbox');
 new MutationObserver(()=>{if(!mbox.querySelector('#s3,#h3')||mbox.querySelector('#tltmshop'))return;const cl=mbox.querySelector('#sc,#h4');if(!cl)return;
  const b=document.createElement('button');b.className='btn grn';b.id='tltmshop';b.innerHTML='💿 מכונות מהלך<small>מלמדות מהלכים חדשים · חדש!</small>';b.onclick=tmShop;cl.parentNode.insertBefore(b,cl)}).observe(mbox,{childList:true});
 // ---- four champions ----
 const E4=[{id:'elite1',n:'נעמי · אלופת הכפור',txt:'הקור שלי חד יותר מכל סערה. נראה אם הצוות שלכם מחזיק מעמד!',requires:'champion2',team:['crys2:40','hare2:41','ball2:42','wbird3:44'],reward:600},
  {id:'elite2',n:'גיל · אלוף הצללים',txt:'אתם לא רואים אותי, אבל אני רואה אתכם. בואו נתחיל.',requires:'elite1',team:['cat2:43','gh2:43','cubD:44','bell2:45'],reward:700},
  {id:'elite3',n:'מיכל · אלופת האור והלחימה',txt:'אור חזק ואגרוף חזק. מי ינצח?',requires:'elite2',team:['lion2:44','star2:44','monk3:46','roos2:46'],reward:800},
  {id:'elite4',n:'רועי · אלוף הדרקונים',txt:'ארבעת האלופים מסתיימים כאן. הראו לי מה למדתם במסע!',requires:'elite3',boss:true,team:['drk3:48','iron3:47','snk2:46','scor2:46','moth:45'],reward:1500}];
 E4.forEach(t=>{t.team=t.team.map(s=>{const[a,b]=s.split(':');return[KEY[a],+b]})});
 function elite(){
  const F=K.F,d=F.defeated||{};
  if(!d.champion2){K.Ie(`<h2>🏛️ ארבעת האלופים</h2><div class="flav">ארבעה אלופי על מחכים לטלטלן שניצח את אלוף היכל הסופה. קודם מנצחים אותו, ואז חוזרים לכאן.</div><button class="btn sec" id="tlx" style="width:100%">סגור</button>`,m=>m.querySelector('#tlx').onclick=closeM);return}
  K.Ie(`<h2>🏛️ ארבעת האלופים</h2><div class="flav">ארבעה קרבות ברצף, בלי תגים, בלי רחמים (אבל עם ריפוי חינם בין הקרבות). הקרב האחרון נותן מקום בהיכל התהילה.</div>`+
   E4.map((t,i)=>{const ok=!!d[t.id],can=!ok&&(!t.requires||d[t.requires]);return `<div class="tlrow"><div><b>${ok?'✅':can?'⚔️':'🔒'} ${t.n}</b><br><small>${t.team.map(p=>f[p[0]].n+' '+p[1]).join(' · ')}</small></div>${can?`<button class="btn grn" data-e="${i}">לקרב</button>`:''}</div>`}).join('')+
   `<button class="btn" id="tlheal" style="width:100%;margin-top:6px">💚 ריפוי חינם לצוות</button><button class="btn sec" id="tlx" style="width:100%;margin-top:6px">סגור</button>`,
   m=>{m.querySelector('#tlx').onclick=closeM;m.querySelector('#tlheal').onclick=()=>{K.F.party.forEach(p=>{p.hp=K.x(p);p.status=null});K.Y('heal');K._();K.Bt('💚 הצוות מלא כוח',1800)};
    m.querySelectorAll('[data-e]').forEach(b=>b.onclick=()=>{const t=E4[+b.dataset.e];K.He();K.Et='map';K.Re(t)})});
 }
 setInterval(()=>{try{const F=K.F;if(!F||!F.started||!F.defeated)return;F.hof=F.hof||[];if(F.defeated.elite4&&!F.hof.some(h=>h.id==='elite4')){F.hof.push({id:'elite4',ts:Date.now(),title:'אלוף ארבעת האלופים',team:F.party.slice(0,6).map(p=>({sp:p.sp,lv:p.lv,shiny:!!p.shiny,nick:p.nick||''}))});K._();K.Bt('🏆 ניצחתם את ארבעת האלופים!',3500)}}catch(e){}},2000);
 // ---- line-of-sight trainers ----
 let busy=false,cool={},lastChk=0;
 function losScan(ts){requestAnimationFrame(losScan);
  try{if(ts-lastChk<150)return;lastChk=ts;const F=K.F;if(busy||!F||!F.started||F.los===false||K.Et!=='map'||K.Rt.moving)return;
   const m=K.an();if(m.indoor||!m.npcs)return;const R=K.Rt,now=Date.now();
   for(const n of m.npcs){if(n.kind!=='trainer')continue;const tr=K.Ha.find(t=>t.id===n.ref);if(!tr||tr.gym||tr.boss||F.defeated[tr.id]||(tr.requires&&!F.defeated[tr.requires])||(cool[tr.id]&&now<cool[tr.id]))continue;
    const dx=R.x-n.x,dy=R.y-n.y;if(dx&&dy)continue;const dist=Math.abs(dx)+Math.abs(dy);if(dist<2||dist>5)continue;
    const dir=dx>0?'right':dx<0?'left':dy>0?'down':'up';if(n.dir!==dir)continue;
    const sx=Math.sign(dx),sy=Math.sign(dy);let clear=true;for(let i=1;i<dist;i++){const x=n.x+sx*i,y=n.y+sy*i;if(!K.ct[y]||K.ut.has(K.ct[y][x])||m.npcs.some(q=>q!==n&&q.x===x&&q.y===y)){clear=false;break}}
    if(!clear)continue;
    chase(n,tr,dist);return}
  }catch(e){}}
 async function chase(n,tr,dist){busy=true;cool[tr.id]=Date.now()+90000;
  try{K.Et='menu';K.Bt('❗ '+tr.n+' הבחין בך!',1800);K.Y('enc');await K.i(900);
   const R=K.Rt,sx=Math.sign(R.x-n.x),sy=Math.sign(R.y-n.y);
   for(let d=dist;d>1;d--){n.x+=sx;n.y+=sy;await K.i(190)}
   R.dir=sx>0?'right':sx<0?'left':sy>0?'down':'up';n.dir=sx>0?'left':sx<0?'right':sy>0?'up':'down';
   await K.i(200);K.Et='map';$q('#abtn').click();
  }catch(e){console.error(e);if(K.Et==='menu')K.Et='map'}
  setTimeout(()=>{busy=false},2500)}
 requestAnimationFrame(losScan);
 // ---- fossil lab ----
 const FOS=[{k:'f1',sp:'fos1',n:'מאובן סלע',i:'🪨',cost:300},{k:'f2',sp:'fos2',n:'מאובן קשקשים',i:'🦴',cost:300}],FT=10*60*1000;
 function lab(){
  const F=K.F,fz=F.fossil;
  if(fz){const left=Math.max(0,fz.t0+FT-Date.now()),ready=left===0,t=FOS.find(q=>q.k===fz.k);
   K.Ie(`<h2>🦴 מעבדת מאובנים</h2><div class="flav">${t.i} ${t.n} במכונת ההחייאה. ${ready?'מוכן!':'עוד כ-'+Math.ceil(left/60000)+' דקות אמיתיות (גם כשהמשחק סגור).'}</div>`+(ready?`<button class="btn grn" id="tlcol" style="width:100%">✨ להוציא את הטלטל</button>`:'')+`<button class="btn sec" id="tlx" style="width:100%;margin-top:8px">סגור</button>`,
    m=>{m.querySelector('#tlx').onclick=closeM;const b=m.querySelector('#tlcol');if(b)b.onclick=()=>{const idx=KEY[t.sp],mon=K.T(idx,12);F.seen[idx]=1;F.caught[idx]=1;if(F.party.length<6)F.party.push(mon);else(F.box=F.box||[]).push(mon);F.fossil=null;K._();K.Y('lvl');K.He();K.Et='map';K.Bt('✨ '+f[idx].n+' התעורר'+(F.party.includes(mon)?'':' ונשלח לקופסה')+'!',3500)}});return}
  K.Ie(`<h2>🦴 מעבדת מאובנים</h2><div class="flav">קונים מאובן והמכונה מחיה אותו ל־10 דקות אמיתיות. יוצא טלטל עתיק ברמה 12, שאי אפשר למצוא בשום מקום אחר! 🪙 ${F.coins}</div>`+
   FOS.map(t=>`<div class="tlrow"><span style="font-size:30px">${t.i}</span><div><b>${t.n}</b><br><small>${f[KEY[t.sp]].n} ${K.E(f[KEY[t.sp]].t)}${f[KEY[t.sp]].t2?K.E(f[KEY[t.sp]].t2):''}</small></div><button class="btn" data-f="${t.k}" ${F.coins<t.cost?'disabled':''}>${t.cost} 🪙</button></div>`).join('')+`<button class="btn sec" id="tlx" style="width:100%;margin-top:8px">סגור</button>`,
   m=>{m.querySelector('#tlx').onclick=closeM;m.querySelectorAll('[data-f]').forEach(b=>b.onclick=()=>{const t=FOS.find(q=>q.k===b.dataset.f);if(F.coins<t.cost)return;F.coins-=t.cost;F.fossil={k:t.k,t0:Date.now()};K.Y('buy');K.ie();K._();lab()})});
 }
 // ---- menu ----
 const Xe2=K.getXe();
 K.setXe(function(){Xe2();try{
  if(K.Et!=='menu')return;const mn=$q('#mnu');if(mn.querySelector('#tlmenu3'))return;
  const box=document.createElement('div');box.id='tlmenu3';box.style.cssText='display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:8px';
  const add=(t,fn,cls)=>{const b=document.createElement('button');b.className='btn '+(cls||'');b.innerHTML=t;b.onclick=()=>{K.Pe('mnu');fn()};box.appendChild(b)};
  add('💿 חנות מכונות מהלך',tmShop);add('🏛️ ארבעת האלופים',elite,'grn');add('🦴 מעבדת מאובנים',lab);
  add('👀 מאמנים שמבחינים: '+(K.F.los===false?'כבוי':'פועל'),()=>{K.F.los=K.F.los===false;K._();K.Et='map';K.Bt(K.F.los===false?'👀 מאמנים לא ינסו לתפוס אתכם':'👀 מאמנים יבחינו בכם בקו ישר',2500)});
  const ref=mn.querySelector('#tlmenu2')||mn.querySelector('#tlmenu');mn.insertBefore(box,ref?ref.nextSibling:mn.children[1])}catch(e){console.error(e)}});
 // ---- what's new (6.4) ----
 function wn(){const F=K.F;F.seen64=1;K._();
  K.Ie(`<h2>🆕 גרסה 6.4 - עוד יותר טלטל!</h2><div style="text-align:right;font-size:14px;line-height:1.55">
  <p>🧬 <b>סוגים כפולים:</b> לחלק מהטלטלים יש שני סוגים (שני תגים ליד השם). התקפה יעילה נגד אחד מהם מכפילה, והם גם מכים חזק יותר במהלכי שני הסוגים. (עד פי 2.5.)</p>
  <p>📚 <b>מהלכים חדשים:</b> ברמה 16 כל טלטל לומד מהלך על, וטלטלים כפולי סוג לומדים גם מהלכים מהסוג השני.</p>
  <p>💿 <b>מכונות מהלך</b> בחנות ובתפריט. מלמדות מהלכים חדשים, כולל 🛡 מגן (מעלה הגנה) ו־😱 בהלה (מוריד הגנה ליריב). מהלכים כאלו משתנים בקרב עד 3 דרגות.</p>
  <p>🏛️ <b>ארבעת האלופים</b> בתפריט, אחרי שמנצחים את אלוף היכל הסופה. יש ריפוי חינם בין הקרבות.</p>
  <p>👀 <b>מאמנים שמבחינים בכם:</b> מאמן שמסתכל עליכם בקו ישר יבוא לאתגר אתכם. אפשר לכבות בתפריט.</p>
  <p>🦴 <b>מעבדת מאובנים:</b> מחיים טלטל עתיק (רק שם!) תוך 10 דקות אמיתיות.</p></div><button class="btn grn" id="tlwn2" style="width:100%;margin-top:10px">יוצאים להרפתקה!</button>`,m=>m.querySelector('#tlwn2').onclick=closeM)}
 setInterval(()=>{const F=K.F;if(F&&F.started&&F.seen63&&!F.seen64&&K.Et==='map'){K.Et='menu';wn()}},2500);
};
window.TL63_r3=function(K,X){
 const KEY=X.KEY,$q=s=>document.querySelector(s),esc=X.esc,closeM=()=>{K.He();K.Et='map'},f=K.f;
 const fm=()=>{const F=K.F;F.fm=F.fm||{};return F.fm};
 const ED=()=>{const F=K.F;F.edits=F.edits||{};return F.edits};
 const rec=(x,y,v)=>{try{const id=K.an().id;const E=ED();(E[id]=E[id]||{})[x+','+y]=v;K._()}catch(e){}};
 let lastMap=null;
 function applyEdits(){try{if(K.Et!=='map'||!K.an)return;const m=K.an();if(!m||!m.id)return;if(m.id!==lastMap){lastMap=m.id;ensureSigns(m);const E=ED()[m.id];if(E){const T=m.tiles;if(T)for(const k in E){const p=k.split(','),x=+p[0],y=+p[1];if(T[y]&&T[y][x]!==undefined){T[y][x]=E[k];if(E[k]!==3&&E[k]!==4)removeSignFor(m.id,x,y)}}}}}catch(e){}}
 setInterval(applyEdits,150);
 // ---- field moves ----
 const FMV=[{k:'cut',ic:'🪓',n:'חיתוך',gym:'gym1',gname:'אלוף היכל הראשון',txt:'חותכים עץ שחוסם את הדרך: עומדים מולו ולוחצים לכיוונו.'},
  {k:'surf',ic:'🌊',n:'גלישה',gym:'gym2',gname:'אלוף היכל השני',txt:'אפשר ללכת על מים. מי שאוהב לטייל באגם יגלה פינות חדשות.'},
  {k:'str',ic:'💪',n:'כוח',gym:'gym3',gname:'אלוף היכל השלישי',txt:'דוחפים סלע גדול ממקומו: עומדים מולו ולוחצים לכיוונו, אם יש מקום פנוי מאחוריו.'}];
 let seenSurf=null;
 function fmModal(){const F=K.F,d=F.defeated||{},m=fm();
  K.Ie(`<h2>🌊 מהלכי שדה</h2><div class="flav">הטלטלים שלכם לומדים כוחות מיוחדים לטיול. כל כוח נפתח כשמנצחים אלוף היכל, וקיים לכל הצוות.</div>`+
   FMV.map(v=>`<div class="tlrow"><div><b>${m[v.k]?'✅':'🔒'} ${v.ic} ${v.n}</b><br><small>${m[v.k]?v.txt:'נפתח בניצחון על '+v.gname}</small></div></div>`).join('')+
   `<button class="btn sec" id="tlx" style="width:100%;margin-top:8px">סגור</button>`,mm=>mm.querySelector('#tlx').onclick=closeM)}
 function unlockPoll(){const F=K.F;if(!F||!F.started||K.Et!=='map')return;const d=F.defeated||{},m=fm();
  for(const v of FMV){if(!m[v.k]&&d[v.gym]){m[v.k]=1;K._();K.Et='menu';K.Ie(`<h2>${v.ic} למדתם ${v.n}!</h2><div class="flav">${v.txt}</div><button class="btn grn" id="tlx" style="width:100%">מעולה!</button>`,mm=>mm.querySelector('#tlx').onclick=closeM);return}}}
 setInterval(()=>{try{unlockPoll();
  const s=!!(K.F&&K.F.fm&&K.F.fm.surf);if(s!==seenSurf){seenSurf=s;if(s)K.ut.delete(2);else K.ut.add(2)}}catch(e){}},700);
 // ---- field-move signs ----
 const SGN=[];
 const scannedSigns=new Set();
 function signTxt(k){const m=fm();
  if(k==='cut')return m.cut?'עץ עבה. יש לכם חיתוך! 🪓 עומדים מול העץ ולוחצים אליו כדי לחתוך אותו.':'עץ עבה. צריך חיתוך 🪓 חיתוך נפתח אחרי שמנצחים את אלוף היכל הראשון.';
  if(k==='str')return m.str?'סלע כבד. יש לכם כוח! 💪 עומדים מול הסלע ולוחצים אליו כדי לדחוף אותו.':'סלע כבד. צריך כוח 💪 כוח נפתח אחרי שמנצחים את אלוף היכל השלישי.';
  return m.surf?'מים עמוקים. יש לכם גלישה! 🌊 פשוט הולכים אל המים ושטים.':'מים עמוקים. צריך גלישה 🌊 גלישה נפתחת אחרי שמנצחים את אלוף היכל השני.'}
 function refreshSigns(){for(const r of SGN)r.sgn.msg=signTxt(r.type)}
 function removeSignFor(mid,ox,oy){for(let i=SGN.length-1;i>=0;i--){const r=SGN[i];if(r.map===mid&&r.ox===ox&&r.oy===oy){const mp=K.ua[mid];if(mp){if(mp.tiles[r.y]&&mp.tiles[r.y][r.x]===9)mp.tiles[r.y][r.x]=r.orig;const j=(mp.signs||[]).indexOf(r.sgn);if(j>=0)mp.signs.splice(j,1)}SGN.splice(i,1)}}}
 function safeBlock(T,x,y){const H=T.length,W=T[0].length,R=4;
  const walk=(a,b)=>T[b]&&T[b][a]!==undefined&&!K.ut.has(T[b][a])&&!(a===x&&b===y);
  const inW=(a,b)=>Math.abs(a-x)<=R&&Math.abs(b-y)<=R;
  const key=(a,b)=>a+','+b;const vis=new Set(),q=[];
  const x0=Math.max(0,x-R),x1=Math.min(W-1,x+R),y0=Math.max(0,y-R),y1=Math.min(H-1,y+R);
  let total=0;
  for(let b=y0;b<=y1;b++)for(let a=x0;a<=x1;a++)if(walk(a,b)){total++;if(a===x0||a===x1||b===y0||b===y1){const k=key(a,b);if(!vis.has(k)){vis.add(k);q.push([a,b])}}}
  while(q.length){const [a,b]=q.pop();for(const [da,db] of [[1,0],[-1,0],[0,1],[0,-1]]){const a2=a+da,b2=b+db;if(!inW(a2,b2))continue;const k=key(a2,b2);if(!vis.has(k)&&walk(a2,b2)){vis.add(k);q.push([a2,b2])}}}
  return vis.size===total}
 function placeSign(mp,ox,oy,type){
  const T=mp.tiles;if(!T)return false;const H=T.length,W=T[0].length;
  const walk=(x,y)=>T[y]&&T[y][x]!==undefined&&!K.ut.has(T[y][x]);
  const free=(x,y)=>walk(x,y)&&!(mp.npcs||[]).some(n=>n.x===x&&n.y===y)&&!(mp.links||[]).some(l=>l.x===x&&l.y===y)&&!(mp.signs||[]).some(q=>q.x===x&&q.y===y)&&!(mp.doors||[]).some(d=>d.x===x&&d.y===y)&&!(mp.fields||[]).some(f2=>f2.x===x&&f2.y===y);
  const D4=[[1,0],[-1,0],[0,1],[0,-1]];
  const A=D4.map(([a,b])=>[ox+a,oy+b]).filter(([x,y])=>walk(x,y));
  if(!A.length)return false;
  const nbc=(x,y)=>D4.filter(([a,b])=>walk(x+a,y+b)).length;
  const inA=(x,y)=>A.some(([a,b])=>a===x&&b===y);
  const nearA=(x,y)=>A.some(([a,b])=>Math.abs(a-x)+Math.abs(b-y)===1);
  const C=[];
  for(let dy=-2;dy<=2;dy++)for(let dx=-2;dx<=2;dx++){if(!dx&&!dy)continue;const x=ox+dx,y=oy+dy;if(!free(x,y))continue;
   let sc=nbc(x,y);if(inA(x,y))sc+=0;else if(nearA(x,y))sc+=200;else sc+=100;
   C.push([x,y,sc])}
  C.sort((p,q)=>q[2]-p[2]);
  for(const [x,y] of C){
   if(inA(x,y)&&A.length<2)continue; // never block the only approach
   if(!safeBlock(T,x,y))continue;
   const orig=T[y][x];T[y][x]=9;
   const sgn={x,y,msg:signTxt(type)};
   (mp.signs=mp.signs||[]).push(sgn);SGN.push({sgn,type,map:mp.id,ox,oy,orig,x,y});
   return true}
  return false}
 function covered(mp,ox,oy,r){return SGN.some(g=>g.map===mp.id&&Math.abs(g.ox-ox)<=r&&Math.abs(g.oy-oy)<=r)}
 function ensureSigns(mp){if(!mp||!mp.id||scannedSigns.has(mp.id)||!mp.tiles)return;scannedSigns.add(mp.id);
  const T=mp.tiles,H=T.length,W=T[0].length;
  const walk=(x,y)=>T[y]&&T[y][x]!==undefined&&!K.ut.has(T[y][x]);
  for(let y=1;y<H-1;y++)for(let x=1;x<W-1;x++){const v=T[y][x];
   if(v===3||v===4){if(walk(x+1,y)||walk(x-1,y)||walk(x,y+1)||walk(x,y-1)){if(!covered(mp,x,y,2))placeSign(mp,x,y,v===3?'cut':'str')}}
   else if(v===2){let cross=false;
    for(const [a,b] of [[1,0],[-1,0],[0,1],[0,-1]]){if(!walk(x-a,y-b))continue;
     for(let d=1;d<=6;d++){const vv=(T[y+b*d]||[])[x+a*d];if(vv===2)continue;if(vv!==undefined&&!K.ut.has(vv)){if(d>1)cross=true}break}
     if(cross)break}
    if(cross&&!covered(mp,x,y,3))placeSign(mp,x,y,'surf')}}}
 // scan all ready maps now; lazy maps on entry (applyEdits interval)
 function scanAllSigns(){try{if(!K.ua)return;for(const id in K.ua)ensureSigns(K.ua[id])}catch(e){}}
 setInterval(scanAllSigns,3000);scanAllSigns();
 // keep sign texts in sync with unlocked moves
 let lastFmKey='';setInterval(()=>{try{const m=fm();const k=(m.cut?1:0)+''+(m.surf?1:0)+''+(m.str?1:0);if(k!==lastFmKey){lastFmKey=k;refreshSigns()}}catch(e){}},800);
 // act on bumps
 let lastB=0;
 const DIR={up:[0,-1],down:[0,1],left:[-1,0],right:[1,0]};
 function act(){try{const R=K.Rt;if(K.Et!=='map'||R.moving||!R.bump||R.bump===lastB||performance.now()-R.bump>450)return;
  lastB=R.bump;const d=DIR[R.dir];if(!d)return;const x=R.x+d[0],y=R.y+d[1],ct=K.ct;if(!ct[y]||ct[y][x]===undefined)return;const t=ct[y][x],m=fm();
  if(t===3){if(m.cut){ct[y][x]=0;rec(x,y,0);removeSignFor(K.an().id,x,y);K.Y('lvl');K.Bt('🪓 חתכתם את העץ!',1800)}else K.Bt('🌳 עץ עבה. אולי יעזור אלוף היכל ראשון... (תפריט ☰ ← מהלכי שדה)',2600)}
  else if(t===4){if(!m.str){K.Bt('🪨 סלע כבד מדי. כוח נפתח בניצחון על אלוף היכל שלישי.',2600);return}
   const x2=x+d[0],y2=y+d[1];const free=ct[y2]&&ct[y2][x2]!==undefined&&!K.ut.has(ct[y2][x2])&&ct[y2][x2]!==4&&!K.an().npcs.some(n=>n.x===x2&&n.y===y2)&&!(K.an().links||[]).some(l=>l.x===x2&&l.y===y2)&&(ct[y2][x2]===0||ct[y2][x2]===1);
   if(free){ct[y2][x2]=4;ct[y][x]=0;rec(x,y,0);rec(x2,y2,4);removeSignFor(K.an().id,x,y);K.Y('lvl');K.Bt('💪 דחפתם את הסלע!',1500)}else K.Bt('💪 אין מקום לדחוף את הסלע לשם.',1800)}
  else if(t===2&&!m.surf&&K.ut.has(2)){K.Bt('🌊 מים עמוקים. גלישה נפתחת בניצחון על אלוף היכל שני.',2600)}
 }catch(e){}}
 setInterval(act,120);
 // ---- shadow gang ----
 const SH=[['route-flower','שומר צל ראשון'],['route-swamp','שומרת צל מהביצה'],['route-forest','שומר צל מהיער'],['route-desert','שומר צל מהמדבר'],['route-storm','שומרת צל מהסופה'],['route-volcano','שומר צל מההר']];
 const lines=['המנהיג שלנו ידע שתבואו. אנחנו לא נותנים לילדים לעבור בלי להוכיח את עצמם!','ליקטנו טלטלים נדירים... לא, לא גנבנו. ממש לא. נו, בואו נילחם!','הצל הוא הבית שלנו. אתם נכנסים בלי לבקש רשות!'];
 let placed=false;
 function place(){if(placed||!K.ua||!K.Ha||!K.Ha.length)return;placed=true;
  SH.forEach(([mid,n],i)=>{const mp=K.ua[mid];if(!mp)return;const base=K.Ha.find(h=>h.map===mid&&!/gym|guard/.test(h.id))||K.Ha.find(h=>h.map===mid)||K.Ha.find(h=>h.id==='swamp1');if(!base||!base.team)return;
   const id='shadow'+(i+1);if(K.Ha.some(h=>h.id===id))return;
   const T=mp.tiles,H=T.length,W=T[0].length,used=[...(mp.npcs||[]),...(mp.links||[]),...(mp.signs||[])];
   const wk=v=>v!==undefined&&!K.ut.has(v)&&v!==9&&v!==29&&v!==5;const ok=(x,y)=>[[0,0],[1,0],[-1,0],[0,1],[0,-1],[-2,0],[2,0]].every(([a,b])=>wk((T[y+b]||[])[x+a]))&&!used.some(u=>Math.abs(u.x-x)<2&&Math.abs(u.y-y)<2)&&(K.bt.has(T[y][x])||T[y][x]===1);
   let found=null;for(let k=0;k<400&&!found;k++){const x=3+((i*7+k*5)%(W-6)),y=3+((i*11+k*3)%(H-6));if(ok(x,y))found={x,y}}
   if(!found)return;
   K.Ha.push({id,n,map:mid,x:found.x,y:found.y,team:(i===0?base.team.map(t=>[t[0],t[1]+1]):base.team.map(t=>[t[0],t[1]+2]).concat([[base.team[0][0],base.team[0][1]+3]])).slice(0,4),reward:(base.reward||80)+40,txt:lines[i%3],shadow:true});
   mp.npcs.push({kind:'trainer',ref:id,map:mid,x:found.x,y:found.y,dir:['left','right','down'][i%3],pal:'t'})});
 }
 const BOSS={id:'shadowboss',n:'ראש הצל',map:'hills',x:0,y:0,team:['cat2:38','gh2:39','cubD:40','bell2:40','moth:41'].map(s=>{const[a,b]=s.split(':');return[KEY[a],+b]}),reward:1200,txt:'כל הכבוד, ניצחתם את שומרי הצל שלי. אבל אני עדיין לא נכנע. אני הצל האמיתי!',boss:true,shadow:true};
 function bossPoll(){const F=K.F;if(!F||!F.started||!K.ua)return;const d=F.defeated||{};const n=[1,2,3,4,5,6].filter(i=>d['shadow'+i]).length;
  if(n>=6&&!K.Ha.some(h=>h.id==='shadowboss')){const mp=K.ua['hills'];if(!mp)return;const T=mp.tiles;let found=null;
   for(let y=3;y<T.length-3&&!found;y++)for(let x=4;x<T[0].length-4&&!found;x++)if((K.bt.has(T[y][x])||T[y][x]===1)&&[[1,0],[-1,0],[0,1],[0,-1]].every(([a,b])=>!K.ut.has(T[y+b][x+a])&&T[y+b][x+a]!==9)&&![...(mp.npcs||[]),...(mp.links||[])].some(u=>Math.abs(u.x-x)<3&&Math.abs(u.y-y)<3))found={x,y};
   if(!found)return;BOSS.x=found.x;BOSS.y=found.y;K.Ha.push(BOSS);mp.npcs.push({kind:'trainer',ref:'shadowboss',map:'hills',x:found.x,y:found.y,dir:'down',pal:'t'});
   K.Et='menu';K.Ie(`<h2>🕶️ ראש הצל מופיע!</h2><div class="flav">ניצחתם את כל שומרי הצל. ראש הכנופיה ממתין בגבעות. הוא חזק. הביאו צוות מלא וריפוי.</div><button class="btn grn" id="tlx" style="width:100%">יוצאים!</button>`,mm=>mm.querySelector('#tlx').onclick=closeM)}}
 function gang(){const F=K.F,d=F.defeated||{};
  K.Ie(`<h2>🕶️ כנופיית הצל</h2><div class="flav">כנופיה מקומית נוסעת בין האזורים ומנסה לדחוף ילדים מהדרך. שישה שומרי צל מסתובבים בשבילים ובדרכים (מחפשים אותם: הם מחכים בקו ישר). מנצחים את כולם והמנהיג יופיע בגבעות.</div>`+
   SH.map(([mid,n],i)=>`<div class="tlrow"><div><b>${d['shadow'+(i+1)]?'✅':'⚔️'} ${n}</b><br><small>${mid}</small></div></div>`).join('')+
   `<div class="tlrow"><div><b>${d.shadowboss?'✅':K.Ha.some(h=>h.id==='shadowboss')?'⚔️':'🔒'} ראש הצל</b><br><small>גבעות</small></div></div><button class="btn sec" id="tlx" style="width:100%;margin-top:8px">סגור</button>`,mm=>mm.querySelector('#tlx').onclick=closeM)}
 setInterval(()=>{try{place();bossPoll()}catch(e){console.error(e)}},2000);
 // menu buttons
 setInterval(()=>{try{if(K.Et!=='menu')return;const b=$q('#tlmenu3');if(!b||b.querySelector('#tlfm'))return;
  const add=(id,t,fn)=>{const x=document.createElement('button');x.className='btn';x.id=id;x.innerHTML=t;x.onclick=()=>{K.Pe('mnu');fn()};b.appendChild(x)};
  add('tlfm','🌊 מהלכי שדה',fmModal);add('tlgang','🕶️ כנופיית הצל',gang)}catch(e){}},500);
 setInterval(()=>{const F=K.F;if(F&&F.started&&F.seen64&&!F.seen65&&K.Et==='map'){F.seen65=1;K._();K.Et='menu';K.Ie(`<h2>🆕 גרסה 6.5</h2><div style="text-align:right;font-size:14px;line-height:1.55"><p>🪓💪🌊 <b>מהלכי שדה:</b> מנצחים אלופי היכל ופותחים חיתוך, גלישה וכוח. עוצרים מול עץ או סלע ולוחצים אליו. הסבר בתפריט ☰.</p><p>🕶️ <b>כנופיית הצל:</b> שישה שומרי צל בשבילים ומנהיג אחד בגבעות. אחרי שמנצחים את כולם הוא מופיע.</p></div><button class="btn grn" id="tlx" style="width:100%">יוצאים!</button>`,mm=>mm.querySelector('#tlx').onclick=closeM)}},3000);
 setInterval(()=>{const F=K.F;if(F&&F.started&&F.seen65&&!F.seen66&&K.Et==='map'){F.seen66=1;K._();K.Et='menu';K.Ie(`<h2>🆕 גרסה 6.6 - שלטים ותיקונים</h2><div style="text-align:right;font-size:14px;line-height:1.55"><p>🪧 <b>שלטים חדשים:</b> ליד כל עץ שאפשר לחתוך, סלע שאפשר לדחוף ומים שאפשר לשוט בהם יש שלט קטן. השלט מסביר מה צריך ואיך - קרבו אליו ולחצו בדיקה!</p><p>🪓💪 עצים שחתכתם וסלעים שדחפתם <b>נשארים ככה לתמיד</b>, גם אחרי שסוגרים את המשחק וחוזרים.</p><p>🕶️ תוקן הפרס אחרי הקרב מול ראש הצל: עכשיו מקבלים בדיוק את מה שמובטח - 1200 מטבעות.</p></div><button class="btn grn" id="tlx" style="width:100%">יוצאים!</button>`,mm=>mm.querySelector('#tlx').onclick=closeM)}},3100);
};
window.TL63=function(K){TL63main(K);window.TL63_more&&window.TL63_more(K,window.TLX);window.TL63_r2&&window.TL63_r2(K,window.TLX);window.TL63_r3&&window.TL63_r3(K,window.TLX)};
})();
