// src/routes.js
import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/app';
import List from './components/list';
import MonsterPage from './components/monster-page';

const routes = (
  <Route path="/" component={App} >
    <IndexRoute component={List} />
    <Route path="/pokemon/:id" component={MonsterPage} />
  </Route>
);

export default routes;