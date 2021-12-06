import { Form } from 'react-bootstrap'
import {
  channelOrder,
  SPLIT,
} from '../../constants'

export default function Channels({
  moduleData,
  onChange,
  unique
}) {
  function handleChange(key) {
    const next = {
      ...moduleData,
      [key]: !moduleData[key]
    }
    onChange(next)
  }

  return (
    <div className="my-2">
      <div className="mt-2 d-flex">
        <Form.Check onChange={() => handleChange(SPLIT)}
          checked={moduleData[SPLIT]}
          id={`${unique}-split`}
          type="checkbox"
          label="Split Channels"
          className="me-3" />

        {
          moduleData[SPLIT] && channelOrder.map(channel => (
            <Form.Check onChange={() => handleChange(channel.key)}
              checked={moduleData[channel.key]}
              type="checkbox"
              label={channel.display}
              id={`${unique}-${channel.display}`}
              key={channel.key}
              disabled={!moduleData[SPLIT]}
              className="me-3" />
          ))
        }
      </div>
    </div>
  )
}
