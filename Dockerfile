# sử dụng một image của node.js có sẵn trên Docker Hub
FROM node:16-alpine

# tạo một thư mục để lưu trữ các file trong container
WORKDIR /app

# copy tất cả các file từ thư mục gốc của dự án vào thư mục /app trên container
COPY . .

# chuyển sang thư mục client và cài đặt các package
WORKDIR /app/client
RUN npm install

RUN npm run build


# expose port 3000
EXPOSE 3000

# khi container được khởi chạy, sẽ chạy lệnh npm start trong thư mục client
CMD ["npm", "start"]
