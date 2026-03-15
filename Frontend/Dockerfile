# Stage 1: Build the React app
FROM node:22-alpine As build

WORKDIR /frontend

COPY package*.json ./
RUN npm install

COPY . .

ARG VITE_BACKEND_URL
ENV VITE_BACKEND_URL=${VITE_BACKEND_URL}

RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

COPY --from=build /frontend/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]