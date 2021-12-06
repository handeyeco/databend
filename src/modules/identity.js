import * as Tone from 'tone'
import { Form } from 'react-bootstrap'

const m = {
  name: 'Gain',
  modulator(moduleData) {
    return new Tone.Gain(moduleData)
  },
  controls: [
    {
      key: 'gain',
      display: 'Gain',
      initial: 1,
      Component: Form.Range,
      props: {
        min: 0.01,
        max: 4,
        step: 0.01,
      },
    },
  ]
}

export default m
