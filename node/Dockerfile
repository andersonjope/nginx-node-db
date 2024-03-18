FROM node:latest

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

# Dockerize is needed to sync containers startup
ENV DOCKERIZE_VERSION v0.7.0
RUN apt-get update \
    && apt-get install -y wget \
    && wget --no-check-certificate https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz

COPY package*.json ./
RUN npm install express mariadb ejs --save

COPY ./node_modules /usr/src/app/node_modules

EXPOSE 3000

CMD [ "node" ]