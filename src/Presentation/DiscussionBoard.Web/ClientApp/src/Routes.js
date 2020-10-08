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
import CreatePost from './containers/CreatePost/CreatePost';
import AuthModal from './containers/TabAuth/AuthModal';

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
        component={Login}
        
        exact 
        path="/login" 
      />
      <Route 
        component={Register}
        
        exact 
        path="/register" 
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
      <Route 
        component={AuthModal}
        
        exact 
        path="/modal" 
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;