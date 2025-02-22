import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

interface RichTextEditorProps {
  initialValue?: string
  onChange?: (value: string) => void
  placeholder?: string
  className?: string
  minHeight?: string
  maxHeight?: string
  readOnly?: boolean
}

const RichTextEditor = ({
  initialValue = '',
  onChange,
  placeholder = 'Start typing...',
  className = '',
  minHeight = '200px',
  maxHeight = '500px',
  readOnly = false
}: RichTextEditorProps) => {
  const [isFocused, setIsFocused] = useState(false)
  const editorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = initialValue
      if (placeholder && !initialValue) {
        editorRef.current.dataset.placeholder = placeholder
      }
    }
  }, [initialValue, placeholder])

  const handleInput = () => {
    if (editorRef.current && onChange) {
      onChange(editorRef.current.innerHTML)
    }
  }

  const execCommand = (command: string, value?: string) => {
    if (!readOnly) {
      document.execCommand(command, false, value || '')
      editorRef.current?.focus()
      handleInput()
    }
  }

  const formatBlock = (block: string) => {
    execCommand('formatBlock', block)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Tab') {
      e.preventDefault()
      execCommand('insertHTML', '&nbsp;&nbsp;&nbsp;&nbsp;')
    }
  }

  return (
    <div className={`relative ${className}`}>
      {/* Toolbar */}
      {!readOnly && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap gap-2 p-2 bg-slate-800 rounded-t-lg border-b border-slate-700"
        >
          {/* Text Style */}
          <select
            onChange={(e) => formatBlock(e.target.value)}
            className="px-2 py-1 bg-slate-700 text-white rounded hover:bg-slate-600 transition-colors"
          >
            <option value="p">Normal</option>
            <option value="h1">Heading 1</option>
            <option value="h2">Heading 2</option>
            <option value="h3">Heading 3</option>
            <option value="pre">Code</option>
            <option value="blockquote">Quote</option>
          </select>

          {/* Basic Formatting */}
          <div className="flex gap-1">
            <button
              onClick={() => execCommand('bold')}
              className="p-2 text-slate-300 hover:text-white hover:bg-slate-700 rounded transition-colors"
              title="Bold"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 12h8a4 4 0 100-8H6v8zm0 0h8a4 4 0 110 8H6v-8z" />
              </svg>
            </button>
            <button
              onClick={() => execCommand('italic')}
              className="p-2 text-slate-300 hover:text-white hover:bg-slate-700 rounded transition-colors"
              title="Italic"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </button>
            <button
              onClick={() => execCommand('underline')}
              className="p-2 text-slate-300 hover:text-white hover:bg-slate-700 rounded transition-colors"
              title="Underline"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h8M12 16V4" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 20h12" />
              </svg>
            </button>
          </div>

          {/* Lists */}
          <div className="flex gap-1">
            <button
              onClick={() => execCommand('insertUnorderedList')}
              className="p-2 text-slate-300 hover:text-white hover:bg-slate-700 rounded transition-colors"
              title="Bullet List"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <button
              onClick={() => execCommand('insertOrderedList')}
              className="p-2 text-slate-300 hover:text-white hover:bg-slate-700 rounded transition-colors"
              title="Numbered List"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20h14M7 12h14M7 4h14M3 20h.01M3 12h.01M3 4h.01" />
              </svg>
            </button>
          </div>

          {/* Alignment */}
          <div className="flex gap-1">
            <button
              onClick={() => execCommand('justifyLeft')}
              className="p-2 text-slate-300 hover:text-white hover:bg-slate-700 rounded transition-colors"
              title="Align Left"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h10M4 18h16" />
              </svg>
            </button>
            <button
              onClick={() => execCommand('justifyCenter')}
              className="p-2 text-slate-300 hover:text-white hover:bg-slate-700 rounded transition-colors"
              title="Center"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M7 12h10M4 18h16" />
              </svg>
            </button>
            <button
              onClick={() => execCommand('justifyRight')}
              className="p-2 text-slate-300 hover:text-white hover:bg-slate-700 rounded transition-colors"
              title="Align Right"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M10 12h10M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Special */}
          <div className="flex gap-1">
            <button
              onClick={() => {
                const url = prompt('Enter URL:')
                if (url) execCommand('createLink', url)
              }}
              className="p-2 text-slate-300 hover:text-white hover:bg-slate-700 rounded transition-colors"
              title="Insert Link"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </button>
            <button
              onClick={() => {
                const url = prompt('Enter image URL:')
                if (url) execCommand('insertImage', url)
              }}
              className="p-2 text-slate-300 hover:text-white hover:bg-slate-700 rounded transition-colors"
              title="Insert Image"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </button>
          </div>
        </motion.div>
      )}

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable={!readOnly}
        onInput={handleInput}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onKeyDown={handleKeyDown}
        className={`w-full p-4 bg-slate-800/50 ${readOnly ? 'rounded-lg' : 'rounded-b-lg'} text-white focus:outline-none overflow-auto ${
          isFocused ? 'ring-2 ring-blue-500/20' : ''
        } empty:before:content-[attr(data-placeholder)] before:text-slate-500`}
        style={{
          minHeight,
          maxHeight
        }}
        data-placeholder={placeholder}
      />
    </div>
  )
}

export default RichTextEditor 