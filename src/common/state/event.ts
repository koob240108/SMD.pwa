import { State } from '.'

export
const State_event = () => {
  const state = State(1)
  return {
    emit: () => {
      state.set(old => old + 1)
    },
    useSurveilled: () => state.useVal(),
  }
}
