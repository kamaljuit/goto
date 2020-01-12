FROM node:alpine as goto-client-build
WORKDIR /client
COPY package.json ./
RUN npm i
COPY ./public ./public
COPY ./src ./src
ENV REACT_APP_API_URL=""
ENV REACT_APP_APP_URL=""
RUN npm run build
FROM nginx:latest
LABEL maintainer=kamaljuit
COPY --from=goto-client-build /client/build/ /usr/share/nginx/html
EXPOSE 80