FROM dockerhub.mos.ru/node:16.14.2-alpine  as build
ENV CI=false
ARG REACT_APP_APIGATE_FRONT_ENV
ARG REACT_APP_BACKEND_URL
ENV REACT_APP_APIGATE_FRONT_ENV=$REACT_APP_APIGATE_FRONT_ENV
ENV REACT_APP_BACKEND_URL=$REACT_APP_BACKEND_URL
WORKDIR /app
COPY . /app

RUN npm get registry
RUN npm install
RUN npm run build

FROM dockerhub.mos.ru/nginx:1.19-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]