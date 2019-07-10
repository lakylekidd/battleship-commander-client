import React from 'react';

import store from './store'
import { Provider } from 'react-redux'
import Main from './components/Main'
import { Route } from 'react-router-dom'
import './App.css';

// Import Components
import Main from './components/Main';
import BoardComponent from './components/Board/BoardComponent';


const board = {
  tiles: [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25
  ]
}


function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <h1> BattleShip Commander </h1>    
          <p> Working ...  </p>
          <Route path="/" exact component={Main} />
      </div>
    </Provider>
  );
}

export default App;
