FROM node:12.18.0

WORKDIR /var/www/register-users-backend

COPY package.json .
COPY package-lock.json .

RUN npm i

COPY . .

EXPOSE 8080