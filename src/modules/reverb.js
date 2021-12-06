import * as Tone from 'tone'
import { Form } from 'react-bootstrap'

const m = {
  name: 'Reverb',
  modulator(moduleData) {
    return new Tone.Reverb(moduleData)
  },
  controls: [
    {
      key: 'decay',
      display: 'Decay',
      initial: 1,
      Component: Form.Range,
      props: {
        min: 0.01,
        max: 10,
        step: 0.01,
      },
    },
    {
      key: 'preDelay',
      display: 'Pre-delay',
      initial: 1,
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
