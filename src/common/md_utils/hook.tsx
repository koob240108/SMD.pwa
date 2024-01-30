import { useEffect, useRef, useState } from 'react'
import { parse } from 'marked'

interface Editor_props {
  interval?: number
  val_editor: string
  set_editor: (calc: (old_val: string) => string) => void
}

interface Textarea_props {
  style?: React.CSSProperties,
  className?: string,
}

/**
 * markdown editor hook
 * @return textarea element and parsed markdown string
 */
export
const useMD_editor = (editor_props: Editor_props) => {
  const interval = editor_props.interval ?? 300
  if (interval <= 0) throw Error ('interval must be greater than 0')

  const ref_textarea = useRef<HTMLTextAreaElement>(null)
  const [parsed, set_parsed] = useState('')

  // listen the raw `input` event for parsing with throttle
  useEffect(() => {
    const textarea = ref_textarea.current!

    // listen `input` and parse
    let throttle: number
    let last_parsing_at = new Date(0) // time of last parsing
    textarea.addEventListener('input', async () => {
      console.debug('inputing')
      clearTimeout(throttle)
      if(new Date().getTime() - last_parsing_at.getTime() < interval)
        throttle = setTimeout(_parse, interval)
      else
        _parse()
    })

    // auto focus
    textarea.focus()

    async function _parse() {
      console.log('real parse')
      set_parsed(await parse(textarea.value))
      last_parsing_at = new Date()
    }
  }, [])

  return {
    textarea: (props?: Textarea_props) =>
      <textarea
        style={props?.style}
        className={props?.className}
        ref={ref_textarea}
        value={editor_props.val_editor}
        onChange={evt => editor_props.set_editor(() => evt.target.value)}
      />
    ,
    parsed,
  }
}
