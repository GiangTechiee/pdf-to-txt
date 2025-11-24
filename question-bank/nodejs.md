# 50 câu hỏi trắc nghiệm về Node.js (từ dễ đến khó)

> Mỗi câu chỉ có 1 đáp án đúng. Đáp án nằm ngay sau mỗi câu.

---

## Phần 1 – Kiến thức cơ bản

### Câu 1

Node.js là gì?

A. Một framework frontend
B. Môi trường chạy JavaScript phía server
C. Một hệ quản trị CSDL
D. Một trình duyệt web

**Đáp án: B**

---

### Câu 2

Node.js chạy trên engine JavaScript nào?

A. SpiderMonkey
B. V8 Engine
C. Chakra
D. Rhino

**Đáp án: B**

---

### Câu 3

Node.js đặc biệt phù hợp cho loại ứng dụng nào?

A. Ứng dụng CPU-bound
B. Ứng dụng real-time, I/O-bound
C. Ứng dụng desktop
D. Ứng dụng render đồ họa

**Đáp án: B**

---

### Câu 4

File JavaScript chạy bằng Node.js thường có phần mở rộng là gì?

A. `.json`
B. `.node`
C. `.js`
D. `.ts`

**Đáp án: C**

---

### Câu 5

Câu lệnh kiểm tra phiên bản Node.js?

A. `node -v`
B. `node version`
C. `npm -v`
D. `check-node`

**Đáp án: A**

---

### Câu 6

Module trong Node.js được import bằng cú pháp nào (CommonJS)?

A. `import module from 'x'`
B. `require('module')`
C. `load('module')`
D. `use('module')`

**Đáp án: B**

---

### Câu 7

Hệ thống package mặc định của Node.js là gì?

A. Yarn
B. pnpm
C. npm
D. bundler

**Đáp án: C**

---

### Câu 8

File cấu hình chính của dự án Node.js là?

A. `package.json`
B. `node.config`
C. `config.json`
D. `index.js`

**Đáp án: A**

---

### Câu 9

Lệnh cài đặt package local?

A. `npm install -g package`
B. `npm i package`
C. `npm run package`
D. `npm new package`

**Đáp án: B**

---

### Câu 10

Lệnh chạy file `index.js` trong Node?

A. `npm start index.js`
B. `node run index.js`
C. `node index.js`
D. `npm index run`

**Đáp án: C**

---

## Phần 2 – Core Modules & Async

### Câu 11

Module nào dùng để làm việc với hệ thống file?

A. `http`
B. `fs`
C. `url`
D. `path`

**Đáp án: B**

---

### Câu 12

Cơ chế xử lý bất đồng bộ trong Node.js dựa trên?

A. Thread Pool đồng bộ
B. Event Loop
C. Static Scheduling
D. GPU pipeline

**Đáp án: B**

---

### Câu 13

Trong Node.js, hàm non-blocking thường nhận tham số callback với cấu trúc?

A. `callback(result, error)`
B. `callback(error, result)`
C. `callback(error)`
D. `callback(result)`

**Đáp án: B**

---

### Câu 14

Câu lệnh tạo server đơn giản bằng module `http`?

A. `http.createHttp()`
B. `http.createServer()`
C. `http.runServer()`
D. `http.buildServer()`

**Đáp án: B**

---

### Câu 15

Phương thức nào của `fs` là bất đồng bộ?

A. `fs.readFileSync()`
B. `fs.readFile()`
C. `fs.readSync()`
D. `fs.openSync()`

**Đáp án: B**

---

### Câu 16

`setTimeout` trong Node.js hoạt động dựa trên?

A. Worker Thread
B. Event Loop – Timers Phase
C. Disk I/O
D. Network Event

**Đáp án: B**

---

### Câu 17

Để chuyển từ callback sang promise có thể dùng API nào?

A. `async()`
B. `newCallback()`
C. `util.promisify()`
D. `promise.convert()`

**Đáp án: C**

---

### Câu 18

Keyword nào dùng để đợi một Promise hoàn thành?

A. `wait`
B. `stop`
C. `await`
D. `resolve`

**Đáp án: C**

---

### Câu 19

Tất cả hàm async luôn trả về?

A. Boolean
B. Promise
C. Callback
D. Object

**Đáp án: B**

---

### Câu 20

Node.js sử dụng bao nhiêu luồng chính cho việc thực thi JavaScript?

A. 1
B. 2
C. 4
D. 64

**Đáp án: A**

---

## Phần 3 – Express.js

### Câu 21

Express.js là gì?

A. Framework Node.js dùng để xây dựng web server
B. Module để đọc file
C. Công cụ debug Node
D. Thư viện để làm việc với CSDL

**Đáp án: A**

---

### Câu 22

Để tạo app Express mẫu:

A. `const app = createExpress()`
B. `const app = new Express()`
C. `const app = express()`
D. `const app = buildExpress()`

**Đáp án: C**

---

### Câu 23

Phương thức HTTP nào dùng để tạo mới dữ liệu?

A. GET
B. POST
C. PUT
D. DELETE

**Đáp án: B**

---

### Câu 24

Middleware trong Express là gì?

A. Hàm xử lý lỗi
B. Hàm nhận request, xử lý và gọi tiếp `next()`
C. Chỉ dùng để log
D. Dùng để render HTML

**Đáp án: B**

---

### Câu 25

Cú pháp khai báo route GET?

A. `app.get('/path', handler)`
B. `app.route('/path')`
C. `app.fetch('/path')`
D. `app.listen('/path')`

