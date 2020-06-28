import React, { useState } from 'react';
import './App.css';
import Ava from './components/Ava'

function App() {
  const [showContact, setShowContact] = useState(false);
  
  return (
    <div className="App">
      {
        showContact 
          ? <Ava setShow={setShowContact} />
          : <input type='button' className="btn show-contacts-btn" value='contact me' onClick={() => setShowContact(true)} />
      }
    </div>
  );
}

export default App;
