import express, { query, response } from "express";
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import multer from "multer";
import path from "path";
import fs from "fs";
import responseError from "../response/response.js";
import { callRes } from "../response/response.js";

// Import database connection
import connection from "../../db/connect.js";

const router = express.Router();

const JWT_SECRET = "";
router.get("/get/:id", (req, res) => {
  const hoaDonId = req.params.id;

  connection.query(
    "SELECT * FROM HoaDonBan WHERE id = ?",
    [hoaDonId],
    (error, hoaDonResults) => {
      if (error) {
        console.error("Lỗi truy vấn cơ sở dữ liệu: ", error);
        res.status(500).json({ error: "Lỗi truy vấn cơ sở dữ liệu" });
        return;
      }

      if (hoaDonResults.length === 0) {
        res.status(404).json({ error: "Không tìm thấy hóa đơn bán" });
      } else {
        const hoaDon = hoaDonResults[0];
        connection.query("SELECT sp.*, p.name AS tenSanPham FROM SanPham sp JOIN product p ON sp.productId = p.id WHERE hoaDonBanId = ?",
          // "SELECT * FROM SanPham WHERE hoaDonBanId = ?",
          [hoaDonId],
          (error, sanPhamResults) => {
            if (error) {
              console.error("Lỗi truy vấn cơ sở dữ liệu: ", error);
              res.status(500).json({ error: "Lỗi truy vấn cơ sở dữ liệu" });
              return;
            }
            console.log(query);
            hoaDon.sanPham = sanPhamResults;
            console.log(sanPhamResults);
            console.log(hoaDonResults);
            res.json(hoaDon);
          }
        );
      }
    }
  );
});

// API DELETE: Xóa hóa đơn bán theo ID
router.delete("/delete/:id", (req, res) => {
  const hoaDonId = req.params.id;

  connection.query(
    "DELETE FROM SanPham WHERE hoaDonBanId = ?",
    [hoaDonId],
    (error, deleteSanPhamResults) => {
      if (error) {
        console.error("Lỗi truy vấn cơ sở dữ liệu: ", error);
        res.status(500).json({ error: "Lỗi truy vấn cơ sở dữ liệu" });
        return;
      }

      connection.query(
        "DELETE FROM HoaDonBan WHERE id = ?",
        [hoaDonId],
        (error, deleteHoaDonResults) => {
          if (error) {
            console.error("Lỗi truy vấn cơ sở dữ liệu: ", error);
            res.status(500).json({ error: "Lỗi truy vấn cơ sở dữ liệu" });
            return;
          }

          if (deleteHoaDonResults.affectedRows === 0) {
            res.status(404).json({ error: "Không tìm thấy hóa đơn bán" });
          } else {
            res.json({ message: "Xóa hóa đơn bán thành công" });
          }
        }
      );
    }
  );
});

// API POST: Thêm hóa đơn bán mới

router.get("/get", (req, res) => {
  connection.query("SELECT * FROM HoaDonBan", (error, hoaDonResults) => {
    if (error) {
      console.error("Lỗi truy vấn cơ sở dữ liệu: ", error);
      res.status(500).json({ error: "Lỗi truy vấn cơ sở dữ liệu" });
      return;
    }

    const promises = hoaDonResults.map((hoaDon) => {
      return new Promise((resolve, reject) => {
        connection.query(
          "SELECT * FROM SanPham WHERE hoaDonBanId = ?",
          [hoaDon.id],
          (error, sanPhamResults) => {
            if (error) {
              console.error("Lỗi truy vấn cơ sở dữ liệu: ", error);
              reject(error);
            } else {
              hoaDon.sanPham = sanPhamResults;
              resolve(hoaDon);
            }
          }
        );
      });
    });

    Promise.all(promises)
      .then((hoasDonWithProducts) => {
        res.json(hoasDonWithProducts);
      })
      .catch((error) => {
        console.error("Lỗi truy vấn cơ sở dữ liệu: ", error);
        res.status(500).json({ error: "Lỗi truy vấn cơ sở dữ liệu" });
      });
  });
});

router.post("/add", (req, res) => {
  const {
    tenKhachHang,
    SDT,
    diaChi,
    sanPham,
    ngay,
    thoiGianBaoHanh,
    description,
  } = req.body;
  const query =
    "INSERT INTO HoaDonBan (tenKhachHang, SDT, diaChi, ngay, thoiGianBaoHanh, description) VALUES (?, ?, ?, ?, ?, ?)";

  connection.query(
    query,
    [tenKhachHang, SDT, diaChi, ngay, thoiGianBaoHanh, description],
    (error, insertHoaDonResults) => {
      if (error) {
        console.log(insertHoaDonResults);
        console.error("Lỗi truy vấn cơ sở dữ liệu: ", error);
        res.status(500).json({ error: "Lỗi truy vấn cơ sở dữ liệu" });
        return;
      }

      const hoaDonId = insertHoaDonResults.insertId;
      const sanPhamValues = sanPham.map((item) => [
        hoaDonId,
        item.productId,
        item.soLuong,
        item.donGia,
        item.soLuong * item.donGia,
      ]);

      connection.query(
        "INSERT INTO SanPham (hoaDonBanId, productId, soLuong, donGia, tongTien) VALUES ?",
        [sanPhamValues],
        (error, insertSanPhamResults) => {
          if (error) {
            console.error("Lỗi truy vấn cơ sở dữ liệu: ", error);
            res.status(500).json({ error: "Lỗi truy vấn cơ sở dữ liệu" });
            return;
          }

          // Cập nhật trường 'sold' và giảm trường 'quantity' trong bảng 'product'
          const updateProductQuery =
            "UPDATE product SET sold = sold + ?, quantity = quantity - ? WHERE id = ?";
          sanPham.forEach((item) => {
            console.log(item);
            connection.query(
              updateProductQuery,
              [item.soLuong, item.soLuong, item.productId],
              (error) => {
                if (error) {
                  console.error("Lỗi truy vấn cơ sở dữ liệu: ", error);
                  res.status(500).json({ error: "Lỗi truy vấn cơ sở dữ liệu" });
                  return;
                }
              }
            );
          });

          res.json({ message: "Thêm hóa đơn bán thành công" });
        }
      );
    }
  );
});

export { router };
