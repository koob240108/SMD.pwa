import { useHas_file } from '../ss/file'
import { Edit_and_preview } from '../mods/edit_preview/ui'
import { Open_file } from '../mods/open_file/ui'

export
const App = () => {
  const has_file = useHas_file()

  return <>
    {has_file
      ? <Edit_and_preview />
      : <Open_file />
    }
  </>
}
