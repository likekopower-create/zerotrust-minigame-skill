(() => {
  'use strict';
  const $=id=>document.getElementById(id);let taps=0,paused=false,stopped=false,finished=false,startTime=0,lastResult=null,hosted=false;
  function sync(){ $('tap').disabled=paused||stopped||finished;$('tap').textContent='แตะ '+taps+' / 5'; }
  async function submit(){ $('retry').hidden=true;try{const ack=await ZTMiniGame.finish(lastResult);$('result').textContent=ack.status==='practice'?'จบรอบฝึก คะแนนเกม 50 ยังไม่ได้บันทึกเข้า Simulation':'โฮสต์ทดสอบรับผลแล้ว ได้รับคะแนนจำลอง '+ack.awardedPoints; $('replay').hidden=false;}catch(error){$('result').textContent=error.message;$('retry').hidden=false;} }
  $('tap').onclick=()=>{if(paused||stopped||finished)return;taps++;sync();if(taps===5){finished=true;sync();lastResult={outcome:'completed',rawScore:50,durationMs:Math.max(0,Math.round(performance.now()-startTime)),metrics:{taps:5}};submit();}};
  $('retry').onclick=submit;$('replay').onclick=()=>ZTMiniGame.requestReplay();
  ZTMiniGame.connect({start(info){hosted=info.embedded;taps=0;paused=false;stopped=false;finished=false;lastResult=null;startTime=performance.now();$('mode').textContent=hosted?'เชื่อมกับโฮสต์ทดสอบแล้ว':'โหมดเล่นแยก ไม่บันทึกคะแนนจริง';$('result').textContent='';$('replay').hidden=true;$('retry').hidden=true;sync();},pause(){paused=true;$('mode').textContent='พักเกมอยู่';sync();},resume(){paused=false;$('mode').textContent=hosted?'เชื่อมกับโฮสต์ทดสอบแล้ว':'โหมดเล่นแยก';sync();},stop(){stopped=true;sync();},error(text){$('mode').textContent=text;}});
  document.addEventListener('visibilitychange',()=>{if(!document.hidden&&!hosted&&!stopped){paused=false;sync();}});
})();
