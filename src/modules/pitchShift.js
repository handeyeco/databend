import * as Tone from 'tone'
import { Form } from 'react-bootstrap'

import { normal } from './sharedControls'

const m = {
  name: 'Pitch Shift',
  modulator(moduleData) {
    return new Tone.PitchShift(moduleData)
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
    {
      key: 'pitch',
      display: 'Pitch',
      initial: 0,
      Component: Form.Range,
      props: {
        min: 0,
        max: 24,
        step: 0.01,
      },
    },
    {
      key: 'windowSize',
      display: 'Window Size',
      initial: 0.01,
      Component: Form.Range,
      props: {
        min: 0.01,
        max: 10,
        step: 0.01,
      },
    },
  ]
}

export default m
