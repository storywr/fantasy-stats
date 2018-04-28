import React, { Component } from 'react'
import {Tabs, Tab} from 'material-ui/Tabs'
import YouTube from 'react-youtube'
import { connect } from 'react-redux'
import styled from 'styled-components'

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton'

import { fetchRedditPlayer, selectRedditPlayer } from '../../ducks/redditPlayer'
import { fetchPlayerDetails, selectIsLoading, selectNotes, selectPlayerDetails } from '../../ducks/playerDetails'

const Wrapper = styled.div`
  margin: 0 20%;

  @media (max-width: 767px) {
    margin: 0;
  }
`

const MaterialCard = styled(Card)`
  margin-bottom: 80px;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 4px 24px, rgba(0, 0, 0, 0.12) 0px 4px 16px !important;
`

const TableWrapper = styled.div`
  margin-bottom: 80px;
`

const Text = styled(CardText)`
  line-height: 200%;
`

const HighlightsButton = styled.div`
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
    open: false,
    value: 'a'
  }

  componentDidMount() {
    this.props.fetchPlayerDetails(this.props.match.params.playerId)
      .then((response) => {
        this.props.fetchRedditPlayer(response.playerDetails.players[0].name)
      })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.playerId !== this.props.match.params.playerId) {
      this.props.fetchPlayerDetails(nextProps.match.params.playerId)
        .then((response) => {
          this.props.fetchRedditPlayer(response.playerDetails.players[0].name)
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
    const { isLoading, notes, playerDetails, redditPlayer } = this.props
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
                    <MaterialCard>
                      <CardHeader
                        title={this.getTitle(playerDetails)}
                        subtitle={`${playerDetails.position}, #${playerDetails.jerseyNumber}`}
                        avatar={playerDetails.videos[0].mediumPhotoUrl}  
                      />
                      <CardTitle title={note.headline} />
                      <Text><strong>{note.body}</strong></Text>
                      <Text>{note.analysis}</Text>
                    </MaterialCard>
                  ))}
                </Section>
              </Tab>
              <Tab label="Reddit" value="b">
                <Section>
                  {redditPlayer.map(post => (
                    <MaterialCard>
                      <a href={post.data.url} style={{ textDecoration: 'none' }} target="_blank">
                        <CardTitle title={post.data.title} />
                      </a>
                      <Text>{post.data.selftext}</Text>
                    </MaterialCard>
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
  redditPlayer: selectRedditPlayer(state)
})
export default connect(mapStateToProps, { fetchPlayerDetails, fetchRedditPlayer })(Player)
