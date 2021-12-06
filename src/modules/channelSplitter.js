import * as Tone from 'tone'
import {
  split1DToChannelCount,
  mergeChannelCountTo1D
} from '../helpers'
import {
  channelCount,
  channelOrder,
  MIX,
  SPLIT,
} from '../constants'

async function splitRender(actx, lastRender, moduleData, createNodeCallback) {
  const rendered = await Tone.Offline(() => {
    const data = split1DToChannelCount(lastRender)
    const buffer = actx.createBuffer(channelCount, lastRender.length / channelCount, actx.sampleRate)
  
    for (let i = 0; i < data.length; i++) {
      const inner = data[i]
      const buffering = buffer.getChannelData(i)
      for (let j = 0; j < inner.length; j++) {
        buffering[j] = inner[j]
      }
    }

    const bufferNode = new Tone.ToneBufferSource(buffer)

    const split = new Tone.Split(4)
    bufferNode.connect(split)
    const merge = new Tone.Merge(4)
  
    for (let i = 0; i < channelOrder.length; i++) {
      if (moduleData[channelOrder[i].key]) {
        const node = createNodeCallback()
        split.connect(node, i, 0)
        node.connect(merge, 0, i)
      } else {
        split.connect(merge, i, i)
      }
    }

    const dry = new Tone.Gain(1 - moduleData[MIX])
    const wet = new Tone.Gain(moduleData[MIX])
    const mix = new Tone.Gain(1)
    bufferNode.connect(dry)
    merge.connect(wet)
    dry.connect(mix)
    wet.connect(mix)
    mix.toDestination()

    bufferNode.start()
  }, lastRender.length / actx.sampleRate / channelCount, channelCount, actx.sampleRate0)

  return rendered
}

async function directRender(actx, lastRender, moduleData, createNodeCallback) {
  const rendered = await Tone.Offline(() => {
    const buffer = actx.createBuffer(1, lastRender.length, actx.sampleRate)
    const buffering = buffer.getChannelData(0)

    for (let i = 0; i < lastRender.length; i++) {
      buffering[i] = lastRender[i]
    }

    const bufferNode = new Tone.ToneBufferSource(buffer)
    const node = createNodeCallback()
    bufferNode.connect(node)

    const dry = new Tone.Gain(1 - moduleData[MIX])
    const wet = new Tone.Gain(moduleData[MIX])
    const mix = new Tone.Gain(1)
    bufferNode.connect(dry)
    node.connect(wet)
    dry.connect(mix)
    wet.connect(mix)
    mix.toDestination()

    bufferNode.start()
  }, lastRender.length / actx.sampleRate, 1, actx.sampleRate)

  return rendered
}

export default async function channelSplitter(lastRender, moduleData, createNodeCallback) {
  if (lastRender.constructor !== Float32Array) {
    throw new Error(`audio data incorrect type`)
  }

  const actx = Tone.getContext()
  let rv

  // Split path
  if (moduleData[SPLIT]) {
    let renderedBuffer = await splitRender(actx, lastRender, moduleData, createNodeCallback)
    const arr4d = []
    for (let i = 0; i < channelCount; i++) {
      arr4d[i] = renderedBuffer.getChannelData(i)
    }
    rv = mergeChannelCountTo1D(arr4d)
  }
  
  // Unsplit path
  else {
    let renderedBuffer = await directRender(actx, lastRender, moduleData, createNodeCallback)
    rv = renderedBuffer.getChannelData(0)
  }

  return rv
}
