import React, { Component } from 'react'
import {Tabs, Tab} from 'material-ui/Tabs'
import YouTube from 'react-youtube'
import { connect } from 'react-redux'
import styled from 'styled-components'

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
import { fetchGameFeed, fetchSportsFeed, selectGameFeed, selectSportsFeed, selectIsLoading as feedLoading } from '../../ducks/sportsFeed'

const Wrapper = styled.div`
  margin: 0 20%;

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

const TableWrapper = styled.div`
  margin-bottom: 80px;
`

const Text = styled(CardText)`
  line-height: 200%;
`

const TableText = styled(CardTitle)`
  font-weight: 500;
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

const PlayerCard = styled(Card)`
  margin: 32px 0px 40px;
  padding: 8px 24px 16px;
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
  padding: 8px;
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
        const params = {
          firstName: names[0],
          lastName: names[1],
          year: 2017
        }
        this.props.fetchSportsFeed(params)
        this.props.fetchGameFeed(params)
        this.props.fetchNfl(response.playerDetails.players[0].name)
        this.props.fetchFf(response.playerDetails.players[0].name)
        this.props.fetchDynasty(response.playerDetails.players[0].name)
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.playerId !== this.props.match.params.playerId) {
      this.setState({ year: '2017' })
      this.props.fetchPlayerDetails(nextProps.match.params.playerId)
        .then((response) => {
          const names = response.playerDetails.players[0].name.split(' ')
          const params = {
            firstName: names[0],
            lastName: names[1],
            year: 2017
          }
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
    const params = {
      firstName: names[0],
      lastName: names[1],
      year: value
    }
    this.props.fetchSportsFeed(params)  
    this.props.fetchGameFeed(params) 
  }

  render() {
    const { gameFeed, isLoading, feedLoading, feedStats, notes, playerDetails, nfl, ff, dynasty, statLoading } = this.props
    const actions = [
      <FlatButton
        label="Close"
        primary={true}
        onClick={this.handleClose}
      />
    ]
    console.log(gameFeed)
    return (
      <div>
        {!isLoading ?
          <div>
            <PlayerCard>
              <Flex>
                <PlayerName title={playerDetails.name} />
                <HighlightsButton>
                  <RaisedButton label="Watch Highlights" onClick={this.handleOpen} />
                  <Dialog
                    title="Watch Highlights"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                  >
                    <VideoPlayer id="player" type="text/html"
                      src={`https://www.youtube.com/embed?listType=search&list=${playerDetails.name}+highlights`}
                      frameborder="0">
                    </VideoPlayer>
                  </Dialog>
                </HighlightsButton>
              </Flex>
              <SearchBoxes>
                <PositionSearch
                  floatingLabelText="Year"
                  value={this.state.year}
                  onChange={this.handleYearChange}
                >
                  <MenuItem value={'2014'} primaryText="2014" />
                  <MenuItem value={'2015'} primaryText="2015" />
                  <MenuItem value={'2016'} primaryText="2016" />
                  <MenuItem value={'2017'} primaryText="2017" />
                </PositionSearch>
              </SearchBoxes>
              {feedStats && feedStats.playerstatsentry && feedStats.playerstatsentry[0].player.Position === 'RB' &&
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
                    {!feedLoading && feedStats.playerstatsentry &&
                      <TableBody displayRowCheckbox={false} showRowHover>
                        <TableRow>
                          <TabCol>{feedStats.playerstatsentry[0].stats.RushAttempts["#text"]}</TabCol>
                          <TabCol>{feedStats.playerstatsentry[0].stats.RushYards["#text"]}</TabCol>
                          <TabCol>{feedStats.playerstatsentry[0].stats.RushAverage["#text"]}</TabCol>
                          <TabCol>{feedStats.playerstatsentry[0].stats.RushTD["#text"]}</TabCol>
                          <TabCol>{feedStats.playerstatsentry[0].stats.Rush1stDowns["#text"]}</TabCol>
                          <TabCol>{feedStats.playerstatsentry[0].stats.Rush1stDownsPct["#text"]}</TabCol>
                          <TabCol>{feedStats.playerstatsentry[0].stats.Rush20Plus["#text"]}</TabCol>
                          <TabCol>{feedStats.playerstatsentry[0].stats.Rush40Plus["#text"]}</TabCol>
                          <TabCol>{feedStats.playerstatsentry[0].stats.RushLng["#text"]}</TabCol>
                          <TabCol>{feedStats.playerstatsentry[0].stats.FumLost["#text"]}</TabCol>
                        </TableRow>
                      </TableBody>
                    }
                  </Table>
                </div>
              }
              {feedStats && feedStats.playerstatsentry &&
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
                    {!feedLoading && feedStats.playerstatsentry &&
                      <TableBody displayRowCheckbox={false} showRowHover>
                        <TableRow>
                          <TabCol>{feedStats.playerstatsentry[0].stats.Receptions["#text"]}</TabCol>
                          <TabCol>{feedStats.playerstatsentry[0].stats.RecYards["#text"]}</TabCol>
                          <TabCol>{feedStats.playerstatsentry[0].stats.RecAverage["#text"]}</TabCol>
                          <TabCol>{feedStats.playerstatsentry[0].stats.RecTD["#text"]}</TabCol>
                          <TabCol>{feedStats.playerstatsentry[0].stats.Rec1stDowns["#text"]}</TabCol>
                          <TabCol>{((feedStats.playerstatsentry[0].stats.Rec1stDowns["#text"] / feedStats.playerstatsentry[0].stats.Targets["#text"]) * 100).toFixed(1)}</TabCol>
                          <TabCol>{feedStats.playerstatsentry[0].stats.Rec20Plus["#text"]}</TabCol>
                          <TabCol>{feedStats.playerstatsentry[0].stats.Rec40Plus["#text"]}</TabCol>
                          <TabCol>{feedStats.playerstatsentry[0].stats.RecLng["#text"]}</TabCol>
                          <TabCol>{feedStats.playerstatsentry[0].stats.Targets["#text"]}</TabCol>
                        </TableRow>
                      </TableBody>
                    }
                  </Table>
                </div>
              }
            </PlayerCard>
            <Wrapper>
              <Tabs
                value={this.state.value}
                onChange={this.handleChange}
              >
                <Tab label="RotoWire" value="a">
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
                <Tab label="Game Stats" value="b">
                  {gameFeed &&
                    <Section>
                      {gameFeed.gamelogs.map((game, idx) => (
                        <RedditCard>
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
                        </RedditCard>
                      ))}
                    </Section>
                  }
                </Tab>
                <Tab label="NFL" value="c">
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
                <Tab label="Fantasy" value="d">
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
                <Tab label="Dynasty" value="e">
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
  feedLoading: feedLoading(state),
  gameFeed: selectGameFeed(state),
  isLoading: selectIsLoading(state),
  notes: selectNotes(state),
  playerDetails: selectPlayerDetails(state),
  feedStats: selectSportsFeed(state),
  nfl: selectNfl(state),
  ff: selectFf(state),
  dynasty: selectDynasty(state)
})
export default connect(mapStateToProps, { fetchGameFeed, fetchSportsFeed, fetchPlayerDetails, fetchNfl, fetchFf, fetchDynasty })(Player)
