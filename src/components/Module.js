import {
  Button,
  Card,
  Form,
} from 'react-bootstrap'
import Channels from './modifiers/Channels'
import {
  NormalRange
} from './modifiers/Ranges'
import {
  MIX
} from '../constants'

export default function Module({
  handleDelete,
  handleMove,
  baseModule,
  moduleData,
  onChange,
  unique,
  first,
  last,
}) {
  const { name, controls } = baseModule
  const { [MIX]: mix } = moduleData

  return (
    <Card className="m-3 p-3">
      <Card.Title>{name}</Card.Title>

      <>
        {
          controls.map(({
            key,
            display,
            Component,
            props,
          }) => (
            <div key={key} className="mb-2">
              <Form.Label htmlFor={`${unique}-${key}`}
                className="mb-0">
                {display}
              </Form.Label>
              <Component value={moduleData[key]}
                onChange={e => onChange({ ...moduleData, [key]: e.target.value })}
                id={`${unique}-${key}`}
                {...props} />
            </div>
          ))
        }
      </>

      <NormalRange value={mix}
        onChange={m => onChange({ ...moduleData, [MIX]: m })}
        label="Mix" />

      <Channels moduleData={moduleData}
        onChange={onChange}
        unique={unique} />

      <div className="mt-2 button-row">
        <Button size="sm" onClick={() => handleMove(-1)} variant="info" disabled={first}>
          Move Up
        </Button>
        <Button size="sm" onClick={() => handleMove(1)} variant="info" disabled={last}>
          Move Down
        </Button>
        <Button size="sm" onClick={handleDelete} variant="danger">
          Delete
        </Button>
      </div>
    </Card>
  )
}
