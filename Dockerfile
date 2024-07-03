FROM node:18-alpine AS builder
LABEL author "jorgeluis.gg.2000@gmail.com"
WORKDIR /app
RUN npm i -g pnpm

COPY package*.json ./
COPY pnpm-lock.yaml ./

RUN pnpm i --frozen-lockfile

COPY . .

RUN pnpm prisma generate
RUN pnpm build

FROM node:18-alpine AS runner

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./

CMD ["npm", "run", "start"]
