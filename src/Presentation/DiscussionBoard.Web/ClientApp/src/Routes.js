import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import  RouteWithLayout  from './components/RouteWithLayout';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

import Login from './containers/Auth/Login';
import Register from './containers/Auth/Register';
import Home from './containers/Home/Home';

import NotFound from './components/NotFound/NotFound';

const Routes = () => {
  return (
    <Switch>
      <RouteWithLayout
        component={Home}
        exact
        layout={MainLayout}
        path="/"
      />
      <RouteWithLayout
        component={Register}
        exact
        layout={MinimalLayout}
        path="/register"
      />
      <RouteWithLayout
        component={Login}
        exact
        layout={MinimalLayout}
        path="/login"
      />
      <RouteWithLayout
        component={NotFound}
        exact
        layout={MinimalLayout}
        path="/not-found"
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
