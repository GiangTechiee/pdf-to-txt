# 50 câu hỏi trắc nghiệm MongoDB (từ dễ đến khó)

> Mỗi câu chỉ có một đáp án đúng. Đáp án nằm ngay dưới từng câu.

---

## Phần 1 – Cơ bản về MongoDB

### Câu 1

MongoDB là loại database gì?
A. Relational Database
B. NoSQL Document Database
C. Graph Database
D. Key-Value Store

**Đáp án: B**

---

### Câu 2

Đơn vị lưu trữ dữ liệu cơ bản trong MongoDB?
A. Table
B. Row
C. Document
D. Cell

**Đáp án: C**

---

### Câu 3

Format dữ liệu MongoDB sử dụng?
A. XML
B. JSON/BSON
C. CSV
D. YAML

**Đáp án: B**

---

### Câu 4

Collection trong MongoDB tương đương với gì trong SQL?
A. Database
B. Table
C. Row
D. Column

**Đáp án: B**

---

### Câu 5

Document trong MongoDB tương đương với gì trong SQL?
A. Database
B. Table
C. Row
D. Column

**Đáp án: C**

---

### Câu 6

Lệnh để xem tất cả databases?
A. `show databases`
B. `list databases`
C. `get databases`
D. `display databases`

**Đáp án: A**

---

### Câu 7

Lệnh để chuyển sang database khác?
A. `select db`
B. `use dbname`
C. `switch dbname`
D. `change dbname`

**Đáp án: B**

---

### Câu 8

Lệnh để xem tất cả collections?
A. `show collections`
B. `list collections`
C. `get collections`
D. `display collections`

**Đáp án: A**

---

### Câu 9

Field `_id` trong MongoDB có đặc điểm gì?
A. Tự động tạo và unique
B. Phải tự nhập
C. Không bắt buộc
D. Có thể trùng lặp

**Đáp án: A**

---

### Câu 10

Port mặc định của MongoDB?
A. 3306
B. 5432
C. 27017
D. 8080

**Đáp án: C**

---

## Phần 2 – CRUD Operations

### Câu 11

Lệnh thêm một document vào collection?
A. `db.collection.add()`
B. `db.collection.insert()`
C. `db.collection.insertOne()`
D. `db.collection.create()`

**Đáp án: C**

---

### Câu 12

Lệnh thêm nhiều documents cùng lúc?
A. `db.collection.insertMany()`
B. `db.collection.insertAll()`
C. `db.collection.addMany()`
D. `db.collection.bulkInsert()`

**Đáp án: A**

---

### Câu 13

Lệnh tìm tất cả documents trong collection?
A. `db.collection.findAll()`
B. `db.collection.find()`
C. `db.collection.getAll()`
D. `db.collection.select()`

**Đáp án: B**

---

### Câu 14

Lệnh tìm một document đầu tiên thỏa điều kiện?
A. `db.collection.findFirst()`
B. `db.collection.findOne()`
C. `db.collection.getOne()`
D. `db.collection.first()`

**Đáp án: B**

---

### Câu 15

Lệnh cập nhật một document?
A. `db.collection.update()`
B. `db.collection.modify()`
C. `db.collection.updateOne()`
D. `db.collection.change()`

**Đáp án: C**

---

### Câu 16

Lệnh cập nhật nhiều documents?
A. `db.collection.updateMany()`
B. `db.collection.updateAll()`
C. `db.collection.modifyMany()`
D. `db.collection.bulkUpdate()`

**Đáp án: A**

---

### Câu 17

Lệnh xóa một document?
A. `db.collection.remove()`
B. `db.collection.deleteOne()`
C. `db.collection.drop()`
D. `db.collection.erase()`

**Đáp án: B**

---

### Câu 18

Lệnh xóa nhiều documents?
A. `db.collection.deleteMany()`
B. `db.collection.removeAll()`
C. `db.collection.dropMany()`
D. `db.collection.eraseAll()`

**Đáp án: A**

---

### Câu 19

Toán tử để set giá trị field khi update?
A. `$set`
B. `$update`
C. `$change`
D. `$modify`

**Đáp án: A**

---

### Câu 20

Toán tử để xóa field khỏi document?
A. `$remove`
B. `$delete`
C. `$unset`
D. `$drop`

**Đáp án: C**

---

## Phần 3 – Query Operators

### Câu 21

Toán tử so sánh "lớn hơn" trong MongoDB?
A. `$gt`
B. `$greater`
C. `$more`
D. `$above`

**Đáp án: A**

---

### Câu 22

Toán tử so sánh "nhỏ hơn hoặc bằng"?
A. `$le`
B. `$lte`
C. `$lessequal`
D. `$smallerequal`

**Đáp án: B**

---

### Câu 23

Toán tử kiểm tra giá trị có trong mảng?
A. `$in`
B. `$contains`
C. `$has`
D. `$includes`

**Đáp án: A**

---

### Câu 24

Toán tử kiểm tra giá trị không có trong mảng?
A. `$nin`
B. `$notIn`
C. `$exclude`
D. `$without`

**Đáp án: A**

---

### Câu 25

