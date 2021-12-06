import * as Tone from 'tone'
import { Form } from 'react-bootstrap'
import { decibel } from './sharedControls'

const m = {
  name: 'Gate',
  modulator(moduleData) {
    return new Tone.Gate(moduleData)
  },
  controls: [
    {
      key: 'smoothing',
      display: 'Smoothing',
      initial: 1,
      Component: Form.Range,
      props: {
        min: 0.01,
        max: 10,
        step: 0.01,
      },
    },
    {
      key: 'threshold',
      display: 'Threshold',
      initial: 0,
      ...decibel()
    },
  ]
}

export default m
