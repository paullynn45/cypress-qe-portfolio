# Serves the production React build on port 3000 — matches the Cypress baseUrl
# so the same suite can run locally (npm start), in CI (GitHub Actions), or
# against this container (docker-compose) without config changes.

FROM node:16

WORKDIR /usr/src/app

# Install production deps only. --userconfig=/dev/null + --registry pin to the
# public registry even if a stray .npmrc exists in the build context.
COPY package*.json ./
RUN npm ci --omit=dev --userconfig=/dev/null --registry=https://registry.npmjs.org

# App sources — intentionally narrow COPY so layer cache invalidates predictably.
COPY public ./public
COPY src ./src

RUN npm run build

# Static server for the production bundle (lightweight — no dev-server middleware).
RUN npm install -g serve@11

EXPOSE 3000

CMD ["serve", "-s", "build", "-l", "3000"]
