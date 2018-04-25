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
`

const WeekSearch = styled(SelectField)`
  margin-left: 48px;
  margin-bottom: 24px;
`

const SearchBoxes = styled.div`
  display: flex;
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
              <TableHeader>
                <TableRow>
                  <TableHeaderColumn>Name</TableHeaderColumn>
                  <TableHeaderColumn>Team</TableHeaderColumn>
                  <TableHeaderColumn>Carries</TableHeaderColumn>
                  <TableHeaderColumn>Touches</TableHeaderColumn>
                  <TableHeaderColumn>Receptions</TableHeaderColumn>
                  <TableHeaderColumn>Targets</TableHeaderColumn>
                  <TableHeaderColumn>Reception %</TableHeaderColumn>
                  <TableHeaderColumn>RZone Targets</TableHeaderColumn>
                  <TableHeaderColumn>RZone Touches</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody>
                {advanced[this.state.position].map(player => (
                  <TableRow>
                    <TableRowColumn>{player.firstName} {player.lastName}</TableRowColumn>
                    <TableRowColumn>{player.teamAbbr}</TableRowColumn>
                    <TableRowColumn>{player.stats.Carries}</TableRowColumn>
                    <TableRowColumn>{player.stats.Touches}</TableRowColumn>
                    <TableRowColumn>{player.stats.Receptions}</TableRowColumn>
                    <TableRowColumn>{player.stats.Targets}</TableRowColumn>
                    <TableRowColumn>{player.stats.ReceptionPercentage}</TableRowColumn>
                    <TableRowColumn>{player.stats.RedzoneTargets}</TableRowColumn>
                    <TableRowColumn>{player.stats.RedzoneTouches}</TableRowColumn>
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
