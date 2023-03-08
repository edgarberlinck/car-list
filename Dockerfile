# syntax=docker/dockerfile:1.4

FROM node:18-alpine

ARG NEXT_PUBLIC_IMAGE_URL

COPY ./package.json .
COPY ./yarn.lock .
RUN yarn install --frozen-lockfile

COPY ./src ./src
COPY next.config.js .
COPY tsconfig.json .
COPY ./public .

RUN NEXT_PUBLIC_IMAGE_URL=$NEXT_PUBLIC_IMAGE_URL yarn build 

CMD ["yarn", "start"]