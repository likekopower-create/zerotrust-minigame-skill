const fs=require('fs'),vm=require('vm'),assert=require('assert/strict');
const handlers={};const nodes={};for(const id of ['tap','mode','result','retry','replay'])nodes[id]={disabled:false,hidden:false,textContent:''};
let callbacks,submissions=0,replays=0;
const api={connect:c=>callbacks=c,finish:async p=>{assert.equal(p.rawScore,50);assert.equal(p.metrics.taps,5);submissions++;return {status:'practice',awardedPoints:0};},requestReplay:()=>replays++};
vm.runInNewContext(fs.readFileSync('Developer-Kit/zerotrust-minigame/assets/starter/game/game.js','utf8'),{document:{getElementById:id=>nodes[id],addEventListener:(n,f)=>handlers[n]=f},ZTMiniGame:api,performance:{now:()=>1000},Math});
callbacks.start({embedded:false});assert(!nodes.tap.disabled);callbacks.pause();assert(nodes.tap.disabled);nodes.tap.onclick();assert.equal(submissions,0);callbacks.resume();for(let i=0;i<5;i++)nodes.tap.onclick();assert.equal(submissions,1);nodes.tap.onclick();assert.equal(submissions,1);assert(nodes.tap.disabled);callbacks.stop();assert(nodes.tap.disabled);
setImmediate(()=>{assert(nodes.result.textContent.includes('ไม่'));nodes.replay.onclick();assert.equal(replays,1);console.log('PASS game demo: practice start, pause blocks input, resume, finish once, no real-score claim, stop and replay request');});
