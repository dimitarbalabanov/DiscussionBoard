import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

import Login from './containers/Auth/Login';
import Register from './containers/Auth/Register';
import Logout from './containers/Auth/Logout';
import Home from './containers/Home/Home';
import Forum from './containers/Forum/Forum';
import Post from './containers/Post/Post';
import NotFound from './components/NotFound/NotFound';
import CustomRoute from './components/CustomRoute/CustomRoute';
import StuffLogin from './components/Stuff/StuffLogin';
import TextEditor from './components/TextEditor/TextEditor';

const Routes = props => {
  return (
    <Switch>
      <CustomRoute exact path="/" component={Home} {...props}/>
      <CustomRoute exact path="/stuff" component={StuffLogin}/>
      <CustomRoute exact path="/forums/:forumId" component={Forum} {...props} showSidebar/>
      <CustomRoute exact path="/editor" component={TextEditor} {...props}/>
      <CustomRoute exact path="/posts/:postId" component={Post} showSidebar {...props}/>
      <CustomRoute exact path="/register" component={Register} {...props}/>
      <CustomRoute exact path="/login" component={Login} {...props}/>
      <CustomRoute exact path="/not-found" component={NotFound} {...props}/>
      <CustomRoute exact path="/logout" component={Logout} {...props}/>
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
