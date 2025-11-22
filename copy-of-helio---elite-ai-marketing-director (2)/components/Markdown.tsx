import React from 'react';
import ReactMarkdown from 'react-markdown';

interface MarkdownProps {
  content: string;
}

export const Markdown: React.FC<MarkdownProps> = ({ content }) => {
  return (
    <div className="prose prose-invert prose-indigo max-w-none">
      <ReactMarkdown
        components={{
          h3: ({node, ...props}) => <h3 className="text-indigo-400 font-bold mt-6 mb-2 text-lg border-b border-indigo-900/30 pb-1" {...props} />,
          strong: ({node, ...props}) => <strong className="text-indigo-200 font-semibold" {...props} />,
          ul: ({node, ...props}) => <ul className="list-disc list-outside ml-4 space-y-1 text-slate-300" {...props} />,
          ol: ({node, ...props}) => <ol className="list-decimal list-outside ml-4 space-y-1 text-slate-300" {...props} />,
          p: ({node, ...props}) => <p className="text-slate-300 leading-relaxed mb-4" {...props} />,
          code: ({node, ...props}) => <code className="bg-slate-800 text-indigo-300 px-1 py-0.5 rounded text-sm" {...props} />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};