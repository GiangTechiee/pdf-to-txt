# 50 câu hỏi trắc nghiệm về Cơ sở dữ liệu quan hệ SQL (từ dễ đến khó)

> Mỗi câu chỉ có **1 đáp án đúng**. Đáp án nằm ngay dưới mỗi câu.

---

## Phần 1 – Kiến thức cơ bản

### Câu 1

SQL là viết tắt của?
A. Simple Query Language
B. Structured Query Language
C. Standard Question Language
D. System Query Logic

**Đáp án: B**

---

### Câu 2

RDBMS là gì?
A. Hệ thống file
B. Hệ quản trị cơ sở dữ liệu quan hệ
C. Ngôn ngữ lập trình
D. Công cụ để viết API

**Đáp án: B**

---

### Câu 3

Dòng dữ liệu trong bảng gọi là?
A. Column
B. Row (Record)
C. Query
D. Schema

**Đáp án: B**

---

### Câu 4

Cột trong bảng gọi là?
A. Row
B. Field / Column
C. Table
D. View

**Đáp án: B**

---

### Câu 5

Câu lệnh nào dùng để lấy dữ liệu?
A. INSERT
B. UPDATE
C. SELECT
D. DELETE

**Đáp án: C**

---

### Câu 6

Câu lệnh để thêm dữ liệu?
A. SELECT
B. DELETE
C. DROP
D. INSERT

**Đáp án: D**

---

### Câu 7

Câu lệnh để sửa dữ liệu?
A. ALTER
B. UPDATE
C. INSERT
D. CREATE

**Đáp án: B**

---

### Câu 8

Câu lệnh để xóa dữ liệu?
A. REMOVE
B. DELETE
C. DROP
D. ERASE

**Đáp án: B**

---

### Câu 9

Câu lệnh để xóa bảng?
A. DELETE TABLE
B. DROP TABLE
C. REMOVE TABLE
D. CLEAR TABLE

**Đáp án: B**

---

### Câu 10

`PRIMARY KEY` dùng để?
A. Cho phép null
B. Định danh duy nhất mỗi dòng
C. Chứa dữ liệu text
D. Tạo khóa ngoại

**Đáp án: B**

---

## Phần 2 – Ràng buộc, Join, Query

### Câu 11

Khóa ngoại (`FOREIGN KEY`) dùng cho?
A. Liên kết bảng với chính nó
B. Liên kết bảng này với bảng khác
C. Tạo index
D. Xác định khóa chính

**Đáp án: B**

---

### Câu 12

`NOT NULL` nghĩa là?
A. Cột bắt buộc phải có giá trị
B. Cột không thể xóa
C. Không cho phép insert dữ liệu
D. Cột chỉ lưu số

**Đáp án: A**

---

### Câu 13

`UNIQUE` nghĩa là?
A. Chỉ cho số nguyên
B. Giá trị không được phép trùng
C. Chỉ cho varchar
D. Chỉ dùng trong khóa ngoại

**Đáp án: B**

---

### Câu 14

Câu lệnh đúng để lấy tất cả dòng?
A. `SELECT ALL FROM table`
B. `SELECT * FROM table`
C. `SELECT table FROM *`
D. `SHOW * table`

**Đáp án: B**

---

### Câu 15

`ORDER BY name DESC` nghĩa là?
A. Sắp xếp tăng theo name
B. Sắp xếp giảm theo name
C. Lấy dữ liệu có name trùng
D. Sửa dữ liệu name

**Đáp án: B**

---

### Câu 16

`WHERE` dùng để?
A. Gộp bảng
B. Lọc dữ liệu theo điều kiện
C. Sửa bảng
D. Tạo chỉ mục

**Đáp án: B**

---

### Câu 17

`JOIN` dùng để?
A. Tạo bảng mới
B. Kết hợp dữ liệu từ nhiều bảng
C. Xóa bảng
D. Tạo transaction

**Đáp án: B**

---

### Câu 18

