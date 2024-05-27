# Base Image
FROM nginx:alpine

# Set working directory
WORKDIR /app

# Copy project files
RUN rm -v /usr/share/nginx/html/index.html
COPY ./dist /usr/share/nginx/html

#Cahce Busting
COPY ./dist/index.html /usr/share/nginx/html/indexv1.html

#Configuracion de Nginx
COPY ./nginx_custom/nginx-custom-server.conf /etc/nginx/conf.d/default.conf
COPY ./nginx_custom/nginx-custom-conf.conf /etc/nginx/nginx.conf

# expose port and define CMD
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
