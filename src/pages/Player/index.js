import React, { Component } from 'react'
import {Tabs, Tab} from 'material-ui/Tabs'
import YouTube from 'react-youtube'
import { connect } from 'react-redux'
import styled from 'styled-components'

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
import { selectIsLoading as selectIsLoadingStat, fetchSureStats, selectSureStats } from '../../ducks/sureStats'

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
  margin-bottom: 80px;
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

  margin-bottom: 32px;
`

const VideoPlayer = styled.iframe`
  height: 50vh;
  width: 50vw;
  margin: 1%;
`

const Section = styled.div`
  margin-top: 24px;
`

const StatTable = styled.div`
  margin-bottom: 48px;
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
        this.props.fetchSureStats(params)
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
          this.props.fetchSureStats(params)  
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
    this.props.fetchSureStats(params)  
  }

  render() {
    const { isLoading, notes, playerDetails, nfl, ff, dynasty, stats, statLoading } = this.props
    const actions = [
      <FlatButton
        label="Close"
        primary={true}
        onClick={this.handleClose}
      />
    ]

    return (
      <div>
        {!isLoading && stats.length > 0 &&
          <div>
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
            <SearchBoxes>
              <PositionSearch
                floatingLabelText="Year"
                value={this.state.year}
                onChange={this.handleYearChange}
              >
                <MenuItem value={'2010'} primaryText="2010" />
                <MenuItem value={'2011'} primaryText="2011" />
                <MenuItem value={'2012'} primaryText="2012" />
                <MenuItem value={'2013'} primaryText="2013" />
                <MenuItem value={'2014'} primaryText="2014" />
                <MenuItem value={'2015'} primaryText="2015" />
                <MenuItem value={'2016'} primaryText="2016" />
                <MenuItem value={'2017'} primaryText="2017" />
              </PositionSearch>
            </SearchBoxes>
            <StatTable>
              <Table>
                <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                  <TableRow>
                  <TableHeaderColumn>Att</TableHeaderColumn>
                    <TableHeaderColumn>Rush Yds</TableHeaderColumn>
                    <TableHeaderColumn>Rush TDs</TableHeaderColumn>
                    <TableHeaderColumn>YPC</TableHeaderColumn>
                    <TableHeaderColumn>Targets</TableHeaderColumn>
                    <TableHeaderColumn>Rec</TableHeaderColumn>
                    <TableHeaderColumn>Rec Yds</TableHeaderColumn>
                    <TableHeaderColumn>Rec Tds</TableHeaderColumn>
                    <TableHeaderColumn>YAC</TableHeaderColumn>
                    <TableHeaderColumn>Total Yds</TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                {!statLoading &&
                  <TableBody displayRowCheckbox={false} showRowHover>
                    <TableRow>
                      <TableRowColumn>{stats[0].rushing.attempt}</TableRowColumn>
                      <TableRowColumn>{stats[0].rushing.rushingYds}</TableRowColumn>
                      <TableRowColumn>{stats[0].rushing.tds}</TableRowColumn>
                      <TableRowColumn>{(stats[0].rushing.rushingYds / stats[0].rushing.attempt).toFixed(2)}</TableRowColumn>
                      <TableRowColumn>{stats[0].receiving.target}</TableRowColumn>
                      <TableRowColumn>{stats[0].receiving.rec}</TableRowColumn>
                      <TableRowColumn>{stats[0].receiving.receivingYds}</TableRowColumn>
                      <TableRowColumn>{stats[0].receiving.tds}</TableRowColumn>
                      <TableRowColumn>{stats[0].receiving.yacYds}</TableRowColumn>
                      <TableRowColumn>{stats[0].receiving.receivingYds + stats[0].rushing.rushingYds}</TableRowColumn>
                    </TableRow>
                  </TableBody>
                }
              </Table>
            </StatTable>
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
                <Tab label="NFL" value="b">
                  <Section>
                    {nfl.map(post => (
                      <RedditCard>
                        <CardTitle title={post.data.title} />
                        <TextLink href={post.data.url} style={{ textDecoration: 'none', color: 'inherit' }} target="_blank">News Story Link</TextLink>
                        <TextLink href={`https://reddit.com${post.data.permalink}`} style={{ textDecoration: 'none', color: 'inherit' }} target="_blank">Reddit Post Link</TextLink>
                        {post.data.selfText && <Text>{post.data.selftext}</Text>}
                      </RedditCard>
                    ))}
                  </Section>
                </Tab>
                <Tab label="Fantasy" value="c">
                  <Section>
                    {ff.map(post => (
                      <RedditCard>
                        <CardTitle title={post.data.title} />
                        <TextLink href={post.data.url} style={{ textDecoration: 'none', color: 'inherit' }} target="_blank">News Story Link</TextLink>
                        <TextLink href={`https://reddit.com${post.data.permalink}`} style={{ textDecoration: 'none', color: 'inherit' }} target="_blank">Reddit Post Link</TextLink>
                        {post.data.selfText && <Text>{post.data.selftext}</Text>}
                      </RedditCard>
                    ))}
                  </Section>
                </Tab>
                <Tab label="Dynasty" value="d">
                  <Section>
                    {dynasty.map(post => (
                      <RedditCard>
                        <CardTitle title={post.data.title} />
                        <TextLink href={post.data.url} style={{ textDecoration: 'none', color: 'inherit' }} target="_blank">News Story Link</TextLink>
                        <TextLink href={`https://reddit.com${post.data.permalink}`} style={{ textDecoration: 'none', color: 'inherit' }} target="_blank">Reddit Post Link</TextLink>
                        {post.data.selfText && <Text>{post.data.selftext}</Text>}
                      </RedditCard>
                    ))}
                  </Section>
                </Tab>
              </Tabs>
            </Wrapper>
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  isLoading: selectIsLoading(state),
  statLoading: selectIsLoadingStat(state),
  notes: selectNotes(state),
  playerDetails: selectPlayerDetails(state),
  stats: selectSureStats(state),
  nfl: selectNfl(state),
  ff: selectFf(state),
  dynasty: selectDynasty(state)
})
export default connect(mapStateToProps, { fetchSureStats, fetchPlayerDetails, fetchNfl, fetchFf, fetchDynasty })(Player)