`INNER JOIN` trả về?
A. Tất cả dòng từ cả 2 bảng
B. Chỉ các dòng khớp giữa 2 bảng
C. Dòng không khớp
D. Dòng bị null

**Đáp án: B**

---

### Câu 19

`LEFT JOIN` trả về?
A. Chỉ dòng khớp
B. Tất cả dòng bảng bên trái và dòng khớp từ bảng phải
C. Tất cả dòng bảng bên phải
D. Dòng trùng khóa chính

**Đáp án: B**

---

### Câu 20

Câu lệnh nhóm dữ liệu?
A. `GROUP DATA`
B. `GROUP BY`
C. `GROUP ALL`
D. `GROUP SORT`

**Đáp án: B**

---

## Phần 3 – Aggregate functions, Index, Transaction

### Câu 21

Hàm tổng hợp: `COUNT(*)` dùng để?
A. Đếm số cột
B. Đếm số dòng
C. Đếm số bảng
D. Đếm số khóa ngoại

**Đáp án: B**

---

### Câu 22

Hàm `AVG()` dùng để?
A. Lấy tổng
B. Lấy trung bình
C. Lấy lớn nhất
D. Lấy nhỏ nhất

**Đáp án: B**

---

### Câu 23

Hàm `SUM()`?
A. Tính tổng
B. Tính trung bình
C. Tính min
D. Tính max

**Đáp án: A**

---

### Câu 24

Index trong SQL dùng để?
A. Nén dữ liệu
B. Tăng tốc truy vấn SELECT
C. Tăng tốc INSERT
D. Tăng tốc DROP

**Đáp án: B**

---

### Câu 25

Nhược điểm của index?
A. Tăng dung lượng bộ nhớ
B. Giảm tốc SELECT
C. Không thể xóa
D. Làm hỏng dữ liệu

**Đáp án: A**

---

### Câu 26

Transaction đảm bảo điều gì?
A. Tăng tốc query
B. Tính toàn vẹn (ACID)
C. Giảm dung lượng DB
D. Tăng số bảng

**Đáp án: B**

---

### Câu 27

ACID gồm?
A. Atomicity, Consistency, Isolation, Durability
B. Action, Control, Index, Data
C. Auto, Cache, Index, Data
D. Atomic, Cache, Input, Data

**Đáp án: A**

---

### Câu 28

`COMMIT` dùng để?
A. Xóa dữ liệu
B. Xác nhận transaction
C. Hủy transaction
D. Khóa bảng

**Đáp án: B**

---

### Câu 29

`ROLLBACK` dùng để?
A. Xóa bảng
B. Trở lại trạng thái trước transaction
C. Tạo bảng mới
D. Lưu dữ liệu

**Đáp án: B**

---

### Câu 30

Deadlock xảy ra khi?
A. Server tắt
B. Hai transaction khóa tài nguyên của nhau và chờ nhau
C. Không có index
D. Dữ liệu quá lớn

**Đáp án: B**

---

## Phần 4 – Schema, Normalization, Advanced Joins

### Câu 31

Schema là?
A. Bảng dữ liệu
B. Cấu trúc định nghĩa bảng và quan hệ
C. Dữ liệu tạm
D. Chỉ mục

**Đáp án: B**

---

### Câu 32

Chuẩn hóa (Normalization) giúp?
A. Tăng số bảng tối đa
B. Giảm trùng lặp
C. Xóa foreign key
D. Tăng kích thước DB

**Đáp án: B**

---

### Câu 33

1NF yêu cầu?
A. Không có khóa
B. Mỗi cột chỉ chứa giá trị nguyên tử (atomic)
C. Dữ liệu phải unique
D. Dữ liệu đã sorted

**Đáp án: B**

---

### Câu 34

2NF bổ sung yêu cầu gì so với 1NF?
A. Không khóa chính
B. Không phụ thuộc từng phần vào khóa chính
C. Không cần unique
D. Không cần atomic

**Đáp án: B**

---

### Câu 35

3NF yêu cầu?
A. Không có phụ thuộc bắc cầu (transitive dependency)
B. Không có foreign key
C. Chỉ có 1 bảng
D. Không có index

