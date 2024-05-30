# # Stage 1: Build the Angular app
# FROM node:18-alpine AS builder
# WORKDIR /app
# COPY package*.json ./
# COPY .npmrc ./
# RUN npm install --legacy-peer-deps
# COPY . .
# RUN npm run build

# Stage 2: Serve the Angular app with Nginx
FROM nginx:1.21-alpine
WORKDIR /app
COPY /app /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
