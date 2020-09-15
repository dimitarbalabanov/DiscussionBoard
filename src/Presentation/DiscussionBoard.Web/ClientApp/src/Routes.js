import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

import Login from './containers/Auth/Login';
import Register from './containers/Auth/Register';
import Logout from './containers/Auth/Logout';
import Home from './containers/Home/Home';
import Forum from './containers/Forum/Forum';
import Post from './containers/Post/Post';
import NotFound from './components/NotFound/NotFound';
import TextEditor from './components/TextEditor/TextEditor';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route exact path="/forums/:forumId" component={Forum}/>
      <Route exact path="/editor" component={TextEditor}/>
      <Route exact path="/posts/:postId" component={Post}/>
      <Route exact path="/register" component={Register}/>
      <Route exact path="/login" component={Login}/>
      <Route exact path="/not-found" component={NotFound}/>
      <Route exact path="/logout" component={Logout} />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
