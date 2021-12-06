import {
  scale,
  convertAudioToImage,
  convertImageToAudio,
  split1DToChannelCount,
  mergeChannelCountTo1D,
} from './helpers'
import { channelCount } from './constants'

const blank1D = [
  0, 0, 0, 0,
  0, 0, 0, 0,
  0, 0, 0, 0,
  0, 0, 0, 0,
]

const image1D = [
  255, 0, 0, 255, // r
  0, 255, 0, 255, // g
  0, 0, 255, 255, // b
  128, 128, 128, 128, // mid
]

const audio1D = [
  1, -1, -1, 1, // r
  -1, 1, -1, 1, // g
  -1, -1, 1, 1, // b
  0.0039215686274509665, // mid
  0.0039215686274509665,
  0.0039215686274509665,
  0.0039215686274509665,
]

describe(`scale`, () => {
  it(`converts simple values`, () => {
    expect(scale(1, -1, 1, 0, 255))
      .toBe(255)
    expect(scale(-1, -1, 1, 0, 255))
      .toBe(0)
    expect(scale(0, -1, 1, 0, 255))
    .toBe(127.5)


    expect(scale(255, 0, 255, -1, 1))
      .toBe(1)
    expect(scale(0, 0, 255, -1, 1))
      .toBe(-1)
    expect(scale(127.5, 0, 255, -1, 1))
    .toBe(0)

    image1D.forEach((num, i) => {
      expect(scale(num, 0, 255, -1, 1))
        .toBe(audio1D[i])
    })

    audio1D.forEach((num, i) => {
      expect(scale(num, -1, 1, 0, 255))
        .toBe(image1D[i])
    })
  })
})

describe(`convertAudioToImage`, () => {
  it(`converts a simple array`, () => {
    const audioInput = new Float32Array(audio1D.length)
    audio1D.forEach((b, i) => { audioInput[i] = b })

    const imageInput = new Uint8ClampedArray(blank1D.length)
    blank1D.forEach((b, i) => { imageInput[i] = b })

    const expected = new Uint8ClampedArray(image1D.length)
    image1D.forEach((b, i) => { expected[i] = b })

    // it mutates the inputted image data
    convertAudioToImage(audioInput, imageInput)

    expect(imageInput).toEqual(expected)
  })
})

describe(`convertImageToAudio`, () => {
  it(`converts a simple array`, () => {
    const imageInput = new Uint8ClampedArray(audio1D.length)
    image1D.forEach((b, i) => { imageInput[i] = b })

    const audioOutput = new Float32Array(audio1D.length)
    audio1D.forEach((b, i) => { audioOutput[i] = b })

    const actual = convertImageToAudio(imageInput)

    expect(actual).toEqual(audioOutput)
  })
})

describe(`split1DToChannelCount`, () => {
  it(`converts a simple 1D array`, () => {
    const audioInput = new Float32Array(audio1D.length)
    audio1D.forEach((b, i) => { audioInput[i] = b })

    const actual = split1DToChannelCount(audioInput)

    expect(actual.length).toEqual(channelCount)
  })

  it(`inner arrays are Float32Arrays`, () => {
    const audioInput = new Float32Array(audio1D.length)
    audio1D.forEach((b, i) => { audioInput[i] = b })

    const actual = split1DToChannelCount(audioInput)

    actual.forEach(inner => {
      expect(inner.constructor).toEqual(Float32Array)
    })
  })

  it(`outer array length matches channel count`, () => {
    const audioInput = new Float32Array(audio1D.length)
    audio1D.forEach((b, i) => { audioInput[i] = b })

    const actual = split1DToChannelCount(audioInput)

    expect(actual.length).toBe(channelCount)
  })

  it(`inner arrays have expected length`, () => {
    const audioInput = new Float32Array(audio1D.length)
    audio1D.forEach((b, i) => { audioInput[i] = b })

    const actual = split1DToChannelCount(audioInput)

    actual.forEach(inner => {
      expect(inner.length).toBe(audio1D.length / channelCount)
    })
  })

  it(`inner arrays have expected values`, () => {
    const audioInput = new Float32Array(audio1D.length)
    audio1D.forEach((b, i) => { audioInput[i] = b })

    const actual = split1DToChannelCount(audioInput)

    actual.forEach((inner, i) => {
      let expected = new Float32Array(audio1D.length / channelCount)
      for (let j = 0; j < channelCount; j++) {
        expected[j] = audio1D[i + (j * channelCount)]
      }
      expect(inner).toEqual(expected)
    })
  })
})

describe(`mergeChannelCountTo1D`, () => {
  const arr4d = []
  for (let i = 0; i < channelCount; i++) {
    const inner = new Float32Array(audio1D.length / 4)
    for (let j = 0; j < inner.length; j++) {
      let next = audio1D[i + (j * channelCount)]
      inner[j] = next
    }
    arr4d.push(inner)
  }

  it(`merges a 4D array`, () => {
    const actual = mergeChannelCountTo1D(arr4d)

    actual.forEach((f, i) => {
      // floating points need to be checked with toBeCloseTo
      expect(f).toBeCloseTo(audio1D[i])
    })
  })

  it(`outputs the correct length`, () => {
    const actual = mergeChannelCountTo1D(arr4d)

    expect(actual.length).toBe(audio1D.length)
  })

  it(`outputs Float32Array`, () => {
    const actual = mergeChannelCountTo1D(arr4d)

    expect(actual.constructor).toEqual(Float32Array)
  })
})
