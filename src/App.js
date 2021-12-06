import {
  useState,
} from 'react'

import './App.css'
import Drawer from './components/Drawer'
import Modules from './components/Modules'

function App() {
  const [modules, setModules] = useState([])

  return (
    <div className="app">
      <Drawer modules={modules} setModules={setModules} />
      <Modules modules={modules} setModules={setModules} />
    </div>
  );
}

export default App;
