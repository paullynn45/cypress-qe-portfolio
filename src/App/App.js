import React, { useState } from 'react';

import SignIn from '../SignIn';
import Feedback from '../Feedback';

import './App.css';

function App() {
  const [ loggedIn, setLoggedIn ] = useState(false)
  const [ failedLogIn, setfailedLogIn ] = useState(false)
  
  function validate({ username, password }) {
    if (username === 'l.jenkins' && password === 'hunter2') {
      setLoggedIn(true)
    } else {
      setfailedLogIn(true)
    }
  }

  return (
    <div className="app">
      {loggedIn 
        ? <Feedback />
        : <SignIn validate={validate} failedLogIn={failedLogIn} />
      }
    </div>
  );
}

export default App;
