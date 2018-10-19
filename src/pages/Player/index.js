import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from 'recharts'

import PlayerCard from './PlayerCard'
import PlayerTabs from './PlayerTabs'

import CircularProgress from 'material-ui/CircularProgress'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import { fetchNfl, fetchFf, fetchDynasty, selectNfl, selectFf, selectDynasty } from '../../ducks/redditPlayer'
import { fetchPlayerDetails, selectIsLoading, selectNotes, selectPlayerDetails } from '../../ducks/playerDetails'
import {
  fetchPlayerFeed, fetchDfsStats, fetchGameFeed, fetchSportsFeed, selectGameFeed,
  selectSportsFeed, selectDfsStats, selectPlayerFeed, selectIsLoading as feedLoading
} from '../../ducks/sportsFeed'
import { fetchBing, selectBing } from '../../ducks/bing'

const Wrapper = styled.div`
  margin: 0 0%;

  @media (max-width: 767px) {
    margin: 0;
  }
`

const Progress = styled.div`
  width: 100px;
  margin-top: 15%;
  margin-left: auto !important;
  margin-right: auto !important;
`

export class Player extends Component {
  state = {
    backgroundColor: 'transparent',
    open: false,
    value: 'a',
    year: '2018'
  }

  getPlayerDetails = (playerId) => {
    this.props.fetchPlayerDetails(playerId)
      .then((response) => {
        const names = response.playerDetails.players[0].name.split(' ')
        const teamName = response.playerDetails.players[0].teamAbbr
        const params = {
          firstName: names[0],
          lastName: names[1],
          year: 2018,
          teamName
        }
        this.props.fetchBing(params)
        this.props.fetchPlayerFeed(params)
        this.props.fetchDfsStats(params)
        this.props.fetchSportsFeed(params)
        this.props.fetchGameFeed(params)
        this.props.fetchNfl(response.playerDetails.players[0].name)
        this.props.fetchFf(response.playerDetails.players[0].name)
        this.props.fetchDynasty(response.playerDetails.players[0].name)
    })
  }

  componentDidMount() {
    this.getPlayerDetails(this.props.match.params.playerId)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.playerId !== this.props.match.params.playerId) {
      this.setState({ value: 'a', year: '2018' })
      this.getPlayerDetails(nextProps.match.params.playerId)
    }
  }

  handleOpen = () => {
    this.setState({open: true});
  }

  handleClose = () => {
    this.setState({open: false});
  }

  getTitle = (playerDetails) => (
    playerDetails.teamAbbr
    ? `${playerDetails.name}, ${playerDetails.teamAbbr}`
    : `${playerDetails.name}, FA`
  )

  handleChange = (value) => {
    this.setState({
      value: value,
    })
  }

  handleYearChange = (ev, idx, value) => {
    this.setState({
      year: value
    })

    const names = this.props.playerDetails.name.split(' ')
    const teamName = this.props.playerDetails.teamAbbr
    const params = {
      firstName: names[0],
      lastName: names[1],
      year: value,
      teamName
    }
    this.props.fetchDfsStats(params)
    this.props.fetchSportsFeed(params)  
    this.props.fetchGameFeed(params) 
  }

  render() {
    const {
      bing, playerFeed, dfsStats, gameFeed, isLoading, feedLoading,
      feedStats, notes, playerDetails, nfl, ff, dynasty, statLoading
    } = this.props

    const actions = [
      <FlatButton
        label="Close"
        primary={true}
        onClick={this.handleClose}
      />
    ]

    if (dfsStats && dfsStats.dfsEntries && dfsStats.dfsEntries[0].dfsRows) {
      const data = dfsStats.dfsEntries[0].dfsRows.filter((week, idx) => ( week.player ))
      var chartData = []
      data.map((week, idx) => { 
        chartData.push({ name: (idx + 1), Salary: parseFloat(week.salary), FantasyPoints: parseFloat(week.fantasyPoints) })
      })
    }
    
    return (
      <div>
        {!isLoading && !feedLoading ?
          <div>
            <PlayerCard
              bing={bing}
              playerDetails={playerDetails}
              onClick={this.handleOpen}
              actions={actions}
              open={this.state.open}
              handleClose={this.handleClose}
              feedStats={feedStats}
              playerFeed={playerFeed}
              year={this.state.year}
              handleYearChange={this.handleYearChange}
              feedLoading={feedLoading}
            />
            <Wrapper>
              <PlayerTabs 
                value={this.state.value}
                handleChange={this.handleChange}
                notes={notes}
                getTitle={this.getTitle}
                playerDetails={playerDetails}
                gameFeed={gameFeed}
                feedStats={feedStats}
                chartData={chartData}
                dfsStats={dfsStats}
                nfl={nfl}
                ff={ff}
                dynasty={dynasty}
              />
            </Wrapper>
          </div>
        :
          <Progress><CircularProgress size={100} thickness={10} /></Progress>
        }
      </div>
    )
  }
}

const mapDispatchToProps = {
  fetchBing,
  fetchPlayerFeed,
  fetchDfsStats,
  fetchGameFeed,
  fetchSportsFeed,
  fetchPlayerDetails,
  fetchNfl,
  fetchFf,
  fetchDynasty
}

const mapStateToProps = (state, props) => ({
  bing: selectBing(state),
  playerFeed: selectPlayerFeed(state),
  feedLoading: feedLoading(state),
  gameFeed: selectGameFeed(state),
  isLoading: selectIsLoading(state),
  notes: selectNotes(state),
  playerDetails: selectPlayerDetails(state),
  feedStats: selectSportsFeed(state),
  nfl: selectNfl(state),
  ff: selectFf(state),
  dynasty: selectDynasty(state),
  dfsStats: selectDfsStats(state)
})
export default connect(mapStateToProps, mapDispatchToProps)(Player)
