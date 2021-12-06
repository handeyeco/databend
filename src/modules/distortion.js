import * as Tone from 'tone'

import { normal } from './sharedControls'
import Oversample from '../components/modifiers/Oversample'

const m = {
  name: 'Distortion',
  modulator(moduleData) {
    return new Tone.Distortion(moduleData)
  },
  controls: [
    {
      key: 'distortion',
      display: 'Distortion',
      initial: 0,
      ...normal()
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
