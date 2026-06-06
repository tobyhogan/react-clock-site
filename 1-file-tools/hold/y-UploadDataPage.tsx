import { useState, useRef, DragEvent, ChangeEvent } from 'react'

type FileType = '.json' | '.jsonc' | '.csv' | '.txt'

const STORAGE_KEY = 'uploadedData'

// Types for folder structure
export interface FileNode {
  name: string
  type: 'file'
  fileType: FileType
  data: unknown
}

export interface FolderNode {
  name: string
  type: 'folder'
  children: (FileNode | FolderNode)[]
}

export type TreeNode = FileNode | FolderNode

export interface StoredFolderData {
  folderName: string
  structure: FolderNode
  uploadedAt: string
  isFolder: true
}

export interface StoredFileData {
  fileName: string
  fileType: string
  data: unknown
  uploadedAt: string
  isFolder?: false
}

export type StoredData = StoredFileData | StoredFolderData

// Example data files
const exampleFiles = [
  {
    name: 'users-example.json',
    type: '.json' as FileType,
    description: 'Sample user data with profiles',
    data: {
      users: [
        { id: 1, name: 'Alice Johnson', email: 'alice@example.com', age: 28, role: 'admin' },
        { id: 2, name: 'Bob Smith', email: 'bob@example.com', age: 34, role: 'user' },
        { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', age: 22, role: 'user' }
      ],
      metadata: {
        totalUsers: 3,
        lastUpdated: '2025-12-10'
      }
    }
  },
  {
    name: 'products-example.json',
    type: '.json' as FileType,
    description: 'E-commerce product catalog',
    data: {
      products: [
        { sku: 'LAPTOP-001', name: 'Pro Laptop 15"', price: 1299.99, inStock: true, category: 'Electronics' },
        { sku: 'PHONE-002', name: 'SmartPhone X', price: 899.99, inStock: true, category: 'Electronics' },
        { sku: 'DESK-003', name: 'Standing Desk', price: 549.00, inStock: false, category: 'Furniture' }
      ],
      currency: 'USD',
      storeId: 'STORE-US-001'
    }
  },
  {
    name: 'config-example.jsonc',
    type: '.jsonc' as FileType,
    description: 'App configuration with comments',
    data: {
      appName: 'My Application',
      version: '2.1.0',
      settings: {
        theme: 'dark',
        language: 'en',
        notifications: true,
        autoSave: true,
        autoSaveInterval: 300
      },
      features: {
        betaFeatures: false,
        analytics: true,
        debugMode: false
      }
    }
  },
  {
    name: 'tasks-example.jsonc',
    type: '.jsonc' as FileType,
    description: 'Project tasks with comments',
    data: {
      project: 'Website Redesign',
      tasks: [
        { id: 1, title: 'Design mockups', status: 'completed', priority: 'high', assignee: 'Design Team' },
        { id: 2, title: 'Frontend development', status: 'in-progress', priority: 'high', assignee: 'Dev Team' },
        { id: 3, title: 'Backend API', status: 'in-progress', priority: 'medium', assignee: 'Dev Team' },
        { id: 4, title: 'Testing & QA', status: 'pending', priority: 'medium', assignee: 'QA Team' }
      ],
      deadline: '2025-12-31'
    }
  }
]

// Example folders with nested structure
const exampleFolders: { name: string; description: string; structure: FolderNode }[] = [
  {
    name: 'project-config',
    description: 'Project configuration folder with settings and environment files',
    structure: {
      name: 'project-config',
      type: 'folder',
      children: [
        {
          name: 'settings.json',
          type: 'file',
          fileType: '.json',
          data: {
            projectName: 'My Awesome Project',
            version: '1.0.0',
            author: 'Dev Team',
            repository: 'https://github.com/example/project'
          }
        },
        {
          name: 'environments',
          type: 'folder',
          children: [
            {
              name: 'development.json',
              type: 'file',
              fileType: '.json',
              data: {
                apiUrl: 'http://localhost:3000',
                debug: true,
                logLevel: 'verbose',
                features: { analytics: false, darkMode: true }
              }
            },
            {
              name: 'production.json',
              type: 'file',
              fileType: '.json',
              data: {
                apiUrl: 'https://api.production.com',
                debug: false,
                logLevel: 'error',
                features: { analytics: true, darkMode: true }
              }
            }
          ]
        },
        {
          name: 'database.json',
          type: 'file',
          fileType: '.json',
          data: {
            host: 'localhost',
            port: 5432,
            name: 'app_database',
            pool: { min: 2, max: 10 }
          }
        }
      ]
    }
  },
  {
    name: 'api-responses',
    description: 'Sample API response data with users, orders, and analytics',
    structure: {
      name: 'api-responses',
      type: 'folder',
      children: [
        {
          name: 'users',
          type: 'folder',
          children: [
            {
              name: 'user-list.json',
              type: 'file',
              fileType: '.json',
              data: {
                page: 1,
                totalPages: 5,
                users: [
                  { id: 'u1', username: 'johndoe', email: 'john@example.com', active: true },
                  { id: 'u2', username: 'janedoe', email: 'jane@example.com', active: true },
                  { id: 'u3', username: 'bobsmith', email: 'bob@example.com', active: false }
                ]
              }
            },
            {
              name: 'user-profile.json',
              type: 'file',
              fileType: '.json',
              data: {
                id: 'u1',
                username: 'johndoe',
                fullName: 'John Doe',
                email: 'john@example.com',
                avatar: 'https://example.com/avatars/johndoe.png',
                createdAt: '2024-01-15T10:30:00Z',
                preferences: { theme: 'dark', notifications: true, language: 'en' }
              }
            }
          ]
        },
        {
          name: 'orders',
          type: 'folder',
          children: [
            {
              name: 'recent-orders.json',
              type: 'file',
              fileType: '.json',
              data: {
                orders: [
                  { id: 'ord-001', customer: 'John Doe', total: 149.99, status: 'delivered', items: 3 },
                  { id: 'ord-002', customer: 'Jane Doe', total: 89.50, status: 'shipped', items: 2 },
                  { id: 'ord-003', customer: 'Bob Smith', total: 299.00, status: 'processing', items: 1 }
                ],
                summary: { totalOrders: 3, totalRevenue: 538.49 }
              }
            }
          ]
        },
        {
          name: 'analytics.json',
          type: 'file',
          fileType: '.json',
          data: {
            period: '2025-12',
            metrics: {
              pageViews: 15420,
              uniqueVisitors: 3250,
              bounceRate: 0.42,
              avgSessionDuration: 185
            },
            topPages: [
              { path: '/home', views: 5200 },
              { path: '/products', views: 3800 },
              { path: '/about', views: 1500 }
            ]
          }
        }
      ]
    }
  }
]

const UploadDataPage = () => {
  const [isDragging, setIsDragging] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' })
  const [fileName, setFileName] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const folderInputRef = useRef<HTMLInputElement>(null)

  const fileTypes: FileType[] = ['.json', '.jsonc', '.csv', '.txt']

  const isValidFileType = (fileName: string): FileType | null => {
    const ext = '.' + fileName.split('.').pop()?.toLowerCase()
    if (fileTypes.includes(ext as FileType)) {
      return ext as FileType
    }
    return null
  }

  const parseFileContent = (content: string, fileType: FileType): unknown => {
    switch (fileType) {
      case '.json':
        return JSON.parse(content)
      case '.jsonc':
        // Remove comments from JSONC (single-line // and multi-line /* */)
        const jsonWithoutComments = content
          .replace(/\/\*[\s\S]*?\*\//g, '') // Remove multi-line comments
          .replace(/\/\/.*$/gm, '') // Remove single-line comments
        return JSON.parse(jsonWithoutComments)
      case '.csv':
        // Parse CSV into array of objects
        const lines = content.trim().split('\n')
        if (lines.length < 2) return []
        const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''))
        return lines.slice(1).map(line => {
          const values = line.split(',').map(v => v.trim().replace(/^"|"$/g, ''))
          return headers.reduce((obj, header, index) => {
            obj[header] = values[index] || ''
            return obj
          }, {} as Record<string, string>)
        })
      case '.txt':
        // Store as text content
        return { textContent: content, lines: content.split('\n') }
      default:
        throw new Error('Unsupported file type')
    }
  }

  const processFolder = async (files: FileList) => {
    const validFiles: { path: string; file: File; fileType: FileType }[] = []
    
    // Filter to only valid file types
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const fileType = isValidFileType(file.name)
      
      if (fileType) {
        // Get the relative path from webkitRelativePath
        const path = (file as File & { webkitRelativePath?: string }).webkitRelativePath || file.name
        validFiles.push({ path, file, fileType })
      }
    }

    if (validFiles.length === 0) {
      setUploadStatus({
        type: 'error',
        message: `No valid files found in folder. Supported types: ${fileTypes.join(', ')}`
      })
      return
    }

    // Build folder structure
    const rootFolderName = validFiles[0].path.split('/')[0] || 'uploaded-folder'
    const root: FolderNode = {
      name: rootFolderName,
      type: 'folder',
      children: []
    }

    for (const { path, file, fileType } of validFiles) {
      const parts = path.split('/')
      let current: FolderNode = root
      
      // Navigate/create folder structure
      for (let i = 1; i < parts.length - 1; i++) {
        const folderName = parts[i]
        let folder = current.children.find(
          (c): c is FolderNode => c.type === 'folder' && c.name === folderName
        )
        if (!folder) {
          folder = { name: folderName, type: 'folder', children: [] }
          current.children.push(folder)
        }
        current = folder
      }

      // Add file
      try {
        const content = await file.text()
        const parsedData = parseFileContent(content, fileType)
        const fileNode: FileNode = {
          name: parts[parts.length - 1],
          type: 'file',
          fileType,
          data: parsedData
        }
        current.children.push(fileNode)
      } catch (error) {
        console.warn(`Failed to parse ${file.name}:`, error)
      }
    }

    // Sort children alphabetically (folders first)
    const sortChildren = (node: FolderNode) => {
      node.children.sort((a, b) => {
        if (a.type !== b.type) return a.type === 'folder' ? -1 : 1
        return a.name.localeCompare(b.name)
      })
      node.children.forEach(child => {
        if (child.type === 'folder') sortChildren(child)
      })
    }
    sortChildren(root)

    // Store in localStorage
    const storageData: StoredFolderData = {
      folderName: rootFolderName,
      structure: root,
      uploadedAt: new Date().toISOString(),
      isFolder: true
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(storageData))

    setFileName(rootFolderName)
    setUploadStatus({
      type: 'success',
      message: `Successfully uploaded folder "${rootFolderName}" with ${validFiles.length} file(s)`
    })
  }

  const processFile = async (file: File) => {
    const detectedFileType = isValidFileType(file.name)

    if (!detectedFileType) {
      setUploadStatus({
        type: 'error',
        message: `Unsupported file type. Supported types: ${fileTypes.join(', ')}`
      })
      return
    }

    try {
      const content = await file.text()
      const parsedData = parseFileContent(content, detectedFileType)
      
      // Store in localStorage
      const storageData: StoredFileData = {
        fileName: file.name,
        fileType: detectedFileType,
        data: parsedData,
        uploadedAt: new Date().toISOString(),
        isFolder: false
      }
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(storageData))
      
      setFileName(file.name)
      setUploadStatus({
        type: 'success',
        message: `Successfully uploaded and stored "${file.name}"`
      })
    } catch (error) {
      setUploadStatus({
        type: 'error',
        message: `Failed to parse file: ${error instanceof Error ? error.message : 'Unknown error'}`
      })
    }
  }

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    // Check if this came from the folder input (has webkitRelativePath)
    const firstFile = files[0] as File & { webkitRelativePath?: string }
    const isFromFolderInput = firstFile.webkitRelativePath && firstFile.webkitRelativePath.includes('/')
    
    if (isFromFolderInput) {
      processFolder(files)
    } else {
      processFile(files[0])
    }
    
    // Reset inputs so same file/folder can be selected again
    if (fileInputRef.current) fileInputRef.current.value = ''
    if (folderInputRef.current) folderInputRef.current.value = ''
  }

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
  }

  // Helper to recursively read directory entries
  const readDirectory = async (dirEntry: FileSystemDirectoryEntry): Promise<File[]> => {
    const files: File[] = []
    const reader = dirEntry.createReader()
    
    const readEntries = (): Promise<FileSystemEntry[]> => {
      return new Promise((resolve, reject) => {
        reader.readEntries(resolve, reject)
      })
    }
    
    const getFile = (fileEntry: FileSystemFileEntry): Promise<File> => {
      return new Promise((resolve, reject) => {
        fileEntry.file(resolve, reject)
      })
    }
    
    let entries: FileSystemEntry[]
    do {
      entries = await readEntries()
      for (const entry of entries) {
        if (entry.isFile) {
          const file = await getFile(entry as FileSystemFileEntry)
          // Attach the full path for folder structure building
          Object.defineProperty(file, 'webkitRelativePath', {
            value: entry.fullPath.substring(1), // Remove leading slash
            writable: false
          })
          files.push(file)
        } else if (entry.isDirectory) {
          const subFiles = await readDirectory(entry as FileSystemDirectoryEntry)
          files.push(...subFiles)
        }
      }
    } while (entries.length > 0)
    
    return files
  }

  const handleDrop = async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    
    const items = e.dataTransfer.items
    const files = e.dataTransfer.files
    
    // Check if dropping a folder (using webkitGetAsEntry for folder detection)
    if (items && items.length > 0) {
      const item = items[0]
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const entry = (item as any).webkitGetAsEntry?.()
      
      if (entry?.isDirectory) {
        try {
          setUploadStatus({ type: null, message: '' })
          const allFiles = await readDirectory(entry as FileSystemDirectoryEntry)
          if (allFiles.length > 0) {
            // Create a FileList-like object
            const fileList = {
              length: allFiles.length,
              item: (i: number) => allFiles[i],
              [Symbol.iterator]: function* () {
                for (let i = 0; i < allFiles.length; i++) yield allFiles[i]
              }
            } as unknown as FileList
            // Add indexed access
            allFiles.forEach((file, i) => {
              (fileList as unknown as Record<number, File>)[i] = file
            })
            processFolder(fileList)
          }
        } catch (error) {
          setUploadStatus({
            type: 'error',
            message: `Failed to read folder: ${error instanceof Error ? error.message : 'Unknown error'}`
          })
        }
        return
      }
    }
    
    // Handle single file drop
    if (files && files.length > 0) {
      processFile(files[0])
    }
  }

  const openFileExplorer = () => {
    fileInputRef.current?.click()
  }

  const openFolderExplorer = () => {
    folderInputRef.current?.click()
  }

  const clearStoredData = () => {
    localStorage.removeItem(STORAGE_KEY)
    setFileName(null)
    setUploadStatus({
      type: 'success',
      message: 'Stored data cleared successfully'
    })
  }

  const loadExampleFile = (example: typeof exampleFiles[0]) => {
    const storageData: StoredFileData = {
      fileName: example.name,
      fileType: example.type,
      data: example.data,
      uploadedAt: new Date().toISOString(),
      isFolder: false
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(storageData))
    
    setFileName(example.name)
    setUploadStatus({
      type: 'success',
      message: `Successfully loaded example file "${example.name}"`
    })
  }

  const loadExampleFolder = (example: typeof exampleFolders[0]) => {
    const storageData: StoredFolderData = {
      folderName: example.name,
      structure: example.structure,
      uploadedAt: new Date().toISOString(),
      isFolder: true
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(storageData))
    
    setFileName(example.name)
    setUploadStatus({
      type: 'success',
      message: `Successfully loaded example folder "${example.name}"`
    })
  }

  // Check if there's existing data
  const hasStoredData = localStorage.getItem(STORAGE_KEY) !== null

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-neutral-800 dark:text-neutral-50 mb-6">
        Upload Data
      </h1>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept={fileTypes.join(',')}
        onChange={handleFileSelect}
        className="hidden"
      />
      
      {/* Hidden Folder Input */}
      <input
        ref={folderInputRef}
        type="file"
        onChange={handleFileSelect}
        className="hidden"
        {...{ webkitdirectory: '', directory: '' } as React.InputHTMLAttributes<HTMLInputElement>}
        multiple
      />

      {/* Upload Buttons */}
      <div className="mb-4 grid grid-cols-2 gap-3">
        <button
          onClick={openFileExplorer}
          className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Choose File
        </button>
        <button
          onClick={openFolderExplorer}
          className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
          </svg>
          Choose Folder
        </button>
      </div>

      {/* Unified Drag & Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragging
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
            : 'border-neutral-300 dark:border-neutral-600 hover:border-blue-400 dark:hover:border-blue-500'
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 mx-auto mb-4 text-neutral-400 dark:text-neutral-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          />
        </svg>
        <p className="text-neutral-600 dark:text-neutral-400 mb-1">
          Drag and drop files or folders here
        </p>
        <p className="text-sm text-neutral-500 dark:text-neutral-500">
          Supported types: {fileTypes.join(', ')}
        </p>
      </div>

      {/* Status Message */}
      {uploadStatus.type && (
        <div
          className={`mt-4 p-4 rounded-lg ${
            uploadStatus.type === 'success'
              ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
              : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
          }`}
        >
          {uploadStatus.message}
        </div>
      )}

      {/* Current File Info */}
      {fileName && (
        <div className="mt-4 p-4 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Current file: <span className="font-medium text-neutral-800 dark:text-neutral-200">{fileName}</span>
          </p>
        </div>
      )}

      {/* Clear Data Button */}
      {hasStoredData && (
        <div className="mt-6">
          <button
            onClick={clearStoredData}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
          >
            Clear Stored Data
          </button>
        </div>
      )}

      {/* Info Section */}
      <div className="mt-8 p-4 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
        <h3 className="font-medium text-neutral-800 dark:text-neutral-200 mb-2">Supported Formats</h3>
        <ul className="text-sm text-neutral-600 dark:text-neutral-400 space-y-1">
          <li><strong>.json</strong> - Standard JSON data files</li>
          <li><strong>.jsonc</strong> - JSON with comments (comments will be stripped)</li>
          <li><strong>.csv</strong> - Comma-separated values (first row as headers)</li>
          <li><strong>.txt</strong> - Plain text files</li>
        </ul>
      </div>

      {/* Example Files Section */}
      <div className="mt-8">
        <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-50 mb-4">
          Example Files
        </h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
          Click on any example file below to load it as sample data:
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {exampleFiles.map((example) => (
            <button
              key={example.name}
              onClick={() => loadExampleFile(example)}
              className="p-4 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-left hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-md transition-all group"
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${
                  example.type === '.json' 
                    ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400'
                    : 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
                }`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-neutral-800 dark:text-neutral-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                    {example.name}
                  </p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                    {example.type}
                  </p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                    {example.description}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Example Folders Section */}
      <div className="mt-8">
        <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-50 mb-4">
          Example Folders
        </h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
          Click on any example folder below to load it with its nested file structure:
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {exampleFolders.map((example) => (
            <button
              key={example.name}
              onClick={() => loadExampleFolder(example)}
              className="p-4 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-left hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-md transition-all group"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-neutral-800 dark:text-neutral-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                    {example.name}
                  </p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                    folder
                  </p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                    {example.description}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default UploadDataPage
