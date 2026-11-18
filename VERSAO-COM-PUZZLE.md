# Versão com criptograma

A versão aprovada sem puzzle foi copiada integralmente para a pasta irmã `aventura-aniversario-sem-puzzle-20261117-202319`. Foram conferidos 4.582 arquivos por SHA-256. `BACKUP.json` contém o inventário. O diretório dist é a versão pronta para servir. Código, assets e lockfile foram preservados; node_modules, .git e ferramentas temporárias não entram na cópia. Para recompilar, use npm ci e npm run build.

A pasta atual contém a nova versão, com salvamento separado (`ultima-vigilia-puzzle-v1`). O progresso anterior continua intacto na chave antiga.

## Fluxo

Acampamento → preparação → trilha → lama → chegada ao castelo → apresentação do selo → orientação → criptograma → interpretação da frase → combate original do pátio → restante da aventura.

## Puzzle

Substituição fixa e embaralhada de letras por números, sem relação sequencial com o alfabeto. Sete palavras, 16 letras distintas; A e E são dadas. Todas as ocorrências de um número compartilham a mesma letra. Letras duplicadas em códigos diferentes são impedidas. Há validação, três dicas progressivas, limpeza das letras e revisão da orientação. Não há limite de tentativas. As letras, dicas e conclusão ficam salvas.

A frase é “A LUZ DA TOCHA REVELA A PASSAGEM”. Após decifrá-la, a ação correta é erguer a tocha diante do selo. As alternativas erradas recebem uma reação bem-humorada e permitem tentar novamente.

## Organização

- src/Utilities/cryptogram.cjs: cifra, solução e validação.
- src/Components/cryptogram.js e cryptogram.css: orientação, tabuleiro e interpretação.
- src/Screens/story-expanded.js: entrada do castelo e integração com a missão.
- src/main.js: fases e persistência.

## Validação

23 testes automatizados. Conferência no navegador: percurso até o portão, orientação anterior ao desafio, tentativa incompleta, sincronização de letras, dica, retomada após recarregar, solução, ação errada, ação correta e retorno ao percurso. Tela de 390×844 sem transbordamento horizontal.
