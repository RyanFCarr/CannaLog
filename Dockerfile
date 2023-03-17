# --------------> The build image
FROM node:latest AS build
WORKDIR /usr/src/build
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# --------------> The production image
FROM nginx:1.23.3
EXPOSE 80
COPY --from=build /usr/src/build/dist /usr/share/nginx/html
COPY --from=build /usr/src/build/nginx.conf /etc/nginx/conf.d/default.conf