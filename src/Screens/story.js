export const CONFIG={title:'A última vigília',message:`Tentei escrever esse texto umas 100x KKKKKKK

Eu só quero que saiba que eu sempre vou estar aqui por você, Ketlyn Andressa. Eu estou muito feliz por ter conhecido você. Sabe, você é incrível, Ketlyn, uma pessoa especial para mim e para os outros. Você passou por tanto e luta todos os dias para ficar melhor. Seu esforço não será em vão, e eu vejo isso. Você é tão forte.

Além de ser uma pessoa carinhosa, você se importa com quem está próximo de você. É uma pessoa divertida, que faz os outros sorrirem e consegue tornar os momentos mais leves. Você é atenciosa, tem um coração enorme, mesmo você negando isso tudo kkkk você sabe fazer as pessoas se sentirem importantes e, mesmo com tudo que já passou, continua tentando seguir em frente e ser uma pessoa melhor.

Eu agradeço muito por ter essa amizade com você... Como eu disse para você, você preencheu um vazio em mim. Eu realmente estava preso em uma solidão, e ter você na minha vida mudou isso. Eu quero retribuir, sabe? Você merece todo o amor do mundo, e tudo o que estou fazendo é para te provar isso.

Demonstrar amor é baseado em ações, sabe? Não são apenas bens materiais dados a outra pessoa ou mostrar para as outras pessoas que você tem vínculo com alguém. São ações, esforços, troca de energia, sacrifícios e, muitas vezes, deixar um diamante seguir o seu caminho, por mais que doa.

Eu espero que tenha se divertido, meu bem. Eu realmente coloquei a minha alma em tudo isso. Você merece ter pessoas na sua vida que estejam dispostas a te amar e a fazer qualquer coisa por você, a te perdoar a qualquer momento e a te apoiar até nos momentos difíceis, sem te julgar ou tentar dar pitaco nas suas decisões.

E isso não é sobre relacionamento. É sobre a sua vida mesmo. Qualquer pessoa que esteja na sua vida deveria ser capaz de te oferecer isso.

Bom, espero que aproveite o seu presente, meu amor. Nunca fiquei tão feliz por dedicar tanto a alguém, porque eu sei que esse alguém vale a pena. Independentemente do que formos, sempre valerá a pena.

Te amo, Ketlyn Andressa. Feliz aniversário! ❤️`,reveal:'Olhe a sua Steam donzelakkkkk',memeAudio:'ui/audio/faaah-final.mp3'};
export const CHARACTERS={Astarion:{id:'astarion',role:'Elfo · Ladino',color:'#9b5759'},Gale:{id:'gale',role:'Humano · Mago',color:'#8d7baf'},Shadowheart:{id:'shadowheart',role:'Meio-elfa · Clériga',color:'#81a19e'},Karlach:{id:'karlach',role:'Tiefling · Bárbara',color:'#bd7953'}};
export const SCENES={
camp:{title:'Uma ausência inconveniente',location:'Acampamento',background:'camp',objective:'Descobrir o que desapareceu.',next:'path',lines:[
['Astarion','Ah, {nome}. Excelente. Estávamos justamente precisando de alguém capaz de encontrar um objeto sem transformar a busca numa palestra.'],
['Gale','O astrolábio de prata desapareceu. Ele estava entre os objetos recuperados na estrada. Agora há pegadas saindo do acampamento e um resíduo de magia necromântica na bolsa.'],
['Shadowheart','Também encontramos isso: um pedaço de tecido preso na cerca. Cheira a terra de cemitério. E a decisões ruins.'],
['Karlach','As pegadas vão para a Vila Arruinada. Uma caminhada, um pouco de aventura… Já tivemos noites piores.'],
['Astarion','Sim. E algumas delas começaram exatamente com essa frase. Você vem?',[
['Vou. Mas você procura as armadilhas.','Com prazer. Prefiro encontrá-las antes que alguém decida testá-las com o próprio rosto.','careful'],
['Um objeto prateado? Achei que você saberia onde está.','Uma acusação elegante. Infundada, naturalmente. Eu teria escolhido algo mais fácil de vender.','tease'],
['Gale, por que precisamos desse astrolábio?','Ele registra alinhamentos mágicos. Nas mãos erradas, pode indicar lugares que seria prudente manter esquecidos.','curious']]]]},
path:{title:'O caminho entre as árvores',location:'Arredores da Vila Arruinada',background:'journey',objective:'Seguir os rastros até as ruínas.',next:'ruins',lines:[
['Narrador','A trilha deixa a estrada para trás. As pegadas ficam mais profundas, como se aquilo que as fez carregasse um peso que não tinha no começo.'],
['Gale','Vejam a vegetação. As raízes crescem em direção à mesma encosta. Alguma fonte de magia está atraindo tudo para lá.'],
['Astarion','Maravilhoso. Até as plantas estão indo voluntariamente para o lugar sinistro. Finalmente encontramos companhia com o nosso discernimento.'],
['Shadowheart','Há uma construção no alto da encosta. Ou o que sobrou dela. Os rastros continuam pelo portão.'],
['Karlach','Então é por ali. Fiquem perto. Se alguma pedra tentar morder vocês, eu mordo de volta.']]},
ruins:{title:'O que ainda guarda o portão',location:'Ruínas da encosta',background:'ruins',objective:'Abrir caminho pelo antigo pátio.',next:'dark',battle:'skeletons',lines:[
['Narrador','Além do portão partido, duas figuras se erguem entre os escombros. Ossos raspam em metal enferrujado. Um fio de luz prateada pulsa entre suas costelas.'],
['Astarion','Ah. Os moradores. Eu sugeriria conversar, mas parecem ter deixado a língua em outro lugar.'],
['Gale','O astrolábio está alimentando alguma coisa abaixo destas ruínas. Esses guardas não estavam despertos há muito tempo.'],
['Karlach','Então vamos devolver os dois ao descanso. {nome}, escolha uma abertura. A gente acompanha você.']]},
dark:{title:'Onde a luz não alcança',location:'Passagem sob as ruínas',background:'tomb',objective:'Localizar a entrada da tumba.',next:'tomb',lines:[
['Narrador','O último guarda desaba. Sob as raízes do pátio, uma escada leva a um corredor que não deveria caber dentro da colina. O ar cheira a pedra molhada.'],
['Shadowheart','Esses entalhes não são de uma despensa. Estamos entrando numa tumba. E alguém trabalhou bastante para que ninguém a encontrasse.'],
['Astarion','Uma porta escondida, mortos inquietos e nenhum anfitrião. Talvez devêssemos considerar a possibilidade de não sermos bem-vindos.'],
['Gale','O rastro termina logo adiante. Se deixarmos o astrolábio aqui, o que despertou continuará recebendo energia.'],
['Astarion','É claro. A alternativa sensata seria conveniente demais. O que você acha, {nome}?',[
['Entramos juntos. Ninguém fica para trás.','Juntos, então. Mas se alguma coisa se agarrar a mim, vou esperar uma ajuda muito rápida.','together'],
['Só uma olhada. Depois decidimos.','A frase favorita de quem acaba abrindo sarcófagos. Muito bem. Uma olhada extremamente cuidadosa.','peek'],
['Estou com medo. Ainda assim, vou entrar.','Bom. O medo costuma notar coisas que a coragem pisa em cima. Não o desperdice.','honest']]]]},
tomb:{title:'A última vigília',location:'Tumba do vigia sem nome',background:'tomb',objective:'Enfrentar o guardião do relicário.',next:'victory',battle:'warden',lines:[
['Narrador','A porta cede. No centro da câmara, uma armadura vazia se ajoelha diante de um baú. O astrolábio brilha encaixado em seu peitoral. Então o elmo se volta para você.'],
['Narrador','Do astrolábio ecoa uma voz antiga: “Nenhuma mão levará o que foi confiado à minha vigília.”'],
['Gale','O objeto está preso a um juramento antigo. Não foi um roubo deliberado… o encantamento o chamou para substituir sua fonte de energia.'],
['Astarion','Um equívoco perfeitamente compreensível. Devolva o astrolábio e teremos a bondade de não comentar sua falta de hospitalidade.'],
['Narrador','O juramento ressoa no astrolábio: “Minha vigília não termina.” A armadura ergue a lâmina.'],
['Karlach','Talvez você só precise de uma folga. A gente vai ajudar a encerrar o expediente.']]},
victory:{title:'Silêncio, enfim',location:'Câmara do relicário',background:'tomb',objective:'Examinar o baú atrás do guardião.',next:'chest',lines:[
['Narrador','A luz se desprende da armadura. As placas tocam o chão, uma a uma. Você recupera o astrolábio; o ar da tumba finalmente deixa de pesar sobre seus ombros.'],
['Narrador','Uma última lembrança escapa do relicário: “A vigília… terminou.”'],
['Shadowheart','Que encontre algum descanso. E que nós encontremos uma saída menos úmida.'],
['Gale','Há outra coisa. O baú foi protegido separadamente. Três círculos, duzentas marcas em cada um… Uma fechadura probabilística.'],
['Astarion','Ou podemos simplesmente quebrá-lo. Não? Claro que não. Seria um desrespeito terrível com a fechadura.'],
['Karlach','Depois de tudo isso, eu quero ver o que tem aí. Sua vez, {nome}.']]}
};
export const ENEMIES={skeletons:{name:'Guerreiros Sepultados',subtitle:'Dois guardas despertos',hp:10,attack:'Lâmina enferrujada',taunt:'As duas sentinelas arrastam as espadas pelo chão.',icon:'skull'},warden:{name:'Armadura Animada',subtitle:'Guardião do relicário · Chefe',hp:22,attack:'Golpe do juramento',taunt:'A armadura ergue a espada diante do relicário.',icon:'shield'}};
export const CHEST_REACTIONS=['O primeiro círculo gira… e volta ao lugar. Astarion ergue uma sobrancelha. “Uma fechadura que gosta de atenção. Reconheço o tipo.”','O segundo círculo quase se encaixa. Quase. Gale examina o selo: “Ainda há uma ressonância. Não terminou.”','Os três círculos se alinham. A fechadura cede. A luz toma a câmara — e tudo desaparece.'];
