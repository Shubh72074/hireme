FROM node:18-alpine

WORKDIR /hireme/

COPY public/ /hireme/public
COPY src/ /hireme/src
COPY package.json /hireme/

RUN npm install

CMD ["npm", "start"]