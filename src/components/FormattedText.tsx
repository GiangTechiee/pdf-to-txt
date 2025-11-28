import React from 'react';
import { cn } from '@/lib/utils';

interface FormattedTextProps {
    text: string;
    className?: string;
}

export function FormattedText({ text, className }: FormattedTextProps) {
    if (!text) return null;

    // Split by triple backticks first to identify code blocks
    // The regex captures the content inside the backticks
    const parts = text.split(/```([\s\S]*?)```/g);

    return (
        <div className={cn("text-foreground", className)}>
            {parts.map((part, index) => {
                // Odd indices are code blocks (captured by the regex group)
                if (index % 2 === 1) {
                    return (
                        <div key={index} className="my-3 rounded-lg overflow-hidden border border-border/50 shadow-sm">
                            <div className="bg-muted/80 px-4 py-1.5 border-b border-border/50 flex items-center gap-2">
                                <div className="flex gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-400/80"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-400/80"></div>
                                </div>
                                <span className="text-xs text-muted-foreground font-mono ml-2">Code</span>
                            </div>
                            <pre className="bg-slate-950 dark:bg-slate-900 p-4 overflow-x-auto custom-scrollbar">
                                <code className="font-mono text-sm text-slate-50 leading-relaxed block">
                                    {part.trim()}
                                </code>
                            </pre>
                        </div>
                    );
                }

                // Even indices are text that might contain inline code
                // Split by single backticks
                const inlineParts = part.split(/`([^`]+)`/g);

                return (
                    <span key={index} className="whitespace-pre-wrap">
                        {inlineParts.map((inlinePart, inlineIndex) => {
                            // Odd indices are inline code
                            if (inlineIndex % 2 === 1) {
                                return (
                                    <code
                                        key={inlineIndex}
                                        className="bg-muted-foreground/20 px-1.5 py-0.5 rounded-md font-mono text-[0.9em] text-primary font-medium border border-border/50 mx-0.5"
                                    >
                                        {inlinePart}
                                    </code>
                                );
                            }
                            // Even indices are plain text
                            return <span key={inlineIndex}>{inlinePart}</span>;
                        })}
                    </span>
                );
            })}
        </div>
    );
}
