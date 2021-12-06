import {
  Form
} from 'react-bootstrap'

const types = ["sawtooth","sine","square","triangle","sine1","sine2","sine3","sine4","sine5","sine6","sine7","sine8","sine9","sine10","sine11","sine12","sine13","sine14","sine15","sine16","sine17","sine18","sine19","sine20","sine21","sine22","sine23","sine24","sine25","sine26","sine27","sine28","sine29","sine30","sine31","sine32","square1","square2","square3","square4","square5","square6","square7","square8","square9","square10","square11","square12","square13","square14","square15","square16","square17","square18","square19","square20","square21","square22","square23","square24","square25","square26","square27","square28","square29","square30","square31","square32","triangle1","triangle2","triangle3","triangle4","triangle5","triangle6","triangle7","triangle8","triangle9","triangle10","triangle11","triangle12","triangle13","triangle14","triangle15","triangle16","triangle17","triangle18","triangle19","triangle20","triangle21","triangle22","triangle23","triangle24","triangle25","triangle26","triangle27","triangle28","triangle29","triangle30","triangle31","triangle32","sawtooth1","sawtooth2","sawtooth3","sawtooth4","sawtooth5","sawtooth6","sawtooth7","sawtooth8","sawtooth9","sawtooth10","sawtooth11","sawtooth12","sawtooth13","sawtooth14","sawtooth15","sawtooth16","sawtooth17","sawtooth18","sawtooth19","sawtooth20","sawtooth21","sawtooth22","sawtooth23","sawtooth24","sawtooth25","sawtooth26","sawtooth27","sawtooth28","sawtooth29","sawtooth30","sawtooth31","sawtooth32"]

export default function Waveforms({ value, onChange }) {
  return (
    <Form.Select value={value} onChange={onChange}>
      {
        types.map(t => (
          <option key={t}>{t}</option>
        ))
      }
    </Form.Select>
  )
}
