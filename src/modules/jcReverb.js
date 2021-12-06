import * as Tone from 'tone'

import {
  normal
} from './sharedControls'

const m = {
  name: 'JC Reverb',
  modulator(moduleData) {
    return new Tone.JCReverb(moduleData)
  },
  controls: [
    {
      key: 'roomSize',
      display: 'Room Size',
      initial: 0,
      ...normal()
    },
  ]
}

export default m
