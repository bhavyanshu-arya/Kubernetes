FROM node:20-alpine3.16

ENV PORT = 3010

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3010

CMD [ "npm","start" ]



