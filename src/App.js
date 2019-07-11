import React from 'react';
import store from './store';
import { Provider } from 'react-redux';
import './App.css';

// Import Components
import Main from './components/Main';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Main />
      </div>
    </Provider>
  );
}

export default App;
