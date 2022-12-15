FROM node:latest

WORKDIR /home/app

COPY package.json /home/app/

RUN npm install --production --registry https://registry.npm.taobao.org

COPY . /home/app

CMD [ "node","/home/app/hot-import-bot.js" ]