# syntax=docker/dockerfile:1.4

FROM node:18-alpine

COPY ./package.json .
COPY ./yarn.lock .
RUN yarn install --frozen-lockfile

COPY ./src ./src
COPY next.config.js .
COPY tsconfig.json .
COPY ./public .

RUN yarn build 

CMD ["yarn", "start"]