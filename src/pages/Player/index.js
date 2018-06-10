import React, { Component } from 'react'
import {Tabs, Tab} from 'material-ui/Tabs'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

import PlayerCard from './PlayerCard'

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
import { fetchPlayerFeed, fetchDfsStats, fetchGameFeed, fetchSportsFeed, selectGameFeed, selectSportsFeed, selectDfsStats, selectPlayerFeed, selectIsLoading as feedLoading } from '../../ducks/sportsFeed'

const Wrapper = styled.div`
  margin: 0 0%;

  @media (max-width: 767px) {
    margin: 0;
  }
`

const PlayerName = styled(CardTitle)`
  padding-left: 0 !important;
`

const SearchBoxes = styled.div`
  display: flex;

  @media (max-width: 767px) {
    display: block;
  }
`

const PositionSearch = styled(SelectField)`
  margin-bottom: 24px;

  @media (max-width: 767px) {
    margin-left: 8px;
  }
`

const RotoWireCard = styled(Card)`
  margin-bottom: 50px;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 4px 24px, rgba(0, 0, 0, 0.12) 0px 4px 16px !important;
`

const RedditCard = styled(Card)`
  margin-bottom: 50px;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 4px 24px, rgba(0, 0, 0, 0.12) 0px 4px 16px !important;
`

const StatCard = styled(Card)`
  margin-bottom: 50px;
  padding-left: 16px;
  padding-right: 16px;
  padding-bottom: 16px;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 4px 24px, rgba(0, 0, 0, 0.12) 0px 4px 16px !important;
`

const TableWrapper = styled.div`
  margin-bottom: 80px;
`

const Text = styled(CardText)`
  line-height: 200%;
`

const TableText = styled(CardTitle)`
  font-weight: 500;
`

const PositionText = styled(CardTitle)`
  font-weight: 500;
  padding: 0px 0px 8px 0px !important;
`

const TextLink = styled.a`
  padding: 16px;
  font-size: 14px;
  line-height: 200%;
  display: block;

  &:hover{ 
    background-color: rgba(0, 0, 0, 0.08) !important;
  }
`

const HighlightsButton = styled.div`
  @media (max-width: 767px) {
    display: none;
  }
  margin-left: auto;
`

const MobileHeaderCol = styled(TableHeaderColumn)`
  @media (max-width: 767px) {
    display: none;
  }
`

const Flex = styled.div`
  display: flex;
  align-items: center;
`

const MobileTableCol = styled(TableRowColumn)`
  @media (max-width: 767px) {
    display: none;
  }
`

const VideoPlayer = styled.iframe`
  height: 45vh;
  width: 45vw;
  margin: 1%;
`

const Section = styled.div`
  margin-top: 24px;
`

const TabCol = styled(TableRowColumn)`
  min-width: 32px;
  width: 32px;
`

const TabHeadCol = styled(TableHeaderColumn)`
  min-width: 32px;
  width: 32px;
`

const Progress = styled.div`
  width: 100px;
  margin-top: 15%;
  margin-left: auto !important;
  margin-right: auto !important;
`

const CardSection = styled.div`
`

const DfsTable = styled.div`
  margin-bottom: 32px;
`

const DfsChart = styled.div`
  margin-top: 32px;
  height: 100%;
  width: 100%;
  min-height: 100%;
  min-width: 100%;
`

const Dfs = styled.div`
  @media (max-width: 767px) {
    display: none;
  }

  margin-top: 32px;
  height: 100%;
  width: 100%;
  min-height: 100%;
  min-width: 100%;
`

export class Player extends Component {
  state = {
    backgroundColor: 'transparent',
    open: false,
    value: 'a',
    year: '2017'
  }

