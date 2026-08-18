FROM node:20-alpine

WORKDIR /app

# Instalar dependencias primero (cache layer)
COPY package.json ./
RUN npm install --production

# Copiar todo el código
COPY . .

EXPOSE 8080

CMD ["node", "server.js"]
