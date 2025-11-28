# 50 câu hỏi trắc nghiệm Clean Architecture (từ dễ đến khó)

> Mỗi câu chỉ có một đáp án đúng. Đáp án nằm ngay dưới từng câu.

---

## Phần 1 – Cơ bản về Clean Architecture

### Câu 1

Clean Architecture được đề xuất bởi?
A. Robert C. Martin (Uncle Bob)
B. Martin Fowler
C. Kent Beck
D. Eric Evans

**Đáp án: A**

---

### Câu 2

Mục tiêu chính của Clean Architecture?
A. Tách biệt business logic khỏi frameworks và infrastructure
B. Tăng tốc development
C. Giảm số lượng files
D. Tăng performance

**Đáp án: A**

---

### Câu 3

Clean Architecture có bao nhiêu layers chính?
A. 4 layers (Entities, Use Cases, Interface Adapters, Frameworks)
B. 2 layers
C. 3 layers
D. 5 layers

**Đáp án: A**

---

### Câu 4

Dependency Rule trong Clean Architecture?
A. Dependencies chỉ point inward (từ ngoài vào trong)
B. Dependencies có thể point bất kỳ hướng nào
C. Dependencies chỉ point outward
D. Không có rule về dependencies

**Đáp án: A**

---

### Câu 5

Layer nào ở trung tâm của Clean Architecture?
A. Entities (Enterprise Business Rules)
B. Use Cases
C. Controllers
D. Frameworks

**Đáp án: A**

---

### Câu 6

Layer nào ở ngoài cùng?
A. Frameworks & Drivers
B. Entities
C. Use Cases
D. Interface Adapters

**Đáp án: A**

---

### Câu 7

Entities trong Clean Architecture là gì?
A. Enterprise-wide business rules và data structures
B. Database tables
C. API endpoints
D. UI components

**Đáp án: A**

---

### Câu 8

Use Cases (Interactors) là gì?
A. Application-specific business rules
B. Database queries
C. API routes
D. UI logic

**Đáp án: A**

---

### Câu 9

Interface Adapters layer chứa?
A. Controllers, Presenters, Gateways
B. Entities
C. Use Cases
D. Frameworks

**Đáp án: A**

---

### Câu 10

Frameworks & Drivers layer chứa?
A. Web frameworks, databases, UI, external APIs
B. Business logic
C. Use cases
D. Entities

**Đáp án: A**

---

## Phần 2 – SOLID Principles

### Câu 11

SOLID là viết tắt của?
A. Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion
B. Simple, Open, Logical, Independent, Direct
C. Structured, Organized, Layered, Isolated, Decoupled
D. Scalable, Optimized, Logical, Integrated, Distributed

**Đáp án: A**

---

### Câu 12

Single Responsibility Principle (SRP)?
A. Một class chỉ nên có một lý do để thay đổi
B. Một class chỉ có một method
C. Một class chỉ có một property
D. Một class chỉ được dùng một lần

**Đáp án: A**

---

### Câu 13

Open/Closed Principle (OCP)?
A. Open for extension, closed for modification
B. Open for modification, closed for extension
C. Always open
D. Always closed

**Đáp án: A**

---

### Câu 14

Liskov Substitution Principle (LSP)?
A. Subclass phải thay thế được superclass mà không làm hỏng program
B. Subclass phải khác superclass
C. Subclass không thể thay thế superclass
D. Không có quan hệ giữa subclass và superclass

**Đáp án: A**

---

### Câu 15

Interface Segregation Principle (ISP)?
A. Clients không nên phụ thuộc vào interfaces họ không dùng
B. Một interface cho tất cả
C. Không nên dùng interfaces
D. Interfaces phải lớn

**Đáp án: A**

---

### Câu 16

Dependency Inversion Principle (DIP)?
A. High-level modules không nên phụ thuộc vào low-level modules, cả hai nên phụ thuộc vào abstractions
B. Low-level modules điều khiển high-level modules
C. Không có dependencies
D. Dependencies luôn từ trên xuống

**Đáp án: A**

---

### Câu 17

Abstraction trong DIP là gì?
A. Interfaces hoặc abstract classes
B. Concrete classes
C. Functions
D. Variables

**Đáp án: A**

---

### Câu 18

Inversion of Control (IoC) là gì?
A. Framework điều khiển flow thay vì application code
B. Application code điều khiển framework
C. Không có control
D. Manual control

**Đáp án: A**

---

### Câu 19

Dependency Injection là gì?
A. Technique để implement DIP bằng cách inject dependencies
B. Tạo dependencies trong class
C. Không dùng dependencies
D. Global dependencies

**Đáp án: A**

---

### Câu 20

Constructor Injection là gì?
A. Inject dependencies qua constructor
B. Inject qua setter
C. Inject qua method
D. Inject qua property

**Đáp án: A**

---

## Phần 3 – Design Patterns & Practices

### Câu 21

Repository Pattern dùng để?
A. Abstraction layer giữa business logic và data access
B. UI pattern
C. Routing pattern
D. Caching pattern

**Đáp án: A**

---

### Câu 22

Use Case pattern (Interactor) là gì?
A. Encapsulate một business use case
B. Database access
C. UI rendering
D. API routing

**Đáp án: A**

---

### Câu 23

Presenter pattern dùng để?
A. Format data cho view
B. Business logic
C. Database access
D. Routing

**Đáp án: A**

---

### Câu 24

Gateway pattern dùng để?
A. Interface để access external services
B. UI gateway
C. Business logic gateway
D. Không có gateway pattern

