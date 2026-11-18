import {SCENES,CHEST_REACTIONS} from './story.js';
export {SCENES};

// Fewer conversational stops; full character lines and choice-specific comic reactions.
const say=(who,text)=>[who,text];
const reply=(text,lines,key)=>[text,lines,key];
const ask=options=>['Você','',options];
SCENES.camp.lines=[
 say('Narrador','Gale sacode uma bolsa. Cai terra. Ele sacode de novo, como se a terra tivesse entendido errado.'),
 say('Gale','O astrolábio desapareceu. Antes que alguém pergunte: não, eu não comi. Estou disposto a aceitar acusações com fundamento, mas gostaria de terminar o jantar sem apresentar um álibi intestinal.'),
 say('Shadowheart','A bolsa foi cortada por dentro. Tem necromancia no fecho e um rastro saindo do acampamento. Olha só, Gale. Seu objeto conseguiu fugir antes de nós.'),
 say('Gale','Ele mede concentrações de magia. Algum encantamento nas ruínas deve tê-lo atraído. Normalmente, ele aponta para a fonte. Desta vez, preferiu ir pessoalmente. Uma iniciativa lamentável num instrumento de navegação.'),
 say('Gale','É um problema de instruções. Certa vez encantei uma chaleira para buscar água. Esqueci de estabelecer um limite de distância. Ela desapareceu por três dias e voltou com água do mar e um caranguejo bastante contrariado.'),
 say('Gale','O caranguejo se recusou a sair. Levantava as pinças toda vez que eu tentava preparar chá. Passei uma manhã negociando o uso da minha própria chaleira com um animal que nem sequer contribuía com o aluguel.'),
 say('Gale','Tentei oferecer uma tigela maior. Ele aceitou a tigela e continuou ocupando a chaleira. Foi nesse momento que percebi que estava lidando com uma criatura de considerável talento para negócios.'),
 say('Gale','Por isso, quando digo que devemos recuperar o astrolábio antes que algo se instale dentro dele, não é uma preocupação abstrata. Ainda tenho uma tampa que preciso abrir com uma colher muito comprida.'),
 ask([
  reply('Você perdeu uma discussão imobiliária para um caranguejo?',[
   say('Gale','Perdi a primeira. A segunda terminou num acordo: ele fica com a chaleira, eu fico com todos os meus dedos. Não é o resultado que eu esperava, mas meus dedos votaram a favor.'),
   say('Karlach','Eu quero conhecer esse filho da puta. Ele parece bom de conversa.')],'gale-crab'),
  reply('Gale. Vamos buscar o astrolábio antes de você explicar o contrato.',[
   say('Gale','Justíssimo. A versão breve é: seguimos o rastro, interrompemos a ligação e recuperamos o objeto. A versão longa inclui uma disputa sobre quem era dono da água.'),
   say('Shadowheart','Guarde para ameaçar quem estiver com o astrolábio.')],'gale-focus'),
  reply('Astarion, esvazia os bolsos antes de a gente culpar a necromancia.',[
   say('Astarion','Uma garrafa, duas gazuas e uma quantidade ofensivamente pequena de dinheiro. Se eu tivesse roubado o astrolábio, esta seria uma noite muito mais lucrativa.'),
   say('Gale','A garrafa também é minha.'),
   say('Astarion','Então retire a palavra “roubado” da conversa e devolvo a rolha.')],'pockets')
 ]),
 say('Karlach','Achei os rastros atrás da minha barraca. Vamos seguindo e vocês resolvem a custódia do vinho no caminho. A panela já tentou levantar a tampa duas vezes; prefiro que a gente esteja longe quando ela descobrir as pernas.')
];
SCENES.camp.next='packing';
SCENES.packing={title:'Preparativos questionáveis',location:'Acampamento',background:'camp',objective:'Sair do acampamento com o grupo.',next:'path',lines:[
 say('Narrador','Shadowheart prende uma poção à sua mochila. Karlach abafa a panela com uma pedra. Algo lá dentro bate de volta.'),
 say('Shadowheart','Poção de cura. Beba se estiver sangrando. Se começar a ouvir vozes, confira primeiro se é o Gale; eu só tenho três dessas e ele não responde ao tratamento.'),
 ask([
  reply('Você está cuidando de mim. Vou ficar insuportável com essa informação.',[
   say('Shadowheart','Você já estava. Estou tentando preservar o investimento que fiz em tolerar você até aqui.'),
   say('Karlach','Ah, isso foi fofo pra caralho. Ela devia escrever cartões.')],'shadowheart-care'),
  reply('Se eu beber agora, fico protegida contra decisões ruins?',[
   say('Shadowheart','Não. Se existisse uma poção assim, eu teria colocado no vinho de todos vocês e passado a noite dormindo.'),
   say('Gale','Algumas das minhas melhores descobertas começaram com decisões ruins. Reconheço que isso também descreve a maior parte das explosões.')],'potion'),
  reply('Guarda a poção. Se eu cair, a Karlach me leva no ombro.',[
   say('Karlach','Levo! Só avisa se você enjoa. Uma vez carreguei um sujeito correndo e descobri o jantar dele no meu pescoço.'),
   say('Shadowheart','Vou prender a poção mesmo assim. E um pano.')],'carry')
 ]),
 say('Narrador','Vocês deixam o acampamento. Atrás, a panela dá uma última pancada. Ninguém se oferece para voltar.')
]};
SCENES.path.lines=[
 say('Narrador','Dois sulcos atravessam a trilha até uma raiz marcada de prata. Um corvo observa Gale com a hostilidade de quem reconheceu um devedor.'),
 say('Gale','Uma lasca do astrolábio. A ligação está mais forte. Quanto ao pássaro, não o conheço e gostaria que isso constasse antes de alguém mencionar o caranguejo.'),
 ask([
  reply('Boa noite, senhor corvo. Veio cobrar a chaleira?',[
   say('Narrador','O corvo caga na raiz, a um palmo da mão de Gale.'),
   say('Gale','Recebido. Uma contestação formal, entregue com notável precisão.'),
   say('Karlach','Caralho. Se ele voar até a chaleira, eu sigo. Quero ver a reunião.')],'raven'),
  reply('Isso pode ser um familiar. Shadowheart, ele está espionando a gente?',[
   say('Shadowheart','Se estiver, o dono já sabe que perdemos um objeto, discutimos com crustáceos e trouxemos vinho. Deve estar escolhendo entre uma emboscada e um convite para jantar.'),
   say('Narrador','O corvo grasna e voa para a encosta. O rastro segue na mesma direção.')],'familiar'),
  reply('Gale, guarda a lasca. Se esse pássaro falar, eu vou embora.',[
   say('Narrador','Gale guarda a lasca num lenço. O tecido estica na direção das ruínas.'),
   say('Gale','Está puxando. Excelente! Não precisamos de orientação do pássaro.'),
   say('Astarion','Uma pena. Eu estava ansioso para ouvir outra pessoa.')],'follow')
 ]),
 say('Narrador','O rastro sobe a encosta. O corvo chega primeiro e parece fazer questão de deixar isso claro.')
];
SCENES.path.next='crossing';
SCENES.crossing={title:'A bota ficou',location:'Trilha da encosta',background:'journey',objective:'Atravessar a lama até as ruínas.',next:'approach',lines:[
 say('Narrador','O chão cede. Seu pé volta; a bota não. A lama solta um ruído molhado que ninguém tem maturidade para ignorar.'),
 say('Karlach','Não olha pra mim. Dessa vez foi o chão. Quer uma mão ou quer fingir que está examinando uma pista?'),
 ask([
  reply('Karlach, puxa. Se eu sair sem a bota, a gente incendeia essa porra.',[
   say('Karlach','Adoro um plano que já vem com segunda etapa. Segura firme!'),
   say('Narrador','Ela puxa você com a bota e um torrão inteiro. A lama acerta a capa de Astarion.'),
   say('Astarion','Não, não. Fiquem à vontade. Eu estava mesmo precisando de um motivo novo para odiar a natureza.')],'karlach-pull'),
  reply('Gale, faça alguma coisa mágica. Sem explodir minha perna.',[
   say('Gale','Uma restrição bastante razoável. Vou usar uma Mão Mágica. Ela não tem nariz, portanto é o membro mais bem equipado do grupo para a tarefa.'),
   say('Narrador','A mão azulada recupera a bota. Antes de desaparecer, parece mostrar o dedo para a lama.'),
   say('Gale','Eu não instruí esse último movimento. Prefiro acreditar que foi solidariedade profissional.')],'gale-hand'),
  reply('Astarion, me ajuda. Pode reclamar enquanto puxa.',[
   say('Astarion','Que generosidade. Uma experiência desagradável com autorização expressa para descrevê-la.'),
   say('Narrador','Ele segura seu pulso e puxa. A bota se solta com um estalo indecente.'),
   say('Astarion','Pronto. Você está livre, a bota está traumatizada e eu vou lavar essa mão até esquecer que tenho pele.')],'astarion-hand')
 ]),
 say('Narrador','Vocês sobem até o arco de pedra. Karlach confere se você trouxe os dois pés; Shadowheart confere se alguém trouxe bom senso. Só uma delas fica satisfeita.')
]};
SCENES.approach={title:'Visita sem agendamento',location:'Encosta das ruínas',background:'ruins',objective:'Entrar nas ruínas.',next:'ruins',lines:[
 say('Narrador','Na soleira: “Que os mortos guardem o que os vivos…” Falta o resto da pedra. Lá dentro, metal raspa no chão.'),
 say('Shadowheart','Uma inscrição funerária incompleta e alguém arrastando uma arma. Já fui recebida pior, mas geralmente havia parentes envolvidos.'),
 ask([
  reply('“…não tiveram juízo de deixar em paz.” Pronto, tradução concluída.',[
   say('Shadowheart','Admirável. Nenhum conhecimento do idioma e já conseguiu culpar todos os envolvidos. Há sacerdotes que passam anos estudando para fazer isso.')],'translation'),
  reply('Karlach, bate na porta. Com a mão, por favor.',[
   say('Karlach','Ah. Tá. Você precisa avisar essas coisas antes de eu me animar.'),
   say('Narrador','Karlach bate. Uma lâmina atravessa a fresta. Ela recolhe a mão, ofendida.'),
   say('Karlach','Bom, tentei a sua versão. Agora posso usar a minha?')],'knock'),
  reply('Gale, anuncie nossa chegada. A versão que não exige sentar.',[
   say('Gale','Estamos aqui para recuperar um astrolábio de prata. Uma devolução imediata evitará uma exposição sobre propriedade arcana, responsabilidade custodial e—'),
   say('Narrador','Uma lâmina bate no portão. Gale suspira.'),
   say('Gale','Nem cheguei aos precedentes.')],'announce')
 ]),
 say('Narrador','O portão abre para dentro. Pela primeira vez na noite, ninguém precisa perguntar se aquilo era uma ameaça.')
]};
SCENES.ruins.lines=[
 say('Narrador','Dois esqueletos se erguem dos escombros. A luz prateada entre as costelas combina mal com as espadas enferrujadas.'),
 say('Gale','O astrolábio está alimentando esses guardas. Estamos prestes a ser agredidos com energia que era nossa. Eu considero isso uma cobrança indevida.'),
 say('Karlach','Um pra cada lado! E alguém guarda um osso. Quero mostrar pra panela o que acontece com quem tenta sair andando.')
];
SCENES.dark.lines=[
 say('Narrador','Os guardas desabam. Uma escada leva à tumba. Karlach pisa num fêmur; o estalo recebe um pedido de desculpas automático.'),
 say('Shadowheart','Uma tumba escondida. Maravilha. Se alguém perguntar, estamos procurando uma saída e os objetos valiosos vieram pedir ajuda.'),
 ask([
  reply('Entra comigo. Se algo me possuir, quero alguém competente por perto.',[
   say('Shadowheart','Se algo possuir você, vou começar perguntando se sabe onde está o astrolábio. Temos que aproveitar qualquer melhora no atendimento.')],'shadowheart-close'),
  reply('Karlach vai comigo. Quero alguém que consiga discutir com a porta.',[
   say('Karlach','Deixa comigo. Se ela não abrir, vira duas portas menores.'),
   say('Gale','Não é assim que portas funcionam.'),
   say('Karlach','É assim que as minhas acabam.')],'karlach-front'),
  reply('Gale, ameaça dar outra palestra. Talvez o guardião entregue tudo.',[
   say('Gale','Não vou usar conhecimento como instrumento de tortura. Posso, entretanto, oferecer uma contextualização histórica sem limite de perguntas.'),
   say('Astarion','Abra logo. Eu confesso qualquer coisa se ele começar.')],'lecture')
 ])
];
SCENES.tomb.lines=[
 say('Narrador','Uma armadura vazia guarda um baú. O astrolábio brilha no peitoral. Dele ecoa: “Nenhuma mão levará o que foi confiado à minha vigília.”'),
 ask([
  reply('Gale, usa a Mão Mágica. Ele acabou de proibir as outras.',[
   say('Gale','A palavra “nenhuma” me preocupa. É desagradavelmente abrangente para quem esperava resolver isso com um detalhe técnico.'),
   say('Narrador','A armadura ergue a espada. A Mão Mágica de Gale recua antes de qualquer outra pessoa.')],'technicality'),
  reply('Estamos aqui para encerrar seu turno. Pode ir mijar.',[
   say('Karlach','Olha pra ele. Se tiver uma bexiga aí dentro, eu tenho perguntas bem mais urgentes que esse astrolábio.'),
   say('Narrador','A armadura avança. Pelo visto, o intervalo foi negado.')],'shift'),
  reply('A gente leva o astrolábio, você fica com o baú. Divórcio amigável.',[
   say('Shadowheart','Não ofereça os bens antes de saber o que tem dentro.'),
   say('Astarion','Finalmente alguém levando essa negociação a sério.'),
   say('Narrador','A armadura responde com a espada. A partilha segue para uma instância menos civilizada.')],'bargain')
 ])
];
SCENES.victory.lines=[
 say('Narrador','A armadura desmonta. Você recupera o astrolábio. Do relicário escapa uma última voz: “A vigília… terminou.”'),
 say('Karlach','Viu? Folga concedida. Deitou rapidinho.'),
 say('Gale','O baú tem uma fechadura de três círculos, com duzentas posições em cada um. Quem fez isso tinha tempo, talento e absolutamente ninguém esperando em casa.'),
 say('Shadowheart','Abra. Se ele começar a explicar todas as combinações, eu entro no sarcófago e tranco por dentro.')
];
CHEST_REACTIONS.splice(0,3,
 'O primeiro círculo volta ao lugar. Astarion: “Ah, gosta de dificultar para parecer interessante. Já conheci essa fechadura em forma de pessoa.”',
 'O segundo círculo quase encaixa. Gale abre a boca. Shadowheart aponta para ele: “Nem uma probabilidade. Uma só e eu arranco essa tampa.”',
 'Os círculos se alinham. Karlach abre os braços: “ISSO! Chupa, porta pequena!” O baú se abre e a luz toma a câmara.'
);

// Puzzle edition: a sealed gate before the original courtyard battle.
SCENES.approach.next='castleGate';
SCENES.approach.location='Portão do castelo em ruínas';
SCENES.approach.lines[SCENES.approach.lines.length-1]=say('Narrador','O portão abre para uma grade interna coberta de números. A lâmina recolhe. Até os mortos respeitam a fila do atendimento.');
SCENES.castleGate={title:'A inscrição do portão',location:'Portão do castelo',background:'ruins',objective:'Decifrar o selo e interpretar a instrução para abrir o portão.',next:'ruins',puzzle:true,lines:[
 say('Narrador','Números ocupam as casas de uma inscrição. Duas letras ainda estão legíveis. Um suporte para tocha foi esculpido ao lado do selo.'),
 say('Gale','Uma cifra por substituição. Posso explicar a origem histórica ou podemos tentar sair daqui antes que ela também vire história.'),
 say('Karlach','A gente tenta as letras primeiro. Se a porta corrigir minha ortografia, eu derrubo.')
]};
