import {
  Form
} from 'react-bootstrap'

export function GenericRange({
  label,
  onChange,
  ...props
}) {
  return (
    <>
      <Form.Label>
        {label}
        <Form.Range onChange={e => onChange(e.target.value)} {...props} />
      </Form.Label>
    </>
  )
}

export function NormalRange(props) {
  return (
    <GenericRange {...props}
      min={0}
      max={1}
      step={0.0001} />
  )
}

export function DecibelRange(props) {
  return (
    <GenericRange {...props}
      min={-100}
      max={0}
      step={1} />
  )
}

export function FrequencyRange(props) {
  return (
    <GenericRange {...props}
      min={20}
      max={20000}
      step={1} />
  )
}
