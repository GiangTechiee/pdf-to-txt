# 50 câu hỏi trắc nghiệm FastAPI (từ dễ đến khó)

> Mỗi câu chỉ có một đáp án đúng. Đáp án nằm ngay dưới từng câu.

---

## Phần 1 – Cơ bản về FastAPI

### Câu 1

FastAPI là gì?
A. Modern, fast web framework cho Python
B. Frontend framework
C. Database
D. Testing tool

**Đáp án: A**

---

### Câu 2

FastAPI được xây dựng trên?
A. Starlette và Pydantic
B. Flask
C. Django
D. Tornado

**Đáp án: A**

---

### Câu 3

Lệnh cài đặt FastAPI?
A. `pip install fastapi`
B. `npm install fastapi`
C. `pip install fast-api`
D. `pip install api`

**Đáp án: A**

---

### Câu 4

ASGI server phổ biến để chạy FastAPI?
A. Uvicorn
B. Gunicorn
C. Apache
D. Nginx

**Đáp án: A**

---

### Câu 5

Lệnh chạy FastAPI app với Uvicorn?
A. `uvicorn main:app --reload`
B. `python main.py`
C. `fastapi run`
D. `uvicorn start`

**Đáp án: A**

---

### Câu 6

Tạo FastAPI instance?
A. `app = FastAPI()`
B. `app = FastAPI.create()`
C. `app = new FastAPI()`
D. `app = API()`

**Đáp án: A**

---

### Câu 7

Decorator cho GET endpoint?
A. `@app.get("/path")`
B. `@app.route("/path", methods=["GET"])`
C. `@get("/path")`
D. `@app.endpoint("/path")`

**Đáp án: A**

---

### Câu 8

Decorator cho POST endpoint?
A. `@app.post("/path")`
B. `@app.route("/path", methods=["POST"])`
C. `@post("/path")`
D. `@app.create("/path")`

**Đáp án: A**

---

### Câu 9

FastAPI tự động generate?
A. Interactive API docs (Swagger UI và ReDoc)
B. Chỉ HTML
C. Chỉ JSON
D. Không generate gì

**Đáp án: A**

---

### Câu 10

URL mặc định của Swagger UI docs?
A. `/docs`
B. `/swagger`
C. `/api-docs`
D. `/documentation`

**Đáp án: A**

---

## Phần 2 – Path Parameters & Query Parameters

### Câu 11

Path parameter trong FastAPI?
A. `@app.get("/items/{item_id}")`
B. `@app.get("/items/:item_id")`
C. `@app.get("/items/<item_id>")`
D. `@app.get("/items/[item_id]")`

**Đáp án: A**

---

### Câu 12

Type hint cho path parameter?
A. `def read_item(item_id: int)`
B. `def read_item(item_id)`
C. `def read_item(item_id: string)`
D. `def read_item(int item_id)`

**Đáp án: A**

---

### Câu 13

Query parameter trong FastAPI?
A. Function parameter không có default hoặc có default
B. Path parameter
C. Body parameter
D. Header parameter

**Đáp án: A**

---

### Câu 14

Optional query parameter?
A. `def read_items(skip: int = 0, limit: int = 10)`
B. `def read_items(skip?, limit?)`
C. `def read_items(skip: Optional, limit: Optional)`
D. `def read_items(skip, limit)`

**Đáp án: A**

---

### Câu 15

Required query parameter?
A. Parameter không có default value
B. Parameter có default value
C. Không thể tạo required query param
D. Dùng `required=True`

**Đáp án: A**

---

### Câu 16

Validate query parameter với Query()?
A. `from fastapi import Query` và `q: str = Query(...)`
B. `q: str = Required()`
C. `q: str = Validate()`
D. Không thể validate

**Đáp án: A**

---

### Câu 17

Set min/max length cho string parameter?
A. `Query(min_length=3, max_length=50)`
B. `Query(length=(3, 50))`
C. `Query(size=3-50)`
D. Không thể set

**Đáp án: A**

---

### Câu 18

Regex validation cho parameter?
A. `Query(regex="^pattern$")`
B. `Query(pattern="^pattern$")`
C. `Query(match="^pattern$")`
D. Không thể dùng regex

**Đáp án: A**

---

### Câu 19

Multiple values cho query parameter?
A. `q: List[str] = Query([])`
B. `q: str[]`
C. `q: Array[str]`
D. Không hỗ trợ

**Đáp án: A**

---

### Câu 20

Path parameter với validation?
A. `from fastapi import Path` và `item_id: int = Path(..., gt=0)`
B. `item_id: int = Validate(gt=0)`
C. `item_id: int > 0`
D. Không thể validate

**Đáp án: A**

---

## Phần 3 – Request Body & Pydantic Models

### Câu 21

Pydantic model dùng để?
A. Define request/response schema với validation
B. Database model
C. View model
D. Không cần thiết

**Đáp án: A**

---

### Câu 22

Tạo Pydantic model?
A. `class Item(BaseModel):`
B. `class Item(Model):`
C. `class Item(Schema):`
D. `class Item(DTO):`

**Đáp án: A**

---

### Câu 23

Request body trong FastAPI?
A. Function parameter với Pydantic model type
B. `request.body`
C. `request.json()`
D. `request.data`

**Đáp án: A**

---

### Câu 24

Optional field trong Pydantic model?
A. `name: Optional[str] = None`
B. `name: str?`
C. `name: str | None`
D. Cả A và C đều đúng (Python 3.10+)

**Đáp án: D**

---

### Câu 25

