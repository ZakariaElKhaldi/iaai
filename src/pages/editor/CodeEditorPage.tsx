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

// Mock file system data
const mockFiles = [
  {
    id: '1',
    name: 'main.py',
    language: 'python',
    content: '# Python main file\n\ndef main():\n    print("Hello, World!")\n\nif __name__ == "__main__":\n    main()'
  },
  {
    id: '2',
    name: 'index.js',
    language: 'javascript',
    content: '// JavaScript file\n\nconsole.log("Hello from JavaScript!");'
  },
  {
    id: '3',
    name: 'styles.css',
    language: 'css',
    content: '/* CSS styles */\n\nbody {\n    background: #f0f0f0;\n}'
  }
]

const CodeEditorPage = () => {
  const { fileId } = useParams()
  const { showToast } = useToast()
  const [activeFile, setActiveFile] = useState<FileTab | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [output, setOutput] = useState<string>('')
  const [isRunning, setIsRunning] = useState(false)
  const [theme, setTheme] = useState<'vs-dark' | 'light'>('vs-dark')
  const [showOutput, setShowOutput] = useState(false)
  const [files, setFiles] = useState<FileTab[]>(mockFiles)
  const [showFileExplorer, setShowFileExplorer] = useState(true)

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

  useHotkeys('ctrl+\\, cmd+\\', (event: KeyboardEvent) => {
    event.preventDefault()
    setShowFileExplorer(prev => !prev)
  })

  useEffect(() => {
    // Load file data
    const loadFile = async () => {
      setIsLoading(true)
      try {
        await new Promise(resolve => setTimeout(resolve, 500))
        if (fileId) {
          const file = files.find(f => f.id === fileId)
          if (file) {
            setActiveFile(file)
          }
        }
      } catch (error) {
        showToast('Error loading file', 'error')
      } finally {
        setIsLoading(false)
      }
    }
    loadFile()
  }, [fileId, files])

  const handleCodeChange = (value: string = '') => {
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
      await new Promise(resolve => setTimeout(resolve, 500))
      setActiveFile({
        ...activeFile,
        unsavedChanges: false
      })
      setFiles(prev => 
        prev.map(file => 
          file.id === activeFile.id 
            ? { ...file, content: activeFile.content, unsavedChanges: false }
            : file
        )
      )
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
      await new Promise(resolve => setTimeout(resolve, 1000))
      setOutput(`Running ${activeFile.name}...\nOutput: Hello, World!`)
      showToast('Code executed successfully', 'success')
    } catch (error) {
      setOutput('Error executing code')
      showToast('Error executing code', 'error')
    } finally {
      setIsRunning(false)
    }
  }

  const handleCreateFile = () => {
    const fileName = prompt('Enter file name:')
    if (!fileName) return

    const fileExtension = fileName.split('.').pop()?.toLowerCase() || ''
    const language = {
      'js': 'javascript',
      'py': 'python',
      'css': 'css',
      'html': 'html',
      'json': 'json',
      'ts': 'typescript',
      'tsx': 'typescript',
      'jsx': 'javascript'
    }[fileExtension] || 'plaintext'

    const newFile: FileTab = {
      id: String(Date.now()),
      name: fileName,
      language,
      content: '',
      unsavedChanges: false
    }

    setFiles(prev => [...prev, newFile])
    setActiveFile(newFile)
  }

  const handleDeleteFile = (fileId: string) => {
    if (!confirm('Are you sure you want to delete this file?')) return

    setFiles(prev => prev.filter(file => file.id !== fileId))
    if (activeFile?.id === fileId) {
      setActiveFile(null)
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
              <Tooltip content="Toggle File Explorer (Ctrl/Cmd + \)">
                <button
                  onClick={() => setShowFileExplorer(prev => !prev)}
                  className={`p-2 transition-colors ${
                    showFileExplorer ? 'text-blue-400' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                  </svg>
                </button>
              </Tooltip>
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
        {/* File Explorer */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{
            width: showFileExplorer ? '250px' : 0,
            opacity: showFileExplorer ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
          className="border-r border-slate-800 bg-slate-900/50 overflow-hidden"
        >
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-medium">Files</h3>
              <button
                onClick={handleCreateFile}
                className="p-1 text-slate-400 hover:text-white transition-colors"
                title="Create New File"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
            <div className="space-y-1">
              {files.map(file => (
                <div
                  key={file.id}
                  className={`flex items-center justify-between group px-3 py-2 rounded-lg cursor-pointer ${
                    activeFile?.id === file.id
                      ? 'bg-blue-500/20 text-blue-400'
                      : 'text-slate-300 hover:bg-slate-800'
                  }`}
                  onClick={() => setActiveFile(file)}
                >
                  <div className="flex items-center space-x-2">
                    <span role="img" aria-label="file">
                      {file.language === 'python' ? '🐍' :
                       file.language === 'javascript' ? '📜' :
                       file.language === 'css' ? '🎨' :
                       file.language === 'html' ? '🌐' :
                       '📄'}
                    </span>
                    <span className="truncate">{file.name}</span>
                    {file.unsavedChanges && (
                      <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                    )}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDeleteFile(file.id)
                    }}
                    className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-red-400 transition-all"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Editor */}
        <div className={`flex-1 ${showOutput ? 'w-2/3' : 'w-full'} transition-all duration-300`}>
          {activeFile ? (
            <CodeEditor
              value={activeFile.content}
              onChange={handleCodeChange}
              language={activeFile.language}
              theme={theme}
              className="h-full"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-slate-400">
              <div className="text-center">
                <p className="mb-4">No file selected</p>
                <button
                  onClick={handleCreateFile}
                  className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors"
                >
                  Create New File
                </button>
              </div>
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