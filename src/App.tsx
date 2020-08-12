import React, { useState } from 'react';
import './App.css';
import Ava from './components/AvaMain';

function App() {
  const [showContact, setShowContact] = useState(false);

  return (
    <div className="App">
      {showContact && <Ava setShow={setShowContact} />}
      <input
        type="button"
        className="btn show-contacts-btn"
        value="click me"
        onClick={() => !showContact && setShowContact(true)}
      />
    </div>
  );
}

export default App;
