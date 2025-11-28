# 50 câu hỏi trắc nghiệm React Native (từ dễ đến khó)

> Mỗi câu chỉ có một đáp án đúng. Đáp án nằm ngay dưới từng câu.

---

## Phần 1 – Cơ bản về React Native

### Câu 1

React Native là gì?
A. Framework để build native mobile apps bằng React
B. Web framework
C. Backend framework
D. Database

**Đáp án: A**

---

### Câu 2

React Native được phát triển bởi?
A. Facebook (Meta)
B. Google
C. Microsoft
D. Apple

**Đáp án: A**

---

### Câu 3

React Native build app cho nền tảng nào?
A. iOS và Android
B. Chỉ iOS
C. Chỉ Android
D. Chỉ Web

**Đáp án: A**

---

### Câu 4

Lệnh tạo React Native project mới?
A. `npx react-native init ProjectName`
B. `npm create react-native`
C. `react-native new ProjectName`
D. `npm init react-native`

**Đáp án: A**

---

### Câu 5

Lệnh chạy React Native app trên Android?
A. `npx react-native run-android`
B. `npm run android`
C. `react-native start android`
D. `npm android`

**Đáp án: A**

---

### Câu 6

Lệnh chạy React Native app trên iOS?
A. `npx react-native run-ios`
B. `npm run ios`
C. `react-native start ios`
D. `npm ios`

**Đáp án: A**

---

### Câu 7

Lệnh start Metro bundler?
A. `npx react-native start`
B. `npm start`
C. `react-native metro`
D. `npm run metro`

**Đáp án: A**

---

### Câu 8

React Native sử dụng JavaScript engine nào?
A. Hermes (mặc định) hoặc JavaScriptCore
B. V8
C. SpiderMonkey
D. Chakra

**Đáp án: A**

---

### Câu 9

Thay vì `<div>`, React Native dùng?
A. `<View>`
B. `<Container>`
C. `<Box>`
D. `<Div>`

**Đáp án: A**

---

### Câu 10

Thay vì `<span>` hoặc `<p>`, React Native dùng?
A. `<Text>`
B. `<Label>`
C. `<Paragraph>`
D. `<Span>`

**Đáp án: A**

---

## Phần 2 – Core Components

### Câu 11

Component để hiển thị ảnh?
A. `<Image>`
B. `<Picture>`
C. `<Photo>`
D. `<Img>`

**Đáp án: A**

---

### Câu 12

Component để tạo button?
A. `<Button>` hoặc `<TouchableOpacity>`
B. `<Btn>`
C. `<Click>`
D. `<Press>`

**Đáp án: A**

---

### Câu 13

Component để nhập text?
A. `<TextInput>`
B. `<Input>`
C. `<TextField>`
D. `<EditText>`

**Đáp án: A**

---

### Câu 14

Component để tạo scrollable list?
A. `<ScrollView>` hoặc `<FlatList>`
B. `<List>`
C. `<Scroll>`
D. `<ListView>`

**Đáp án: A**

---

### Câu 15

FlatList khác ScrollView ở chỗ?
A. FlatList render lazy, hiệu năng tốt hơn cho list lớn
B. Giống nhau hoàn toàn
C. ScrollView nhanh hơn
D. FlatList không scroll được

**Đáp án: A**

---

### Câu 16

Component để hiển thị loading indicator?
A. `<ActivityIndicator>`
B. `<Spinner>`
C. `<Loader>`
D. `<Loading>`

**Đáp án: A**

---

### Câu 17

Component để tạo modal?
A. `<Modal>`
B. `<Dialog>`
C. `<Popup>`
D. `<Overlay>`

**Đáp án: A**

---

### Câu 18

Component để tạo switch/toggle?
A. `<Switch>`
B. `<Toggle>`
C. `<Checkbox>`
D. `<Radio>`

**Đáp án: A**

---

### Câu 19

SafeAreaView dùng để?
A. Tránh content bị che bởi notch, status bar
B. Bảo mật app
C. Tăng hiệu năng
D. Không làm gì

**Đáp án: A**

---

### Câu 20

KeyboardAvoidingView dùng để?
A. Tránh keyboard che content
B. Ẩn keyboard
C. Hiện keyboard
D. Style keyboard

**Đáp án: A**

---

## Phần 3 – Styling & Layout

### Câu 21

React Native styling dùng?
A. JavaScript objects với StyleSheet API
B. CSS files
C. SCSS
D. Styled-components only

**Đáp án: A**

---

### Câu 22

Flexbox trong React Native mặc định?
A. `flexDirection: 'column'`
B. `flexDirection: 'row'`
C. `flexDirection: 'row-reverse'`
D. Không có flexbox

**Đáp án: A**

---

### Câu 23

StyleSheet.create() dùng để?
A. Tạo styles với optimization
B. Tạo component
C. Tạo layout
D. Không cần thiết

**Đáp án: A**

---

### Câu 24

Dimensions API dùng để?
A. Lấy kích thước màn hình
B. Tạo dimensions
C. Style component
D. Layout component

**Đáp án: A**

---

### Câu 25

Platform API dùng để?
A. Detect platform (iOS/Android) và code platform-specific
B. Tạo platform
C. Style platform
D. Không làm gì

