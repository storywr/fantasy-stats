import React from 'react'
import { connect } from 'react-redux'

import {Tabs, Tab} from 'material-ui/Tabs'

import Roto from './Roto'
import Stats from './Stats'
import Dfs from './Dfs'
import Nfl from './Nfl'
import Ff from './Ff'
import Dff from './Dff'

export const PlayerTabs = ({ value, handleChange, notes, getTitle, playerDetails, gameFeed, feedStats, chartData, dfsStats, nfl, ff, dynasty }) => (
  <Tabs value={value} onChange={handleChange}>
    <Tab label='Roto' value='a'>
      <Roto notes={notes} getTitle={getTitle} playerDetails={playerDetails} />
    </Tab>
    <Tab label='Stats' value='b'>
      <Stats gameFeed={gameFeed} feedStats={feedStats} />
    </Tab>
    <Tab label='DFS' value='c'>
      <Dfs chartData={chartData} dfsStats={dfsStats} />
    </Tab>
    <Tab label='NFL' value='d'>
      <Nfl nfl={nfl} />
    </Tab>
    <Tab label='FF' value='e'>
      <Ff ff={ff} />
    </Tab>
    <Tab label='DFF' value='f'>
      <Dff dynasty={dynasty} />
    </Tab>
  </Tabs>
)

export default PlayerTabs
