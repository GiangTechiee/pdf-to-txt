# 50 câu hỏi trắc nghiệm Vue.js (từ dễ đến khó)

> Mỗi câu chỉ có một đáp án đúng. Đáp án nằm ngay dưới từng câu.

---

## Phần 1 – Cơ bản về Vue.js

### Câu 1

Vue.js là gì?
A. Progressive JavaScript framework để build UI
B. Backend framework
C. Database
D. CSS framework

**Đáp án: A**

---

### Câu 2

Vue.js được tạo bởi?
A. Evan You
B. Mark Zuckerberg
C. Ryan Dahl
D. Jordan Walke

**Đáp án: A**

---

### Câu 3

Lệnh tạo Vue project mới với Vue CLI?
A. `vue create project-name`
B. `npm create vue`
C. `vue new project-name`
D. `npm init vue`

**Đáp án: A**

---

### Câu 4

Lệnh tạo Vue 3 project với Vite?
A. `npm create vue@latest`
B. `vue create project`
C. `npm init vue-app`
D. `vite create vue`

**Đáp án: A**

---

### Câu 5

Directive để bind data vào attribute?
A. `v-bind` hoặc `:`
B. `v-model`
C. `v-on`
D. `v-if`

**Đáp án: A**

---

### Câu 6

Directive để bind event listener?
A. `v-on` hoặc `@`
B. `v-bind`
C. `v-model`
D. `v-click`

**Đáp án: A**

---

### Câu 7

Directive để two-way data binding?
A. `v-model`
B. `v-bind`
C. `v-on`
D. `v-two-way`

**Đáp án: A**

---

### Câu 8

Directive để conditional rendering?
A. `v-if`, `v-else-if`, `v-else`
B. `v-show`
C. `v-display`
D. `v-render`

**Đáp án: A**

---

### Câu 9

Khác biệt giữa `v-if` và `v-show`?
A. `v-if` remove/add DOM, `v-show` toggle CSS display
B. Giống nhau hoàn toàn
C. `v-show` nhanh hơn luôn
D. `v-if` chỉ toggle CSS

**Đáp án: A**

---

### Câu 10

Directive để render list?
A. `v-for`
B. `v-repeat`
C. `v-loop`
D. `v-each`

**Đáp án: A**

---

## Phần 2 – Components & Props

### Câu 11

Cách định nghĩa component trong Vue 3?
A. `defineComponent()` hoặc SFC (Single File Component)
B. `createComponent()`
C. `Vue.component()`
D. `new Component()`

**Đáp án: A**

---

### Câu 12

File extension của Single File Component?
A. `.vue`
B. `.js`
C. `.jsx`
D. `.component`

**Đáp án: A**

---

### Câu 13

Ba phần chính của SFC?
A. `<template>`, `<script>`, `<style>`
B. `<html>`, `<js>`, `<css>`
C. `<view>`, `<code>`, `<style>`
D. `<component>`, `<logic>`, `<design>`

**Đáp án: A**

---

### Câu 14

Cách truyền props vào component?
A. Attribute trên component tag
B. Global variables
C. LocalStorage
D. Không thể truyền

**Đáp án: A**

---

### Câu 15

Định nghĩa props trong Options API?
A. `props: ['name']` hoặc `props: { name: String }`
B. `data: { name }`
C. `methods: { name }`
D. `computed: { name }`

**Đáp án: A**

---

### Câu 16

Props trong Vue là?
A. Read-only (one-way data flow)
B. Two-way binding
C. Có thể modify trực tiếp
D. Global variables

**Đáp án: A**

---

### Câu 17

Emit event từ child component?
A. `$emit('event-name', data)`
B. `$send('event-name')`
C. `$trigger('event-name')`
D. `$fire('event-name')`

**Đáp án: A**

---

### Câu 18

Listen event từ child component?
A. `@event-name="handler"`
B. `v-on:event-name`
C. `:event-name`
D. Cả A và B đều đúng

**Đáp án: D**

---

### Câu 19

Slots trong Vue dùng để?
A. Truyền content vào component
B. Truyền props
C. Emit events
D. State management

**Đáp án: A**

---

### Câu 20

Named slots là gì?
A. Slots với tên cụ thể
B. Slots mặc định
C. Slots không có tên
D. Slots động

**Đáp án: A**

---

## Phần 3 – Reactivity & Composition API

### Câu 21

Composition API được giới thiệu trong Vue nào?
A. Vue 3
B. Vue 2
C. Vue 1
D. Vue 4

**Đáp án: A**

---

### Câu 22

`ref()` trong Composition API dùng để?
A. Tạo reactive reference
B. Tạo component reference
C. Tạo DOM reference
D. Không làm gì

**Đáp án: A**

---

### Câu 23

Truy cập giá trị của ref?
A. `refName.value`
B. `refName.get()`
C. `refName()`
D. `refName`

**Đáp án: A**

---

### Câu 24

`reactive()` dùng để?
A. Tạo reactive object
B. Tạo reactive primitive
C. Tạo component
D. Tạo ref

**Đáp án: A**

