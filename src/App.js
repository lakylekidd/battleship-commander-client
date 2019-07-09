import React from 'react';
import store from './store'
import { Provider } from 'react-redux'
import Main from './components/Main'

import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <h1> BattleShip Commander </h1>    
          <p> Working ...  </p>

          <Main />
      </div>
    </Provider>

  );
}

export default App;
