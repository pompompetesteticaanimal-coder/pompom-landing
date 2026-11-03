# PomPom — laboratório de Natal e abertura articulada v15

Registro consolidado em 2026-11-02 a partir da conversa e dos arquivos locais.

## Projeto e escopo
Raiz: /Users/paulohenrique/Documents/Documentos - MacBook Air de Paulo/pompom-landing.
Trabalho apenas no laboratório previews/natal/. Nenhum deploy realizado nesta etapa; status atual do Cloud Run não foi revalidado.
Preservar a estrutura do Halloween como base. Natal com vermelho, dourado e detalhes verdes, sem tornar tudo verde. Manter bolas natalinas brilhando.
Laboratório único com seleção de partes/telas e telefone sempre disponível. Mascotes são o gato e cachorro do logo, com fantasias natalinas e opções de estilo de arte; escolhas visuais ainda são estudos, não aprovação final.

## Fotos e cartões
Três cartões Natal PomPom: sessão de fotos dos cães; pet enfeitado para Natal; lembranças para clientes. Enquanto não houver fotos, manter o tamanho e a estrutura das fotos originais, embrulhar com papel natalino detalhado e faixa “Em breve” nos três. Marca e mascotes da abertura ficam fora do mecanismo de embrulhar fotos.

## Abertura atual
Três estudos: cinema, aquarela e profundidade. Papai Noel colorido, trenó vermelho/dourado, presentes, duas renas, lua noturna, neve e nevasca dissipando para revelar a página. O pedido inicial de silhueta foi posteriormente substituído pelo pedido de Papai Noel colorido.
Duração 8 segundos. Voo frontal .35–3.25; passagem atrás da lua 3.25–4.4; marca/mascotes a partir de 4.15; nevasca a partir de 5.8; revelação da página 6.55–7.8; fechamento aos 8.
Botão Entrar no site e Escape fecham. Movimento reduzido apresenta marca estática por 2.5 segundos, sem voo/neve.
Controles Repetir, Pausar e momentos Passada 1, Passada 2, Atrás da lua, Marca final, Nevasca e Revelar página.

## Física e arquivos editáveis
Blender 5.2.1 LTS e Matter.js 0.20.0 usados de fato.
Rig 2.5D de peças ilustradas, não modelo volumétrico 3D. Dois esqueletos com pernas articuladas, cabeça, cauda e cachecol; trenó com inércia e inclinação; rédeas flexíveis de 9 nós. Galope controlado com IK de dois segmentos; massas/molas amortecidas para movimento principal e secundário.
previews/natal/abertura/rig/pompom-treno-renas.blend é o projeto editável.
simular-fisica.cjs gera movimento.json; montar-blender.py importa no Blender; exportar-web.py exporta movimento-web.json, efetivamente lido por player.js. 481 quadros a 60 fps, interpolados no navegador e sincronizados com GSAP 3.15.0. Motor físico não roda em tempo real no celular.
Artes originais PNG, WebP e atlas.json em rig/. Proveniência/prompts em rig/PROMPTS.md; reprodução e limites em rig/README.md; documentação da cena em abertura/README.md.

## Acesso local e verificação
Servidor Python na porta 8011 com bind 0.0.0.0, executado da raiz. URL usada e respondendo HTTP 200 nesta sessão: http://192.168.3.120:8011/previews/natal/?parte=abertura&v=15 . IP depende da rede; localhost sozinho não serve a outros dispositivos.
Testes em navegador: três estilos, exportação Blender carregada, pausa/repetição, fechamento automático e por botão, movimento reduzido, largura 390 px sem rolagem horizontal e telefone visível. Dados de 481 quadros finitos, duas poses diferentes do galope, rédeas válidas. Miniaturas atualizadas por capturas do navegador. Desempenho em aparelhos reais ainda não medido.

## Situação do AI Memory
O marcador .ai-memory.toml define workspace pompom / project pompom-site.
CLI local reportou 379 eventos pendentes e HTTP 401 de autenticação em 2026-11-02. Portanto não afirmar que toda a transcrição foi capturada. Esta página preserva explicitamente o estado consolidado e os caminhos para continuação.