**Đáp án: A**

---

### Câu 26

File extension cho platform-specific code?
A. `.ios.js` và `.android.js`
B. `.ios` và `.android`
C. `-ios.js` và `-android.js`
D. `_ios.js` và `_android.js`

**Đáp án: A**

---

### Câu 27

Pixel density trong React Native?
A. Tự động scale với PixelRatio
B. Phải tính thủ công
C. Không hỗ trợ
D. Chỉ cho iOS

**Đáp án: A**

---

### Câu 28

Absolute positioning trong React Native?
A. `position: 'absolute'`
B. `position: 'fixed'`
C. `position: 'sticky'`
D. Không hỗ trợ

**Đáp án: A**

---

### Câu 29

Transform trong React Native hỗ trợ?
A. rotate, scale, translate, skew
B. Chỉ rotate
C. Chỉ scale
D. Không hỗ trợ

**Đáp án: A**

---

### Câu 30

Shadow trong React Native?
A. iOS: shadow props, Android: elevation
B. Giống nhau trên cả hai
C. Không hỗ trợ shadow
D. Chỉ iOS hỗ trợ

**Đáp án: A**

---

## Phần 4 – Navigation & State Management

### Câu 31

Thư viện navigation phổ biến nhất?
A. React Navigation
B. React Router
C. Native Navigation
D. RN Router

**Đáp án: A**

---

### Câu 32

Stack Navigator trong React Navigation là gì?
A. Navigation dạng stack (push/pop screens)
B. Navigation dạng tabs
C. Navigation dạng drawer
D. Không có stack navigator

**Đáp án: A**

---

### Câu 33

Tab Navigator dùng để?
A. Navigation giữa các tabs
B. Navigation dạng stack
C. Navigation dạng drawer
D. Không làm gì

**Đáp án: A**

---

### Câu 34

Drawer Navigator dùng để?
A. Navigation với side menu
B. Navigation dạng tabs
C. Navigation dạng stack
D. Không làm gì

**Đáp án: A**

---

### Câu 35

Navigate đến screen khác?
A. `navigation.navigate('ScreenName')`
B. `navigation.push('ScreenName')`
C. `navigation.go('ScreenName')`
D. Cả A và B đều đúng

**Đáp án: D**

---

### Câu 36

Quay lại screen trước?
A. `navigation.goBack()`
B. `navigation.back()`
C. `navigation.pop()`
D. Cả A và C đều đúng

**Đáp án: D**

---

### Câu 37

Truyền params giữa screens?
A. `navigation.navigate('Screen', { param: value })`
B. Global variables
C. AsyncStorage
D. Context only

**Đáp án: A**

---

### Câu 38

State management phổ biến trong React Native?
A. Redux, MobX, Zustand, Context API
B. Chỉ Redux
C. Chỉ Context
D. Không có state management

**Đáp án: A**

---

### Câu 39

AsyncStorage dùng để?
A. Lưu data persistent locally
B. State management
C. Navigation
D. Networking

**Đáp án: A**

---

### Câu 40

AsyncStorage lưu data dạng?
A. String (key-value pairs)
B. Object
C. Array
D. Binary

**Đáp án: A**

---

## Phần 5 – Advanced Topics

### Câu 41

Native Modules là gì?
A. Bridge giữa JavaScript và native code
B. JavaScript modules
C. NPM packages
D. React components

**Đáp án: A**

---

### Câu 42

Animated API dùng để?
A. Tạo animations
B. Tạo images
C. Tạo videos
D. Tạo sounds

**Đáp án: A**

---

### Câu 43

Gesture Handler dùng để?
A. Xử lý touch gestures hiệu năng cao
B. Xử lý keyboard
C. Xử lý navigation
D. Xử lý state

**Đáp án: A**

---

### Câu 44

Fast Refresh là gì?
A. Hot reload với state preservation
B. Restart app
C. Clear cache
D. Rebuild app

**Đáp án: A**

---

### Câu 45

Hermes engine cải thiện?
A. App startup time và memory usage
B. Chỉ UI
C. Chỉ networking
D. Không cải thiện gì

**Đáp án: A**

---

### Câu 46

Expo là gì?
A. Platform và tools để build React Native apps dễ hơn
B. Native module
C. State management
D. Navigation library

**Đáp án: A**

---

### Câu 47

Linking API dùng để?
A. Deep linking và open URLs
B. Link components
C. Link screens
D. Link modules

**Đáp án: A**

---

### Câu 48

Push Notifications trong React Native?
A. Dùng libraries như react-native-push-notification
B. Built-in support
C. Không hỗ trợ
D. Chỉ iOS hỗ trợ

**Đáp án: A**

---

### Câu 49

Debugging React Native app?
A. Chrome DevTools, Flipper, React DevTools
B. Chỉ console.log
C. Không thể debug
D. Chỉ Xcode

**Đáp án: A**

---

### Câu 50

Performance optimization trong React Native?
A. Memo, useMemo, useCallback, FlatList, native modules
B. Chỉ dùng FlatList
C. Không cần optimize
D. Chỉ dùng memo

**Đáp án: A**

---
