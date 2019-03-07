FROM node:11.7 as base
ARG cache=1

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm ci

COPY /lib ./lib
COPY /test ./test

COPY jest.config.js ./
COPY jest.integration-config.js ./
COPY jest.unit-config.js ./
COPY tsconfig.json ./

RUN npm run build-ts

FROM node:11.7

ENV USER=api-user
RUN adduser --disabled-password --gecos "" $USER

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm ci --only=production

COPY --from=base /app/dist ./dist

USER $USER

CMD npm start
