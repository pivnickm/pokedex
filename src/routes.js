// src/routes.js
import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/app';
import List from './components/list';
import MonsterPage from './components/monster-page';
import FourOhFour from './components/four-oh-four';
import BaseStats from "./components/monster-page/base-stats";
import MoveList from "./components/monster-page/move-list";
import VitalInfo from "./components/monster-page/vital-info";
import EvolutionInfo from "./components/monster-page/evolution-info";
import DefensiveInfo from "./components/monster-page/defensive-info";

const routes = (
  <Route path="/" component={App} >
    <IndexRoute component={List} />
    <Route path="/:id" component={MonsterPage}>
      <IndexRoute component={VitalInfo} />
      <Route path="basic-info" component={VitalInfo} />
      <Route path="stats" component={BaseStats} />
      <Route path="moves" component={MoveList} />
      <Route path="defense" component={DefensiveInfo} />
      <Route path="evolutions" component={EvolutionInfo} />
    </Route>
    <Route path="*" component={FourOhFour} />
  </Route>
);

export default routes;