# 50 câu hỏi trắc nghiệm Next.js (từ dễ đến khó)

> Mỗi câu chỉ có một đáp án đúng. Đáp án nằm ngay dưới từng câu.

---

## Phần 1 – Cơ bản về Next.js

### Câu 1

Next.js là gì?
A. React framework với SSR và SSG
B. Backend framework
C. Database
D. CSS framework

**Đáp án: A**

---

### Câu 2

Next.js được phát triển bởi?
A. Vercel
B. Facebook
C. Google
D. Microsoft

**Đáp án: A**

---

### Câu 3

Lệnh tạo Next.js project mới?
A. `npx create-next-app@latest`
B. `npm init next`
C. `npx next-create`
D. `npm create-next`

**Đáp án: A**

---

### Câu 4

Lệnh chạy Next.js development server?
A. `npm run dev`
B. `npm start`
C. `npm run start`
D. `npm serve`

**Đáp án: A**

---

### Câu 5

Lệnh build Next.js production?
A. `npm run build`
B. `npm compile`
C. `npm make`
D. `npm production`

**Đáp án: A**

---

### Câu 6

Thư mục chứa pages trong Next.js App Router?
A. `app/`
B. `pages/`
C. `src/`
D. `components/`

**Đáp án: A**

---

### Câu 7

File routing trong Next.js App Router?
A. `page.js` hoặc `page.tsx`
B. `index.js`
C. `route.js`
D. `component.js`

**Đáp án: A**

---

### Câu 8

File layout trong Next.js App Router?
A. `layout.js` hoặc `layout.tsx`
B. `_layout.js`
C. `template.js`
D. `wrapper.js`

**Đáp án: A**

---

### Câu 9

Next.js hỗ trợ rendering nào?
A. SSR, SSG, CSR, ISR
B. Chỉ CSR
C. Chỉ SSR
D. Chỉ SSG

**Đáp án: A**

---

### Câu 10

SSR là gì?
A. Server-Side Rendering
B. Static Site Rendering
C. Single Side Rendering
D. Simple Server Rendering

**Đáp án: A**

---

## Phần 2 – Routing & Navigation

### Câu 11

Dynamic route trong App Router?
A. `[id]/page.js`
B. `:id/page.js`
C. `{id}/page.js`
D. `<id>/page.js`

**Đáp án: A**

---

### Câu 12

Catch-all route trong App Router?
A. `[...slug]/page.js`
B. `*slug/page.js`
C. `**slug/page.js`
D. `{...slug}/page.js`

**Đáp án: A**

---

### Câu 13

Optional catch-all route?
A. `[[...slug]]/page.js`
B. `[...slug?]/page.js`
C. `[...slug]/page.js?`
D. `{...slug}/page.js`

**Đáp án: A**

---

### Câu 14

Component để navigate trong Next.js?
A. `<Link>`
B. `<Navigate>`
C. `<Router>`
D. `<Route>`

**Đáp án: A**

---

### Câu 15

Hook để navigate programmatically trong App Router?
A. `useRouter` từ `next/navigation`
B. `useNavigate`
C. `useHistory`
D. `useRoute`

**Đáp án: A**

---

### Câu 16

Lấy params trong dynamic route (App Router)?
A. Từ props `params`
B. `useParams()`
C. `getParams()`
D. `router.query`

**Đáp án: A**

---

### Câu 17

Lấy search params trong App Router?
A. Từ props `searchParams`
B. `useSearchParams()`
C. `router.query`
D. `getQuery()`

**Đáp án: A**

---

### Câu 18

Route Groups trong App Router?
A. `(folder-name)`
B. `[folder-name]`
C. `{folder-name}`
D. `_folder-name`

**Đáp án: A**

---

### Câu 19

Parallel Routes trong App Router?
A. `@folder-name`
B. `#folder-name`
C. `&folder-name`
D. `+folder-name`

**Đáp án: A**

---

### Câu 20

Intercepting Routes trong App Router?
A. `(..)folder-name`
B. `../folder-name`
C. `--folder-name`
D. `>>folder-name`

**Đáp án: A**

---

## Phần 3 – Data Fetching & Rendering

### Câu 21

Server Components trong Next.js 13+ là gì?
A. Components render trên server mặc định
B. Components chỉ chạy trên client
C. Components không có state
D. Components tĩnh

**Đáp án: A**

---

### Câu 22

Khai báo Client Component?
A. `'use client'` ở đầu file
B. `'use browser'`
C. `export client`
D. `client: true`

**Đáp án: A**

---

### Câu 23

Fetch data trong Server Component?
A. Dùng `async/await` trực tiếp trong component
B. `useEffect`
C. `getServerSideProps`
D. `getStaticProps`

**Đáp án: A**

---

### Câu 24

Caching behavior mặc định của fetch trong Next.js?
A. Cache mặc định (force-cache)
B. Không cache
C. Cache 1 giờ
D. Cache 1 ngày

**Đáp án: A**

---

### Câu 25

Disable cache cho fetch request?
A. `fetch(url, { cache: 'no-store' })`
B. `fetch(url, { cache: false })`
C. `fetch(url, { noCache: true })`
D. `fetch(url, { cache: 'disable' })`

**Đáp án: A**

---

### Câu 26

