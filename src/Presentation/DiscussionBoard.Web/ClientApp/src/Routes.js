import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

import NotFound from './components/NotFound/NotFound';

import Login from './OldContainers/Auth/Login';
import Register from './OldContainers/Auth/Register';
import Logout from './OldContainers/Auth/Logout';

import Home from './OldContainers/Home/Home';
import Forum from './OldContainers/Forum/Forum';
import Post from './OldContainers/Post/Post';


const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route exact path="/forums/:forumId" component={Forum}/>
      <Route exact path="/posts/:postId" component={Post}/>
      <Route exact path="/register" component={Register}/>
      <Route exact path="/login" component={Login}/>
      <Route exact path="/not-found" component={NotFound}/>
      <Route exact path="/logout" component={Logout}/>
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
