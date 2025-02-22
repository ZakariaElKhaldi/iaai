import { useRef, useEffect } from 'react'
import Editor, { OnMount, OnChange, Monaco } from '@monaco-editor/react'
import * as monaco from 'monaco-editor'
import { motion } from 'framer-motion'

interface CodeEditorProps {
  initialValue?: string
  language?: string
  onChange?: (value: string) => void
  readOnly?: boolean
  minHeight?: string
  maxHeight?: string
  className?: string
  placeholder?: string
  showLineNumbers?: boolean
  autoFocus?: boolean
  theme?: 'vs-dark' | 'light'
}

const CodeEditor = ({
  initialValue = '',
  language = 'javascript',
  onChange,
  readOnly = false,
  minHeight = '200px',
  maxHeight = '600px',
  className = '',
  theme = 'vs-dark',
  autoFocus = true
}: CodeEditorProps) => {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null)

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor
    if (autoFocus) {
      editor.focus()
    }

    // Add custom theme
    monaco.editor.defineTheme('custom-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': '#0f172a',
      }
    })
    monaco.editor.setTheme('custom-dark')
  }

  const handleEditorChange: OnChange = (value) => {
    onChange?.(value || '')
  }

  return (
    <motion.div 
      className={`rounded-lg overflow-hidden ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Editor
        height={minHeight}
        defaultValue={initialValue}
        defaultLanguage={language}
        theme={theme}
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
        options={{
          readOnly,
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: 'on',
          roundedSelection: true,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          padding: { top: 16, bottom: 16 },
          lineHeight: 21,
          folding: true,
          glyphMargin: false,
          wordWrap: 'on',
          tabSize: 2,
          renderLineHighlight: 'all',
          scrollbar: {
            useShadows: false,
            verticalScrollbarSize: 10,
            horizontalScrollbarSize: 10
          }
        }}
      />
    </motion.div>
  )
}

export default CodeEditor 