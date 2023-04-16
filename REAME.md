Tên dư án : Trang web quản lý cửa hàng bàn điện thoại.

Cách chạy dự án :

* Với điều kiện máy tính của các bạn đã cài docker

- Các bạn pull dự án từ docker về với lệnh sau : 

   docker pull nvtunghust/phonestore:v1

- Sau đó chạy dự án bằng lệnh :

  docker run nvtunghust/phonestore:v1 

- Sau đó các bạn vào truy cập vào http://localhost:3000/ để xem trang web

- Ở đây mình đã để sẵn dự án sẽ chạy ở cổng 3000, nếu không muốn các bạn có thể chạy dự án bằng câu lệnh (bỏ dấu []) : 
  
  docker run -p [port_các_bạn_chọn]:3000 nvtunghust/phonestore:v1 

- Sau đó các bạn vào truy cập vào http://localhost:[port_các_bạn_chọn]/ để xem trang web