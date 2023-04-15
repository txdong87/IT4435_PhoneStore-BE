# Sử dụng image node phiên bản 16 làm base image
FROM node:16-alpine

# Đặt working directory trong container
WORKDIR /app

# Copy toàn bộ nội dung từ thư mục hiện tại vào thư mục /app trong container
COPY . /app

# Di chuyển vào thư mục client
WORKDIR /app/client

# Install dependencies cho phần front-end
RUN npm install



CMD ["npm", "start"]







