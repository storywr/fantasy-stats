import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { withRouter } from 'react-router-dom'

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import { fetchScoring, selectIsLoading, selectScoring } from '../../ducks/scoring'

const MaterialCard = styled(Card)`
  margin: 40px 0;
`

const PositionSearch = styled(SelectField)`
  margin-bottom: 24px;
`

const WeekSearch = styled(SelectField)`
  margin-left: 48px;
  margin-bottom: 24px;
`

const SearchBoxes = styled.div`
  display: flex;
`

const MobileHeaderCol = styled(TableHeaderColumn)`
  @media (max-width: 767px) {
    display: none;
  }
`

const StatCol = styled(TableHeaderColumn)`
  width: 35%;

  @media (max-width: 767px) {
    display: none;
  }
`

const TabCol = styled(TableRowColumn)`
  cursor: pointer;
  min-width: 20px;
  width: 20px;
`

const TabHeadCol = styled(TableHeaderColumn)`
  min-width: 20px;
  width: 20px;
`

const RankHead = styled(TableHeaderColumn)`
  min-width: 4%;
  width: 4%;
`

const RankCol = styled(TableRowColumn)`
  cursor: pointer;
  min-width: 4%;
  width: 4%;
`

export class Draft extends Component {
  componentDidMount() {
    this.props.fetchScoring(this.state)
  }

  state = {
    position: 'RB',
    year: '2017',
    week: 'All Season'
  }

  handlePositionChange = (ev, idx, value) => {
    this.setState({
      position: value
    })
    const params = { ...this.state, position: value }
    this.props.fetchScoring(params)
  }

  handleWeekChange = (ev, idx, value) => {
    this.setState({
      week: value
    })
    const params = { ...this.state, week: value }
    this.props.fetchScoring(params)
  }

  handleYearChange = (ev, idx, value) => {
    this.setState({
      year: value
    })
    const params = { ...this.state, year: value }
    this.props.fetchScoring(params)
  }

  weekBuilder = () => {
    const weeks = []
    for (var index = 1; index < 17; index++) {
      weeks.push(<MenuItem value={`${index}`} primaryText={`${index}`} />)
    }
    weeks.push(<MenuItem value='All Season' primaryText='All Season' />)
    return weeks
  }

  handleSelectPlayer = (idx) => {
    const player = this.props.scoring[this.state.position][idx]
    this.props.history.push(`/players/${player.id}`)
  }

  render() {
    const { isLoading, scoring } = this.props

    return (
      <div>
        {!isLoading && scoring[this.state.position] &&
          <div>
            <SearchBoxes>
              <PositionSearch
                floatingLabelText="Position"
                value={this.state.position}
                onChange={this.handlePositionChange}
              >
                <MenuItem value={'RB'} primaryText="RB" />
                <MenuItem value={'WR'} primaryText="WR" />
                <MenuItem value={'TE'} primaryText="TE" />
                <MenuItem value={'QB'} primaryText="QB" />
                <MenuItem value={'DEF'} primaryText="DEF" />
              </PositionSearch>
              <WeekSearch
                floatingLabelText="Year"
                value={this.state.year}
                onChange={this.handleYearChange}
              >
                <MenuItem value={'2010'} primaryText="2010" />
                <MenuItem value={'2011'} primaryText="2011" />
                <MenuItem value={'2012'} primaryText="2012" />
                <MenuItem value={'2013'} primaryText="2013" />
                <MenuItem value={'2014'} primaryText="2014" />
                <MenuItem value={'2015'} primaryText="2015" />
                <MenuItem value={'2016'} primaryText="2016" />
                <MenuItem value={'2017'} primaryText="2017" />
              </WeekSearch>
              <WeekSearch
                floatingLabelText="Week"
                value={this.state.week}
                onChange={this.handleWeekChange}
              >
                {this.weekBuilder()}
              </WeekSearch>
            </SearchBoxes>
            <Table fixedHeader={true} height='450px' bodyStyle={{overflowX:'visible'}} onRowSelection={this.handleSelectPlayer}>
              <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                <TableRow>
                  <RankHead>Rank</RankHead>
                  <TabHeadCol>Name</TabHeadCol>
                  <TabHeadCol>Points</TabHeadCol>
                  {this.state.week !== 'All Season' && <TabHeadCol>Stat Line</TabHeadCol>}
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false} showRowHover>
                {this.state.week === 'All Season' ?
                  scoring[this.state.position].map(player => (
                    <TableRow>
                      <RankCol>{player.rank}</RankCol>
                      <TabCol>{player.firstName} {player.lastName}</TabCol>
                      <TabCol>{player.pts}</TabCol>
                    </TableRow>
                  ))
                :
                  scoring[this.state.position].map(player => (
                    <TableRow>
                      <RankCol>{player.rank}</RankCol>
                      <TabCol>{player.firstName} {player.lastName}</TabCol>
                      <TabCol>{player.pts}</TabCol>
                      <TabCol>{player.statsLine}</TabCol>
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isLoading: selectIsLoading(state),
  scoring: selectScoring(state)
})

const Connected = connect(mapStateToProps, { fetchScoring })(Draft)

export default withRouter(Connected)
