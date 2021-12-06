const bc = new BroadcastChannel('image-update')

let lastRender
let lastPreview

export function sendImageData(imgData, width, height, preview) {
  const data = {
    preview,
    width,
    height,
    imgData
  }

  if (preview) {
    lastPreview = data
  } else {
    lastRender = data
  }

  bc.postMessage(data)
}

bc.onmessage = ({ data }) => {
  console.log(data)
  if (data && data.type === 'subscribe') {
    bc.postMessage(lastRender)
    bc.postMessage(lastPreview)
  }
}
