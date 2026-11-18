# A última vigília — edição com criptograma

Jogo privado em português, com diálogos de fantasia, combate com dados, criptograma no portão e carta final. O projeto contém conteúdo pessoal: mantenha este repositório privado.

## Executar

Requer Node.js 22 ou superior.

```sh
npm ci
npm run build
npm test
npm start
```

Abra http://127.0.0.1:4173/. A pasta dist já contém uma versão pronta. Não é necessário instalar dependências para executar `node serve.cjs`.

## Editar

- src/Screens/story-expanded.js: história e entrada do castelo.
- src/Screens/story.js: carta final e configuração do áudio.
- src/Components/cryptogram.js: orientação, tabuleiro e interpretação.
- src/Utilities/cryptogram.cjs: cifra e validação.
- src/Utilities/audio.js: reprodução da trilha e efeitos.
- assets/runtime: recursos gráficos e sonoros prontos para o build, preservados na qualidade atual.

O progresso fica no navegador, separado da versão anterior. Carregamento de 10 segundos na entrada e 5 segundos entre etapas. Não há backend, rastreamento ou envio de respostas.

## Privacidade e publicação

Este repositório não ativa GitHub Pages nem contém workflow de publicação. A pedido do autor, o site não será publicado publicamente. Nunca confunda repositório privado com hospedagem privada.

## Créditos

Fan project não oficial e de uso pessoal. Personagens e cenários: Baldur’s Gate 3 / Larian Studios. Trilha: trecho de I Want to Live (Instrumental), Borislav Slavov, aprovado pelo autor para este projeto privado. Emoticons: Steam. Ícones: Lorc e Delapouite / Game-icons.net. Fontes: Cinzel e Cormorant Garamond, com licenças em assets/runtime/fonts. Carta e áudio final fornecidos pelo autor. Retratos editados com IA a partir da referência escolhida. Origens dos renders dos inimigos em assets/runtime/enemies/sources.json.