Toán tử logic AND?
A. `$and`
B. `$all`
C. `$both`
D. `$together`

**Đáp án: A**

---

### Câu 26

Toán tử logic OR?
A. `$or`
B. `$either`
C. `$any`
D. `$one`

**Đáp án: A**

---

### Câu 27

Toán tử phủ định điều kiện?
A. `$not`
B. `$negate`
C. `$opposite`
D. `$reverse`

**Đáp án: A**

---

### Câu 28

Toán tử kiểm tra field có tồn tại?
A. `$exists`
B. `$has`
C. `$present`
D. `$available`

**Đáp án: A**

---

### Câu 29

Toán tử kiểm tra kiểu dữ liệu của field?
A. `$type`
B. `$typeof`
C. `$datatype`
D. `$kind`

**Đáp án: A**

---

### Câu 30

Toán tử tìm kiếm theo regex?
A. `$regex`
B. `$pattern`
C. `$match`
D. `$search`

**Đáp án: A**

---

## Phần 4 – Indexing & Performance

### Câu 31

Lệnh tạo index cho field?
A. `db.collection.createIndex()`
B. `db.collection.addIndex()`
C. `db.collection.makeIndex()`
D. `db.collection.buildIndex()`

**Đáp án: A**

---

### Câu 32

Index mặc định trong MongoDB?
A. `_id`
B. `id`
C. `primary`
D. `key`

**Đáp án: A**

---

### Câu 33

Lệnh xem tất cả indexes của collection?
A. `db.collection.getIndexes()`
B. `db.collection.showIndexes()`
C. `db.collection.listIndexes()`
D. `db.collection.indexes()`

**Đáp án: A**

---

### Câu 34

Lệnh xóa index?
A. `db.collection.dropIndex()`
B. `db.collection.removeIndex()`
C. `db.collection.deleteIndex()`
D. `db.collection.eraseIndex()`

**Đáp án: A**

---

### Câu 35

Index nào giúp tìm kiếm text?
A. Text Index
B. String Index
C. Search Index
D. Word Index

**Đáp án: A**

---

### Câu 36

Compound index là gì?
A. Index trên nhiều fields
B. Index phức tạp
C. Index lồng nhau
D. Index tự động

**Đáp án: A**

---

### Câu 37

Lệnh phân tích hiệu năng query?
A. `explain()`
B. `analyze()`
C. `profile()`
D. `debug()`

**Đáp án: A**

---

### Câu 38

Unique index dùng để?
A. Đảm bảo giá trị không trùng lặp
B. Tăng tốc query
C. Sắp xếp dữ liệu
D. Nén dữ liệu

**Đáp án: A**

---

### Câu 39

TTL index dùng để?
A. Tự động xóa documents sau thời gian
B. Tăng tốc query
C. Backup dữ liệu
D. Compress dữ liệu

**Đáp án: A**

---

### Câu 40

Geospatial index dùng để?
A. Query dữ liệu địa lý
B. Query dữ liệu số
C. Query dữ liệu text
D. Query dữ liệu date

**Đáp án: A**

---

## Phần 5 – Aggregation Framework

### Câu 41

Aggregation pipeline là gì?
A. Chuỗi các stages xử lý dữ liệu
B. Backup pipeline
C. Network pipeline
D. Storage pipeline

**Đáp án: A**

---

### Câu 42

Stage `$match` dùng để?
A. Lọc documents
B. Nhóm documents
C. Sắp xếp documents
D. Đếm documents

**Đáp án: A**

---

### Câu 43

Stage `$group` dùng để?
A. Nhóm documents theo field
B. Lọc documents
C. Sắp xếp documents
D. Giới hạn documents

**Đáp án: A**

---

### Câu 44

Stage `$sort` dùng để?
A. Sắp xếp documents
B. Lọc documents
C. Nhóm documents
D. Đếm documents

**Đáp án: A**

---

### Câu 45

Stage `$project` dùng để?
A. Chọn/loại bỏ fields
B. Lọc documents
C. Nhóm documents
D. Sắp xếp documents

**Đáp án: A**

---

### Câu 46

Stage `$limit` dùng để?
A. Giới hạn số documents trả về
B. Lọc documents
C. Nhóm documents
D. Sắp xếp documents

**Đáp án: A**

---

### Câu 47

Stage `$skip` dùng để?
A. Bỏ qua số documents đầu
B. Lọc documents
C. Nhóm documents
D. Sắp xếp documents

**Đáp án: A**

---

### Câu 48

Stage `$lookup` dùng để?
A. Join với collection khác
B. Lọc documents
C. Nhóm documents
D. Sắp xếp documents

**Đáp án: A**

---

### Câu 49

Stage `$unwind` dùng để?
A. Tách mảng thành nhiều documents
B. Gộp documents
C. Lọc documents
D. Sắp xếp documents

**Đáp án: A**

---

### Câu 50

Accumulator `$sum` trong `$group` dùng để?
A. Tính tổng
B. Đếm số lượng
C. Tìm giá trị lớn nhất
D. Tìm giá trị nhỏ nhất

**Đáp án: A**

---
