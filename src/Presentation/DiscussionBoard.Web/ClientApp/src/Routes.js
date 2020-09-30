import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

import NotFound from './components/NotFound/NotFound';
import Auth from './containers/TabAuth/Auth';
import Login from './containers/Auth/Login/Login';
import Register from './containers/Auth/Register/Register';
import Logout from './containers/Auth/Logout/Logout';
import Home from './containers/Home/Home';
import Forum from './containers/Forum/Forum';
import Post from './containers/Post/Post';
import Sample from './containers/Home/Sample';
import AuthModal from './containers/TabAuth/AuthModal';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route exact path="/forums/:forumId" component={Forum}/>
      <Route exact path="/posts/:postId" component={Post}/>
      <Route exact path="/login" component={Login}/>
      <Route exact path="/register" component={Register}/>
      <Route exact path="/logout" component={Logout}/>
      <Route exact path="/not-found" component={NotFound}/>
      <Route exact path="/auth" component={Auth}/>

      <Route exact path="/sample" component={Sample}/>
      <Route exact path="/modal" component={AuthModal}/>
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
