type OS = 'win' | 'mac' | 'linux' | 'unknown'
type Matcher<T> = Record<OS, T>

export
const match_OS = <T>(matcher: Partial<Matcher<T>>) => {
  const ua = navigator.userAgent
  if (ua.indexOf('Win') !== -1)
    return matcher.win
  if (ua.indexOf('Mac') !== -1)
    return matcher.mac
  if (ua.indexOf('Linux') !== -1)
    return matcher.linux
}
