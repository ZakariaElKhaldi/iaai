import React from 'react'
import MonacoEditor, { OnMount, OnChange } from '@monaco-editor/react'

interface CodeEditorProps {
  value: string
  onChange: (value: string | undefined) => void
  language?: string
  theme?: string
  height?: string
  className?: string
  readOnly?: boolean
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  value,
  onChange,
  language = 'typescript',
  theme: editorTheme = 'vs-dark',
  height = '400px',
  className = '',
  readOnly = false
}) => {
  const handleEditorDidMount: OnMount = () => {
    // Editor mounted, no need to use editor or monaco parameters if we're not using them
  }

  const handleEditorChange: OnChange = (value) => {
    onChange(value)
  }

  return (
    <div className={className}>
      <MonacoEditor
        height={height}
        value={value}
        language={language}
        theme={editorTheme}
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
        options={{
          readOnly,
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: 'on',
          scrollBeyondLastLine: false,
          automaticLayout: true,
          wordWrap: 'on'
        }}
      />
    </div>
  )
}

export default CodeEditor 