import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'

import { fetchNews, selectIsLoading, selectNews } from '../../ducks/news'

const Wrapper = styled.div`
  margin: 0 20%;

  @media (max-width: 767px) {
    margin: 0;
  }
`

const MaterialCard = styled(Card)`
  margin-bottom: 50px;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 4px 24px, rgba(0, 0, 0, 0.12) 0px 4px 16px !important;
`

const Text = styled(CardText)`
  line-height: 200%;
`

export class News extends Component {
  componentDidMount() {
    this.props.fetchNews()
  }

  getTitle = (story) => (
    story.teamAbbr
    ? `${story.firstName} ${story.lastName}, ${story.teamAbbr}`
    : `${story.firstName} ${story.lastName}, FA`
  )

  render() {
    const { isLoading, news } = this.props

    return (
      <Wrapper>
        {!isLoading &&
          <div>
            {news.map(story => (
              <MaterialCard>
                <CardHeader
                  title={this.getTitle(story)}
                  subtitle={story.position}
                />
                <CardTitle title={story.headline} />
                <Text>{story.body}</Text>
                <Text>{story.analysis}</Text>
              </MaterialCard>
            ))}
          </div>
        }
      </Wrapper>
    )
  }
}

const mapStateToProps = state => ({
  isLoading: selectIsLoading(state),
  news: selectNews(state),
})
export default connect(mapStateToProps, { fetchNews })(News)
