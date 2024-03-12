FROM node:latest

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install express mariadb ejs --save

COPY ./node_modules /usr/src/app/node_modules

EXPOSE 3000

CMD [ "node", "index.js" ]