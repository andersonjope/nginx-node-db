FROM node:latest

WORKDIR /usr/src/app

RUN npm init -y
RUN npm install express mariadb ejs

COPY . .

EXPOSE 3000

CMD [ "node", "index.js" ]