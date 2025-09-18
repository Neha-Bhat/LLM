import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

function MarkdownRenderer({ text }) {
  return (
    <ReactMarkdown
      children={text}
      components={{
        code({ node, inline, className, children, ...props }) {
          return !inline ? (
            <SyntaxHighlighter language="javascript">
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          ) : (
            <code {...props} className={className}>
              {children}
            </code>
          );
        },
      }}
    />
  );
}

export default MarkdownRenderer;
