import {
  useState,
} from 'react'
import {
  Button,
  Card,
  Form
} from 'react-bootstrap'
import moduleMap from '../modules/moduleMap'

export default function ModuleList({
  addModule
}) {
  const [moduleSearch, setModuleSearch] = useState('')

  const filteredModules = Object.values(moduleMap)
    .filter(m => m.name.toLowerCase().includes(moduleSearch.toLowerCase()))

  return (
    <Card className="m-3 p-3">
      <Card.Title>Add Module</Card.Title>
      <Form.Control size="sm" value={moduleSearch}
        placeholder="Type to filter modules"
        onChange={e => setModuleSearch(e.target.value)}
        className="mb-2" />
      <div className="my-1 button-row">
        {
          filteredModules.map(m => (
            <Button variant="primary"
              key={m.key}
              onClick={() => addModule(m)}>
              {m.name}
            </Button>
          ))
        }
      </div>
    </Card>
  )
}
