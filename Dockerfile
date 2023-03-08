FROM node:alpine as build
ARG NEXT_PUBLIC_IMAGE_URL

WORKDIR /app
COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile
COPY . .

RUN NEXT_PUBLIC_IMAGE_URL=$NEXT_PUBLIC_IMAGE_URL  yarn build

RUN npm prune --production
FROM node:alpine
WORKDIR /app

COPY --from=build /app/package.json ./package.json
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public

EXPOSE 3000
CMD ["yarn", "start"]