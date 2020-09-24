import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import Layout from '../../Layout/Layout';

const CustomRoute = props => {
  const { showSidebar, isAuth, username,  component: Component, ...rest } = props;

  return (
    <Route
      {...rest}
      render={matchProps => (
        <Layout showSidebar={showSidebar} isAuth={isAuth} username={username}>
          <Component { ...matchProps} />
        </Layout>
      )}
    />
  );
};

CustomRoute.propTypes = {
  component: PropTypes.any.isRequired,
  layout: PropTypes.any.isRequired,
  path: PropTypes.string
};

export default CustomRoute;