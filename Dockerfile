FROM node:21-alpine3.18 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ../offers/lolz/baza .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY ./ssl_certs/fullchain.pem /etc/nginx/certs/fullchain.pem
COPY ./ssl_certs/privkey.pem /etc/nginx/certs/privkey.pem
EXPOSE 80
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]