// src/routes.js
import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/app';
import List from './components/list';
import MonsterPage from './components/monster-page';
import FourOhFour from './components/four-oh-four';

const routes = (
  <Route path="/" component={App} >
    <IndexRoute component={List} />
    <Route path="/:id" component={MonsterPage} />
    <Route path="*" component={FourOhFour} />
  </Route>
);

export default routes;