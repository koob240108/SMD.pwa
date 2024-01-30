import { useMD_editor } from '../../common/md_utils/hook'

export
const App = () => {
  const md_editor = useMD_editor()
  return <div>
    {md_editor.textarea}
    <article dangerouslySetInnerHTML={{__html: md_editor.parsed}}></article>
  </div>
}
