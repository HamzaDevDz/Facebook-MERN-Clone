import React from 'react';
import {Redirect, Route, Switch, BrowserRouter as Router} from "react-router-dom";
import {Login} from "./features/login/Login";
import {SignUp} from "./features/login/SignUp/SignUp";
import {Home} from "./features/home/Home";
import {Header} from "./features/home/header/Header";
import {FriendsBox} from "./features/home/friendsBox/FriendsBox";
import {Messages} from "./features/home/messages/Messages";

function App() {
  return (
    <Router>
        <div className={'app'}>
            <Switch>
                <Route exact path={'/login'} component={Login}/>
                <Route exact path={'/signUp'} component={SignUp} />
                {/*<Route exact path={'/home'} component={Home} />*/}
                <Route exact
                       path={'/home'}
                       render={()=>(
                           <React.Fragment>
                               <Header />
                               <FriendsBox />
                               <Home />
                               <Messages />
                           </React.Fragment>
                       )}
                />
                <Redirect from={'/*'} to="/login" status={200} />
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
