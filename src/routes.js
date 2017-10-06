// src/routes.js
import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';

import App from './containers/app';
import List from './components/list';
import MonsterPage from './components/monster-page';

const Routes = (props) => {
  console.log(process.env.PUBLIC_URL);
  return (
  <Router {...props}>
    <Route path="/" component={App} >
      <IndexRoute component={List} />
      <Route path="/pokemon/:id" component={MonsterPage} />
    </Route>
  </Router>
  );
}

export default Routes;
