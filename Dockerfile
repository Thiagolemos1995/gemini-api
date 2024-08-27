###################
# BUILD FOR LOCAL DEVELOPMENT
###################
FROM node:20-alpine AS development

WORKDIR /app

COPY --chown=node:node package.json ./

COPY --chown=node:node yarn.lock ./

RUN yarn install --frozen-lockfile

COPY --chown=node:node . .

USER node

CMD ["node", "dist/main.js"]