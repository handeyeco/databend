import { channelCount } from './constants'

export function scale (number, inMin, inMax, outMin, outMax) {
  return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

const suggestedMaxDimension = 250
export function suggestedScale(width, height) {
  let ratio = 1
  if (width > suggestedMaxDimension || height > suggestedMaxDimension) {
    const widthScaleRatio = suggestedMaxDimension / width
    const heightScaleRatio = suggestedMaxDimension / height
    ratio = Math.min(widthScaleRatio, heightScaleRatio)
  }
  return ratio
}

// mutates original image data
export function convertAudioToImage(audioData, imgData) {
  if (audioData.constructor !== Float32Array) {
    throw new Error(`audio data incorrect type`)
  }

  if (imgData.constructor !== Uint8ClampedArray) {
    throw new Error(`img data incorrect type`)
  }

  for (let i = 0; i < audioData.length; i++) {
    imgData[i] = scale(audioData[i], -1, 1, 0, 255)
  }
}

export function convertImageToAudio(imgData) {
  if (imgData.constructor !== Uint8ClampedArray) {
    throw new Error(`img data incorrect type`)
  }

  const audioData = new Float32Array(imgData.length)
  for (let i = 0; i < imgData.length; i++) {
    audioData[i] = scale(imgData[i], 0, 255, -1, 1)
  }
  return audioData
}

export function split1DToChannelCount(arr1D) {
  if (arr1D.constructor !== Float32Array) {
    throw new Error(`audio data incorrect type`)
  }

  const len = arr1D.length / channelCount
  const rv = []

  for (let i = 0; i < channelCount; i++) {
    const inner = new Float32Array(len)
    for (let j = 0; j < len; j++) {
      const dataIndex = i + (j * channelCount)
      inner[j] = arr1D[dataIndex]
    }
    rv.push(inner)
  }

  return rv
}

export function mergeChannelCountTo1D(arr4d) {
  if (arr4d.some(inner => inner.constructor !== Float32Array)) {
    throw new Error(`audio data incorrect type`)
  }

  const rv = new Float32Array(arr4d[0].length * channelCount)

  for (let i = 0; i < channelCount; i++) {
    for (let j = 0; j < arr4d[i].length; j++) {
      const index = i + (j * channelCount)
      rv[index] = arr4d[i][j]
    }
  }

  return rv
}

export function downloadObjectAsJSON(obj) {
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(obj))
  const downloadAnchorNode = document.createElement('a')
  downloadAnchorNode.setAttribute('href', dataStr)
  downloadAnchorNode.setAttribute('download', `patch-${Date.now()}.json`)
  document.body.appendChild(downloadAnchorNode)
  downloadAnchorNode.click()
  downloadAnchorNode.remove()
}
