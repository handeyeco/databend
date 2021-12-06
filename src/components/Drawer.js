import {
  useEffect,
  useState,
  useRef,
} from 'react'
import {
  Button,
  Card,
  Form
} from 'react-bootstrap'
import { v4 as uuid } from 'uuid'
import {
  drawPreviewImage,
  debouncedDrawPreviewImage,
  downloadImage,
} from '../drawImage'
import {
  suggestedScale,
  downloadObjectAsJSON,
} from '../helpers'
import { GenericRange } from './modifiers/Ranges'
import ModuleList from './ModuleList'

export default function Drawer({
  modules,
  setModules,
}) {
  const [image, setImage] = useState()
  const [scale, setScale] = useState(1)
  const prevScale = useRef(scale)
  const canvasRef = useRef()

  function addModule(module) {
    const formatted = {
      unique: uuid(),
      type: module.key,
      data: module.initData()
    }
    const next = [...modules, formatted]
    setModules(next)
  }

  useEffect(() => {
    if (!image) {
      const defaultImg = new Image()
      defaultImg.onload = () => {
        setImage(defaultImg)
      }
      defaultImg.src = 'images/fuji.png'
    }
  }, [image])

  useEffect(() => {
    if (image) {
      if (scale === prevScale.current) {
        drawPreviewImage(image, canvasRef.current, modules, scale)
      } else {
        debouncedDrawPreviewImage(image, canvasRef.current, modules, scale)
        prevScale.current = scale
      }
    }
  }, [image, modules, scale])

  async function changeImage(e) {
    const selectedFile = e.target.files[0]
    const reader = new FileReader()

    const img = new Image()

    img.onload = () => {
      setScale(suggestedScale(img.width, img.height))
      setImage(img)
    }
    reader.onload = (event) => {
      img.src = event.target.result
    }
    reader.readAsDataURL(selectedFile)
  }

  function uploadPatch(e) {
    const selectedFile = e.target.files[0]
    const reader = new FileReader()

    reader.onload = (event) => {
      let result = JSON.parse(event.target.result)
      // when adding patch to same patch IDs could be the same,
      // so replacing them with new ones
      result = result.map(m => ({ ...m, unique: uuid() }))
      setModules([...modules, ...result])
    }

    reader.readAsText(selectedFile);
  }

  return (
    <div>
      <Card className="m-3 p-3">
        <div style={{ overflow: 'auto' }} className="mb-2">
          <div style={{ display: 'inline-block' }}>
            <canvas ref={canvasRef} />
            <div className="d-flex justify-content-around" style={{ fontSize: '0.75em' }}>
              <span>Original</span>
              <span>Quick Render</span>
              <span>Actual Render</span>
            </div>
          </div>
        </div>
        <GenericRange value={scale}
          onChange={setScale}
          min={0.1}
          max={2}
          step={0.01}
          label="Scale Preview" />
        <a href="/display.html" target="_blank">Open preview in new tab</a>
        <Form.Group controlId="upload-image" className="my-3">
          <Form.Label className="d-block">
            Upload image
            <Form.Control size="sm" type="file" accept="image/*" onChange={changeImage} />
          </Form.Label>
        </Form.Group>
        <Form.Group controlId="upload-image" className="mb-3">
          <Form.Label className="d-block">
            Upload patch
            <Form.Control size="sm" type="file" accept=".json" onChange={uploadPatch} />
            {
              !!modules.length && (
                <Form.Text className="text-info">
                  Uploaded patch will be appended to current patch
                </Form.Text>
              )
            }
          </Form.Label>
        </Form.Group>
        <div className="my-1 button-row">
          <Button onClick={() => downloadImage(image, modules)}>Download Bent Image</Button>
          <Button onClick={() => downloadObjectAsJSON(modules)}>Download Patch</Button>
          <Button variant="danger" onClick={() => setModules([])}>Delete Patch</Button>
        </div>
      </Card>

      <ModuleList addModule={addModule} />
    </div>
  )
}
