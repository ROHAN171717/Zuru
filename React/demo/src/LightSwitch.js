import React, { useContext } from 'react'
import { DarkmodeContext } from './DarkmodeContext'

const LightSwitch = () => {
    const { toggleDarkMode } = useContext(DarkmodeContext);
    const handleClick = () => {
        toggleDarkMode();
    }
  return (
      <div>
          <button onClick={handleClick} style={{ border:"2px solid red"}}>Click</button>
    </div>
  )
}

export default LightSwitch