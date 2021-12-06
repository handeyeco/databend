import * as Tone from 'tone'
import { Form } from 'react-bootstrap'

import {
  frequency,
  octave
} from './sharedControls'

const m = {
  name: 'Phaser',
  modulator(moduleData) {
    return new Tone.Phaser(moduleData)
  },
  controls: [
    {
      key: 'frequency',
      display: 'Frequency',
      initial: 1,
      ...frequency()
    },
    {
      key: 'baseFrequency',
      display: 'Base Frequency',
      initial: 1,
      ...frequency()
    },
    {
      key: 'octaves',
      display: 'Octaves',
      initial: 1,
      ...octave()
    },
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
      key: 'stages',
      display: 'Stages',
      initial: 1,
      Component: Form.Range,
      props: {
        min: 1,
        max: 10,
        step: 0.01,
      },
    },
  ]
}

export default m
