import React from 'react';

import store from './store'
import { Provider } from 'react-redux'
import { Route } from 'react-router-dom'
import './App.css';

// Import Components
import Main from './components/Main';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <h1> BattleShip Commander </h1>

        {/* <Route path="/" exact component={Main} /> */}
        <Main />

      </div>
    </Provider>
  );
}

export default App;
