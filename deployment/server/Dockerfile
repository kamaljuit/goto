FROM keymetrics/pm2:latest-alpine

# Bundle APP files
COPY . .
RUN apk --no-cache add --virtual builds-deps build-base python
# Install app dependencies
ENV NPM_CONFIG_LOGLEVEL warn
RUN npm i

# Expose the app port

EXPOSE 4000


CMD [ "pm2-runtime", "start", "pm2.json" ]
