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

const PlayTabHeadCol = styled(TableHeaderColumn)`
  min-width: 104px;
  width: 104px;
`

const TabHeadCol = styled(TableHeaderColumn)`
  min-width: 40px;
  width: 40px;
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
            <Table fixedHeader={true} height='400px' bodyStyle={{overflowX:'visible'}} onRowSelection={this.handleSelectPlayer}>
              <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                <TableRow>
                  <PlayTabHeadCol>Name</PlayTabHeadCol>
                  <TabHeadCol>Team</TabHeadCol>
                  <TabHeadCol>Carries</TabHeadCol>
                  <TabHeadCol>Touches</TabHeadCol>
                  <TabHeadCol>Rec</TabHeadCol>
                  <TabHeadCol>Targets</TabHeadCol>
                  <TabHeadCol>Rec %</TabHeadCol>
                  <TabHeadCol>RZ Targets</TabHeadCol>
                  <TabHeadCol>RZ Touches</TabHeadCol>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false} showRowHover>
                {advanced[this.state.position].map(player => (
                  <TableRow>
                    <PlayTabCol>{player.firstName} {player.lastName}</PlayTabCol>
                    <TabCol>{player.teamAbbr}</TabCol>
                    <TabCol>{player.stats.Carries}</TabCol>
                    <TabCol>{player.stats.Touches}</TabCol>
                    <TabCol>{player.stats.Receptions}</TabCol>
                    <TabCol>{player.stats.Targets}</TabCol>
                    <TabCol>{player.stats.ReceptionPercentage}</TabCol>
                    <TabCol>{player.stats.RedzoneTargets}</TabCol>
                    <TabCol>{player.stats.RedzoneTouches}</TabCol>
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
