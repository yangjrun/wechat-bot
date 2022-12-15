FROM node:latest AS dependencies

WORKDIR /home/app

RUN apk add --no-cache python make g++

COPY package*.json /home/app

RUN ["npm", "install", "--registry=http://r.tnpm.oa.com", "--production"]

RUN apk del .gyp

COPY . /home/app

CMD [ "node","/home/app/hot-import-bot.js" ]