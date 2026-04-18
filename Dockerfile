FROM node:lts

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY public /usr/src/app/public

COPY src /usr/src/app/src

RUN npm run build
