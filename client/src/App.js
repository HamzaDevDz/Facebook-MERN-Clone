import React from 'react';
import Header from "./features/header/Header";
import {Feed} from "./features/feed/Feed";
import {Sidebar} from "./features/sidebar/Sidebar";

function App() {
  return (
    <div className={'app'}>
      <Header />
      <Feed />
      <Sidebar />
    </div>
  )
}

export default App;
