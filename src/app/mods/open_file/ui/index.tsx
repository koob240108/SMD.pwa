import { set_file_handle } from '../../../ss/file'

export
const Open_file = () => {
  return <div
    style={{
      height: '100vh',
      display: 'grid',
      placeItems: 'center',
    }}
  >
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
