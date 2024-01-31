import { State } from '../../common/state'
import { file_handle, file_is_editing } from './file'

const default_title = 'Simple MD Editor'

const app_title = State(default_title)
file_handle.subscribe(async () => {
  const handle = file_handle.get()
  app_title.set(() => handle?.name || default_title)
})

const update_title = () => {
  const editing = file_is_editing.get()
  const title = app_title.get()
  document.title = `${editing ? 'Editing - ' : ''}${title}`
}
app_title.subscribe(update_title)
file_is_editing.subscribe(update_title)
