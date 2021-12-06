import {
  clamp
} from 'lodash'

import Module from './Module'
import moduleMap from '../modules/moduleMap'

export default function Modules({
  modules,
  setModules
}) {
  function onChangeModule(index, nextData) {
    const next = [...modules]
    next[index].data = nextData
    setModules(next)
  }

  function deleteModule(index) {
    const next = [
      ...modules.slice(0, index),
      ...modules.slice(index + 1)
    ]
    setModules(next)
  }

  function moveModule(index, stride) {
    let next = [...modules]
    const module = next.splice(index, 1)[0]
    const nextIndex = clamp(index + stride, 0, modules.length - 1)
    next = [
      ...next.slice(0, nextIndex),
      module,
      ...next.slice(nextIndex)
    ]
    setModules(next)
  }

  return (
    <div>
      {
        modules.map(({ unique, type, data }, i) => {
          return (
            <Module baseModule={moduleMap[type]}
              onChange={next => onChangeModule(i, next)}
              moduleData={data}
              handleDelete={() => deleteModule(i)}
              handleMove={stride => moveModule(i, stride)}
              unique={unique}
              key={unique}
              first={i === 0}
              last={i === modules.length - 1} />
          )
        })
      }
    </div>
  )
}