Revalidate cache sau một khoảng thời gian?
A. `fetch(url, { next: { revalidate: 60 } })`
B. `fetch(url, { revalidate: 60 })`
C. `fetch(url, { cache: 60 })`
D. `fetch(url, { ttl: 60 })`

**Đáp án: A**

---

### Câu 27

Loading UI trong App Router?
A. `loading.js` hoặc `loading.tsx`
B. `loader.js`
C. `spinner.js`
D. `pending.js`

**Đáp án: A**

---

### Câu 28

Error handling UI trong App Router?
A. `error.js` hoặc `error.tsx`
B. `catch.js`
C. `exception.js`
D. `fail.js`

**Đáp án: A**

---

### Câu 29

Not Found page trong App Router?
A. `not-found.js` hoặc `not-found.tsx`
B. `404.js`
C. `missing.js`
D. `notfound.js`

**Đáp án: A**

---

### Câu 30

Streaming trong Next.js dùng?
A. React Suspense
B. WebSocket
C. Server-Sent Events
D. Long Polling

**Đáp án: A**

---

## Phần 4 – API Routes & Server Actions

### Câu 31

API Route trong App Router?
A. `route.js` hoặc `route.ts`
B. `api.js`
C. `endpoint.js`
D. `handler.js`

**Đáp án: A**

---

### Câu 32

Export function cho GET request trong API Route?
A. `export async function GET(request)`
B. `export function get(req, res)`
C. `export const GET = () => {}`
D. `export default GET`

**Đáp án: A**

---

### Câu 33

Export function cho POST request?
A. `export async function POST(request)`
B. `export function post(req, res)`
C. `export const POST = () => {}`
D. `export default POST`

**Đáp án: A**

---

### Câu 34

Server Actions khai báo như thế nào?
A. `'use server'` ở đầu function hoặc file
B. `'use action'`
C. `server: true`
D. `action: true`

**Đáp án: A**

---

### Câu 35

Server Actions có thể dùng trong?
A. Server Components và Client Components
B. Chỉ Server Components
C. Chỉ Client Components
D. Chỉ API Routes

**Đáp án: A**

---

### Câu 36

Revalidate path sau mutation?
A. `revalidatePath('/path')`
B. `invalidate('/path')`
C. `refresh('/path')`
D. `update('/path')`

**Đáp án: A**

---

### Câu 37

Revalidate tag sau mutation?
A. `revalidateTag('tag')`
B. `invalidateTag('tag')`
C. `refreshTag('tag')`
D. `updateTag('tag')`

**Đáp án: A**

---

### Câu 38

Redirect trong Server Action?
A. `redirect('/path')`
B. `router.push('/path')`
C. `navigate('/path')`
D. `goto('/path')`

**Đáp án: A**

---

### Câu 39

Middleware file trong Next.js?
A. `middleware.js` hoặc `middleware.ts` ở root
B. `_middleware.js`
C. `middleware/index.js`
D. `config/middleware.js`

**Đáp án: A**

---

### Câu 40

NextResponse trong middleware dùng để?
A. Modify request/response
B. Chỉ logging
C. Chỉ authentication
D. Chỉ redirect

**Đáp án: A**

---

## Phần 5 – Optimization & Advanced

### Câu 41

Image component trong Next.js?
A. `<Image>` từ `next/image`
B. `<img>`
C. `<NextImage>`
D. `<Picture>`

**Đáp án: A**

---

### Câu 42

Font optimization trong Next.js?
A. `next/font`
B. `@next/fonts`
C. `next/typography`
D. `next/webfont`

**Đáp án: A**

---

### Câu 43

Script component để load external scripts?
A. `<Script>` từ `next/script`
B. `<script>`
C. `<ExternalScript>`
D. `<LoadScript>`

**Đáp án: A**

---

### Câu 44

Metadata trong App Router?
A. Export `metadata` object hoặc `generateMetadata` function
B. `<Head>` component
C. `<Meta>` component
D. `next.config.js`

**Đáp án: A**

---

### Câu 45

Dynamic metadata generation?
A. `export async function generateMetadata()`
B. `export const metadata = {}`
C. `<Head>` component
D. `useMeta()` hook

**Đáp án: A**

---

### Câu 46

Static export trong Next.js?
A. `output: 'export'` trong `next.config.js`
B. `npm run export`
C. `static: true`
D. `export: true`

**Đáp án: A**

---

### Câu 47

Environment variables trong Next.js?
A. `.env.local` và prefix `NEXT_PUBLIC_` cho client
B. `.env` cho tất cả
C. `config.js`
D. `settings.json`

**Đáp án: A**

---

### Câu 48

Internationalization (i18n) trong App Router?
A. Tự implement với middleware và routing
B. Built-in `i18n` config
C. Không hỗ trợ
D. Chỉ dùng thư viện bên ngoài

**Đáp án: A**

---

### Câu 49

Partial Prerendering (PPR) là gì?
A. Kết hợp static và dynamic rendering trong cùng route
B. Chỉ static rendering
C. Chỉ dynamic rendering
D. Client-side rendering

**Đáp án: A**

---

### Câu 50

generateStaticParams dùng để?
A. Generate static paths cho dynamic routes
B. Generate metadata
C. Generate API routes
D. Generate components

**Đáp án: A**

---
