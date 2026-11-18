import {ART} from '../Themes/art.js';
const cached=new Map();
export function preloadImage(src){if(cached.has(src))return cached.get(src);const task=new Promise(resolve=>{const image=new Image();let timer;const finish=()=>{clearTimeout(timer);resolve()};image.onload=finish;image.onerror=finish;timer=setTimeout(finish,4500);image.src=src;if(image.complete)finish()});cached.set(src,task);return task}
export async function prepareScene(scene){await Promise.all([ART.background(scene.background),...['astarion','gale','shadowheart','karlach'].map(ART.character),...(scene.battle?[ART.enemy(scene.battle)]:[])].map(preloadImage));if(document.fonts)await Promise.race([document.fonts.ready,new Promise(resolve=>setTimeout(resolve,1500))])}
export const pause=ms=>new Promise(resolve=>setTimeout(resolve,ms));
