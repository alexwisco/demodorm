import { useState } from 'react'
import './App.css'
import BabylonScene from './BabylonScene'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        
      </div>
      <div style={{ textAlign: 'center' }}>
            <h1>Dormi Demo</h1>
            <div style={{ width: '100%', height: 'calc(85vh - 90px)' }}>
              <BabylonScene/>
            </div>
        </div>
    </>
  )
}

export default App