  componentDidMount() {
    this.props.fetchPlayerDetails(this.props.match.params.playerId)
      .then((response) => {
        const names = response.playerDetails.players[0].name.split(' ')
        const teamName = response.playerDetails.players[0].teamAbbr
        const params = {
          firstName: names[0],
          lastName: names[1],
          year: 2017,
          teamName
        }
        this.props.fetchPlayerFeed(params)
        this.props.fetchDfsStats(params)
        this.props.fetchSportsFeed(params)
        this.props.fetchGameFeed(params)
        this.props.fetchNfl(response.playerDetails.players[0].name)
        this.props.fetchFf(response.playerDetails.players[0].name)
        this.props.fetchDynasty(response.playerDetails.players[0].name)
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.playerId !== this.props.match.params.playerId) {
      this.setState({ value: 'a', year: '2017' })
      this.props.fetchPlayerDetails(nextProps.match.params.playerId)
        .then((response) => {
          const names = response.playerDetails.players[0].name.split(' ')
          const teamName = response.playerDetails.players[0].teamAbbr
          const params = {
            firstName: names[0],
            lastName: names[1],
            year: 2017,
            teamName
          }
          this.props.fetchPlayerFeed(params)
          this.props.fetchDfsStats(params)
          this.props.fetchSportsFeed(params) 
          this.props.fetchGameFeed(params) 
          this.props.fetchNfl(response.playerDetails.players[0].name)
          this.props.fetchFf(response.playerDetails.players[0].name)
          this.props.fetchDynasty(response.playerDetails.players[0].name)
        })
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
    const { playerFeed, dfsStats, gameFeed, isLoading, feedLoading, feedStats, notes, playerDetails, nfl, ff, dynasty, statLoading } = this.props
    const actions = [
      <FlatButton
        label="Close"
        primary={true}
        onClick={this.handleClose}
      />
    ]

    if (dfsStats && dfsStats.dfsEntries[0].dfsRows) {
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
              <Tabs
                value={this.state.value}
                onChange={this.handleChange}
              >
                <Tab label="Roto" value="a">
                  <Section>
                    {notes.map(note => (
                      <RotoWireCard>
                        <CardHeader
                          title={this.getTitle(playerDetails)}
                          subtitle={`${playerDetails.position}, #${playerDetails.jerseyNumber}`}
                          avatar={playerDetails.videos[0].mediumPhotoUrl}  
                        />
                        <CardTitle title={note.headline} />
                        <Text><strong>{note.body}</strong></Text>
                        <Text>{note.analysis}</Text>
                      </RotoWireCard>
                    ))}
                  </Section>
                </Tab>
                <Tab label="Stats" value="b">
                  {gameFeed && gameFeed.gamelogs && feedStats &&
                    <Section>
                      {gameFeed.gamelogs.map((game, idx) => (
                        <StatCard>
                          <CardTitle title={`Week ${idx + 1}: ${game.game.awayTeam.Name} at ${game.game.homeTeam.Name}`} />
                          <CardSection>
                            <div>
                              <TableText>RUSHING</TableText>
                              <Table bodyStyle={{overflow:'visible'}}>
                                <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                                  <TableRow>
                                    <TabHeadCol>Att</TabHeadCol>
                                    <TabHeadCol>Yds</TabHeadCol>
                                    <TabHeadCol>YPC</TabHeadCol>
                                    <TabHeadCol>TD</TabHeadCol>
                                    <TabHeadCol>1st Downs</TabHeadCol>
                                    <TabHeadCol>1st Down %</TabHeadCol>
                                    <TabHeadCol>20 YD Plus</TabHeadCol>
                                    <TabHeadCol>40 YD Plus</TabHeadCol>
                                    <TabHeadCol>Long</TabHeadCol>
                                    <TabHeadCol>Fumbles Lost</TabHeadCol>
                                  </TableRow>
                                </TableHeader>
                                <TableBody displayRowCheckbox={false} showRowHover>
                                  <TableRow>
                                    <TabCol>{game.stats.RushAttempts["#text"]}</TabCol>
                                    <TabCol>{game.stats.RushYards["#text"]}</TabCol>
                                    <TabCol>{game.stats.RushAverage["#text"]}</TabCol>
                                    <TabCol>{game.stats.RushTD["#text"]}</TabCol>
                                    <TabCol>{game.stats.Rush1stDowns["#text"]}</TabCol>
                                    <TabCol>{game.stats.Rush1stDownsPct["#text"]}</TabCol>
                                    <TabCol>{game.stats.Rush20Plus["#text"]}</TabCol>
                                    <TabCol>{game.stats.Rush40Plus["#text"]}</TabCol>
                                    <TabCol>{game.stats.RushLng["#text"]}</TabCol>
                                    <TabCol>{game.stats.FumLost["#text"]}</TabCol>
                                  </TableRow>
                                </TableBody>
                              </Table>
                            </div>
                            <div>
                              <TableText>RECEIVING</TableText>
                              <Table bodyStyle={{overflow:'visible'}}>
                                <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                                  <TableRow>
                                    <TabHeadCol>Rec</TabHeadCol>
                                    <TabHeadCol>Yds</TabHeadCol>
                                    <TabHeadCol>YPC</TabHeadCol>
                                    <TabHeadCol>TD</TabHeadCol>
                                    <TabHeadCol>1st Downs</TabHeadCol>
                                    <TabHeadCol>1st Down %</TabHeadCol>
                                    <TabHeadCol>20 YD Plus</TabHeadCol>
                                    <TabHeadCol>40 YD Plus</TabHeadCol>
                                    <TabHeadCol>Long</TabHeadCol>
                                    <TabHeadCol>Targets</TabHeadCol>
                                  </TableRow>
                                </TableHeader>
                                <TableBody displayRowCheckbox={false} showRowHover>
                                  <TableRow>
                                    <TabCol>{game.stats.Receptions["#text"]}</TabCol>
                                    <TabCol>{game.stats.RecYards["#text"]}</TabCol>
                                    <TabCol>{game.stats.RecAverage["#text"]}</TabCol>
                                    <TabCol>{game.stats.RecTD["#text"]}</TabCol>
                                    <TabCol>{game.stats.Rec1stDowns["#text"]}</TabCol>
                                    <TabCol>{((game.stats.Rec1stDowns["#text"] / feedStats.playerstatsentry[0].stats.Targets["#text"]) * 100).toFixed(1)}</TabCol>
                                    <TabCol>{game.stats.Rec20Plus["#text"]}</TabCol>
                                    <TabCol>{game.stats.Rec40Plus["#text"]}</TabCol>
                                    <TabCol>{game.stats.RecLng["#text"]}</TabCol>
                                    <TabCol>{game.stats.Targets["#text"]}</TabCol>
                                  </TableRow>
                                </TableBody>
                              </Table>
                            </div>
                          </CardSection>
                        </StatCard>
                      ))}
                    </Section>
                  }
                </Tab>
                <Tab label="DFS" value="c">
                  {dfsStats && chartData &&
                    <DfsChart>
                      <Dfs>
                        <ResponsiveContainer width='100%' aspect={2}>
                          <LineChart data={chartData} margin={{top: 20, right: 20, bottom: 40, left: 20}}>
                            <Tooltip />
                            <Legend />
                            <XAxis dataKey="name" tickCount={16} />
                            <YAxis yAxisId="right" orientation='right' name='salary' label={{ value: 'Salary', angle: -90, position: 'right' }} domain={["dataMin", "dataMax"]} />
                            <YAxis yAxisId="left" orientation='left' name='fantasy points' label={{ value: 'Fantasy Points', angle: -90, position: 'insideLeft' }} />
                            <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
                            <Line yAxisId="right" type="monotone" dataKey="Salary" stroke="#00bcd4" strokeWidth={2} />
                            <Line yAxisId="left" type="monotone" dataKey="FantasyPoints" stroke="#fc4482" strokeWidth={2} />
                          </LineChart>
                        </ResponsiveContainer>
                      </Dfs>
                      <DfsTable>
                        <Table>
                          <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                            <TableRow>
                              <TabHeadCol>Game</TabHeadCol>
                              <TabHeadCol>Salary</TabHeadCol>
                              <TabHeadCol>Pts</TabHeadCol>
                            </TableRow>
                          </TableHeader>
                          <TableBody displayRowCheckbox={false} showRowHover>
                            {dfsStats.dfsEntries[0].dfsRows.filter((week, idx) => ( week.player )).map((week, idx) => (
                                <TableRow>
                                  <TabCol>{idx + 1}</TabCol>
                                  <TabCol>${week.salary}</TabCol>
                                  <TabCol>{week.fantasyPoints}</TabCol>
                                </TableRow>
                              )
                            )}
                          </TableBody>
                        </Table>
                      </DfsTable>
                    </DfsChart>
                  }
                </Tab>
                <Tab label="NFL" value="d">
                  <Section>
                    {nfl.map(post => (
                      <RedditCard>
                        <CardTitle title={post.data.title} />
                        {post.data.selfText && <Text>{post.data.selftext}</Text>}
                        <CardActions>
                          <FlatButton label="Article" href={post.data.url} style={{ textDecoration: 'none', color: 'inherit' }} target="_blank" />
                          <FlatButton label="Reddit Post" href={`https://reddit.com${post.data.permalink}`} style={{ textDecoration: 'none', color: 'inherit' }} target="_blank" />
                        </CardActions>
                      </RedditCard>
                    ))}
                  </Section>
                </Tab>
                <Tab label="FF" value="e">
                  <Section>
                    {ff.map(post => (
                      <RedditCard>
                        <CardTitle title={post.data.title} />
                        {post.data.selfText && <Text>{post.data.selftext}</Text>}
                        <CardActions>
                          <FlatButton label="Article" href={post.data.url} style={{ textDecoration: 'none', color: 'inherit' }} target="_blank" />
                          <FlatButton label="Reddit Post" href={`https://reddit.com${post.data.permalink}`} style={{ textDecoration: 'none', color: 'inherit' }} target="_blank" />
                        </CardActions>
                      </RedditCard>
                    ))}
                  </Section>
                </Tab>
                <Tab label="DFF" value="f">
                  <Section>
                    {dynasty.map(post => (
                      <RedditCard>
                        <CardTitle title={post.data.title} />
                        {post.data.selfText && <Text>{post.data.selftext}</Text>}
                        <CardActions>
                          <FlatButton label="Article" href={post.data.url} style={{ textDecoration: 'none', color: 'inherit' }} target="_blank" />
                          <FlatButton label="Reddit Post" href={`https://reddit.com${post.data.permalink}`} style={{ textDecoration: 'none', color: 'inherit' }} target="_blank" />
                        </CardActions>
                      </RedditCard>
                    ))}
                  </Section>
                </Tab>
              </Tabs>
            </Wrapper>
          </div>
        :
          <Progress><CircularProgress size={100} thickness={10} /></Progress>
        }
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
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
export default connect(mapStateToProps, { fetchPlayerFeed, fetchDfsStats, fetchGameFeed, fetchSportsFeed, fetchPlayerDetails, fetchNfl, fetchFf, fetchDynasty })(Player)
