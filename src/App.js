import React from 'react';
import './App.css';
import Forager from './Components/Forager'

function App() {
  return (
    <>
    <div className='title-banner'></div>
      <div className="App">
        <div className='banner'>
          <h1>Forager</h1>
          <h3>find your food</h3>
        </div>
        <Forager />
      </div>
    </>
  );
}

export default App;
