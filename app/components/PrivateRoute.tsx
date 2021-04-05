import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';

export function PrivateRoute({ path, component, exact }: any) {
  const { currentUser } = useAuth();
  return currentUser ? (
    <Route path={path} exact={exact} component={component} />
  ) : (
    <Redirect to='/signin' />
  );
}
