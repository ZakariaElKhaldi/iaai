import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import CodeEditor from '../../components/common/CodeEditor'
import { Tooltip } from '../../components/common/Tooltip'
import Loading from '../../components/common/Loading'
import { useToast } from '../../components/common/Toast'
import { useHotkeys } from 'react-hotkeys-hook'

interface FileTab {
  id: string
  name: string
  language: string
  content: string
  unsavedChanges?: boolean
}

const CodeEditorPage = () => {
  const { fileId } = useParams()
  const { showToast } = useToast()
  const [activeFile, setActiveFile] = useState<FileTab | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [output, setOutput] = useState<string>('')
  const [isRunning, setIsRunning] = useState(false)
  const [theme, setTheme] = useState<'vs-dark' | 'light'>('vs-dark')
  const [showOutput, setShowOutput] = useState(false)
  const [files, setFiles] = useState<FileTab[]>([])

  // Keyboard shortcuts
  useHotkeys('ctrl+s, cmd+s', (event: KeyboardEvent) => {
    event.preventDefault()
    handleSave()
  })

  useHotkeys('ctrl+r, cmd+r', (event: KeyboardEvent) => {
    event.preventDefault()
    handleRun()
  })

  useHotkeys('ctrl+b, cmd+b', (event: KeyboardEvent) => {
    event.preventDefault()
    setShowOutput(prev => !prev)
  })

  useEffect(() => {
    // Simulate loading file data
    const loadFile = async () => {
      setIsLoading(true)
      try {
        // Mock file loading
        await new Promise(resolve => setTimeout(resolve, 1000))
        if (fileId) {
          const mockFile = {
            id: fileId,
            name: 'example.js',
            language: 'javascript',
            content: '// Your code here'
          }
          setActiveFile(mockFile)
          setFiles([mockFile])
        }
      } catch (error) {
        showToast('Error loading file', 'error')
      } finally {
        setIsLoading(false)
      }
    }
    loadFile()
  }, [fileId])

  const handleCodeChange = (value: string) => {
    if (!activeFile) return
    setActiveFile({
      ...activeFile,
      content: value,
      unsavedChanges: true
    })
  }

  const handleSave = async () => {
    if (!activeFile) return
    try {
      // Mock save operation
      await new Promise(resolve => setTimeout(resolve, 500))
      setActiveFile({
        ...activeFile,
        unsavedChanges: false
      })
      showToast('File saved successfully', 'success')
    } catch (error) {
      showToast('Error saving file', 'error')
    }
  }

  const handleRun = async () => {
    if (!activeFile) return
    setIsRunning(true)
    setShowOutput(true)
    try {
      // Mock code execution
      await new Promise(resolve => setTimeout(resolve, 1000))
      setOutput('Code executed successfully!\nOutput: Hello, World!')
      showToast('Code executed successfully', 'success')
    } catch (error) {
      setOutput('Error executing code')
      showToast('Error executing code', 'error')
    } finally {
      setIsRunning(false)
    }
  }

  if (isLoading) {
    return <Loading variant="full" text="Loading editor..." />
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Editor Header */}
      <div className="border-b border-slate-800 bg-slate-900/90 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-16 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Tooltip content="Save (Ctrl/Cmd + S)">
                <button
                  onClick={handleSave}
                  className="p-2 text-slate-400 hover:text-white transition-colors"
                  disabled={!activeFile?.unsavedChanges}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                  </svg>
                </button>
              </Tooltip>
              <Tooltip content="Run Code (Ctrl/Cmd + R)">
                <button
                  onClick={handleRun}
                  className="p-2 text-slate-400 hover:text-white transition-colors"
                  disabled={isRunning}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
              </Tooltip>
              <Tooltip content="Toggle Output (Ctrl/Cmd + B)">
                <button
                  onClick={() => setShowOutput(prev => !prev)}
                  className={`p-2 transition-colors ${showOutput ? 'text-blue-400' : 'text-slate-400 hover:text-white'}`}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                  </svg>
                </button>
              </Tooltip>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value as 'vs-dark' | 'light')}
                className="bg-slate-800 text-slate-300 rounded-lg px-3 py-1 text-sm border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="vs-dark">Dark Theme</option>
                <option value="light">Light Theme</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Editor Content */}
      <div className="flex h-[calc(100vh-4rem)]">
        <div className={`flex-1 ${showOutput ? 'w-2/3' : 'w-full'} transition-all duration-300`}>
          {activeFile ? (
            <CodeEditor
              initialValue={activeFile.content}
              language={activeFile.language}
              onChange={handleCodeChange}
              theme={theme}
              className="h-full"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-slate-400">
              No file selected
            </div>
          )}
        </div>

        {/* Output Panel */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{
            width: showOutput ? '33.333333%' : 0,
            opacity: showOutput ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
          className="border-l border-slate-800 bg-slate-900/50 overflow-hidden"
        >
          <div className="p-4 h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-medium">Output</h3>
              <button
                onClick={() => setOutput('')}
                className="text-slate-400 hover:text-white transition-colors"
              >
                Clear
              </button>
            </div>
            <div className="flex-1 font-mono text-sm bg-slate-800/50 rounded-lg p-4 overflow-auto">
              {isRunning ? (
                <Loading variant="inline" size="small" text="Running..." />
              ) : output ? (
                <pre className="text-slate-300 whitespace-pre-wrap">{output}</pre>
              ) : (
                <span className="text-slate-500">No output</span>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default CodeEditorPage 