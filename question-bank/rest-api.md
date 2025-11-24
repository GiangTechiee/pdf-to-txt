# 50 câu hỏi trắc nghiệm về REST API (từ dễ đến khó)

> Mỗi câu chỉ có 1 đáp án đúng. Đáp án nằm ngay sau mỗi câu.

---

## Phần 1 – Kiến thức cơ bản

### Câu 1

REST là viết tắt của gì?
A. Representational State Transfer
B. Random Service Technology
C. Remote Event Streaming Transfer
D. Resource Execution Transfer

**Đáp án: A**

---

### Câu 2

REST API hoạt động dựa trên giao thức nào?
A. FTP
B. HTTP/HTTPS
C. SMTP
D. SSH

**Đáp án: B**

---

### Câu 3

Trong REST, tài nguyên thường được đại diện dưới dạng?
A. HTML
B. JSON hoặc XML
C. SQL
D. CSS

**Đáp án: B**

---

### Câu 4

Phương thức HTTP nào dùng để lấy dữ liệu?
A. POST
B. DELETE
C. GET
D. PUT

**Đáp án: C**

---

### Câu 5

Phương thức HTTP nào dùng để tạo mới dữ liệu?
A. GET
B. POST
C. DELETE
D. HEAD

**Đáp án: B**

---

### Câu 6

Phương thức HTTP nào dùng để cập nhật toàn bộ tài nguyên?
A. PATCH
B. PUT
C. GET
D. OPTIONS

**Đáp án: B**

---

### Câu 7

Phương thức HTTP nào dùng để cập nhật một phần tài nguyên?
A. PUT
B. PATCH
C. GET
D. HEAD

**Đáp án: B**

---

### Câu 8

Phương thức HTTP nào dùng để xóa tài nguyên?
A. UPDATE
B. DELETE
C. REMOVE
D. CLEAR

**Đáp án: B**

---

### Câu 9

HTTP status 200 có ý nghĩa gì?
A. Not Found
B. Bad Request
C. OK – Thành công
D. Unauthorized

**Đáp án: C**

---

### Câu 10

API trả về 404 nghĩa là?
A. Server lỗi
B. Không tìm thấy tài nguyên
C. Token hết hạn
D. Yêu cầu sai định dạng

**Đáp án: B**

---

## Phần 2 – URL, Resource, Status Codes

### Câu 11

Đâu là URL RESTful đúng?
A. `/getUser`
B. `/users/123`
C. `/user?id=123&action=get`
D. `/user/get/123`

**Đáp án: B**

---

### Câu 12

HTTP status 201 dùng cho?
A. Updated
B. Created (Tạo mới thành công)
C. Deleted
D. Redirect

**Đáp án: B**

---

### Câu 13

HTTP status 400 có nghĩa?
A. Bad Request
B. Not Found
C. Forbidden
D. Internal Server Error

**Đáp án: A**

---

### Câu 14

HTTP status 401 mang nghĩa gì?
A. Cấm truy cập
B. Yêu cầu không hợp lệ
C. Chưa xác thực
D. Token hết hạn

**Đáp án: C**

---

### Câu 15

HTTP status 403 nghĩa là?
A. Server lỗi
B. Không được phép truy cập
C. Chưa đăng nhập
D. Validation fail

**Đáp án: B**

---

### Câu 16

HTTP status 500 nghĩa là?
A. Server gặp lỗi nội bộ
B. Request không hợp lệ
C. Tham số thiếu
D. Chưa login

**Đáp án: A**

---

### Câu 17

Đâu là best practice cho REST API?
A. Dùng động từ trong URL
B. Dùng danh từ để biểu diễn tài nguyên
C. Dùng tên file trong URL
D. URL viết hoa toàn bộ

**Đáp án: B**

---

### Câu 18

Đâu là ví dụ đúng của nested resource?
A. `/orders/products/list`
B. `/orders/12/products`
C. `/getProductsByOrder`
D. `/products/order/12`

**Đáp án: B**

---

### Câu 19

Trả về danh sách tài nguyên thường dùng status?
A. 204
B. 200
C. 302
D. 500

**Đáp án: B**

---

### Câu 20

DELETE thành công nhưng không cần trả dữ liệu thường trả status?
A. 200
B. 204
C. 400
D. 202

**Đáp án: B**

---

## Phần 3 – Headers, Auth, Payload

### Câu 21

Header thường dùng để gửi token?
A. `X-Token`
B. `Authorization`
C. `Auth`
D. `Bearer`

**Đáp án: B**

---

### Câu 22

Khi gửi JSON payload, client cần header?
A. `Content-Type: text/html`
B. `Content-Type: application/json`
C. `Content-Type: multipart/form-data`
D. `Content-Type: text/plain`

**Đáp án: B**

---

### Câu 23

Tham số query nằm ở đâu?
A. Body
B. Header
C. URL sau dấu `?`
D. Token

**Đáp án: C**

---

### Câu 24

OAuth2 là?
A. Một HTTP method
B. Giao thức xác thực ủy quyền
C. Thư viện Node.js
D. Hàm hash mật khẩu

**Đáp án: B**

---

### Câu 25

Trong REST, JSON Web Token (JWT) dùng cho?
A. Hash dữ liệu
B. Truyền thông tin xác thực
C. Logging
D. Render HTML

**Đáp án: B**

---

### Câu 26

