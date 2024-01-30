import { useMD_editor } from '../../../../common/md_utils/hook' // TODO: `@common` in tsconfig
import { editor_content } from '../../../ss/file'

export
const Edit_and_preview = () => {
  const [val_editor_content, set_editor_content] = editor_content.useState()
  // markdown editor
  const md_editor = useMD_editor({
    val_editor: val_editor_content,
    set_editor: set_editor_content,
  })

  return <div
    style={{
      display: 'flex',
      height: '100vh',
    }}
  >
    {md_editor.textarea({
      style: {
        border: 'none',
        flex: 1,
        backgroundColor: 'transparent',
        color: 'inherit',
        outline: 'none',
        lineHeight: 1.38,
        padding: '3em',
      }
    })}
    <article
      dangerouslySetInnerHTML={{__html: md_editor.parsed}}
      style={{
        flex: 1,
        padding: '0 3em',
        borderLeft: '1px solid rgba(var(--fc), .188)',
      }}
    />
  </div>
}