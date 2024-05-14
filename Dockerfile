FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install && npm install -g sequelize-cli
RUN npm install -g @nestjs/cli
COPY . .
RUN npm run build
COPY entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/entrypoint.sh
EXPOSE 3000
ENTRYPOINT ["entrypoint.sh"]
