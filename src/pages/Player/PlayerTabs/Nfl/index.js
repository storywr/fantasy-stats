import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'

const RedditCard = styled(Card)`
  margin-bottom: 50px;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 4px 24px, rgba(0, 0, 0, 0.12) 0px 4px 16px !important;
`

const Section = styled.div`
  margin-top: 24px;
`

const Text = styled(CardText)`
  line-height: 200%;
`

export const Nfl = ({ nfl }) => (
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
)

export default Nfl