Phần payload của JWT chứa?
A. Private key
B. Thông tin (claims)
C. Mật khẩu người dùng
D. Token refresh

**Đáp án: B**

---

### Câu 27

Header CORS nào cho phép browser gọi API từ domain khác?
A. `Access-Control-Allow-Domain`
B. `Access-Control-Allow-Origin`
C. `Access-Control-Request`
D. `Access-Cross-Domain`

**Đáp án: B**

---

### Câu 28

Khi API yêu cầu xác thực, client chưa gửi token sẽ nhận status?
A. 200
B. 401
C. 403
D. 404

**Đáp án: B**

---

### Câu 29

Multipart form-data thường dùng để?
A. Upload file
B. Gửi JSON
C. Gửi XML
D. Gửi token

**Đáp án: A**

---

### Câu 30

Header `Accept: application/json` có nghĩa?
A. Server phải trả về HTML
B. Client muốn nhận JSON
C. Server sẽ reject request
D. Client gửi JSON

**Đáp án: B**

---

## Phần 4 – Pagination, Filtering, Versioning

### Câu 31

Pagination thường dùng tham số?
A. `page` và `limit`
B. `id` và `sort`
C. `start` và `end`
D. `from` và `to`

**Đáp án: A**

---

### Câu 32

Filtering thường dùng cách nào?
A. `/users/filter/name`
B. `/users?name=abc&age=20`
C. `/users/filter`
D. `/filter/users`

**Đáp án: B**

---

### Câu 33

Sorting thường dùng?
A. `/users?sortBy=name&order=asc`
B. `/users/sort/name`
C. `/sort/users`
D. `/users?filter=sort`

**Đáp án: A**

---

### Câu 34

Versioning API đúng chuẩn?
A. `/v1/users`
B. `/users/v1`
C. `/version1/users`
D. `/api-version/users`

**Đáp án: A**

---

### Câu 35

Hạn chế lớn nhất của REST API khi hệ thống rất lớn?
A. Không hỗ trợ JSON
B. Over-fetching và under-fetching
C. Không bảo mật
D. Không chạy trên HTTPS

**Đáp án: B**

---

### Câu 36

Field `total`, `page`, `pageSize` thường xuất hiện trong?
A. Header bảo mật
B. Kết quả trả về của API phân trang
C. JWT
D. Body PUT

**Đáp án: B**

---

### Câu 37

Lợi ích của versioning API?
A. Hạn chế người dùng
B. Cho phép nâng cấp API mà không phá vỡ client cũ
C. Tăng tốc độ mạng
D. Giảm thời gian build

**Đáp án: B**

---

### Câu 38

API trả về 429 nghĩa là?
A. Server quá tải
B. Too Many Requests
C. Lỗi xác thực
D. Gửi sai dữ liệu

**Đáp án: B**

---

### Câu 39

Idempotent method là gì?
A. Phương thức chạy song song
B. Gọi nhiều lần vẫn ra cùng kết quả (GET, PUT, DELETE)
C. Chỉ chạy một lần duy nhất
D. Chạy trên cluster

**Đáp án: B**

---

### Câu 40

POST có phải idempotent không?
A. Có
B. Không
C. Tùy server
D. Tùy HTTP version

**Đáp án: B**

---

## Phần 5 – Nâng cao & Best Practices

### Câu 41

HATEOAS là gì?
A. Kỹ thuật caching
B. REST nâng cao với hypermedia links
C. Thuật toán mã hóa
D. Loại authentication

**Đáp án: B**

---

### Câu 42

Cache-Control giúp?
A. Bảo vệ API
B. Giảm tải bằng cache
C. Mã hóa dữ liệu
D. Upload file

**Đáp án: B**

---

### Câu 43

API rate limiting giúp?
A. Tăng tốc API
B. Ngăn spam request
C. Render HTML
D. Chạy real-time

**Đáp án: B**

---

### Câu 44

Etag dùng để?
A. Theo dõi thay đổi tài nguyên để cache hiệu quả
B. Hash mật khẩu
C. Xác thực người dùng
D. Nén dữ liệu

**Đáp án: A**

---

### Câu 45

Để mô tả API, chuẩn phổ biến?
A. Swagger/OpenAPI
B. GraphQL SDL
C. HTML Document
D. JSON Raw

**Đáp án: A**

---

### Câu 46

Rate limit thường trả status code?
A. 500
B. 429
C. 404
D. 408

**Đáp án: B**

---

### Câu 47

GraphQL thường giải quyết vấn đề của REST là?
A. Không hỗ trợ GET
B. Over-fetching và under-fetching
C. Không có bảo mật
D. Không chạy trên HTTPS

**Đáp án: B**

---

### Câu 48

Trong REST, field `links` trong response dùng để?
A. Chứa token
B. Điều hướng tài nguyên khác (HATEOAS)
C. Chứa log
D. Quy định role

**Đáp án: B**

---

### Câu 49

API Gateway trong microservices có vai trò?
A. Lưu database
B. Điều phối request và routing đến đúng service
C. Compile code
D. Render UI

**Đáp án: B**

---

### Câu 50

Best practice quan trọng nhất khi xây dựng REST API lớn?
A. Gom tất cả route vào 1 file
B. Tách rõ ràng controller, service, middleware, validation, model, logging
C. Không dùng versioning
D. Không cần documentation

**Đáp án: B**