---

### Câu 25

Khác biệt giữa `ref()` và `reactive()`?
A. `ref` cho primitives, `reactive` cho objects
B. Giống nhau hoàn toàn
C. `reactive` cho primitives
D. `ref` không reactive

**Đáp án: A**

---

### Câu 26

`computed()` trong Composition API dùng để?
A. Tạo computed property
B. Tạo method
C. Tạo watcher
D. Tạo ref

**Đáp án: A**

---

### Câu 27

`watch()` dùng để?
A. Watch reactive data và run side effects
B. Tạo computed property
C. Tạo ref
D. Tạo method

**Đáp án: A**

---

### Câu 28

`watchEffect()` khác `watch()` ở chỗ?
A. `watchEffect` tự động track dependencies
B. Giống nhau hoàn toàn
C. `watch` tự động track
D. `watchEffect` không track

**Đáp án: A**

---

### Câu 29

Lifecycle hook trong Composition API?
A. `onMounted`, `onUpdated`, `onUnmounted`, etc.
B. `mounted`, `updated`, `unmounted`
C. `componentDidMount`, `componentDidUpdate`
D. Không có lifecycle hooks

**Đáp án: A**

---

### Câu 30

`setup()` function chạy khi nào?
A. Trước khi component được created
B. Sau khi component mounted
C. Khi component updated
D. Khi component destroyed

**Đáp án: A**

---

## Phần 4 – Router & State Management

### Câu 31

Vue Router là gì?
A. Official routing library cho Vue
B. State management
C. HTTP client
D. Testing library

**Đáp án: A**

---

### Câu 32

Định nghĩa routes trong Vue Router?
A. Array of route objects với path và component
B. String paths
C. Không cần định nghĩa
D. Tự động generate

**Đáp án: A**

---

### Câu 33

Component để render matched route?
A. `<router-view>`
B. `<route>`
C. `<view>`
D. `<outlet>`

**Đáp án: A**

---

### Câu 34

Component để tạo navigation link?
A. `<router-link>`
B. `<a>`
C. `<link>`
D. `<nav-link>`

**Đáp án: A**

---

### Câu 35

Navigate programmatically?
A. `router.push('/path')`
B. `router.go('/path')`
C. `router.navigate('/path')`
D. `router.redirect('/path')`

**Đáp án: A**

---

### Câu 36

Dynamic route params?
A. `/user/:id`
B. `/user/{id}`
C. `/user/<id>`
D. `/user/[id]`

**Đáp án: A**

---

### Câu 37

Lấy route params trong component?
A. `$route.params` hoặc `useRoute().params`
B. `$router.params`
C. `route.params`
D. `params`

**Đáp án: A**

---

### Câu 38

Pinia là gì?
A. Official state management cho Vue 3
B. Router library
C. HTTP client
D. Testing library

**Đáp án: A**

---

### Câu 39

Vuex là gì?
A. State management pattern cho Vue 2
B. Router library
C. HTTP client
D. Component library

**Đáp án: A**

---

### Câu 40

Store trong Pinia gồm?
A. State, Getters, Actions
B. State, Mutations, Actions
C. Data, Methods, Computed
D. Props, Events, Slots

**Đáp án: A**

---

## Phần 5 – Advanced Topics

### Câu 41

Provide/Inject dùng để?
A. Dependency injection giữa components
B. Props passing
C. Event emitting
D. Routing

**Đáp án: A**

---

### Câu 42

Teleport component dùng để?
A. Render content ở vị trí khác trong DOM
B. Navigate routes
C. Emit events
D. Pass props

**Đáp án: A**

---

### Câu 43

Suspense component dùng để?
A. Handle async components và loading states
B. Error handling
C. Routing
D. State management

**Đáp án: A**

---

### Câu 44

Custom directives trong Vue?
A. Tạo directives riêng với lifecycle hooks
B. Built-in directives
C. Không thể tạo
D. Chỉ dùng v-if, v-for

**Đáp án: A**

---

### Câu 45

Mixins trong Vue dùng để?
A. Reuse component logic
B. Style components
C. Route navigation
D. State management

**Đáp án: A**

---

### Câu 46

Composables trong Vue 3 là gì?
A. Functions sử dụng Composition API để reuse logic
B. Components
C. Directives
D. Plugins

**Đáp án: A**

---

### Câu 47

`nextTick()` dùng để?
A. Chờ DOM update sau reactive data change
B. Navigate route
C. Emit event
D. Update state

**Đáp án: A**

---

### Câu 48

Vue DevTools dùng để?
A. Debug và inspect Vue applications
B. Build production
C. Test components
D. Deploy app

**Đáp án: A**

---

### Câu 49

Scoped styles trong SFC là gì?
A. Styles chỉ apply cho component đó
B. Global styles
C. Inline styles
D. External styles

**Đáp án: A**

---

### Câu 50

`<script setup>` trong Vue 3 là gì?
A. Syntactic sugar cho Composition API
B. Setup function
C. Script tag thông thường
D. Không có gì đặc biệt

**Đáp án: A**

---
