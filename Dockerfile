FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install --production

# Build the app in a separate stage to avoid unnecessary layers
FROM node:18-alpine AS runner

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY . .

EXPOSE 4173

CMD [ "npm", "run", "start" ]
