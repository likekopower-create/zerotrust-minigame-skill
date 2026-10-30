(function(root){
 'use strict';
 function validate(message,context){
  if(!message||typeof message!=='object'||Array.isArray(message))return 'INVALID_MESSAGE';
  if(message.channel!=='zt-minigame'||message.version!==1||message.type!=='result')return 'INVALID_PROTOCOL';
  if(message.gameId!==context.gameId||message.sessionId!==context.sessionId||message.runId!==context.runId)return 'INVALID_SESSION';
  if(typeof message.eventId!=='string'||!/^[0-9a-f-]{36}$/i.test(message.eventId))return 'INVALID_EVENT_ID';
  const p=message.payload;
  if(!p||!['completed','failed','abandoned'].includes(p.outcome))return 'INVALID_OUTCOME';
  if(!Number.isSafeInteger(p.rawScore)||p.rawScore<0||p.rawScore>50)return 'INVALID_SCORE';
  if(!Number.isSafeInteger(p.durationMs)||p.durationMs<0||p.durationMs>3600000)return 'INVALID_DURATION';
  if(p.outcome==='completed'&&(p.rawScore!==50||p.metrics?.taps!==5))return 'INVALID_COMPLETION';
  return null;
 }
 function reward(payload){return payload.outcome==='completed'&&payload.rawScore===50?10:0;}
 const api={validate,reward};root.ZTMockRules=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
