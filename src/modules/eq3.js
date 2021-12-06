import * as Tone from 'tone'

import {
  frequency,
  decibel
} from './sharedControls'

const m = {
  name: 'EQ',
  modulator(moduleData) {
    return new Tone.EQ3(moduleData)
  },
  controls: [
    {
      key: 'highFrequency',
      display: 'High Frequency',
      initial: 20000,
      ...frequency()
    },
    {
      key: 'high',
      display: 'High',
      initial: 0,
      ...decibel()
    },
    {
      key: 'mid',
      display: 'Mid',
      initial: 0,
      ...decibel()
    },
    {
      key: 'low',
      display: 'Low',
      initial: 0,
      ...decibel()
    },
    {
      key: 'lowFrequency',
      display: 'Low Frequency',
      initial: 0,
      ...frequency()
    },
  ]
}

export default m
