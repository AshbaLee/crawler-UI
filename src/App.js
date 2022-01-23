import React from 'react';
import './App.css';
import CrawlerInput from './pages/CrawlerInput';
import CrawlerResult from './pages/CrawlerResult';

const App = () => {
  return (
    <div className="App">
      <CrawlerInput/>
      <CrawlerResult/>
    </div>
  );
};

export default App;