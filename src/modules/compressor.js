import * as Tone from 'tone'
import { Form } from 'react-bootstrap'
import { decibel } from './sharedControls'

const m = {
  name: 'Compressor',
  modulator(moduleData) {
    return new Tone.Compressor(moduleData)
  },
  controls: [
    {
      key: 'threshold',
      display: 'Threshold',
      initial: 0,
      ...decibel()
    },
    {
      key: 'ratio',
      display: 'Ratio',
      initial: 1,
      Component: Form.Range,
      props: {
        min: 1,
        max: 10,
        step: 0.0001,
      },
    },
  ]
}

export default m
