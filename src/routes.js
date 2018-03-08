// src/routes.js
import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/app';
import List from './components/list';
import MonsterPage from './components/monster-page';
import TypePage from './components/type-page';
import MovePage from './components/move-page';
import MoveTypeList from './components/move-page/type-list';
import MoveList from './components/move-page/move-list';
import FourOhFour from './components/four-oh-four';

const routes = (
  <Route path="/" component={App} >
    <IndexRoute component={List} />
    <Route path="/types" component={TypePage} />
    <Route path="/movedex" component={MovePage} >
      <IndexRoute component={MoveTypeList} />
      <Route path=":type" component={MoveList} />
    </Route>
    <Route path="/:id" component={MonsterPage} />
    <Route path="*" component={FourOhFour} />
  </Route>
);

const getPokemonPath = (id) => {
  const paddedId = ("0000" + id).substr(-3, 3)
  return {
    pathname: `/${paddedId}`
  }
};

export default routes;

export {
  getPokemonPath
};