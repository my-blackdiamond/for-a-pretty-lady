import {ART} from '../Themes/art.js';
import {el,button} from '../Components/ui.js';
import {CHARACTERS} from '../Screens/story.js';
export function gameLayout({scene,onSettings,onJournal,onParty}){
 const root=el('div','game-screen simple-game'),bg=el('div','landscape');
 bg.style.backgroundImage=`url("${ART.background(scene.background)}")`;
 root.append(bg,el('div','scene-vignette'));
 const top=el('header','game-top');top.append(el('h1','simple-location',scene.location));
 const tools=el('nav','game-tools');tools.setAttribute('aria-label','Menu');
 tools.append(button('Diário',onJournal,{icon:'journal'}),button('Configurações',onSettings,{icon:'settings'}));
 top.append(tools);root.append(top);
 const party=el('aside','party');party.setAttribute('aria-label','Companheiros');
 for(const [name,c]of Object.entries(CHARACTERS)){
  const b=el('button','party-member ornamented');b.type='button';b.setAttribute('aria-label',`Ver ${name}`);b.onclick=()=>onParty(name);
  const img=el('img');img.src=ART.avatar(c.id);img.alt=name;b.append(img);party.append(b);
 }
 root.append(party);
 const stage=el('section','narrative-stage'),status=el('span','save-status sr-only');status.setAttribute('aria-live','polite');
 root.append(stage,status);return {root,stage};
}
