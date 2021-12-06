import * as Tone from 'tone'
import { Form } from 'react-bootstrap'
import Oversample from '../components/modifiers/Oversample'

const m = {
  name: 'Chebyshev',
  modulator(moduleData) {
    return new Tone.Chebyshev(moduleData)
  },
  controls: [
    {
      key: 'order',
      display: 'Order',
      initial: 2,
      Component: Form.Range,
      props: {
        min: 2, // blows up on 1 sometimes
        max: 100,
        step: 1,
      },
    },
    {
      key: 'oversample',
      display: 'Oversample',
      initial: 'none',
      Component: Oversample,
      props: {},
    }
  ]
}

export default m
