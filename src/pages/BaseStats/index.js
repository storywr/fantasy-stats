import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { withRouter } from 'react-router-dom'

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import CircularProgress from 'material-ui/CircularProgress'

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import { fetchCumulativeFeed, selectIsLoading, selectCumulativeFeed } from '../../ducks/sportsFeed'

const MaterialCard = styled(Card)`
  margin: 40px 0;
`

const PositionSearch = styled(SelectField)`
  margin-bottom: 24px;

  @media (max-width: 767px) {
    margin-left: 8px;
  }
`

const WeekSearch = styled(SelectField)`
  margin-left: 48px;

  @media (max-width: 767px) {
    margin-left: 8px;
  }

  margin-bottom: 24px;
`

const SearchBoxes = styled.div`
  display: flex;

  @media (max-width: 767px) {
    display: block;
  }
`

const PlayTabCol = styled(TableRowColumn)`
  cursor: pointer;
  min-width: 104px;
  width: 104px;
`

const TabCol = styled(TableRowColumn)`
  cursor: pointer;
  min-width: 40px;
  width: 40px;
`

const CatTab = styled(TableRowColumn)`
  display: ${p => p.category !== p.value && 'none'}

  min-width: 40px;
  width: 40px;
`

const PlayTabHeadCol = styled(TableHeaderColumn)`
  min-width: 104px;
  width: 104px;
`

const TabHeadCol = styled(TableHeaderColumn)`
  min-width: 40px;
  width: 40px;
`

const CatCol = styled(TableHeaderColumn)`
  display: ${p => p.category !== p.value && 'none'}

  min-width: 40px;
  width: 40px;
`

const RankHead = styled(TableHeaderColumn)`
  @media (max-width: 767px) {
    display: none;
  }

  min-width: 4%;
  width: 4%;
`

const RankCol = styled(TableRowColumn)`
  @media (max-width: 767px) {
    display: none;
  }

  cursor: pointer;
  min-width: 4%;
  width: 4%;
`

const Progress = styled.div`
  width: 100px;
  margin-top: 15%;
  margin-left: auto !important;
  margin-right: auto !important;
`

const StatCard = styled(Card)`
  padding: 8px 16px 16px 16px;
`

export class BaseStats extends Component {
  state = {
    position: 'RB',
    category: 'rushing',
    abbr: 'yds',
    year: '2017'
  }

  componentDidMount() {
    this.props.fetchCumulativeFeed(this.state)
  }

  handlePositionChange = (ev, idx, value) => {
    this.setState({
      position: value
    })
    const params = { ...this.state, position: value }
    this.props.fetchCumulativeFeed(params)
  }

  handleCategoryChange = (ev, idx, value) => {
    this.setState({
      category: value,
      abbr: 'yds'
    })
    const params = { ...this.state, category: value, abbr: 'yds' }
    this.props.fetchCumulativeFeed(params)
  }

  handleYearChange = (ev, idx, value) => {
    this.setState({
      year: value
    })
    const params = { ...this.state, year: value }
    this.props.fetchCumulativeFeed(params)
  }

  handleAbbrChange = (ev, idx, value) => {
    this.setState({
      abbr: value
    })
    const params = { ...this.state, abbr: value }
    this.props.fetchCumulativeFeed(params)
  }

