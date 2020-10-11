import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

import NotFound from './components/NotFound/NotFound';
import Auth from './containers/TabAuth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import Home from './containers/Home/Home';
import Forum from './containers/Forum/Forum';
import Post from './containers/Post/Post';
import CreatePost from './containers/CreatePost/CreatePost';

const Routes = () => {
  return (
    <Switch>
      <Route 
        component={Home}
        exact 
        path="/" 
      />
      <Route 
        component={Forum}
        exact 
        path="/forums/:forumId" 
      />
      <Route 
        component={Post}
        exact 
        path="/posts/:postId" 
      />
      <Route
        component={Logout}
        exact
        path="/logout"
      />
      <Route
        component={NotFound}
        exact 
        path="/not-found" 
      />
      <Route 
        component={Auth}
        exact 
        path="/auth" 
      />
      <Route 
        component={CreatePost}
        exact 
        path="/create" 
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;