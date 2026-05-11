FROM nginx:alpine

# Copy the custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy all static website files
COPY desktop.html /usr/share/nginx/html/
COPY mobile.html /usr/share/nginx/html/
COPY index.html /usr/share/nginx/html/
COPY fotos /usr/share/nginx/html/fotos/
COPY logo.svg /usr/share/nginx/html/

# Expose port 8080 (Cloud Run default)
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
