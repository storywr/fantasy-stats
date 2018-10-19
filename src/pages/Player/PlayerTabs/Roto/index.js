import React from 'react'
import styled from 'styled-components'

import { Card, CardHeader, CardTitle, CardText } from 'material-ui/Card'

const Text = styled(CardText)`
  line-height: 200%;
`

const RotoWireCard = styled(Card)`
  margin-bottom: 50px;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 4px 24px, rgba(0, 0, 0, 0.12) 0px 4px 16px !important;
`

const Section = styled.div`
  margin-top: 24px;
`

export const Roto = ({ notes, getTitle, playerDetails }) => (
  <Section>
    {notes.map(note => (
      <RotoWireCard>
        <CardHeader
          title={getTitle(playerDetails)}
          subtitle={`${playerDetails.position}, #${playerDetails.jerseyNumber}`}
          avatar={playerDetails.videos[0].mediumPhotoUrl}  
        />
        <CardTitle title={note.headline} />
        <Text><strong>{note.body}</strong></Text>
        <Text>{note.analysis}</Text>
      </RotoWireCard>
    ))}
  </Section>
)

export default Roto
