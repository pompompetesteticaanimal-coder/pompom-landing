# Aberturas alternativas — revisão 16

Os três ambientes ilustrados v15 estão preservados. Duas linguagens novas foram acrescentadas no mesmo laboratório:

1. **Voo 3D · miniatura de Natal**: personagens modelados proceduralmente com volume, materiais, iluminação e câmera em perspectiva. Three.js 0.187.0, versionado localmente com licença. Trenó vermelho com perfis dourados, Papai Noel modelado, presentes e duas renas articuladas. É um estudo estilizado; não é uma renderização fotorrealista nem utiliza o atlas 2.5D anterior. Requer WebGL2.
2. **Teatro de papel · vermelho e ouro**: SVG original com cortinas abrindo, moldura, lua em relevo, bosque em camadas, Papai Noel e renas em peças articuladas. Estética gráfica distinta do 3D e da ilustração anterior.

Ambas têm onze segundos, a passagem central prolongada para avaliação, neve e nevasca que revela a página. Mantêm o texto final e os mascotes selecionados no laboratório. Pausa, repetição, seis posições de revisão, entrada imediata, Escape e movimento reduzido continuam disponíveis. Em caso de falha do renderizador, a entrada e os controles externos permanecem disponíveis.

## Física

`simular.cjs` usa Matter.js 0.20.0 (biblioteca em `../rig/vendor/`). Cada rédea liga os corpos dinâmicos do trenó e da rena por treze partículas intermediárias. As cordas transmitem força aos pontos de fixação fora do centro de massa, produzindo torque; não são linhas apenas acompanhando pontos estáticos.

Forças de inércia programadas representam arrancada, subida e frenagem; os corpos respondem por integração física. Guias de propulsão conduzem as renas, com sustentação suave no trenó. Cabeça, cauda, sinos e lanterna têm respostas amortecidas. As pernas usam galope controlado com IK. A física de translação é planar, reproduzida nos modelos 3D; não é uma simulação volumétrica completa do animal. O modelo 3D não simula pele nem pelagem. Nem toda peça secundária é desenhada pelos dois renderizadores.

Reproduzir: `node previews/natal/abertura/alternativas/simular.cjs` na raiz. Exporta `fisica.json`: 661 quadros a 60 fps, integração a 120 Hz. A simulação é preparada antes e o navegador interpola os dados, permitindo revisão determinística com pausa e salto de tempo. O motor físico não roda no celular.

## Referências consultadas

- [Benjamin Esdor — Reindeer Animation](https://benjaminesdor.com/reindeer-animation/): modelagem, armature, cenário e interação entre trenó e renas.
- [Three.js — soft-body rope](https://threejs.org/examples/physics_ammo_rope.html): referência de cordas flexíveis; o solver usado neste estudo é Matter.js, não Ammo.
- [Three.js — skinning and morphing](https://threejs.org/examples/webgl_animation_skinning_morph.html): referência de articulação e animação de personagens.
- [Codrops — Christmas Tree Algorithm](https://tympanus.net/codrops/2021/12/27/three-js-animation-with-k-d-christmas-tree-algorithm/): referência de experimentação natalina com geometria e WebGL.

Referências de direção/técnica; não foram copiados modelos, texturas ou códigos de personagens desses trabalhos. Modelos e SVG locais foram construídos em código para a prévia. A anterior imagem gerada e o `.blend` foram preservados.

## Combinação solicitada — revisão 17

O usuário gostou do cenário de teatro e pediu Papai Noel e renas da primeira opção. Foi acrescentado **Teatro com personagens ilustrados** (`teatro-ilustrado`), preservando o teatro vetorial e os demais estudos. Usa o cenário, as cortinas, a lua e a floresta do teatro com os mesmos PNG/WebP e peças articuladas da primeira abertura ilustrada. `rig/player.js` aceita dados físicos externos opcionais; o híbrido reproduz a simulação de tração v16 (11 segundos), enquanto a primeira abertura continua usando a própria exportação Blender de oito segundos.

Entrada direta: `/previews/natal/?parte=abertura&abertura=teatro-ilustrado&v=17`. A miniatura do híbrido é captura real do navegador.

## Papai Noel dando tchau — revisão 23

A opção teatro-ilustrado passou a usar uma nova arte em peças separadas, com braço e antebraço acenando, cabeça/gorro/pompom independentes e trilha de brilho. O cenário e as renas foram preservados. Blender editável, atlas original, prompt e exportação web em [../aceno/README.md](../aceno/README.md).

## Trajetória e rédeas — revisão 24

Nos dois teatros, `trajetoria.mjs` conduz a equipe inteira para fora da borda direita antes de inverter sua orientação (5,5 s). Na volta, as renas ficam à frente, apontadas para a esquerda. A máscara circular da lua oculta progressivamente os personagens; não há corte de opacidade. A equipe termina dentro da lua aos 7 s, quando começa a marca.

A simulação v24 usa pré-tensão, recolhimento de folga e restrições de flexão nas rédeas, com o ponto de tração do trenó próximo à mão. Em 661 quadros, a maior flecha perpendicular medida é 6,38 unidades SVG e o comprimento máximo é 1,0012 vezes a distância entre pontas. A simulação original de oito segundos permanece preservada.

Verificar: `node tests/natal-trajetoria.mjs`, `node tests/natal-physics.mjs` e, com Chrome CDP e servidor locais, `node tests/natal-aceno.mjs`.

Entrada atual: `/previews/natal/?parte=abertura&abertura=teatro-ilustrado&v=24`.

## Arreios completos — revisão 25

Nos dois teatros, `arreios.mjs` acrescenta peitoral, cinta de barriga/dorso, correia lateral, argolas, fivela e sino em vermelho e dourado. Os tirantes largos saem da ferragem na dianteira do trenó e unem os arreios das renas em sequência. As rédeas finas da mão continuam separadas visualmente.

As peças do arreio pertencem ao grupo articulado de cada rena. Os pontos dos tirantes são recalculados com posição e rotação dos corpos a cada quadro, incluindo a volta espelhada atrás da lua. Trata-se de um estudo visual de arreio natalino: os tirantes acompanham os corpos da simulação v24; não foi acrescentado um novo solver de couro/tecido nem alterada a trajetória aprovada.

Referência de objeto: [arreio de rena, Peabody Museum](https://collections.peabody.harvard.edu/objects/details/93090). Desenho SVG local, sem copiar imagens da referência.

Entrada atual: `/previews/natal/?parte=abertura&abertura=teatro-ilustrado&v=25`.
