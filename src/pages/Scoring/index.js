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

const RankCol = styled(TableHeaderColumn)`
  width: 10%;

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

const TableCol = styled(TableRowColumn)`
  cursor: pointer;
`

const MobileTableCol = styled(TableCol)`
  @media (max-width: 767px) {
    display: none;
  }
`

const RankTableCol = styled(TableCol)`
  width: 10%;

  @media (max-width: 767px) {
    display: none;
  }
`

const StatTableCol = styled(TableRowColumn)`
  width: 35%;

  @media (max-width: 767px) {
    display: none;
  }
`

export class Draft extends Component {
  componentDidMount() {
    this.props.fetchScoring(this.state.week, this.state.position)
  }

  state = {
    position: 'RB',
    week: 'All Season'
  }

  handlePositionChange = (ev, idx, value) => {
    this.setState({
      position: value
    })
    this.props.fetchScoring(this.state.week, value)
  }

  handleWeekChange = (ev, idx, value) => {
    this.setState({
      week: value
    })
    this.props.fetchScoring(value, this.state.position)
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
        {!isLoading &&
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
                floatingLabelText="Week"
                value={this.state.week}
                onChange={this.handleWeekChange}
              >
                {this.weekBuilder()}
              </WeekSearch>
            </SearchBoxes>
            <Table onRowSelection={this.handleSelectPlayer}>
              <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                <TableRow>
                  <RankCol>Rank</RankCol>
                  <TableHeaderColumn>Name</TableHeaderColumn>
                  <MobileHeaderCol>Team</MobileHeaderCol>
                  <TableHeaderColumn>Points</TableHeaderColumn>
                  {this.state.week !== 'All Season' && <StatCol>Stat Line</StatCol>}
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false} showRowHover>
                {this.state.week === 'All Season' ?
                  scoring[this.state.position].map(player => (
                    <TableRow>
                      <RankTableCol>{player.rank}</RankTableCol>
                      <TableCol>{player.firstName} {player.lastName}</TableCol>
                      <MobileTableCol>{player.teamAbbr}</MobileTableCol>
                      <TableCol>{player.pts}</TableCol>
                    </TableRow>
                  ))
                :
                  scoring[this.state.position].map(player => (
                    <TableRow>
                      <RankTableCol>{player.rank}</RankTableCol>
                      <TableCol>{player.firstName} {player.lastName}</TableCol>
                      <MobileTableCol>{player.teamAbbr}</MobileTableCol>
                      <TableCol>{player.pts}</TableCol>
                      <StatTableCol>{player.statsLine}</StatTableCol>
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
