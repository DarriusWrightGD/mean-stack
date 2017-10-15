FROM node as builder
ARG BUILD_COMMAND
WORKDIR /code
COPY ./frontend /code
RUN npm install --silent
RUN npm run ${BUILD_COMMAND}

FROM nginx
COPY --from=builder /code/dist /usr/share/nginx/html
EXPOSE 80