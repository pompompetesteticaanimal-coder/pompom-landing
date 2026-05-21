# ── Stage 1: gera CSS otimizado com Tailwind ────────────────────────────────
FROM node:24-alpine AS css-builder
WORKDIR /build
COPY package.json ./
RUN npm install --ignore-scripts
COPY tailwind.config.js input.css ./
COPY desktop.html mobile.html index.html ./
RUN npx tailwindcss -i input.css -o tailwind.css --minify

# ── Stage 2: serve com nginx hardened ────────────────────────────────────────
# Versão pinada — evita pegar versão vulnerável em rebuilds futuros
FROM nginx:1.27-alpine

# Remove configuração padrão
RUN rm /etc/nginx/conf.d/default.conf

# Copia configuração de segurança hardened
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia arquivos estáticos do site
COPY desktop.html /usr/share/nginx/html/
COPY mobile.html  /usr/share/nginx/html/
COPY index.html   /usr/share/nginx/html/
COPY robots.txt   /usr/share/nginx/html/
COPY sitemap.xml  /usr/share/nginx/html/
COPY manifest.json /usr/share/nginx/html/
# Copia apenas subpastas usadas pelo site (exclui fotos/produtos/ que não é referenciada)
COPY fotos/ambiente          /usr/share/nginx/html/fotos/ambiente/
COPY fotos/cachorros         /usr/share/nginx/html/fotos/cachorros/
COPY fotos/copa              /usr/share/nginx/html/fotos/copa/
COPY fotos/datas-comemorativas /usr/share/nginx/html/fotos/datas-comemorativas/
COPY fotos/antes1.jpg        /usr/share/nginx/html/fotos/
COPY fotos/antes1.jpg.webp   /usr/share/nginx/html/fotos/
COPY fotos/depois1.jpg       /usr/share/nginx/html/fotos/
COPY fotos/depois1.jpg.webp  /usr/share/nginx/html/fotos/
COPY fotos/destaque.jpg      /usr/share/nginx/html/fotos/
COPY fotos/destaque.jpg.webp /usr/share/nginx/html/fotos/
COPY fotos/dona.jpg          /usr/share/nginx/html/fotos/
COPY fotos/dona.jpg.webp     /usr/share/nginx/html/fotos/
COPY fotos/hero-dog.jpg      /usr/share/nginx/html/fotos/
COPY fotos/hero-dog.jpg.webp /usr/share/nginx/html/fotos/
COPY fotos/logo-icon.png     /usr/share/nginx/html/fotos/
COPY fotos/logo-icon.png.webp /usr/share/nginx/html/fotos/
COPY fotos/logo.png          /usr/share/nginx/html/fotos/
COPY fotos/logo.png.webp     /usr/share/nginx/html/fotos/
COPY fotos/produto1.jpg      /usr/share/nginx/html/fotos/
COPY fotos/produto1.jpg.webp /usr/share/nginx/html/fotos/
COPY fotos/produto2.jpg      /usr/share/nginx/html/fotos/
COPY fotos/produto2.jpg.webp /usr/share/nginx/html/fotos/
COPY fotos/produto3.jpg      /usr/share/nginx/html/fotos/
COPY fotos/produto3.jpg.webp /usr/share/nginx/html/fotos/
COPY fotos/produto4.jpg      /usr/share/nginx/html/fotos/
COPY fotos/produto4.jpg.webp /usr/share/nginx/html/fotos/
COPY fotos/produto5.jpg      /usr/share/nginx/html/fotos/
COPY fotos/produto5.jpg.webp /usr/share/nginx/html/fotos/
COPY fotos/trabalho1.jpg     /usr/share/nginx/html/fotos/
COPY fotos/trabalho1.jpg.webp /usr/share/nginx/html/fotos/
COPY fotos/trabalho4.jpg     /usr/share/nginx/html/fotos/
COPY fotos/trabalho4.jpg.webp /usr/share/nginx/html/fotos/
COPY fotos/trabalho5.jpg     /usr/share/nginx/html/fotos/
COPY fotos/trabalho5.jpg.webp /usr/share/nginx/html/fotos/
COPY fotos/trabalho7.jpg     /usr/share/nginx/html/fotos/
COPY fotos/trabalho7.jpg.webp /usr/share/nginx/html/fotos/
COPY fotos/trabalho8.jpg     /usr/share/nginx/html/fotos/
COPY fotos/trabalho8.jpg.webp /usr/share/nginx/html/fotos/
COPY logo.svg     /usr/share/nginx/html/
COPY --from=css-builder /build/tailwind.css /usr/share/nginx/html/

# Permissões mínimas — nginx worker roda como usuário 'nginx' (não root)
RUN chown -R nginx:nginx /usr/share/nginx/html \
 && chmod -R 755 /usr/share/nginx/html \
 && chown -R nginx:nginx /var/cache/nginx \
 && chown -R nginx:nginx /var/log/nginx \
 && touch /var/run/nginx.pid \
 && chown nginx:nginx /var/run/nginx.pid

USER nginx

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
