import * as Tone from 'tone'
import { Form } from 'react-bootstrap'

import Waveforms from '../components/modifiers/Waveforms'
import {
  normal,
  frequency,
} from './sharedControls'

const m = {
  name: 'Chorus',
  modulator(moduleData) {
    return new Tone.Chorus(moduleData)
  },
  controls: [
    {
      key: 'delayTime',
      display: 'Delay Time',
      initial: 1,
      Component: Form.Range,
      props: {
        min: 1,
        max: 100,
        step: 1,
      },
    },
    {
      key: 'depth',
      display: 'Depth',
      initial: 1,
      ...normal()
    },
    {
      key: 'feedback',
      display: 'Feedback',
      initial: 0,
      ...normal()
    },
    {
      key: 'frequency',
      display: 'Frequency',
      initial: 0,
      ...frequency()
    },
    {
      key: 'type',
      display: 'Waveform',
      initial: "sawtooth",
      Component: Waveforms,
      props: {},
    },
  ]
}

export default m
