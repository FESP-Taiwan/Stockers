FROM  node:latest

RUN mkdir -p /app
WORKDIR /app

ADD package.json /app
RUN npm install

ARG NODE_ENV=dev
ENV NODE_ENV $NODE_ENV

ADD . /app

CMD npm run client
EXPOSE 7000