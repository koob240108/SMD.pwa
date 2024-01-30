import { useEffect, useRef, useState } from 'react'
import { parse } from 'marked'

export
const useMD_editor = (interval = 300) => {
  const ref_textarea = useRef<HTMLTextAreaElement>(null)
  const [parsed, set_parsed] = useState('')

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

    async function _parse() {
      console.log('real parse')
      set_parsed(await parse(textarea.value))
      last_parsing_at = new Date()
    }
  }, [])

  return {
    textarea: <textarea ref={ref_textarea} />,
    parsed,
  }
}