**Đáp án: A**

---

### Câu 36

`FULL OUTER JOIN` trả về?
A. Chỉ dòng khớp
B. Dòng không khớp
C. Tất cả dòng từ cả 2 bảng
D. Dòng null từ bảng trái

**Đáp án: C**

---

### Câu 37

`CROSS JOIN` trả về?
A. Dòng trùng khóa chính
B. Tích Descartes (mọi kết hợp có thể)
C. Dòng không khớp
D. Chỉ dòng null

**Đáp án: B**

---

### Câu 38

`HAVING` khác `WHERE` ở chỗ?
A. HAVING áp dụng sau GROUP BY
B. HAVING áp dụng trước GROUP BY
C. WHERE dùng cho aggregate
D. HAVING không lọc được

**Đáp án: A**

---

### Câu 39

Câu lệnh tạo bảng?
A. `NEW TABLE`
B. `ADD TABLE`
C. `CREATE TABLE`
D. `MAKE TABLE`

**Đáp án: C**

---

### Câu 40

UUID thường dùng cho?
A. Dữ liệu text
B. Khóa chính unique không dựa vào số tự tăng
C. Index
D. Trigger

**Đáp án: B**

---

## Phần 5 – Nâng cao & Tối ưu hóa

### Câu 41

View trong SQL là?
A. Bảng tạm được tạo từ SELECT
B. Bảng vật lý
C. Trigger
D. Index dạng text

**Đáp án: A**

---

### Câu 42

Stored Procedure là?
A. File cấu hình
B. Tập các câu lệnh SQL được lưu và chạy trên DB server
C. Hàm frontend
D. CSDL NoSQL

**Đáp án: B**

---

### Câu 43

Trigger thực thi khi nào?
A. Lúc server chạy
B. Trước hoặc sau các thao tác INSERT/UPDATE/DELETE
C. Khi SELECT
D. Khi restart DB

**Đáp án: B**

---

### Câu 44

Constraint `CHECK` dùng để?
A. Tạo khóa chính
B. Ràng buộc giá trị hợp lệ theo điều kiện
C. Xóa dữ liệu
D. Tự động tăng id

**Đáp án: B**

---

### Câu 45

`EXPLAIN` trong SQL dùng để?
A. Hiển thị cấu trúc trigger
B. Phân tích và tối ưu truy vấn
C. Xóa index
D. Kiểm tra bảng trống

**Đáp án: B**

---

### Câu 46

Sharding là?
A. Sao lưu dữ liệu
B. Chia nhỏ dữ liệu theo chiều ngang cho nhiều node
C. Gom dữ liệu
D. Nén dữ liệu

**Đáp án: B**

---

### Câu 47

Replication là?
A. Nhân bản dữ liệu sang node khác để tăng sẵn sàng
B. Xóa dữ liệu
C. Gộp bảng
D. Chia nhỏ bảng

**Đáp án: A**

---

### Câu 48

`OPTIMIZE` hoặc `VACUUM` dùng để?
A. Dọn dẹp, tái cấu trúc dữ liệu để giảm phân mảnh và tăng hiệu suất
B. Tăng kích thước DB
C. Xóa toàn bộ bảng
D. Tạo index tự động

**Đáp án: A**

---

### Câu 49

Mục đích của partitioning trong cơ sở dữ liệu?
A. Giảm số bảng
B. Chia bảng lớn thành các phần nhỏ để tăng hiệu suất truy vấn và quản lý
C. Tự động tạo khóa chính
D. Xóa dữ liệu nhanh hơn

**Đáp án: B**

---

### Câu 50

Khi tối ưu truy vấn, điều nào sau đây quan trọng nhất?
A. Viết thật nhiều subquery
B. Sử dụng chỉ mục hợp lý, tránh query full table scan, và phân tích bằng EXPLAIN
C. Dồn toàn bộ logic vào một query duy nhất
D. Không dùng join để đơn giản hóa

**Đáp án: B**
