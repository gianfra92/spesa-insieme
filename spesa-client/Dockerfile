FROM node:23.11-alpine AS build
WORKDIR /app/src
COPY package*.json ./
RUN npm ci
COPY . ./
RUN sed -i "s|API_BASE_URL_PLACEHOLDER|$API_BASE_URL|g" src/environments/environment.prod.ts
RUN npm run build:prod


FROM node:23.11-alpine
RUN addgroup -S servicegroup && adduser -S serviceuser -G servicegroup
USER serviceuser
WORKDIR /usr/app
COPY --from=build /app/src/dist/spesa-insieme/ ./
CMD node server/server.mjs
EXPOSE 4000