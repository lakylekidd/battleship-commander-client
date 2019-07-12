import React from 'react';
import store from './store';
import { Provider } from 'react-redux';
import './App.css';

// Import Components
import Main from './components/Main';
import NotificationContainer from './components/notification/NotificationContainer';
import GameAudioComponent from './components/GameAudio/GameAudioComponent';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Main />
        <NotificationContainer />
        
      </div>
    </Provider>
  );
}

export default App;
