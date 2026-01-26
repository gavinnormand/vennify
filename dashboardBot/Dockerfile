FROM node:20-slim

WORKDIR /app

COPY package*.json ./
RUN npm install

RUN npx playwright install --with-deps

COPY . .

EXPOSE 3333
CMD ["node", "index.js"]
