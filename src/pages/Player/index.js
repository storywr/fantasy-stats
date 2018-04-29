import React, { Component } from 'react'
import {Tabs, Tab} from 'material-ui/Tabs'
import YouTube from 'react-youtube'
import { connect } from 'react-redux'
import styled from 'styled-components'

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton'

import { fetchNfl, fetchFf, fetchDynasty, selectNfl, selectFf, selectDynasty } from '../../ducks/redditPlayer'
import { fetchPlayerDetails, selectIsLoading, selectNotes, selectPlayerDetails } from '../../ducks/playerDetails'

const Wrapper = styled.div`
  margin: 0 20%;

  @media (max-width: 767px) {
    margin: 0;
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

export class Player extends Component {
  state = {
    backgroundColor: 'transparent',
    open: false,
    value: 'a'
  }

  componentDidMount() {
    this.props.fetchPlayerDetails(this.props.match.params.playerId)
      .then((response) => {
        this.props.fetchNfl(response.playerDetails.players[0].name)
        this.props.fetchFf(response.playerDetails.players[0].name)
        this.props.fetchDynasty(response.playerDetails.players[0].name)
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.playerId !== this.props.match.params.playerId) {
      this.props.fetchPlayerDetails(nextProps.match.params.playerId)
        .then((response) => {
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

  render() {
    const { isLoading, notes, playerDetails, nfl, ff, dynasty } = this.props
    const actions = [
      <FlatButton
        label="Close"
        primary={true}
        onClick={this.handleClose}
      />
    ]

    return (
      <Wrapper>
        {!isLoading &&
          <div>
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
          </div>
        }
      </Wrapper>
    )
  }
}

const mapStateToProps = (state, props) => ({
  isLoading: selectIsLoading(state),
  notes: selectNotes(state),
  playerDetails: selectPlayerDetails(state),
  nfl: selectNfl(state),
  ff: selectFf(state),
  dynasty: selectDynasty(state)
})
export default connect(mapStateToProps, { fetchPlayerDetails, fetchNfl, fetchFf, fetchDynasty })(Player)