**Đáp án: A**

---

### Câu 26

Port mặc định hay dùng trong local của Node server?

A. 80
B. 3000
C. 22
D. 6000

**Đáp án: B**

---

### Câu 27

Module nào dùng để parse JSON body trong Express (v5 đã tích hợp)?

A. `body-parser`
B. `cookie-parser`
C. `cors`
D. `express.json()`

**Đáp án: D**

---

### Câu 28

Cách trả response dạng JSON:

A. `res.data(json)`
B. `res.send(json)`
C. `res.json(json)`
D. `res.output(json)`

**Đáp án: C**

---

### Câu 29

Để xử lý lỗi tập trung trong Express, cần middleware bao nhiêu tham số?

A. 1
B. 2
C. 3
D. 4

**Đáp án: D**

---

### Câu 30

`next()` trong middleware có tác dụng:

A. Kết thúc vòng đời request
B. Gọi sang middleware tiếp theo
C. Reset server
D. Trả response lập tức

**Đáp án: B**

---

## Phần 4 – Module, Buffer, Streams

### Câu 31

Module nào để làm việc với đường dẫn file?

A. `route`
B. `path`
C. `fs`
D. `stream`

**Đáp án: B**

---

### Câu 32

Buffer trong Node.js dùng để làm gì?

A. Render UI
B. Lưu trữ dữ liệu nhị phân
C. Tạo server
D. Quản lý session

**Đáp án: B**

---

### Câu 33

Stream loại readable là?

A. Chỉ ghi
B. Chỉ đọc
C. Vừa đọc vừa ghi
D. Không dùng cho file

**Đáp án: B**

---

### Câu 34

Sự kiện `data` trong Readable stream xảy ra khi:

A. File bị xoá
B. Có chunk dữ liệu mới
C. Server restart
D. Client disconnect

**Đáp án: B**

---

### Câu 35

Để pipe dữ liệu từ Readable sang Writable:

A. `stream.flow()`
B. `readable.pipe(writable)`
C. `stream.transfer()`
D. `readable.to(writable)`

**Đáp án: B**

---

### Câu 36

`fs.createReadStream()` giúp:

A. Đọc file kiểu sync
B. Đọc file theo từng chunk
C. Ghi file nhị phân
D. Tạo buffer rỗng

**Đáp án: B**

---

### Câu 37

Ưu điểm lớn nhất của stream?

A. Code ngắn hơn
B. Tiết kiệm bộ nhớ vì xử lý theo chunk
C. Chạy nhanh hơn CPU
D. Tự động cache dữ liệu

**Đáp án: B**

---

### Câu 38

Writable stream dùng sự kiện nào khi ghi xong?

A. `finish`
B. `done`
C. `end`
D. `close`

**Đáp án: A**

---

### Câu 39

`zlib` trong Node.js dùng để?

A. Nén và giải nén dữ liệu
B. Chạy WebSocket
C. Xử lý ảnh
D. Render HTML

**Đáp án: A**

---

### Câu 40

`cluster` module dùng để?

A. Phân chia file
B. Chạy nhiều tiến trình Node để tận dụng CPU đa nhân
C. Nén dữ liệu
D. Tạo kết nối CSDL

**Đáp án: B**

---

## Phần 5 – Security, Architecture, Advanced

### Câu 41

WebSocket là giao thức gì?

A. One-way
B. Two-way, full-duplex
C. Chỉ dùng cho video
D. Chỉ dùng cho IoT

**Đáp án: B**

---

### Câu 42

JWT thường lưu thông tin ở đâu trong web app?

A. localStorage hoặc cookie
B. Database
C. HTML
D. CSS

**Đáp án: A**

---

### Câu 43

Bcrypt thường dùng để?

A. Mã hóa JWT
B. Hash mật khẩu
C. Nén file
D. Validate dữ liệu

**Đáp án: B**

---

### Câu 44

Trong Node.js, để tránh callback hell, nên dùng?

A. Callback sâu hơn
B. Promise hoặc async/await
C. Event listener
D. Timeout

**Đáp án: B**

---

### Câu 45

ORM phổ biến cho Node.js?

A. Sequelize
B. Laravel ORM
C. Eloquent
D. Hibernate

**Đáp án: A**

---

### Câu 46

Thư viện phổ biến để làm việc với MongoDB?

A. mysql2
B. redis
C. mongoose
D. pg

**Đáp án: C**

---

### Câu 47

Trong kiến trúc Microservices với Node.js, giao tiếp giữa các service thường dùng?

A. HTTP hoặc Message Queue
B. HTML
C. CSS
D. File .exe

**Đáp án: A**

---

### Câu 48

Một kỹ thuật chống DDOS đơn giản?

A. Thêm nhiều console.log
B. Rate limiting
C. Tăng RAM
D. Tạo nhiều file JS

**Đáp án: B**

---

### Câu 49

PM2 dùng để làm gì?

A. Chạy nhiều phiên bản Node, quản lý process và tự restart
B. Debug UI
C. Tạo UI React
D. Chỉnh sửa CSDL

**Đáp án: A**

---

### Câu 50

Khi xây dựng API lớn bằng Node.js, yếu tố quan trọng nhất?

A. Ghi thật nhiều log
B. Tổ chức rõ ràng modules, service layer, controller, middleware và tách config/env
C. Dồn toàn bộ logic vào 1 file
D. Không dùng thư viện ngoài

**Đáp án: B**
