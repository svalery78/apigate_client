import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router';
//auth test
const AuthRoute = props => {
  const { user } = props;
  if (!user || !user.login || user.role !== 'Admin') return <Redirect to='/login' />;

  return <Route {...props} />;
};

const mapStateToProps = (state) => ({
  user: state.auth.user
})

export default connect(mapStateToProps)(AuthRoute);