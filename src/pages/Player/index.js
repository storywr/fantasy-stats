import React, { Component } from 'react'
import YouTube from 'react-youtube'
import { connect } from 'react-redux'
import styled from 'styled-components'

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton'

import { fetchPlayerDetails, selectIsLoading, selectNotes, selectPlayerDetails } from '../../ducks/playerDetails'

const Wrapper = styled.div`
  margin: 0 20%;

  @media (max-width: 767px) {
    margin: 0;
  }
`

const MaterialCard = styled(Card)`
  margin-bottom: 80px;
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

export class Player extends Component {
  state = {
    open: false
  }

  componentDidMount() {
    this.props.fetchPlayerDetails(this.props.match.params.playerId)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.playerId !== this.props.match.params.playerId) {
      this.props.fetchPlayerDetails(nextProps.match.params.playerId)
    }
  }

  handleOpen = () => {
    this.setState({open: true});
  }

  handleClose = () => {
    this.setState({open: false});
  }

  render() {
    const { isLoading, notes, playerDetails } = this.props
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
            {notes.map(note => (
              <MaterialCard>
                <CardHeader
                  title={playerDetails.name}
                  subtitle={playerDetails.position}
                  avatar={playerDetails.videos[0].mediumPhotoUrl}  
                />
                <CardTitle title={note.headline} />
                <Text>{note.body}</Text>
                <Text>{note.analysis}</Text>
              </MaterialCard>
            ))}
          </div>
        }
      </Wrapper>
    )
  }
}

const mapStateToProps = (state, props) => ({
  isLoading: selectIsLoading(state),
  notes: selectNotes(state),
  playerDetails: selectPlayerDetails(state)
})
export default connect(mapStateToProps, { fetchPlayerDetails })(Player)
