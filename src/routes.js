// src/routes.js
import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';

import App from './containers/app';
import List from './components/list';
import Test from './components/test.js';

const Routes = (props) => (
  <Router {...props}>
    <Route path="/" component={App} >
      <IndexRoute component={List} />
      <Route path="pokemon/:id" component={Test} />
    </Route>
  </Router>
);

export default Routes;
