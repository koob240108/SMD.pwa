import { set_file_handle } from '../../../ss/file'

export
const Open_file = () => {
  return <div
    style={{
      height: '100vh',
      display: 'flex',
      gap: '1em',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <button
      className='btn'
      onClick={async () => {
        if (!window.showSaveFilePicker) {
          alert('Your browser does not support this feature. Please try Chrome, Edge or Firefox.')
          return
        }
        set_file_handle(await window.showSaveFilePicker({
          startIn: 'desktop',
          types: [{
            accept: {
              'text/markdown': ['.md'],
            },
          }],
        }))
      }}
    >New File</button>

    <button
      className='btn'
      onClick={async () => {
        if (!window.showOpenFilePicker) {
          alert('Your browser does not support this feature. Please try Chrome, Edge or Firefox.')
          return
        }
        const handles = await window.showOpenFilePicker({
          multiple: false,
        })
        set_file_handle(handles[0])
      }}
    >Open File...</button>
  </div>
}
