import React from 'react';
import store from './store'
import { Provider } from 'react-redux'
import LoginContainer from './components/LoginContainer'

import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <h1> BattleShip Commander </h1>    
          <p> Working ...  </p>
          <LoginContainer />
      </div>
    </Provider>

  );
}

export default App;
