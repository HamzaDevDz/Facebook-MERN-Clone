import React from 'react';
import Header from "./features/header/Header";
import {Feed} from "./features/feed/Feed";
import {Sidebar} from "./features/sidebar/Sidebar";
import {Redirect, Route, Switch, BrowserRouter as Router} from "react-router-dom";
import {Login} from "./features/login/Login";
import {SignUp} from "./features/login/SignUp/SignUp";

function App() {
  return (
    <Router>
        <div className={'app'}>
            <Switch>
                <Route exact path={'/login'} component={Login}/>
                <Route exact path={'/signUp'} component={SignUp} />
                <Route exact
                       path={'/home'}
                       render={()=>(
                           <React.Fragment>
                               <Header/>
                               <Feed />
                               <Sidebar />
                           </React.Fragment>
                       )}
                />
                <Redirect to="/login" />
            </Switch>
        </div>
        {/*<div className={'app'}>*/}
            {/*<Switch>*/}
            {/*    <Route exact*/}
            {/*           path={'/home'}*/}
            {/*           render={()=>(*/}
            {/*               <React.Fragment>*/}
            {/*                   <Feed />*/}
            {/*                   <Sidebar />*/}
            {/*               </React.Fragment>*/}
            {/*           )}*/}
            {/*    />*/}
            {/*    <Redirect to="/home" />*/}
            {/*</Switch>*/}
        {/*</div>*/}
    </Router>
  )
}

export default App;
