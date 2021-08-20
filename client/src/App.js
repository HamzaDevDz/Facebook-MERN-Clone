import React from 'react';
import Header from "./features/header/Header";
import {Feed} from "./features/feed/Feed";

function App() {
  return (
    <div className={'app'}>
      <Header />
      <Feed />
    </div>
  )
}

export default App;
