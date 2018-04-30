import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import {Tabs, Tab} from 'material-ui/Tabs'

import { fetchNews, selectNews } from '../../ducks/news'
import { fetchNfl, fetchFf, fetchDynasty, selectIsLoading, selectNfl, selectFf, selectDynasty } from '../../ducks/redditNews'

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

const Section = styled.div`
  margin-top: 24px;
`

export class News extends Component {
  state = {
    value: 'a'
  }

  componentDidMount() {
    this.props.fetchNews()
    this.props.fetchNfl()
    this.props.fetchFf()
    this.props.fetchDynasty()
  }

  getTitle = (story) => (
    story.teamAbbr
    ? `${story.firstName} ${story.lastName}, ${story.teamAbbr}`
    : `${story.firstName} ${story.lastName}, FA`
  )

  handleChange = (value) => {
    this.setState({
      value: value,
    })
  }

  render() {
    const { isLoading, news, nfl, ff, dynasty } = this.props

    return (
      <Wrapper>
        {!isLoading &&
          <div>
            <Tabs
              value={this.state.value}
              onChange={this.handleChange}
            >
              <Tab label="RotoWire" value="a">
                <Section>
                  {news.map(story => (
                    <RotoWireCard>
                      <CardHeader
                        title={this.getTitle(story)}
                        subtitle={story.position}
                      />
                      <CardTitle title={story.headline} />
                      <Text><strong>{story.body}</strong></Text>
                      <Text>{story.analysis}</Text>
                    </RotoWireCard>
                  ))}
                </Section>
              </Tab>
              <Tab label="NFL" value="b">
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
              <Tab label="Fantasy" value="c">
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
              <Tab label="Dynasty" value="d">
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
          </div>
        }
      </Wrapper>
    )
  }
}

const mapStateToProps = state => ({
  isLoading: selectIsLoading(state),
  news: selectNews(state),
  nfl: selectNfl(state),
  ff: selectFf(state),
  dynasty: selectDynasty(state)
})
export default connect(mapStateToProps, { fetchNews, fetchNfl, fetchFf, fetchDynasty })(News)