  render() {
    const { isLoading, cumulative } = this.props

    return (
      <div>
        {!isLoading && cumulative && cumulative.playerstatsentry ?
          <div>
            <SearchBoxes>
              <PositionSearch
                floatingLabelText="Position"
                value={this.state.position}
                onChange={this.handlePositionChange}
              >
                <MenuItem value={'RB'} primaryText="RB" />
                <MenuItem value={'WR'} primaryText="WR" />
              </PositionSearch>
              <WeekSearch
                floatingLabelText="Category"
                value={this.state.category}
                onChange={this.handleCategoryChange}
              >
                <MenuItem value={'rushing'} primaryText="Rushing" />
                <MenuItem value={'receiving'} primaryText="Receiving" />
              </WeekSearch>
              <WeekSearch
                floatingLabelText="Stat"
                value={this.state.abbr}
                onChange={this.handleAbbrChange}
              >
                <MenuItem value={'yds'} primaryText="Yards" />
                <MenuItem value={'td'} primaryText="Touchdowns" />
                <MenuItem value={'1stDowns'} primaryText="First Downs" />
                <MenuItem value={'Avg'} primaryText="Average" />
                <MenuItem value={'Rec'} primaryText="Receptions" />
                <MenuItem value={'att'} primaryText="Carries" />
              </WeekSearch>
              <WeekSearch
                floatingLabelText="Year"
                value={this.state.year}
                onChange={this.handleYearChange}
              >
                <MenuItem value={'2014'} primaryText="2014" />
                <MenuItem value={'2015'} primaryText="2015" />
                <MenuItem value={'2016'} primaryText="2016" />
                <MenuItem value={'2017'} primaryText="2017" />
              </WeekSearch>
            </SearchBoxes>
            <StatCard>
              <Table fixedHeader={true} height='400px' bodyStyle={{overflowX:'visible'}}>
                <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                  <TableRow>
                    <RankHead>Rank</RankHead>
                    <CatCol>Name</CatCol>
                    <CatCol category={this.state.category} value='rushing'>Yards</CatCol>
                    <CatCol category={this.state.category} value='receiving'>Yards</CatCol>
                    <CatCol category={this.state.category} value='rushing'>TD</CatCol>
                    <CatCol category={this.state.category} value='receiving'>TD</CatCol>
                    <CatCol category={this.state.category} value='rushing'>Avg</CatCol>
                    <CatCol category={this.state.category} value='receiving'>Avg</CatCol>
                    <CatCol category={this.state.category} value='rushing'>1st Downs</CatCol>
                    <CatCol category={this.state.category} value='receiving'>1st Downs</CatCol>
                    <CatCol category={this.state.category} value='rushing'>Carries</CatCol>
                    <CatCol category={this.state.category} value='receiving'>Rec</CatCol>
                  </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false} showRowHover>
                  {cumulative.playerstatsentry.map((player, idx) => (
                    <TableRow>
                      <RankCol>{idx + 1}</RankCol>
                      <CatTab>{player.player.FirstName} {player.player.LastName}</CatTab>
                      <CatTab category={this.state.category} value='rushing'>{player.stats.RushYards["#text"]}</CatTab>
                      <CatTab category={this.state.category} value='receiving'>{player.stats.RecYards["#text"]}</CatTab>
                      <CatTab category={this.state.category} value='rushing'>{player.stats.RushTD["#text"]}</CatTab>
                      <CatTab category={this.state.category} value='receiving'>{player.stats.RecTD["#text"]}</CatTab>
                      <CatTab category={this.state.category} value='rushing'>{player.stats.RushAverage["#text"]}</CatTab>
                      <CatTab category={this.state.category} value='receiving'>{player.stats.RecAverage["#text"]}</CatTab>
                      <CatTab category={this.state.category} value='rushing'>{player.stats.Rush1stDowns["#text"]}</CatTab>
                      <CatTab category={this.state.category} value='receiving'>{player.stats.Rec1stDowns["#text"]}</CatTab>
                      <CatTab category={this.state.category} value='rushing'>{player.stats.RushAttempts["#text"]}</CatTab>
                      <CatTab category={this.state.category} value='receiving'>{player.stats.Receptions["#text"]}</CatTab>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </StatCard>
          </div>
        :
          <Progress><CircularProgress size={100} thickness={10} /></Progress>
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isLoading: selectIsLoading(state),
  cumulative: selectCumulativeFeed(state)
})

const Connected = connect(mapStateToProps, { fetchCumulativeFeed })(BaseStats)

export default withRouter(Connected)
