import React from "react";
import { PropTypes } from 'prop-types';
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';

import "./index.css";

const BaseStats = ({ monsterInfo }) => {
  const { monsterStats, monsterName } = monsterInfo;
  return (
    <div className="BaseStats">
      <ResponsiveContainer height={300}>
        <RadarChart outerRadius={90} width={730} height={250} data={monsterStats}>
          <PolarGrid />
          <PolarAngleAxis dataKey="statLabel" />
          <PolarRadiusAxis angle={30} domain={[0, 255]} />
          <Radar name={monsterName} dataKey="statValue" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.75} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

BaseStats.propTypes = {
  monsterInfo: PropTypes.object,
  monsterName: PropTypes.string
}

BaseStats.defaultProps = {
  monsterInfo: {},
  monsterName: ""
}

export default BaseStats;
