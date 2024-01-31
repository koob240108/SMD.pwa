import { useEffect, useRef, useState } from 'react'
import { parse } from 'marked'

import { editor_content, editorchange_by_filechange, save_file } from '../../../ss/file'
import { match_OS } from '../../../../common/utils'

/** throttle interval in ms */
const interval = 300

/**
 * markdown editor hook
 * @return textarea element and parsed markdown string
 */
export
const useMD_editor = () => {
  const ref_textarea = useRef<HTMLTextAreaElement>(null)
  const [parsed, set_parsed] = useState('')
  const [val_editor_content, set_editor_content] = editor_content.useState()
  const sur2_editorchange_by_filechange = editorchange_by_filechange.useSurveilled()

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

  // listen `sur2_editorchange_by_filechange`
  useEffect(() => {
    ;(async () => {
      if (val_editor_content) {
        console.log('real parse by filechange')
        set_parsed(await parse(val_editor_content)) 
      } else {
        console.log('set parsed with empty')
        set_parsed('')
      }
    })()
  }, [sur2_editorchange_by_filechange])

  // listen `save file`
  useEffect(() => {
    const listen_save = (evt: KeyboardEvent) => {
      if (evt.key !== 's') return

      console.debug({ metaKey: evt.metaKey, ctrlKey: evt.ctrlKey })
      if (match_OS({ mac: evt.metaKey}) ?? evt.ctrlKey) {
        console.log('saving file')
        save_file()
      }
    }
    document.body.addEventListener('keydown', listen_save)
    
    return () => document.body.removeEventListener('keydown', listen_save)
  }, [])

  return {
    parsed,
    textarea: <textarea
      style={{
        border: 'none',
        flex: 1,
        backgroundColor: 'transparent',
        color: 'inherit',
        outline: 'none',
        lineHeight: 1.38,
        padding: '3em',
      }}
      ref={ref_textarea}
      value={val_editor_content}
      onChange={evt => set_editor_content(() => evt.target.value)}
    />,
  }
}
