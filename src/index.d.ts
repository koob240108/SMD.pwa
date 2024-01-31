interface File_picker_opts {
  multiple?: boolean
}

interface Window {
  showOpenFilePicker?: (opts: File_picker_opts) => Promise<FileSystemFileHandle[]>
}
