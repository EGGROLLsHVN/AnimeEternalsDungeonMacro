import { useEffect, useState } from 'react'
import './App.css'
import { Toggles, SidePanel, Credits } from './Elements/elements'


function App() {
  const [currentView, setCurrentView] = useState('selection');

  return (
    <div>
      <div className = "pageHeader">
        <button className = {`selectionButton ${currentView === 'selection' ? 'buttonClicked' : ''}`}
                onClick={() => {setCurrentView('selection')}}> Select </button> 
        <button className = {`creditsButton ${currentView === 'credits' ? 'buttonClicked' : ''}`}
                onClick={() => setCurrentView('credits')}> Credits </button> 
      </div>

      {currentView === 'selection' && (
        <main className='selectionMenu'>
          <Toggles></Toggles> 
          <SidePanel></SidePanel>
        </main>
      )}

      {currentView === 'credits' && (
        <main className='credits'>
          <Credits></Credits>
        </main>
      )}
      
    </div>
  )
}

export default App

