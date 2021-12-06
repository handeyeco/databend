import * as Tone from 'tone'
import { Form } from 'react-bootstrap'

import {
  decibel,
  frequency,
  normal,
  octave,
  time,
} from './sharedControls'

const m = {
  name: 'Auto Wah',
  modulator(moduleData) {
    return new Tone.AutoWah(moduleData)
  },
  controls: [
    {
      key: 'Q',
      display: 'Q',
      initial: 1,
      Component: Form.Range,
      props: {
        min: 1,
        max: 10,
        step: 0.01,
      },
    },
    {
      key: 'baseFrequency',
      display: 'Base Frequency',
      initial: 0,
      ...frequency()
    },
    {
      key: 'follower',
      display: 'Follower',
      initial: 0.001,
      ...time()
    },
    {
      key: 'gain',
      display: 'Gain',
      initial: 0,
      ...normal()
    },
    {
      key: 'octaves',
      display: 'Octaves',
      initial: 0,
      ...octave()
    },
    {
      key: 'sensitivity',
      display: 'Sensitivity',
      initial: 0,
      ...decibel()
    },
  ]
}

export default m
