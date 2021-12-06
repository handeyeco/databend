import * as Tone from 'tone'
import { Form } from 'react-bootstrap'

const m = {
  name: 'Bit Crusher',
  modulator(moduleData) {
    return new Tone.BitCrusher(moduleData)
  },
  controls: [
    {
      key: 'bits',
      display: 'Bits',
      initial: 1,
      Component: Form.Range,
      props: {
        min: 1,
        max: 16,
        step: 1,
      },
    },
  ]
}

export default m