**Đáp án: A**

---

### Câu 25

DTO (Data Transfer Object) là gì?
A. Object để transfer data giữa layers
B. Database object
C. UI object
D. Business object

**Đáp án: A**

---

### Câu 26

Value Object là gì?
A. Immutable object được định nghĩa bởi attributes, không có identity
B. Mutable object
C. Object có ID
D. Database record

**Đáp án: A**

---

### Câu 27

Entity trong Domain-Driven Design?
A. Object có unique identity
B. Object không có identity
C. Immutable object
D. Static object

**Đáp án: A**

---

### Câu 28

Aggregate trong DDD là gì?
A. Cluster of entities và value objects với boundary
B. Single entity
C. Database table
D. API endpoint

**Đáp án: A**

---

### Câu 29

Domain Service là gì?
A. Service chứa business logic không thuộc về entity nào
B. Infrastructure service
C. Application service
D. Web service

**Đáp án: A**

---

### Câu 30

Application Service (Use Case) khác Domain Service ở chỗ?
A. Application Service orchestrate use cases, Domain Service chứa domain logic
B. Giống nhau hoàn toàn
C. Application Service chứa domain logic
D. Domain Service orchestrate use cases

**Đáp án: A**

---

## Phần 4 – Testing & Quality

### Câu 31

Test Pyramid trong Clean Architecture?
A. Nhiều unit tests, ít integration tests, rất ít E2E tests
B. Nhiều E2E tests, ít unit tests
C. Chỉ unit tests
D. Chỉ E2E tests

**Đáp án: A**

---

### Câu 32

Unit test trong Clean Architecture test gì?
A. Individual components isolated
B. Toàn bộ system
C. Chỉ UI
D. Chỉ database

**Đáp án: A**

---

### Câu 33

Mock objects dùng để?
A. Replace dependencies trong tests
B. Production code
C. Database records
D. UI components

**Đáp án: A**

---

### Câu 34

Test Doubles bao gồm?
A. Mocks, Stubs, Fakes, Spies, Dummies
B. Chỉ Mocks
C. Chỉ Stubs
D. Không có test doubles

**Đáp án: A**

---

### Câu 35

Integration test trong Clean Architecture test gì?
A. Interaction giữa components/layers
B. Individual components
C. Chỉ UI
D. Chỉ database

**Đáp án: A**

---

### Câu 36

Testability trong Clean Architecture đạt được bằng?
A. Dependency Injection và Interfaces
B. Global variables
C. Tight coupling
D. Hard-coded dependencies

**Đáp án: A**

---

### Câu 37

TDD (Test-Driven Development) là gì?
A. Write tests trước khi write code
B. Write code trước khi write tests
C. Không write tests
D. Write tests sau khi deploy

**Đáp án: A**

---

### Câu 38

Red-Green-Refactor cycle trong TDD?
A. Write failing test, make it pass, refactor
B. Write code, test, deploy
C. Test, code, test
D. Refactor, test, code

**Đáp án: A**

---

### Câu 39

Code Coverage đo gì?
A. Phần trăm code được tests cover
B. Số lượng tests
C. Tốc độ tests
D. Số lượng bugs

**Đáp án: A**

---

### Câu 40

100% code coverage có nghĩa?
A. Tất cả code được execute trong tests, nhưng không đảm bảo không có bugs
B. Không có bugs
C. Perfect code
D. Không cần test thêm

**Đáp án: A**

---

## Phần 5 – Advanced Concepts

### Câu 41

Hexagonal Architecture (Ports & Adapters) giống Clean Architecture ở chỗ?
A. Cả hai tách business logic khỏi external concerns
B. Hoàn toàn khác nhau
C. Không liên quan
D. Hexagonal không có layers

**Đáp án: A**

---

### Câu 42

Port trong Hexagonal Architecture là gì?
A. Interface định nghĩa contract
B. Implementation
C. Database connection
D. Network port

**Đáp án: A**

---

### Câu 43

Adapter trong Hexagonal Architecture là gì?
A. Implementation của port
B. Interface
C. Business logic
D. Entity

**Đáp án: A**

---

### Câu 44

Onion Architecture khác Clean Architecture ở chỗ?
A. Tương tự nhưng emphasize domain model ở center
B. Hoàn toàn khác
C. Không có layers
D. Không có dependencies

**Đáp án: A**

---

### Câu 45

CQRS (Command Query Responsibility Segregation) là gì?
A. Tách read và write operations
B. Gộp read và write
C. Chỉ read operations
D. Chỉ write operations

**Đáp án: A**

---

### Câu 46

Event Sourcing là gì?
A. Store state changes as sequence of events
B. Store current state only
C. Không store state
D. Store in cache only

**Đáp án: A**

---

### Câu 47

Bounded Context trong DDD là gì?
A. Explicit boundary trong domain model
B. Database boundary
C. API boundary
D. UI boundary

**Đáp án: A**

---

### Câu 48

Anti-Corruption Layer là gì?
A. Layer để translate giữa different bounded contexts
B. Security layer
C. Caching layer
D. Logging layer

**Đáp án: A**

---

### Câu 49

Screaming Architecture là gì?
A. Architecture structure phản ánh business domain
B. Architecture phức tạp
C. Architecture đơn giản
D. Không có structure

**Đáp án: A**

---

### Câu 50

Technical Debt trong Clean Architecture?
A. Cost of maintaining poor architecture decisions
B. Financial debt
C. Code comments
D. Documentation

**Đáp án: A**

---
