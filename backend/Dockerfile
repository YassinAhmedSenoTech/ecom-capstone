FROM node:22


WORKDIR /app


COPY package*.json ./


RUN npm install --legacy-peer-deps


COPY . .


RUN npx prisma generate
WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

RUN npx prisma generate

CMD ["npm", "start"]

