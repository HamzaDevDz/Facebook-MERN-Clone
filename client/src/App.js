import React from 'react';
import Header from "./features/header/Header";
import {Feed} from "./features/feed/Feed";
import {Sidebar} from "./features/sidebar/Sidebar";
import {Redirect, Route, Switch, BrowserRouter as Router} from "react-router-dom";

function App() {
  return (
    <Router>
        {<Header/>}
        <div className={'app'}>
            <Switch>
                <Route exact
                       path={'/home'}
                       render={()=>(
                           <React.Fragment>
                               <Feed />
                               <Sidebar />
                           </React.Fragment>
                       )}
                />
                <Redirect to="/home" />
            </Switch>
        </div>
    </Router>
  )
}

export default App;
