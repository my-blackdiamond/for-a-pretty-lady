const ALPHABET='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const NUMBERS=[17,4,22,9,3,25,11,6,20,1,14,8,26,5,16,12,2,23,10,7,24,15,19,13,21,18];
const ANSWER='A LUZ DA TOCHA REVELA A PASSAGEM';
const CIPHER=Object.fromEntries([...ALPHABET].map((letter,i)=>[letter,NUMBERS[i]]));
const WORDS=ANSWER.split(' ').map(word=>[...word].map(letter=>CIPHER[letter]));
const CODES=[...new Set(WORDS.flat())].sort((a,b)=>a-b);
const GIVEN={[CIPHER.A]:'A',[CIPHER.E]:'E'};
function freshGate(){return{entries:{...GIVEN},hints:0,attempts:0,tutorialSeen:false,decoded:false,solved:false}}
function normalizeLetter(value){return String(value).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toUpperCase().replace(/[^A-Z]/g,'').slice(-1)}
function evaluateGate(entries){const letters={...entries,...GIVEN},used=new Set();for(const code of CODES){const letter=normalizeLetter(letters[code]||'');if(!letter)return'incomplete';if(used.has(letter))return'conflict';used.add(letter)}return WORDS.map(word=>word.map(code=>normalizeLetter(letters[code])).join('')).join(' ')===ANSWER?'solved':'incorrect'}
const HINTS=['Comece pelas palavras de uma letra: o número 17 já representa A. Uma letra descoberta vale para todas as casas com o mesmo número.','Na segunda palavra, o número 8 representa L. Na palavra de cinco letras depois de DA, o número 7 representa T. Pense no que o grupo carrega para iluminar uma tumba.','A segunda palavra é LUZ; a palavra depois de DA é TOCHA. O que a luz pode revelar em uma entrada escondida?'];
module.exports={ANSWER,WORDS,CODES,GIVEN,CIPHER,HINTS,freshGate,normalizeLetter,evaluateGate};
