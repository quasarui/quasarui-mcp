FROM node:24-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY bin ./bin
ENTRYPOINT ["node", "bin/quasarui-mcp.js"]
