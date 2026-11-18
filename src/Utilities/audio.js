import {Howl,Howler} from 'howler';
let ready=false,active=null,desired=null,transition=0;const sounds={},tracks={};
export function audioSettings(s){Howler.volume(s.volume);Howler.mute(s.muted)}
export function startAudio(s){audioSettings(s);if(ready)return;ready=true;for(const n of ['click','roll','success','failure','combat','discovery','transition','final'])sounds[n]=new Howl({src:[`ui/audio/${n}.wav`],volume:n==='final'?.9:.65});tracks.calm=new Howl({src:['ui/audio/i-want-to-live-loop.ogg'],loop:true,volume:0});}
export function musicForPhase(phase){const mode=['dialogue','chest','combat','roll','gate-tutorial','cryptogram'].includes(phase)?'calm':null;setMusic(mode)}
function setMusic(mode){if(!ready||mode===desired)return;desired=mode;const ticket=++transition,previous=tracks[active];for(const track of Object.values(tracks))track.off('fade');const begin=()=>{if(ticket!==transition)return;if(previous)previous.pause();active=mode;const next=tracks[mode];if(next){if(!next.playing())next.play();next.fade(next.volume(),mode==='combat'?.34:.44,700)}};if(previous?.playing()){previous.once('fade',begin);previous.fade(previous.volume(),0,400)}else begin()}

export function sound(n){sounds[n]?.play()}
export function stopAmbient(){setMusic(null)}
export function finalAudio(src){stopAmbient();if(src){new Howl({src:[src],volume:.9,autoplay:true,loop:false})}else sound('final')}
