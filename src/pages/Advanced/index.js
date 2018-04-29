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

import { fetchAdvanced, selectIsLoading, selectAdvanced } from '../../ducks/advanced'

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

const MobileHeaderCol = styled(TableHeaderColumn)`
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

export class Advanced extends Component {
  state = {
    position: 'RB',
    sort: 'touches',
    week: 'All Season'
  }

  componentDidMount() {
    const params = this.state
    this.props.fetchAdvanced(params)
  }

  handlePositionChange = (ev, idx, value) => {
    this.setState({
      position: value
    })
    const params = { ...this.state, position: value }
    this.props.fetchAdvanced(params)
  }

  handleSortChange = (ev, idx, value) => {
    this.setState({
      sort: value
    })
    const params = { ...this.state, sort: value }
    this.props.fetchAdvanced(params)
  }

  handleWeekChange = (ev, idx, value) => {
    this.setState({
      week: value
    })
    const params = { ...this.state, week: value }
    this.props.fetchAdvanced(params)
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
    const player = this.props.advanced[this.state.position][idx]
    this.props.history.push(`/players/${player.id}`)
  }

  render() {
    const { isLoading, advanced } = this.props
    console.log(advanced)
    return (
      <div>
        {!isLoading && advanced[this.state.position] &&
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
                floatingLabelText="Sort By"
                value={this.state.sort}
                onChange={this.handleSortChange}
              >
                <MenuItem value={'carries'} primaryText="Carries" />
                <MenuItem value={'touches'} primaryText="Touches" />
                <MenuItem value={'receptions'} primaryText="Receptions" />
                <MenuItem value={'targets'} primaryText="Targets" />
                <MenuItem value={'receptionPercentage'} primaryText="Reception Percentage" />
                <MenuItem value={'redzoneTargets'} primaryText="Redzone Targets" />
                <MenuItem value={'redzoneTouches'} primaryText="Redzone Touches" />
              </WeekSearch>
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
                  <TableHeaderColumn>Name</TableHeaderColumn>
                  <MobileHeaderCol>Team</MobileHeaderCol>
                  <TableHeaderColumn>Carries</TableHeaderColumn>
                  <MobileHeaderCol>Touches</MobileHeaderCol>
                  <TableHeaderColumn>Rec</TableHeaderColumn>
                  <MobileHeaderCol>Targets</MobileHeaderCol>
                  <MobileHeaderCol>Rec %</MobileHeaderCol>
                  <MobileHeaderCol>RZ Targets</MobileHeaderCol>
                  <MobileHeaderCol>RZ Touches</MobileHeaderCol>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false} showRowHover>
                {advanced[this.state.position].map(player => (
                  <TableRow>
                    <TableCol>{player.firstName} {player.lastName}</TableCol>
                    <MobileTableCol>{player.teamAbbr}</MobileTableCol>
                    <TableCol>{player.stats.Carries}</TableCol>
                    <MobileTableCol>{player.stats.Touches}</MobileTableCol>
                    <TableCol>{player.stats.Receptions}</TableCol>
                    <MobileTableCol>{player.stats.Targets}</MobileTableCol>
                    <MobileTableCol>{player.stats.ReceptionPercentage}</MobileTableCol>
                    <MobileTableCol>{player.stats.RedzoneTargets}</MobileTableCol>
                    <MobileTableCol>{player.stats.RedzoneTouches}</MobileTableCol>
                  </TableRow>
                ))}
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
  advanced: selectAdvanced(state)
})

const Connected = connect(mapStateToProps, { fetchAdvanced })(Advanced)

export default withRouter(Connected)
