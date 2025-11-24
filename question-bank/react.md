# 50 câu hỏi trắc nghiệm về React (từ dễ đến khó)

> Mỗi câu chỉ có 1 đáp án đúng. Đáp án ở cuối mỗi câu.

---

## Phần 1 – Cơ bản

### Câu 1

React là gì?

A. Một ngôn ngữ lập trình mới
B. Một thư viện JavaScript để xây dựng giao diện người dùng
C. Một hệ quản trị cơ sở dữ liệu
D. Một framework CSS

**Đáp án: B**

---

### Câu 2

JSX trong React là gì?

A. Một loại file CSS đặc biệt
B. Một dạng cú pháp mở rộng của JavaScript giống XML/HTML
C. Một cơ sở dữ liệu
D. Một API của trình duyệt

**Đáp án: B**

---

### Câu 3

Lệnh nào thường dùng để tạo project React với Create React App (CRA)?

A. `npm init react`
B. `npx create-react-app my-app`
C. `npm create react my-app`
D. `npx init react-app my-app`

**Đáp án: B**

---

### Câu 4

Thành phần cơ bản nhất trong React là gì?

A. Module
B. Component
C. Service
D. Controller

**Đáp án: B**

---

### Câu 5

Trong một component React dạng function, để trả về UI ta dùng từ khóa nào?

A. `display`
B. `return`
C. `render`
D. `show`

**Đáp án: B**

---

### Câu 6

Virtual DOM là gì?

A. Bản sao ảo của cấu trúc DOM thật, được lưu trong bộ nhớ
B. Cơ sở dữ liệu ảo
C. Trình duyệt ảo
D. File cấu hình của React

**Đáp án: A**

---

### Câu 7

Thuộc tính nào dùng để truyền dữ liệu từ component cha sang component con?

A. `state`
B. `props`
C. `data`
D. `context`

**Đáp án: B**

---

### Câu 8

Trong React, key dùng cho mục đích gì?

A. Định danh duy nhất cho mỗi phần tử trong danh sách
B. Bảo mật dữ liệu
C. Định nghĩa kiểu dữ liệu
D. Tạo CSS

**Đáp án: A**

---

### Câu 9

Đoạn JSX nào hợp lệ?

A. `<div><h1>Xin chào</h1><p>React</p></div>`
B. `<div><h1>Xin chào</h1><p>React</div>`
C. `<div><h1>Xin chào</h1><p>React</h1></div>`
D. `<div><h1>Xin chào</p><p>React</p></div>`

**Đáp án: A**

---

### Câu 10

Để render một component React vào DOM, ta dùng hàm nào (React 18)?

A. `ReactDOM.show()`
B. `ReactDOM.render()`
C. `createRoot(container).render(<App />)`
D. `React.renderDOM()`

**Đáp án: C**

---

## Phần 2 – State, Props, Event

### Câu 11

Hook nào dùng để tạo state trong function component?

A. `useEffect`
B. `useState`
C. `useContext`
D. `useRef`

**Đáp án: B**

---

### Câu 12

Cú pháp đúng để khai báo state đếm trong function component là gì?

A. `const [count, setCount] = useState(0);`
B. `const count = useState(0);`
C. `let count = new State(0);`
D. `var count = State(0);`

**Đáp án: A**

---

### Câu 13

Props trong React có đặc điểm nào?

A. Có thể thay đổi trực tiếp trong component con
B. Bất biến (read-only) trong component nhận
C. Tự động lưu vào localStorage
D. Luôn là kiểu số

**Đáp án: B**

---

### Câu 14

Cách đúng để xử lý sự kiện click trong React?

A. `<button onclick="handleClick()">Click</button>`
B. `<button onClick={handleClick}>Click</button>`
C. `<button onClick="handleClick">Click</button>`
D. `<button click={handleClick}>Click</button>`

**Đáp án: B**

---

### Câu 15

Vì sao không nên cập nhật state trực tiếp (ví dụ `state.count = 1`) trong React?

A. Sẽ gây lỗi cú pháp
B. React sẽ không biết cần re-render component
C. Trình duyệt không hỗ trợ
D. props sẽ bị thay đổi

**Đáp án: B**

---

### Câu 16

Đoạn code nào là đúng để truyền một hàm từ cha xuống con và gọi lại từ con?

A.

```jsx
// Cha
<Child onClick={handleClick()} />

// Con
props.onClick;
```

B.

```jsx
// Cha
<Child onClick={handleClick} />

// Con
props.onClick();
```

C.

```jsx
// Cha
<Child handleClick />

// Con
onClick();
```

D. Cả A và B đúng

**Đáp án: B**

---

### Câu 17

Khi setState (với `useState`) nhiều lần liên tiếp trong cùng một event, React có thể:

A. Bỏ qua toàn bộ cập nhật
B. Gộp (batch) các cập nhật lại để tối ưu
C. Luôn thực hiện theo đúng thứ tự từng lệnh
D. Thực thi ngẫu nhiên

