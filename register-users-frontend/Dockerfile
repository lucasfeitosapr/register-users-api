# Estagio 1 - Será responsavel em construir nossa aplicação
FROM node:12.16.1 as node

WORKDIR /var/www/register-users-frontend

COPY package.json .
RUN npm i npm@latest -g
RUN npm i -g @angular/cli
RUN npm i -g http-server
RUN npm i
COPY . .
ARG env=prod
RUN npm run build

EXPOSE 8001