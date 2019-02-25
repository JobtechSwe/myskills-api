FROM node:11.7 as builder

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm ci

COPY /lib ./lib
COPY tsconfig.json ./
COPY tslint.json ./

RUN npm run build-ts

FROM node:11.7

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm ci --only=production

COPY --from=builder /app/dist ./dist

CMD npm start
