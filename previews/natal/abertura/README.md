# Sugestões de abertura de Natal

Entrada: `/previews/natal/?parte=abertura&v=15`.

## Três direções

1. Noite cinematográfica — céu azul profundo, lua dourada, estrelas e ornamentos vermelhos.
2. Aquarela noturna — estudo com céu mais suave, nuvens mais visíveis e textura delicada.
3. Natal em profundidade — camadas de nuvens, folhagem próxima e enfeites com relevo visual.

Papai Noel e as renas usam peças coloridas articuladas, com roupa vermelha, barba branca, trenó dourado, presentes e arreios natalinos. O rig 2.5D foi montado no Blender 5.2.1 LTS com simulação de molas e rédeas em Matter.js 0.20.0. O navegador reproduz a exportação do Blender a 60 fps; as pernas usam galope com cinemática inversa. Arquivos editáveis, limites da técnica e instruções em [rig/README.md](rig/README.md). A versão anterior em silhueta foi substituída a pedido do usuário. A cena voa pela frente da lua, curva para fora do quadro, passa para uma camada atrás da lua e entra pela borda até ficar encoberta. A marca e os mascotes selecionados no laboratório aparecem no fim.

## Texto

- “Uma noite de encanto começa por aqui.”
- “Um Natal cheio de fofura.”
- “O cuidado de sempre, com encanto de Natal.”
- “PomPom Pet” · “Estética Animal · Cajamar”.
- Botão permanente: “Entrar no site”.

## Funcionamento

`cena.js` e `cena.css` são compartilhados pelas prévias mobile e desktop. O controlador da prévia carrega a cena sob demanda; a cena carrega GSAP 3.15.0 e MotionPathPlugin, versionados localmente em `../vendor/gsap-3.15.0/`.

Linha do tempo com 8 segundos, incluindo a transição por nevasca. Disponíveis repetir, pausar/continuar, seis posições de revisão (duas passadas do galope, atrás da lua, marca final, nevasca e revelação da página) e escolha explícita de abertura no navegador. O celular permanece visível e os mascotes da abertura ficam fora do mecanismo de embrulhar fotos.

O botão fecha imediatamente. Escape encerra o diálogo. Movimento reduzido mostra a composição final, sem voo, e encerra após 2,5 segundos. Se a biblioteca falhar, a composição estática permanece com entrada disponível. Não há áudio.

As prévias da cena em `previas/` são capturas do navegador, não imagens de stock. Lua, estrelas, nuvens e enfeites são gráficos SVG do protótipo; a arte colorida de Papai Noel foi gerada para este projeto e otimizada em WebP. Originais e prompt em `artes/README.md`. São estudos locais, sem deploy.

## Verificação

Conferidos em navegador: carregamento local do GSAP, três estilos, trajetória, posições intermediárias, revelação da marca sem embrulho, fechamento pelo botão e automático, movimento reduzido e ausência de rolagem horizontal no laboratório de 390 px. Esta revisão não equivale a medir desempenho em todos os celulares reais.

## Neve e revelação

Uma camada Canvas 2D desenha neve de diferentes tamanhos e distâncias durante a abertura. Aos 5,8 segundos a neve ganha força. No pico, a cena de Natal dá lugar à página real por trás; os flocos e a névoa se dispersam até o encerramento aos 8 segundos. O botão de entrada permanece acima da neve e encerra imediatamente.

A neve usa tempo da própria timeline, respeitando pausa e posições de revisão. Canvas limitado a DPR 1,5 e 230 partículas no pico; o ResizeObserver é descartado no encerramento. Movimento reduzido apresenta a marca estática sem neve ou nevasca. Não há áudio.

As três miniaturas foram atualizadas com capturas do rig articulado no navegador. Prompts e origem das novas peças em [rig/PROMPTS.md](rig/PROMPTS.md).
