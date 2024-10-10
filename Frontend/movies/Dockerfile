# Utilizar uma imagem base do Node.js
FROM node:20

# Definir o diretório de trabalho no container
WORKDIR /app

# Copiar o package.json e package-lock.json para o container
COPY package.json package-lock.json ./

# Instalar as dependências
RUN npm install

# Copiar todo o código fonte para o container
COPY . .

# Expor a porta que o Vite usará
EXPOSE 5173

# Comando para rodar o servidor de desenvolvimento do Vite
CMD ["npm", "run", "dev"]
