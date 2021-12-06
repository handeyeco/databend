import * as Tone from 'tone'

import {
  frequency,
  normal
} from './sharedControls'

const m = {
  name: 'Freeverb',
  modulator(moduleData) {
    return new Tone.Freeverb(moduleData)
  },
  controls: [
    {
      key: 'roomSize',
      display: 'Room Size',
      initial: 0,
      ...normal()
    },
    {
      key: 'dampening',
      display: 'Dampening',
      initial: 1,
      ...frequency()
    },
  ]
}

export default m
