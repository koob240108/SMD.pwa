import { useMD_editor } from '../../common/md_utils/hook'

export
const App = () => {
  const md_editor = useMD_editor()
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
