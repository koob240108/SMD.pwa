import { parse } from 'marked'

const textarea = document.querySelector('textarea')
const article = document.querySelector('article')

let throttle_id = null
let last_parsing_at = new Date(0)

textarea.addEventListener('input', () => {
  console.debug('input listened')
  clearTimeout(throttle_id)
  if (last_parsing_at - new Date() < 100)
    throttle_id = setTimeout(_parse, 100)
  else
    _parse()
})

function _parse() {
  console.debug('parsing')
  last_parsing_at = new Date()
  article.innerHTML = parse(textarea.value)
}