**Đáp án: B**

---

### Câu 18

Khi truyền một mảng vào JSX, thuộc tính nào giúp React render danh sách hiệu quả hơn?

A. `id`
B. `className`
C. `key`
D. `name`

**Đáp án: C**

---

### Câu 19

Trong controlled component (form) của React, giá trị input thường được lấy từ đâu?

A. DOM thật
B. `props`
C. `state`
D. `context`

**Đáp án: C**

---

### Câu 20

Khi muốn cập nhật state dựa trên state trước đó, nên dùng dạng nào?

A. `setCount(count + 1)`
B. `setCount(prev => prev + 1)`
C. Gán trực tiếp `count++`
D. Không thể làm được

**Đáp án: B**

---

## Phần 3 – Hooks & Lifecycle

### Câu 21

Hook nào dùng để thực hiện side effect (call API, subscribe, thao tác DOM)?

A. `useState`
B. `useEffect`
C. `useMemo`
D. `useCallback`

**Đáp án: B**

---

### Câu 22

Đoạn code `useEffect(() => { ... }, []);` chạy khi nào?

A. Sau mỗi lần render
B. Chỉ khi unmount
C. Chỉ một lần sau lần render đầu tiên (mount)
D. Không bao giờ chạy

**Đáp án: C**

---

### Câu 23

Trong `useEffect`, hàm trả về (return) dùng để làm gì?

A. Khởi tạo state
B. Định nghĩa cleanup logic (hủy bỏ subscribe, clear timer, v.v.)
C. Render UI
D. Gọi API

**Đáp án: B**

---

### Câu 24

Hook nào giúp lưu trữ một giá trị có thể thay đổi nhưng không gây re-render khi thay đổi?

A. `useRef`
B. `useState`
C. `useEffect`
D. `useMemo`

**Đáp án: A**

---

### Câu 25

Hook nào dùng để memoize kết quả tính toán tốn kém, chỉ tính lại khi dependency thay đổi?

A. `useCallback`
B. `useEffect`
C. `useMemo`
D. `useReducer`

**Đáp án: C**

---

### Câu 26

`useCallback` thường được dùng để:

A. Gộp nhiều state lại với nhau
B. Trả về một hàm đã được memoize để tránh tạo mới không cần thiết
C. Quản lý side effect
D. Quản lý context

**Đáp án: B**

---

### Câu 27

Hook nào phù hợp để quản lý state phức tạp với nhiều hành động cập nhật khác nhau?

A. `useState`
B. `useEffect`
C. `useReducer`
D. `useRef`

**Đáp án: C**

---

### Câu 28

Khi dependency array của `useEffect` bị bỏ trống (`[]`), điều gì cần lưu ý?

A. Không có gì đặc biệt
B. Mọi biến dùng trong effect nên là constant
C. Có thể dẫn đến bug nếu dùng các biến bên ngoài mà có thể thay đổi nhưng không khai báo trong dependency
D. React sẽ tự động thêm vào tất cả dependency cần thiết

**Đáp án: C**

---

### Câu 29

Điều nào sau đây là đúng về quy tắc dùng Hooks?

A. Có thể gọi hook trong bất kỳ block if/for nào
B. Chỉ được gọi hook ở cấp cao nhất của function component
C. Có thể gọi hook trong callback bất kỳ
D. Có thể gọi hook trong class component

**Đáp án: B**

---

### Câu 30

React 18 giới thiệu thêm API nào để hỗ trợ concurrent rendering?

A. `ReactDOM.hydrate`
B. `ReactDOM.unstable_render`
C. `createRoot`
D. `renderConcurrent`

**Đáp án: C**

---

## Phần 4 – Context, Performance, Routing

### Câu 31

Context API trong React dùng để làm gì?

A. Quản lý CSS toàn cục
B. Chia sẻ dữ liệu giữa các component mà không cần truyền props qua nhiều cấp
C. Tối ưu hiệu năng DOM
D. Quản lý routing

**Đáp án: B**

---

### Câu 32

Để tạo một Context mới trong React, dùng hàm nào?

A. `React.createStore()`
B. `React.createContext()`
C. `React.newContext()`
D. `React.useContext()`

**Đáp án: B**

---

### Câu 33

Hook nào dùng để lấy giá trị từ Context trong function component?

A. `useState`
B. `useEffect`
C. `useContext`
D. `useMemo`

**Đáp án: C**

---

### Câu 34

Thư viện phổ biến để xử lý routing trong ứng dụng React SPA là:

A. `react-route`
B. `react-router-dom`
C. `react-navigation`
D. `next/router`

**Đáp án: B**

---

### Câu 35

Trong `react-router-dom` v6, component nào dùng để định nghĩa tập các route?

A. `<Switch>`
B. `<BrowserRouter>`
C. `<Routes>`
D. `<RouteGroup>`

