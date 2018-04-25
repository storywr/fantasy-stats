import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'

import { fetchStats, selectPlayerStats } from '../../ducks/stats'
import { fetchPlayerDetails, selectIsLoading, selectNotes, selectPlayerDetails } from '../../ducks/playerDetails'

const Wrapper = styled.div`
  margin: 0 20%;
`

const MaterialCard = styled(Card)`
  margin-bottom: 80px;
`

const Text = styled(CardText)`
  line-height: 200%;
`

export class Player extends Component {
  componentDidMount() {
    this.props.fetchStats()
    this.props.fetchPlayerDetails(this.props.match.params.playerId)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.playerId !== this.props.match.params.playerId) {
      this.props.fetchPlayerDetails(nextProps.match.params.playerId)
    }
  }

  render() {
    const { isLoading, notes, playerDetails, playerStats } = this.props
    
    return (
      <Wrapper>
        {!isLoading &&
          <div>
            {notes.map(note => (
              <MaterialCard>
                <CardHeader
                  title={playerDetails.name}
                  subtitle={playerDetails.position}
                  avatar={playerDetails.videos[0].mediumPhotoUrl}  
                />
                <CardTitle title={note.body} subtitle={note.headline} />
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
  playerStats: selectPlayerStats(state, props.match.params.playerId),
  playerDetails: selectPlayerDetails(state)
})
export default connect(mapStateToProps, { fetchPlayerDetails, fetchStats })(Player)
