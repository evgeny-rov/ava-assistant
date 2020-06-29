import React, { useState } from "react";
import "./App.css";
import Ava from "./components/Ava/AvaMain";

function App() {
  const [showContact, setShowContact] = useState(false);

  return (
    <div className="App">
      {showContact && <Ava setShow={setShowContact} />}
      <input
        type="button"
        className="btn show-contacts-btn"
        value="contact me"
        onClick={() => !showContact && setShowContact(true)}
      />
    </div>
  );
}

export default App;
