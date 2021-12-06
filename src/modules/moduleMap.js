import autoFilter from './autoFilter'
import autoWah from './autoWah'
import bitCrusher from './bitCrusher'
import chebyshev from './chebyshev'
import chorus from './chorus'
import compressor from './compressor'
import distortion from './distortion'
import eq3 from './eq3'
import feedbackDelay from './feedbackDelay'
import freeverb from './freeverb'
import frequencyShifter from './frequencyShifter'
import gate from './gate'
import identity from './identity'
import jcReverb from './jcReverb'
import phaser from './phaser'
import pitchShift from './pitchShift'
// import reverb from './reverb'

import { initSharedState } from '../constants'
import channelSplitter from './channelSplitter'

const moduleMap = [
  autoFilter,
  autoWah,
  bitCrusher,
  chebyshev,
  chorus,
  compressor,
  distortion,
  eq3,
  feedbackDelay,
  freeverb,
  frequencyShifter,
  gate,
  identity,
  jcReverb,
  phaser,
  pitchShift,
  // reverb, #todo, reverb bugs out right now
].reduce((acc, curr) => {
  const key = `MODULE_${curr.name}`
  acc[key] = {
    ...curr,
    key,
    initData() {
      let data = initSharedState()
      curr.controls.forEach(c => {
        data[c.key] = c.initial
      })
      return data
    },
    modulator(lastRender, moduleData) {
      return channelSplitter(lastRender, moduleData, () => {
        return curr.modulator(moduleData)
      })
    }
  }  
  return acc
}, {})

export default moduleMap