Field validation trong Pydantic?
A. `from pydantic import Field` và `name: str = Field(..., min_length=1)`
B. `name: str = Validate(min=1)`
C. `name: str(min=1)`
D. Không thể validate

**Đáp án: A**

---

### Câu 26

Nested Pydantic models?
A. Model có field là model khác
B. Không hỗ trợ
C. Chỉ 1 level
D. Phải dùng dict

**Đáp án: A**

---

### Câu 27

Multiple body parameters?
A. Nhiều Pydantic models làm parameters
B. Chỉ 1 body parameter
C. Dùng dict
D. Không thể

**Đáp án: A**

---

### Câu 28

Body parameter với single value?
A. `from fastapi import Body` và `item_id: int = Body(...)`
B. Không thể
C. Dùng query param
D. Dùng path param

**Đáp án: A**

---

### Câu 29

Config trong Pydantic model?
A. `class Config:` nested class
B. `config = {}`
C. `@config` decorator
D. Không có config

**Đáp án: A**

---

### Câu 30

Example data trong schema?
A. `Field(example="value")` hoặc `Config.schema_extra`
B. `example="value"`
C. `sample="value"`
D. Không thể thêm

**Đáp án: A**

---

## Phần 4 – Response & Status Codes

### Câu 31

Set response status code?
A. `@app.get("/", status_code=200)`
B. `@app.get("/", code=200)`
C. `@app.get("/", http_code=200)`
D. `return Response(status=200)`

**Đáp án: A**

---

### Câu 32

Response model để serialize response?
A. `@app.get("/", response_model=Item)`
B. `@app.get("/", model=Item)`
C. `@app.get("/", schema=Item)`
D. Không cần khai báo

**Đáp án: A**

---

### Câu 33

Exclude unset fields trong response?
A. `response_model_exclude_unset=True`
B. `exclude_unset=True`
C. `skip_unset=True`
D. Không thể exclude

**Đáp án: A**

---

### Câu 34

Return JSONResponse trực tiếp?
A. `from fastapi.responses import JSONResponse` và `return JSONResponse(content={})`
B. `return json.dumps({})`
C. `return JSON({})`
D. Không thể

**Đáp án: A**

---

### Câu 35

Return file response?
A. `from fastapi.responses import FileResponse`
B. `return file`
C. `return open(file)`
D. Không hỗ trợ

**Đáp án: A**

---

### Câu 36

Streaming response?
A. `from fastapi.responses import StreamingResponse`
B. `return stream`
C. `return generator`
D. Không hỗ trợ

**Đáp án: A**

---

### Câu 37

Custom response class?
A. `@app.get("/", response_class=HTMLResponse)`
B. `@app.get("/", response_type=HTML)`
C. `@app.get("/", content_type="text/html")`
D. Không thể custom

**Đáp án: A**

---

### Câu 38

Multiple response status codes documentation?
A. `responses` parameter với dict
B. Không thể document nhiều codes
C. Chỉ default status code
D. Dùng comments

**Đáp án: A**

---

### Câu 39

Raise HTTP exception?
A. `from fastapi import HTTPException` và `raise HTTPException(status_code=404)`
B. `raise Exception(404)`
C. `return 404`
D. `throw HTTPException(404)`

**Đáp án: A**

---

### Câu 40

Custom exception handler?
A. `@app.exception_handler(CustomException)`
B. `@app.error_handler(CustomException)`
C. `@app.catch(CustomException)`
D. Không thể custom

**Đáp án: A**

---

## Phần 5 – Advanced Topics

### Câu 41

Dependency Injection trong FastAPI?
A. `from fastapi import Depends` và function parameter
B. Global variables
C. Singleton pattern
D. Không hỗ trợ DI

**Đáp án: A**

---

### Câu 42

Background tasks trong FastAPI?
A. `from fastapi import BackgroundTasks` và `background_tasks.add_task()`
B. `threading.Thread()`
C. `asyncio.create_task()`
D. Không hỗ trợ

**Đáp án: A**

---

### Câu 43

Middleware trong FastAPI?
A. `@app.middleware("http")` decorator
B. `@app.use()`
C. `app.add_middleware()`
D. Cả A và C đều đúng

**Đáp án: D**

---

### Câu 44

CORS middleware?
A. `from fastapi.middleware.cors import CORSMiddleware`
B. `from fastapi import CORS`
C. `@app.cors()`
D. Không hỗ trợ

**Đáp án: A**

---

### Câu 45

OAuth2 authentication?
A. `from fastapi.security import OAuth2PasswordBearer`
B. `from fastapi import OAuth2`
C. `@app.auth()`
D. Không hỗ trợ

**Đáp án: A**

---

### Câu 46

WebSocket support?
A. `@app.websocket("/ws")` và `WebSocket` parameter
B. Không hỗ trợ WebSocket
C. Chỉ HTTP
D. Cần thư viện khác

**Đáp án: A**

---

### Câu 47

Testing FastAPI app?
A. `from fastapi.testclient import TestClient`
B. `requests` library
C. `curl`
D. Không thể test

**Đáp án: A**

---

### Câu 48

Async endpoint trong FastAPI?
A. `async def` function
B. `def` function với `@async`
C. Không hỗ trợ async
D. Chỉ sync

**Đáp án: A**

---

### Câu 49

Database integration phổ biến?
A. SQLAlchemy với async support
B. Chỉ MongoDB
C. Không hỗ trợ database
D. Chỉ SQLite

**Đáp án: A**

---

### Câu 50

APIRouter dùng để?
A. Organize endpoints vào modules
B. Route requests
C. Create routes
D. Không cần thiết

**Đáp án: A**

---
