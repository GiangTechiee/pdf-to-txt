# Hướng dẫn hiển thị Code trong câu hỏi

## 📦 Cách lưu trữ trong Database

Khi seed data từ markdown, code blocks được lưu nguyên format:

```
Đoạn code nào đúng?

A. 
```jsx
const App = () => {
  return <div>Hello</div>;
}
```

B. Text thông thường
```

## 🎨 Cách hiển thị trên Frontend

### 1. Import component

```tsx
import { MarkdownRenderer, hasCodeBlock, renderInlineCode } from '@/lib/markdown-renderer';
```

### 2. Sử dụng cho câu hỏi và đáp án

```tsx
// Trong component hiển thị câu hỏi
<div>
  <h3>Câu hỏi:</h3>
  <MarkdownRenderer content={question.content} />
  
  <div className="options">
    <div>
      <input type="radio" name="answer" value="A" />
      <MarkdownRenderer content={question.optionA} />
    </div>
    <div>
      <input type="radio" name="answer" value="B" />
      <MarkdownRenderer content={question.optionB} />
    </div>
    <div>
      <input type="radio" name="answer" value="C" />
      <MarkdownRenderer content={question.optionC} />
    </div>
    <div>
      <input type="radio" name="answer" value="D" />
      <MarkdownRenderer content={question.optionD} />
    </div>
  </div>
</div>
```

### 3. Render inline code (backticks đơn)

Nếu có text như: "Sử dụng `useState` hook"

```tsx
<div>
  {renderInlineCode(question.content)}
</div>
```

### 4. Check xem có code block không

```tsx
if (hasCodeBlock(question.optionA)) {
  // Có code block - render đặc biệt
} else {
  // Text thường
}
```

## 🎯 Ví dụ thực tế

### Component hiển thị câu hỏi

```tsx
'use client';

import { MarkdownRenderer } from '@/lib/markdown-renderer';

interface QuestionDisplayProps {
  question: {
    content: string;
    optionA: string;
    optionB: string;
    optionC: string;
    optionD: string;
  };
  selectedAnswer?: string;
  onAnswerChange: (answer: string) => void;
}

export function QuestionDisplay({ 
  question, 
  selectedAnswer, 
  onAnswerChange 
}: QuestionDisplayProps) {
  const options = [
    { key: 'A', value: question.optionA },
    { key: 'B', value: question.optionB },
    { key: 'C', value: question.optionC },
    { key: 'D', value: question.optionD },
  ];

  return (
    <div className="space-y-4">
      {/* Câu hỏi */}
      <div className="text-lg font-medium">
        <MarkdownRenderer content={question.content} />
      </div>

      {/* Các đáp án */}
      <div className="space-y-3">
        {options.map((option) => (
          <label
            key={option.key}
            className={`
              flex items-start gap-3 p-4 border rounded-lg cursor-pointer
              hover:bg-gray-50 transition-colors
              ${selectedAnswer === option.key ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}
            `}
          >
            <input
              type="radio"
              name="answer"
              value={option.key}
              checked={selectedAnswer === option.key}
              onChange={(e) => onAnswerChange(e.target.value)}
              className="mt-1"
            />
            <div className="flex-1">
              <span className="font-semibold mr-2">{option.key}.</span>
              <MarkdownRenderer content={option.value} className="inline" />
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}
```

## 🎨 Styling Code Blocks

Code blocks được render với class mặc định:
- `bg-gray-900` - Nền đen
- `text-gray-100` - Text trắng
- `p-3` - Padding
- `rounded-lg` - Bo góc
- `overflow-x-auto` - Scroll ngang nếu dài
- `my-2` - Margin trên/dưới

Bạn có thể tùy chỉnh trong `lib/markdown-renderer.tsx`

## 📝 Format trong Markdown

Khi tạo câu hỏi mới trong file `.md`:

```markdown
### Câu X

Câu hỏi có thể có `inline code` hoặc không

A. Đáp án text thường

B. Đáp án có code:

```jsx
const example = () => {
  return <div>Code here</div>;
}
```

C. Đáp án khác

D. Đáp án cuối

**Đáp án: B**
```

## ⚠️ Lưu ý

1. Code blocks phải có dòng trống trước và sau
2. Ngôn ngữ code (jsx, js, ts, python, etc.) được tự động detect
3. Inline code dùng backticks đơn: \`code\`
4. Multi-line code dùng triple backticks: \`\`\`language
5. Component tự động xử lý cả text và code trong cùng một option
