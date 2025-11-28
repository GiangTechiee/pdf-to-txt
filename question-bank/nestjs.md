# 50 câu hỏi trắc nghiệm NestJS (từ dễ đến khó)

> Mỗi câu chỉ có một đáp án đúng. Đáp án nằm ngay dưới từng câu.

---

## Phần 1 – Cơ bản về NestJS

### Câu 1

NestJS là gì?
A. Progressive Node.js framework
B. Frontend framework
C. Database
D. Testing tool

**Đáp án: A**

---

### Câu 2

NestJS được xây dựng trên?
A. Express (mặc định) hoặc Fastify
B. Chỉ Express
C. Chỉ Fastify
D. Koa

**Đáp án: A**

---

### Câu 3

Ngôn ngữ chính của NestJS?
A. TypeScript
B. JavaScript
C. Python
D. Java

**Đáp án: A**

---

### Câu 4

Lệnh cài đặt NestJS CLI?
A. `npm install -g @nestjs/cli`
B. `npm install nestjs`
C. `npm install nest-cli`
D. `npm install @nest/cli`

**Đáp án: A**

---

### Câu 5

Lệnh tạo NestJS project mới?
A. `nest new project-name`
B. `nest create project-name`
C. `nest init project-name`
D. `nest start project-name`

**Đáp án: A**

---

### Câu 6

Lệnh chạy NestJS development server?
A. `npm run start:dev`
B. `npm run dev`
C. `npm start`
D. `npm run serve`

**Đáp án: A**

---

### Câu 7

File entry point của NestJS app?
A. `main.ts`
B. `index.ts`
C. `app.ts`
D. `server.ts`

**Đáp án: A**

---

### Câu 8

Module root của NestJS app?
A. `AppModule`
B. `RootModule`
C. `MainModule`
D. `CoreModule`

**Đáp án: A**

---

### Câu 9

Decorator để định nghĩa module?
A. `@Module()`
B. `@Injectable()`
C. `@Controller()`
D. `@Component()`

**Đáp án: A**

---

### Câu 10

NestJS architecture lấy cảm hứng từ?
A. Angular
B. React
C. Vue
D. Express

**Đáp án: A**

---

## Phần 2 – Controllers & Routes

### Câu 11

Decorator để định nghĩa controller?
A. `@Controller()`
B. `@Route()`
C. `@Handler()`
D. `@Endpoint()`

**Đáp án: A**

---

### Câu 12

Decorator cho GET request?
A. `@Get()`
B. `@GetMapping()`
C. `@HttpGet()`
D. `@RequestGet()`

**Đáp án: A**

---

### Câu 13

Decorator cho POST request?
A. `@Post()`
B. `@PostMapping()`
C. `@HttpPost()`
D. `@RequestPost()`

**Đáp án: A**

---

### Câu 14

Decorator để lấy route params?
A. `@Param()`
B. `@Params()`
C. `@RouteParam()`
D. `@PathParam()`

**Đáp án: A**

---

### Câu 15

Decorator để lấy query params?
A. `@Query()`
B. `@QueryParam()`
C. `@QueryString()`
D. `@Search()`

**Đáp án: A**

---

### Câu 16

Decorator để lấy request body?
A. `@Body()`
B. `@RequestBody()`
C. `@Payload()`
D. `@Data()`

**Đáp án: A**

---

### Câu 17

Decorator để lấy headers?
A. `@Headers()`
B. `@Header()`
C. `@RequestHeaders()`
D. `@HttpHeaders()`

**Đáp án: A**

---

### Câu 18

Decorator để set HTTP status code?
A. `@HttpCode()`
B. `@StatusCode()`
C. `@Status()`
D. `@ResponseCode()`

**Đáp án: A**

---

### Câu 19

Decorator để set response header?
A. `@Header()`
B. `@SetHeader()`
C. `@ResponseHeader()`
D. `@AddHeader()`

**Đáp án: A**

---

### Câu 20

Lệnh generate controller?
A. `nest generate controller name`
B. `nest create controller name`
C. `nest new controller name`
D. `nest make controller name`

**Đáp án: A**

---

## Phần 3 – Providers & Dependency Injection

### Câu 21

Decorator để định nghĩa provider?
A. `@Injectable()`
B. `@Provider()`
C. `@Service()`
D. `@Component()`

**Đáp án: A**

---

### Câu 22

Dependency Injection trong NestJS hoạt động như thế nào?
A. Inject qua constructor
B. Inject qua setter
C. Inject qua method
D. Không có DI

**Đáp án: A**

---

### Câu 23

Provider scope mặc định?
A. Singleton (DEFAULT)
B. Request
C. Transient
D. Global

**Đáp án: A**

---

### Câu 24

Request-scoped provider là gì?
A. Provider mới được tạo cho mỗi request
B. Provider dùng chung cho tất cả requests
C. Provider tạo mỗi lần inject
D. Provider global

**Đáp án: A**

---

### Câu 25

