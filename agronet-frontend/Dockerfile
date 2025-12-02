# ---------- Build Stage ----------
FROM node:18-alpine AS build
WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm install

# Copy all source code
COPY . .

# Build the Vite project
RUN npm run build


# ---------- Production Stage ----------
FROM nginx:alpine

# Copy Vite build output to Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Expose Nginx server port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
