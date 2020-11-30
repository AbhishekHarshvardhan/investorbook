import React from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import Admin from './layouts/Admin';

function App() {
  return (
    <Switch>
      {/* add routes with layouts */}
      <Route path='/admin' component={Admin} />
      {/* add redirect for first page */}
      <Redirect from='*' to='/admin' />
    </Switch>
  );
}

export default App;
