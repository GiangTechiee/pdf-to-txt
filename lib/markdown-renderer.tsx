import React from 'react';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

/**
 * Component để render text có thể chứa code blocks
 * Format: ```language\ncode\n```
 */
export function MarkdownRenderer({ content, className = '' }: MarkdownRendererProps) {
  // Parse content to find code blocks
  const parts: Array<{ type: 'text' | 'code'; content: string; language?: string }> = [];
  
  const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
  let lastIndex = 0;
  let match;
  
  while ((match = codeBlockRegex.exec(content)) !== null) {
    // Add text before code block
    if (match.index > lastIndex) {
      const textContent = content.substring(lastIndex, match.index).trim();
      if (textContent) {
        parts.push({ type: 'text', content: textContent });
      }
    }
    
    // Add code block
    parts.push({
      type: 'code',
      content: match[2].trim(),
      language: match[1] || 'javascript',
    });
    
    lastIndex = match.index + match[0].length;
  }
  
  // Add remaining text
  if (lastIndex < content.length) {
    const textContent = content.substring(lastIndex).trim();
    if (textContent) {
      parts.push({ type: 'text', content: textContent });
    }
  }
  
  // If no code blocks found, just return text
  if (parts.length === 0) {
    return <span className={className}>{content}</span>;
  }
  
  return (
    <div className={className}>
      {parts.map((part, index) => {
        if (part.type === 'text') {
          return (
            <span key={index} className="inline">
              {part.content}
            </span>
          );
        } else {
          return (
            <pre
              key={index}
              className="bg-gray-900 text-gray-100 p-3 rounded-lg overflow-x-auto my-2 text-sm"
            >
              <code className={`language-${part.language}`}>{part.content}</code>
            </pre>
          );
        }
      })}
    </div>
  );
}

/**
 * Helper function để check xem content có chứa code block không
 */
export function hasCodeBlock(content: string): boolean {
  return /```[\s\S]*?```/.test(content);
}

/**
 * Helper function để render inline code (backticks đơn)
 */
export function renderInlineCode(text: string): React.ReactNode {
  const parts = text.split(/(`[^`]+`)/g);
  
  return parts.map((part, index) => {
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code
          key={index}
          className="bg-gray-100 text-red-600 px-1.5 py-0.5 rounded text-sm font-mono"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return <span key={index}>{part}</span>;
  });
}
