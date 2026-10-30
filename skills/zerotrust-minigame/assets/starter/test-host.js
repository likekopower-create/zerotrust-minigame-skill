(() => {
 'use strict';
 const frame=document.getElementById('game'),origin=location.origin,gameId='tap-training';
 let sessionId=crypto.randomUUID(),runId=crypto.randomUUID(),total=0,last=null,open=true,paused=false;
 const receipts=new Map();
 function log(text){document.getElementById('log').textContent=(text+'\n'+document.getElementById('log').textContent).slice(0,7000);}
 function send(type,payload={},eventId=crypto.randomUUID()){frame.contentWindow.postMessage({channel:'zt-minigame',version:1,type,gameId,sessionId,runId,eventId,payload},origin);}
 function accept(m){const error=ZTMockRules.validate(m,{gameId,sessionId,runId});if(error){send('ack',{status:'rejected',reason:error},m?.eventId);log('ปฏิเสธ '+error);return;}
  let receipt=receipts.get(runId);
  if(receipt&&receipt.eventId!==m.eventId){send('ack',{status:'rejected',reason:'ROUND_ALREADY_FINISHED'},m.eventId);return;}
  if(!receipt){const awardedPoints=ZTMockRules.reward(m.payload);receipt={eventId:m.eventId,status:'accepted',awardedPoints,persisted:'mock-only'};receipts.set(runId,receipt);total+=awardedPoints;document.getElementById('total').textContent=total;log('รับผล '+m.payload.rawScore+' ให้คะแนนจำลอง '+awardedPoints);}else log('ผลซ้ำ ตอบ receipt เดิม ไม่บวกซ้ำ');
  if(!document.getElementById('dropAck').checked)send('ack',receipt,m.eventId);
 }
 function load(){open=true;paused=false;sessionId=crypto.randomUUID();runId=crypto.randomUUID();last=null;frame.src='game/index.html?hostOrigin='+encodeURIComponent(origin);}
 window.addEventListener('message',event=>{if(!open||event.source!==frame.contentWindow||event.origin!==origin)return;const m=event.data;if(!m||m.channel!=='zt-minigame'||m.version!==1||m.gameId!==gameId)return;
  if(m.type==='ready'){send('init',{locale:'th'});return;}
  if(m.sessionId!==sessionId||m.runId!==runId)return;
  if(m.type==='result'){last=m;accept(m);}
  if(m.type==='replay-request'&&receipts.has(runId)){runId=crypto.randomUUID();last=null;paused=false;send('init',{locale:'th'});}
 });
 document.getElementById('rotate').onclick=()=>frame.classList.toggle('landscape');document.getElementById('pause').onclick=()=>{paused=true;send('pause');};document.getElementById('resume').onclick=()=>{paused=false;send('resume');};
 document.getElementById('duplicate').onclick=()=>{if(last)accept(last);else log('ยังไม่มีผลให้ส่งซ้ำ');};document.getElementById('exit').onclick=()=>{send('stop');open=false;frame.src='about:blank';log('ออกจากเกมแล้ว');};document.getElementById('open').onclick=load;
 document.addEventListener('visibilitychange',()=>{if(document.hidden&&open){paused=true;send('pause');}});
 if(location.protocol==='file:')log('เปิดผ่าน HTTP เช่น http://127.0.0.1:8780/test-host.html จึงทดสอบ origin ได้');else load();
})();
