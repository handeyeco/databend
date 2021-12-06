import * as Tone from 'tone'
import Waveforms from '../components/modifiers/Waveforms'

import {
  frequency,
  normal,
  octave,
} from './sharedControls'

const m = {
  name: 'Auto Filter',
  modulator(moduleData) {
    return new Tone.AutoFilter(moduleData)
  },
  controls: [
    {
      key: 'baseFrequency',
      display: 'Base Frequency',
      initial: 0,
      ...frequency()
    },
    {
      key: 'frequency',
      display: 'Frequency',
      initial: 0,
      ...frequency()
    },
    {
      key: 'depth',
      display: 'Depth',
      initial: 1,
      ...normal()
    },
    {
      key: 'octaves',
      display: 'Octaves',
      initial: 0,
      ...octave()
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
