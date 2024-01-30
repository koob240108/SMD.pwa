import { State, State_nullable } from '../../common/state/index.ts'

const file_handle = State_nullable<FileSystemFileHandle>(null)

export
const useHas_file = () => file_handle.useVal() !== null

/**
 * This may not have been written to the hard disk.
 * Writing happens when the user do a `save` action.
 */
export
const editor_content = State('')
// listen the file handle changes, and update the editor content
file_handle.subscribe(async () => {
  const handle = await file_handle.get()
  if (!handle)
    editor_content.set(() => '')
  else {
    const file = await handle.getFile()
    const content = await file.text()
    editor_content.set(() => content)
  }
})

interface LaunchQueue {
  setConsumer(callback: (params: { files: FileSystemFileHandle[] }) => void): void
}

export
const init_file_on_launch = () => {
  console.log('initialize file_handle on launch')
  if ('launchQueue' in window === false) {
    console.error('window.launchQueue not supported')
    return
  }
  const lq = (window as unknown as { launchQueue: LaunchQueue}).launchQueue

  lq.setConsumer(params => {
    const file = params.files[0]
    if (file) {
      console.log('launch by clicking file')
      file_handle.set(() => file)
    } else
      console.error('If there\'s no file, shouldn\'t this arrow function be executed')
  })
}
