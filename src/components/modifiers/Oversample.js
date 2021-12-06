import {
  Form
} from 'react-bootstrap'

const radioOptions = [
  { display: 'No oversampling', value: 'none' },
  { display: '2x oversampling', value: '2x' },
  { display: '4x oversampling', value: '4x' },
]

export default function Oversample({ value, onChange, id }) {
  return (
    <>
      {
        radioOptions.map(opt => (
          <Form.Check key={opt.value}
            type="radio"
            id={`${id}-${opt.value}`}
            label={opt.display}
            name={`${id}-oversampling`}
            value={opt.value}
            checked={opt.value === value}
            onChange={() => onChange({ target: { value: opt.value }})} />
        ))
      }
    </>
  )
}
