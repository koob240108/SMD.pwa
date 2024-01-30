import { useEffect, useRef, useState } from 'react'
import { parse } from 'marked'

export
const useMD_editor = (interval = 100) => {
  const ref_textarea = useRef<HTMLTextAreaElement>(null)
  const [parsed, set_parsed] = useState('')

  useEffect(() => {
    const textarea = ref_textarea.current!

    // listen `input` and parse
    let throttle: number
    let last_parsing_at = new Date(0) // time of last parsing
    textarea.addEventListener('input', async () => {
      clearTimeout(throttle)
      if(new Date().getTime() - last_parsing_at.getTime() < interval)
        throttle = setTimeout(async () => {
          set_parsed(await parse(textarea.value))
        }, interval)
      else
        set_parsed(await parse(textarea.value))
    })
  }, [])

  return {
    textarea: <textarea ref={ref_textarea} />,
    parsed,
  }
}
