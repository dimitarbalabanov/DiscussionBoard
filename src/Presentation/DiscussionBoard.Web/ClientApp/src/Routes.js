import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

import RouteWithLayout from './components/RouteWithLayout';
import Main from './layouts/Main/Main'; 
import {Minimal as MinimalLayout } from './layouts';

import Login from './containers/Auth/Login';
import Register from './containers/Auth/Register';
import Logout from './containers/Auth/Logout';
import Home from './containers/Home/Home';
import Forum from './containers/Forum/Forum';

import NotFound from './components/NotFound/NotFound';

const Routes = () => {
  return (
    <Switch>
      <RouteWithLayout
        component={Home}
        exact
        layout={Main}
        path="/"
      />
      <RouteWithLayout
        component={Forum}
        layout={Main}
        path="/forums/:forumId"
      />
      <RouteWithLayout
        component={Register}
        exact
        layout={Main}
        path="/register"
      />
      <RouteWithLayout
        component={Login}
        exact
        layout={Main}
        path="/login"
      />
      <RouteWithLayout
        component={NotFound}
        exact
        layout={MinimalLayout}
        path="/not-found"
      />
      <Route path="/logout" component={Logout} />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
