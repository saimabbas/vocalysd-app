import React, { createContext } from 'react';
import './App.css';
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./router";

import Firebase, { FirebaseContext } from './firebase';
const TogData = createContext(null);
const App = () => {
  return (
    <FirebaseContext.Provider value={new Firebase()}>
      <TogData.Provider value={"saim"}>
      <Router>
        <Routes />
      </Router>
      </TogData.Provider>
    </FirebaseContext.Provider>
  )
}

export default App;
export {TogData}
