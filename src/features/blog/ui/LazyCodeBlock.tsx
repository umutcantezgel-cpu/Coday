'use client';

import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface LazyCodeBlockProps {
  code: string;
  language: string;
}

export default function LazyCodeBlock({ code, language }: LazyCodeBlockProps) {
  return (
    <SyntaxHighlighter
      language={language || 'typescript'}
      style={vscDarkPlus}
      customStyle={{
        margin: 0,
        padding: '1.25rem',
        background: 'transparent',
        fontSize: '0.875rem',
        lineHeight: '1.7',
      }}
      showLineNumbers={true}
    >
      {code}
    </SyntaxHighlighter>
  );
}