**Đáp án: C**

---

### Câu 36

Kỹ thuật code splitting trong React thường sử dụng API nào của React?

A. `React.lazy` và `Suspense`
B. `useMemo` và `useCallback`
C. `useEffect` và `useState`
D. `memo` và `useRef`

**Đáp án: A**

---

### Câu 37

`React.memo` dùng để làm gì?

A. Ghi nhớ giá trị state
B. Ghi nhớ component để tránh re-render không cần thiết nếu props không đổi
C. Ghi nhớ kết quả tính toán
D. Ghi nhớ context

**Đáp án: B**

---

### Câu 38

Khi nào nên dùng `useMemo`?

A. Mọi nơi có tính toán
B. Chỉ khi phép tính tốn kém và phụ thuộc vào một số ít dependency
C. Khi muốn thay thế `useEffect`
D. Khi muốn thay thế `useState`

**Đáp án: B**

---

### Câu 39

Để tránh prop drilling quá nhiều cấp, nên dùng gì?

A. Chỉ dùng `useState`
B. Context API hoặc state management bên ngoài (Redux, Zustand, v.v.)
C. Nhiều component con hơn
D. Inline style

**Đáp án: B**

---

### Câu 40

Trong React, hydration là gì?

A. Tối ưu nén ảnh
B. Quá trình gắn kết (attach) event listener lên HTML được render sẵn từ server
C. Refresh lại toàn bộ trang
D. Tải thêm dữ liệu từ API

**Đáp án: B**

---

## Phần 5 – Nâng cao & Kiến trúc

### Câu 41

SSR (Server-Side Rendering) trong React giúp cải thiện điều gì?

A. Kích thước bundle lớn hơn
B. SEO và thời gian hiển thị nội dung lần đầu (First Paint)
C. Độ bảo mật cơ sở dữ liệu
D. Không có lợi ích rõ ràng

**Đáp án: B**

---

### Câu 42

Trong ứng dụng React lớn, mô hình quản lý state toàn cục phổ biến là:

A. Chỉ dùng localStorage
B. Redux hoặc các thư viện tương tự (MobX, Zustand, Recoil, v.v.)
C. Chỉ dùng prop drilling
D. Chỉ dùng Context API cho mọi thứ

**Đáp án: B**

---

### Câu 43

Trong Redux, reducer phải tuân thủ nguyên tắc nào?

A. Có thể mutate trực tiếp state cũ
B. Phải là pure function, không mutate state cũ mà trả về state mới
C. Được phép gọi API trực tiếp
D. Được phép thao tác DOM

**Đáp án: B**

---

### Câu 44

Khi fetch dữ liệu trong React, cách nào sau đây được xem là tốt hơn về kiến trúc trong ứng dụng phức tạp?

A. Gọi `fetch` trực tiếp trong mọi component
B. Sử dụng custom hooks hoặc layer service tách biệt (ví dụ: `useUsers`, `apiClient`, v.v.)
C. Gọi API trong constructor
D. Gọi API trong CSS

**Đáp án: B**

---

### Câu 45

Patterns nào sau đây thường dùng để chia nhỏ UI trong React?

A. Container/Presentational components
B. Model/View/Controller
C. Singleton pattern
D. Factory pattern

**Đáp án: A**

---

### Câu 46

Đối với performance, vấn đề phổ biến khi render danh sách lớn là gì?

A. Quá nhiều file CSS
B. Quá nhiều event click
C. Quá nhiều node DOM được render cùng lúc
D. Thiếu comment trong code

**Đáp án: C**

---

### Câu 47

Giải pháp nào giúp tối ưu render danh sách rất lớn trong React?

A. Dùng inline style
B. Dùng kỹ thuật virtualization (ví dụ: `react-window`, `react-virtualized`)
C. Dùng nhiều `useState` hơn
D. Dùng `Context` cho từng item

**Đáp án: B**

---

### Câu 48

Trong kiến trúc React + Next.js, thư mục `app` hoặc `pages` có vai trò gì?

A. Chứa toàn bộ file CSS
B. Định nghĩa các route của ứng dụng
C. Chứa file cấu hình Webpack
D. Chứa database

**Đáp án: B**

---

### Câu 49

Đối với SSR/SSG trong Next.js, hàm nào dùng để fetch dữ liệu ở build time (trước khi deploy)?

A. `getServerSideProps`
B. `getStaticProps`
C. `getInitialProps`
D. `useEffect`

**Đáp án: B**

---

### Câu 50

Khi xây dựng ứng dụng React lớn, nguyên tắc quan trọng nhất để dễ bảo trì là gì?

A. Đặt tất cả code trong một file
B. Tổ chức component theo module/domain, tách bạch rõ ràng phần UI, logic, state management và API layer
C. Không dùng thư viện bên ngoài
D. Chỉ dùng class component

**Đáp án: B**
