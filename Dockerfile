FROM node:current-alpine3.16
WORKDIR /app
COPY package* ./

# Evite l'installation par defaut des devDependencies du package.json
ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
        then npm install; \
        else npm install --only=production; \
        fi

COPY . ./
ENV PORT 3000
EXPOSE $PORT
CMD ["node", "index.js"]