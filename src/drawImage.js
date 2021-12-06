import moduleMap from './modules/moduleMap'
import { sendImageData } from './broadcast'
import {
  convertAudioToImage,
  convertImageToAudio
} from './helpers'
import { debounce } from 'lodash'

let renderCount = 0
let totalRenderTime = 0
function trackRenderingTime(startTime) {
  const endTime = Date.now()
  const elapsed = endTime - startTime
  renderCount++
  totalRenderTime += elapsed
  console.log({
    renderTime: elapsed,
    averageRenderTime: Math.round(totalRenderTime / renderCount)
  })
}

const margin = 4
const previews = 3
const debouncedDrawActual = debounce(drawActual, 1000)
function drawActual({
  image,
  ctx,
  modules,
  canvasWidth,
  xOffset,
  scaledWidth,
  scaledHeight
}) {
  debouncedDrawActual?.cancel?.()

  const start = Date.now()
  ctx.clearRect(xOffset, 0, xOffset + scaledWidth, scaledHeight)

  const { width, height } = image
  const hiddenCanvas = document.createElement('canvas')
  hiddenCanvas.width = width
  hiddenCanvas.height = height
  const hiddenCtx = hiddenCanvas.getContext('2d')
  hiddenCtx.drawImage(image, 0, 0)
  const imgData = hiddenCtx.getImageData(0, 0, width, height)
  const data = imgData.data

  return renderAudio(data, modules)
    .then(updatedData => {
      convertAudioToImage(updatedData, data)
      hiddenCtx.putImageData(imgData, 0, 0)
      ctx.drawImage(hiddenCanvas, xOffset, 0, scaledWidth, scaledHeight)
      
      const updated = ctx.getImageData(0, 0, canvasWidth, scaledHeight)
      sendImageData(updated, canvasWidth, scaledHeight, true)
      sendImageData(imgData, width, height, false)
      trackRenderingTime(start)
    })
}

export const debouncedDrawPreviewImage = debounce(drawPreviewImage, 1000)
export async function drawPreviewImage(image, canvas, modules, scale) {
  debouncedDrawPreviewImage?.cancel?.()
  
  if (!image.complete) return

  const ctx = canvas.getContext('2d')

  const { width, height } = image
  const scaledWidth = width * scale
  const scaledHeight = height * scale

  const canvasWidth = (scaledWidth * previews) + (margin * previews - 1)
  canvas.width = canvasWidth
  canvas.height = scaledHeight
  ctx.clearRect(0, 0, canvasWidth, scaledHeight)

  ctx.drawImage(image, 0, 0, scaledWidth, scaledHeight)
  const imgData = ctx.getImageData(0, 0, scaledWidth, scaledHeight)
  const data = imgData.data


  const updatedData = await renderAudio(data, modules)

  convertAudioToImage(updatedData, data)
  ctx.putImageData(imgData, scaledWidth + margin, 0)

  let updated = ctx.getImageData(0, 0, canvasWidth, scaledHeight)
  sendImageData(updated, canvasWidth, scaledHeight, true)

  debouncedDrawActual({
    image,
    ctx,
    modules,
    canvasWidth,
    xOffset: (scaledWidth * 2) + (margin * 2),
    scaledWidth,
    scaledHeight
  })
}

export async function downloadImage(image, modules) {
  const { width, height } = image
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  canvas.width = width
  canvas.height = height

  ctx.drawImage(image, 0, 0)
  const imgData = ctx.getImageData(0, 0, width, height)
  const data = imgData.data

  const updatedData = await renderAudio(data, modules)

  convertAudioToImage(updatedData, data)
  ctx.putImageData(imgData, 0, 0)

  const dataURL = canvas.toDataURL()
  
  var tmpLink = document.createElement('a')
  tmpLink.download = `bent-${Date.now()}.png`
  tmpLink.href = dataURL;  

  document.body.appendChild(tmpLink)
  tmpLink.click()
  document.body.removeChild(tmpLink)
}

async function renderAudio(data, modules) {
  let rendered = convertImageToAudio(data)
  for (let module of modules) {
    rendered = await moduleMap[module.type].modulator(rendered, module.data)
  }
  return rendered
}
