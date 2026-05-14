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
COPY fotos        /usr/share/nginx/html/fotos/
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
