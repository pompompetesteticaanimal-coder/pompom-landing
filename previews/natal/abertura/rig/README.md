# Trenó e renas articulados

Estudo local de Natal, versão 15. Sem deploy. Entrada: `/previews/natal/?parte=abertura&v=15`.

## Ferramentas e resultado

Blender 5.2.1 LTS: dois esqueletos, peças com pesos rígidos, limites de rotação, curvas das rédeas, câmera e animação editável em `pompom-treno-renas.blend`. `revisao-rig.png` é um render real desse arquivo.

Matter.js 0.20.0: massas, molas amortecidas e correntes de partículas para as rédeas. O trenó tem massa maior que as renas e responde com atraso e inclinação. Cabeça, cauda e cachecol têm movimento secundário amortecido. As pernas usam galope controlado com cinemática inversa de dois segmentos e fases diferentes; não são uma simulação de contato dos cascos com o chão.

É um rig 2.5D com peças ilustradas, não um modelo volumétrico 3D. As artes foram geradas para este projeto, separadas em atlas e trenó. O material aplica um remapeamento de alfa para remover a névoa semitransparente do atlas.

## Pipeline reproduzível

Execute na raiz do projeto, com Node.js e Blender instalados:

```sh
node previews/natal/abertura/rig/simular-fisica.cjs
blender --background --threads 2 --python previews/natal/abertura/rig/preparar-atlas.py
blender --background --threads 2 --python previews/natal/abertura/rig/montar-blender.py
blender --background previews/natal/abertura/rig/pompom-treno-renas.blend --threads 2 --python previews/natal/abertura/rig/exportar-web.py
```

`movimento.json` guarda a simulação inicial. O Blender importa essa simulação em keyframes; ajustes manuais podem ser feitos no `.blend` e exportados novamente. `movimento-web.json` é a exportação efetivamente lida por `player.js`: 481 quadros, 60 fps, oito segundos. O navegador interpola poses e acompanha a timeline GSAP; não executa o motor físico. Isso reduz o trabalho durante a abertura no celular. As texturas WebP são carregadas apenas na abertura.

O atlas original e o trenó original permanecem em PNG. `atlas.json` contém os recortes usados como UV/viewBox. Matter.js fica em `vendor/`, com licença local, usado apenas na preparação.

## Revisão

Conferidos no navegador: três estilos, dados exportados do Blender, pausa e repetição, fechamento automático e pelo botão, movimento reduzido e laboratório em largura de 390 px sem rolagem horizontal. Posições diferentes do galope podem ser comparadas pelos controles “Passada 1” e “Passada 2”. O render e a revisão em navegador não substituem medir desempenho em aparelhos reais.

Referências oficiais: [animação no Blender](https://www.blender.org/features/animation/) e [constraints do Matter.js](https://brm.io/matter-js/docs/classes/Constraint.html).
