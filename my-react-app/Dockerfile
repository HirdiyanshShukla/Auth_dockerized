# Step 1: Build React app
FROM node:18-alpine AS build

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL
RUN npm run build

# Step 2: Serve with Nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80





# # Step 1: Build React app
# FROM node:18-alpine AS build



# WORKDIR /app
# COPY package.json ./
# COPY package-lock.json ./
# RUN npm install

# # Copy rest of the files and build
# COPY . .

# ARG REACT_APP_API_URL
# ENV REACT_APP_API_URL=$REACT_APP_API_URL
# RUN npm run build

# RUN npm run dev
# RUN npm install -g serve

# # Step 2: Serve with Nginx
# FROM nginx:alpine
# COPY --from=build /app/build /usr/share/nginx/html

# # Expose port 80
# EXPOSE 80


