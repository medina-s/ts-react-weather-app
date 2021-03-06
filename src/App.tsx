import React from 'react';
import './App.css';
import Weather from './components/Weather';

const App: React.FunctionComponent = () => {
  return (
    <div className="App">
      <div className="verticalCenter">
        <Weather />
      </div>
    </div>
  );
}

export default App;