Transient provider là gì?
A. Provider mới được tạo mỗi lần inject
B. Provider dùng chung
C. Provider cho mỗi request
D. Provider global

**Đáp án: A**

---

### Câu 26

Lệnh generate service?
A. `nest generate service name`
B. `nest create service name`
C. `nest new service name`
D. `nest make service name`

**Đáp án: A**

---

### Câu 27

Custom provider với useClass?
A. Cung cấp class implementation khác
B. Cung cấp giá trị cố định
C. Cung cấp factory function
D. Không làm gì

**Đáp án: A**

---

### Câu 28

Custom provider với useValue?
A. Cung cấp giá trị cố định
B. Cung cấp class
C. Cung cấp factory
D. Cung cấp async value

**Đáp án: A**

---

### Câu 29

Custom provider với useFactory?
A. Cung cấp factory function để tạo provider
B. Cung cấp class
C. Cung cấp giá trị
D. Không làm gì

**Đáp án: A**

---

### Câu 30

Decorator để inject provider với custom token?
A. `@Inject()`
B. `@InjectToken()`
C. `@Custom()`
D. `@Token()`

**Đáp án: A**

---

## Phần 4 – Modules & Architecture

### Câu 31

Module trong NestJS là gì?
A. Class với @Module() decorator tổ chức code
B. File JavaScript
C. Database table
D. API endpoint

**Đáp án: A**

---

### Câu 32

Property `imports` trong @Module() dùng để?
A. Import modules khác
B. Import providers
C. Import controllers
D. Import files

**Đáp án: A**

---

### Câu 33

Property `providers` trong @Module() dùng để?
A. Khai báo providers của module
B. Import modules
C. Export providers
D. Khai báo controllers

**Đáp án: A**

---

### Câu 34

Property `controllers` trong @Module() dùng để?
A. Khai báo controllers của module
B. Khai báo providers
C. Import modules
D. Export controllers

**Đáp án: A**

---

### Câu 35

Property `exports` trong @Module() dùng để?
A. Export providers để modules khác dùng
B. Export controllers
C. Export modules
D. Export files

**Đáp án: A**

---

### Câu 36

Global module được khai báo bằng?
A. `@Global()` decorator
B. `@Shared()` decorator
C. `global: true` trong @Module()
D. Không thể tạo global module

**Đáp án: A**

---

### Câu 37

Dynamic module là gì?
A. Module được tạo runtime với config động
B. Module tĩnh
C. Module không có providers
D. Module không có controllers

**Đáp án: A**

---

### Câu 38

Lệnh generate module?
A. `nest generate module name`
B. `nest create module name`
C. `nest new module name`
D. `nest make module name`

**Đáp án: A**

---

### Câu 39

Feature module là gì?
A. Module tổ chức code theo feature
B. Module core
C. Module shared
D. Module root

**Đáp án: A**

---

### Câu 40

Shared module là gì?
A. Module export providers để modules khác dùng
B. Module không export gì
C. Module private
D. Module root

**Đáp án: A**

---

## Phần 5 – Advanced Topics

### Câu 41

Middleware trong NestJS implement interface nào?
A. `NestMiddleware`
B. `Middleware`
C. `HttpMiddleware`
D. `RequestMiddleware`

**Đáp án: A**

---

### Câu 42

Guard trong NestJS implement interface nào?
A. `CanActivate`
B. `Guard`
C. `AuthGuard`
D. `Protector`

**Đáp án: A**

---

### Câu 43

Interceptor trong NestJS implement interface nào?
A. `NestInterceptor`
B. `Interceptor`
C. `HttpInterceptor`
D. `RequestInterceptor`

**Đáp án: A**

---

### Câu 44

Pipe trong NestJS implement interface nào?
A. `PipeTransform`
B. `Pipe`
C. `Validator`
D. `Transformer`

**Đáp án: A**

---

### Câu 45

Exception Filter implement interface nào?
A. `ExceptionFilter`
B. `ErrorHandler`
C. `CatchError`
D. `ErrorFilter`

**Đáp án: A**

---

### Câu 46

Decorator để apply guard?
A. `@UseGuards()`
B. `@Guard()`
C. `@Protected()`
D. `@Auth()`

**Đáp án: A**

---

### Câu 47

Decorator để apply interceptor?
A. `@UseInterceptors()`
B. `@Interceptor()`
C. `@Intercept()`
D. `@Transform()`

**Đáp án: A**

---

### Câu 48

Decorator để apply pipe?
A. `@UsePipes()`
B. `@Pipe()`
C. `@Validate()`
D. `@Transform()`

**Đáp án: A**

---

### Câu 49

ValidationPipe dùng để?
A. Validate và transform request data
B. Chỉ validate
C. Chỉ transform
D. Không làm gì

**Đáp án: A**

---

### Câu 50

Decorator để catch exceptions?
A. `@Catch()`
B. `@CatchError()`
C. `@HandleError()`
D. `@Exception()`

**Đáp án: A**

---
