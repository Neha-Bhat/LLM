import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight, oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useTheme } from './Hooks/useTheme';

function MarkdownRenderer({ text }) {
  const { theme } = useTheme(); // get current theme
  return (
    <ReactMarkdown
      children={text}
      components={{
        code({ node, inline, className, children, ...props }) {
          return !inline ? (
            <SyntaxHighlighter language="javascript" style={theme === 'dark' ? oneDark : oneLight}>
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          ) : (
            <code {...props} className={`${className} bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300`}>
              {children}
            </code>
          );
        },
      }}
    />
  );
}

export default MarkdownRenderer;
