# Animação de Natal e adequação da arquitetura

Revisão do código local e da documentação oficial dos fornecedores. Esta análise não altera o site e não representa uma medição de desempenho da futura abertura em aparelhos reais.

## Recomendação para a abertura

**SVG em camadas + GSAP, usando Timeline e MotionPathPlugin.** Manter HTML, CSS e JavaScript como base; organizar os novos módulos com tipagem gradual em TypeScript quando for introduzida a etapa de compilação correspondente.

A cena solicitada é composta por céu noturno, lua, nuvens, estrelas, ornamentos e silhuetas de Papai Noel, trenó e renas. SVG permite separar essas camadas e manter a silhueta nítida em diferentes telas. GSAP permite sincronizar a trajetória, escala e rotações do trenó, o rastro e a transição para a marca. A passagem atrás da lua exige máscara/camadas: não basta diminuir a opacidade no meio do disco lunar. O percurso deve cruzar a frente, fazer a curva e entrar por uma borda na região coberta pela lua.

A recomendação é uma avaliação de adequação à cena e ao projeto. Não implica que GSAP seja sempre mais rápido que CSS ou animações nativas: o resultado precisa ser medido na cena real.

## Ferramentas pesquisadas

| Ferramenta | Uso | Adequação ao projeto |
|---|---|---|
| GSAP + SVG | Sequências, trajetórias curvas, escala, revelação e controle por JavaScript | Primeira escolha para esta abertura e seu controle de camadas |
| SVGator | Editor visual de animação SVG, trajetórias e máscaras | Alternativa para desenhar e ajustar visualmente o movimento; conferir a exportação escolhida na integração |
| Rive | Editor e runtime para animações e personagens interativos | Interessante para mascotes reativos e estados; adiciona runtime e arquivo .riv, além de exigir avaliar renderizador e integração |
| Lottie/dotLottie | Reprodução de animações exportadas em arquivos .json/.lottie | Bom para uma sequência preparada em ferramenta de motion design; qualidade e fidelidade dependem da exportação e dos recursos usados |
| CSS + Web Animations API | Brilho, estrelas, pequenos deslocamentos e transições | Continuar usando nos efeitos simples, evitando uma biblioteca para cada detalhe |

O repositório oficial GSAP informa que o conjunto de ferramentas é gratuito inclusive para uso comercial, sob sua licença padrão. Não foram comparados preços de planos de autoria de Rive, SVGator ou LottieFiles.

## O que o projeto usa hoje

- HTML, CSS e JavaScript direto no navegador.
- Tailwind CSS 3.4 como dependência de desenvolvimento, compilado em CSS no build.
- Docker em dois estágios: Node gera o CSS; a imagem final usa Nginx na porta 8080.
- Implantação documentada no Cloud Run.
- `mobile.html` tem 1.504 linhas e `desktop.html` 1.624 linhas na revisão lida.
- `site-opening.js` faz o carregamento sob demanda da abertura Halloween. A abertura publicada usa SVG, CSS e JavaScript; já possui diálogo, botão de entrada, Escape e tratamento de movimento reduzido.
- A abertura antiga tem aproximadamente 9 KB de JavaScript e 11 KB de CSS, antes de compressão, sem contabilizar imagens ou os demais arquivos do site. Esses números não estimam o peso da cena nova.

## Adequação da linguagem e arquitetura

HTML/CSS/JavaScript são adequados ao escopo atual: apresentação da empresa, serviços, fotos, avaliações, catálogo e contato/consulta por WhatsApp. Um site estático pode ter animações refinadas sem passar a depender de um servidor de aplicação para cada visita.

A melhoria principal é de organização: compartilhar conteúdo e componentes entre mobile e desktop, separar aparência sazonal da estrutura permanente, centralizar informações e consolidar o laboratório. Os estilos legados Halloween ainda contêm decisões de layout, conforme a documentação do próprio projeto. A organização deve preservar a estrutura aprovada ao tornar os temas independentes.

TypeScript ajuda a verificar contratos entre configuração de tema, controles do laboratório, catálogo e abertura. Ele gera JavaScript para o navegador; sua introdução deve ser incremental e acompanhada de um build. Não é uma troca que, por si só, melhore a aparência ou a velocidade da animação.

Numa futura reorganização maior, um gerador estático como Astro pode compartilhar componentes e gerar HTML, mantendo pouco JavaScript no navegador. É uma possibilidade de manutenção, não um requisito para executar a campanha de Natal.

## Integração proposta

1. Preparar uma cena SVG com silhuetas sem rosto e ilustrações separadas por camada.
2. Carregar apenas GSAP e MotionPath quando a abertura de Natal for usada, em arquivos locais com versão fixada.
3. Criar uma linha do tempo única de aproximadamente 5–6 segundos, ajustável pelo laboratório, com estados de iniciar, repetir, pular e encerrar.
4. Manter o celular interativo do laboratório e os temas/papéis já existentes.
5. Preservar entrada visível, Escape, foco correto, movimento reduzido e acesso ao conteúdo se a animação falhar.
6. Priorizar deslocamentos, escala e opacidade; limitar partículas e efeitos de desfoque e iluminação em movimento. Medir fluidez e carregamento no celular real antes de integrar ao site.
7. Usar a mesma implementação de abertura no laboratório e na integração futura, evitando mais uma cópia divergente.

A política de scripts do projeto permite arquivos locais e bloqueia scripts inline. A integração deve aproveitar esse modelo. Runtimes que usem WASM e exportações com scripts incorporados precisam de avaliação específica antes da adoção.

## Fontes oficiais

- GSAP: https://gsap.com/docs/v3/
- GSAP MotionPath: https://gsap.com/docs/v3/Plugins/MotionPathPlugin/
- GSAP licença e gratuidade: https://github.com/greensock/GSAP/blob/master/README.md
- Rive Web JS: https://rive.app/docs/runtimes/web/web-js
- dotLottie Web: https://docs.lottiefiles.com/en/runtimes/distributions/js/v0.x
- SVGator exportação: https://www.svgator.com/help/export-and-file-formats
- SVGator trajetórias e máscaras: https://www.svgator.com/help/animation-and-interactivity
- Web Animations API: https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API
- Desempenho de animações: https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/Fundamentals
- Movimento reduzido: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/%40media/prefers-reduced-motion
- TypeScript: https://www.typescriptlang.org/docs/handbook/2/basic-types
- Astro: https://docs.astro.build/en/guides/on-demand-rendering/
