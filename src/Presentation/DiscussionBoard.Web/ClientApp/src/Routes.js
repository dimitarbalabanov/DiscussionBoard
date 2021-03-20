import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import NotFound from './components/NotFound/NotFound';
import Logout from './containers/Auth/Logout/Logout';
import Home from './containers/Home/Home';
import Forum from './containers/Forum/Forum';
import Post from './containers/Post/Post';
import CreatePost from './containers/CreatePost/CreatePost';
import UserProfile from './containers/UserProfile/UserProfile';
import CreateForum from './containers/CreateForum/CreateForum';
import Login2 from './containers/Auth/Login/Login2';
import Register from './containers/Auth/Register/Register';

const Routes = props => {
  const { isAuth } = props;
  
  return (
    <Switch>
      <Route 
        component={Home}
        exact 
        path="/" 
      />
      <Route 
        component={Register}
        exact 
        path="/signup" 
      />
      <Route 
        component={Login2}
        exact 
        path="/login" 
      />
      <Route 
        component={UserProfile}
        exact 
        path="/user" 
      />
      <Route 
        component={CreateForum}
        exact 
        path="/forum/create" 
      />
      <Route 
        component={Forum}
        exact 
        path="/forums/:forumId" 
      />
        <Route 
          component={CreatePost}
          exact 
          path="/posts/create" 
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
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;