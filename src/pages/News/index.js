import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'

import { fetchNews, selectIsLoading, selectNews } from '../../ducks/news'

const Wrapper = styled.div`
  margin: 0 20%;
`

const MaterialCard = styled(Card)`
  margin: 40px 0;
`

const Text = styled(CardText)`
  line-height: 200%;
`

export class News extends Component {
  componentDidMount() {
    this.props.fetchNews()
  }

  render() {
    const { isLoading, news } = this.props

    return (
      <Wrapper>
        {!isLoading &&
          <div>
            {news.map(story => (
              <MaterialCard>
                <CardHeader
                  title={`${story.firstName} ${story.lastName}`}
                  subtitle={story.position}
                />
                <CardTitle title={story.body} subtitle={story.headline} />
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
