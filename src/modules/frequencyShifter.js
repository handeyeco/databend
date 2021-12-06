import * as Tone from 'tone'
import { frequency } from './sharedControls'

const m = {
  name: 'Frequency Shifter',
  modulator(moduleData) {
    return new Tone.FrequencyShifter(moduleData)
  },
  controls: [
    {
      key: 'frequency',
      display: 'Frequency',
      initial: 1,
      ...frequency()
    },
  ]
}

export default m
