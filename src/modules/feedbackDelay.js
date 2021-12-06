import * as Tone from 'tone'

import { normal } from './sharedControls'

const m = {
  name: 'Feedback Delay',
  modulator(moduleData) {
    return new Tone.FeedbackDelay(moduleData)
  },
  controls: [
    {
      key: 'delayTime',
      display: 'Delay Time',
      initial: 0,
      ...normal()
    },
    {
      key: 'feedback',
      display: 'Feedback',
      initial: 0,
      ...normal()
    },
  ]
}

export default m
