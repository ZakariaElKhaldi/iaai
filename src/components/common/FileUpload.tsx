import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface FileUploadProps {
  onUpload: (files: File[]) => Promise<void>
  accept?: string
  multiple?: boolean
  maxSize?: number // in bytes
  className?: string
  maxFiles?: number
}

interface UploadingFile {
  file: File
  progress: number
  error?: string
}

const FileUpload = ({
  onUpload,
  accept = '*',
  multiple = false,
  maxSize = 10 * 1024 * 1024, // 10MB default
  className = '',
  maxFiles = 10
}: FileUploadProps) => {
  const [isDragging, setIsDragging] = useState(false)
  const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const dragCounter = useRef(0)

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    dragCounter.current++
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true)
    }
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    dragCounter.current--
    if (dragCounter.current === 0) {
      setIsDragging(false)
    }
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const validateFiles = (files: File[]): { valid: File[], errors: string[] } => {
    const valid: File[] = []
    const errors: string[] = []

    files.forEach(file => {
      if (!accept.includes('*') && !accept.split(',').some(type => file.type.match(type.trim()))) {
        errors.push(`${file.name} is not an accepted file type`)
      } else if (file.size > maxSize) {
        errors.push(`${file.name} is too large (max ${maxSize / 1024 / 1024}MB)`)
      } else {
        valid.push(file)
      }
    })

    if (valid.length > maxFiles) {
      errors.push(`Maximum ${maxFiles} files allowed`)
      valid.length = maxFiles
    }

    return { valid, errors }
  }

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    dragCounter.current = 0

    const droppedFiles = Array.from(e.dataTransfer.files)
    const { valid, errors } = validateFiles(droppedFiles)

    if (errors.length > 0) {
      // Show errors using your preferred notification system
      console.error(errors.join('\n'))
      return
    }

    handleFiles(valid)
  }, [maxSize, accept, maxFiles])

  const handleFiles = async (files: File[]) => {
    const newUploadingFiles = files.map(file => ({
      file,
      progress: 0
    }))

    setUploadingFiles(prev => [...prev, ...newUploadingFiles])

    try {
      await onUpload(files)
      // Clear completed uploads after a delay
      setTimeout(() => {
        setUploadingFiles(prev => prev.filter(f => f.progress < 100))
      }, 3000)
    } catch (error) {
      // Update error state for failed uploads
      setUploadingFiles(prev =>
        prev.map(f =>
          files.includes(f.file)
            ? { ...f, error: 'Upload failed' }
            : f
        )
      )
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files)
      const { valid, errors } = validateFiles(selectedFiles)

      if (errors.length > 0) {
        console.error(errors.join('\n'))
        return
      }

      handleFiles(valid)
    }
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className={className}>
      {/* Drop Zone */}
      <div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-lg p-8 transition-colors cursor-pointer ${
          isDragging
            ? 'border-blue-500 bg-blue-500/10'
            : 'border-slate-700 hover:border-slate-600 bg-slate-800/50'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept={accept}
          multiple={multiple}
          onChange={handleFileSelect}
        />

        <div className="text-center">
          <svg
            className="mx-auto h-12 w-12 text-slate-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          <p className="mt-4 text-sm text-slate-300">
            Drag and drop your files here, or{' '}
            <span className="text-blue-400">browse</span>
          </p>
          <p className="mt-2 text-xs text-slate-400">
            Maximum file size: {formatFileSize(maxSize)}
          </p>
          {accept !== '*' && (
            <p className="mt-1 text-xs text-slate-400">
              Accepted files: {accept}
            </p>
          )}
        </div>
      </div>

      {/* Upload Progress */}
      <AnimatePresence>
        {uploadingFiles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 space-y-2"
          >
            {uploadingFiles.map((uploadingFile, index) => (
              <motion.div
                key={uploadingFile.file.name + index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-slate-800/50 rounded-lg p-3"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <svg
                      className="w-5 h-5 text-slate-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <div>
                      <p className="text-sm text-white truncate">
                        {uploadingFile.file.name}
                      </p>
                      <p className="text-xs text-slate-400">
                        {formatFileSize(uploadingFile.file.size)}
                      </p>
                    </div>
                  </div>
                  {uploadingFile.error ? (
                    <span className="text-sm text-red-400">
                      {uploadingFile.error}
                    </span>
                  ) : uploadingFile.progress === 100 ? (
                    <svg
                      className="w-5 h-5 text-green-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    <span className="text-sm text-slate-400">
                      {uploadingFile.progress}%
                    </span>
                  )}
                </div>
                {!uploadingFile.error && uploadingFile.progress < 100 && (
                  <div className="w-full bg-slate-700 rounded-full h-1">
                    <motion.div
                      className="bg-blue-500 h-1 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${uploadingFile.progress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default FileUpload 