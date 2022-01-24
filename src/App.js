import React from 'react';
import './App.css';
import {
  Tabs
} from 'antd';
import CrawlerInput from './pages/CrawlerInput';
import CrawlerResult from './pages/CrawlerResult';

const App = () => {
  const { TabPane } = Tabs;

  return (
    <div className="App">
      <Tabs defaultActiveKey="1">
        <TabPane tab="Input" key="1">
          < CrawlerInput />
        </TabPane>
        <TabPane tab="Result" key="2">
          < CrawlerResult />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default App;