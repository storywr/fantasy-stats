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

const RankHead = styled(TableHeaderColumn)`
  min-width: 4%;
  width: 4%;
`

const RankCol = styled(TableRowColumn)`
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

export class Advanced extends Component {
  state = {
    position: 'RB',
    sort: 'touches',
    year: '2017',
    week: 'All Season'
  }

  componentDidMount() {
    this.props.fetchAdvanced(this.state)
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

  handleYearChange = (ev, idx, value) => {
    this.setState({
      year: value
    })
    const params = { ...this.state, year: value }
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
        {!isLoading && advanced[this.state.position] ?
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
            <Table fixedHeader={true} height='400px' bodyStyle={{overflowX:'visible'}} onRowSelection={this.handleSelectPlayer}>
              <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                <TableRow>
                  <RankHead>Rank</RankHead>
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
                {advanced[this.state.position].map((player, idx) => (
                  <TableRow>
                    <RankCol>{idx + 1}</RankCol>
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
        :
          <Progress><CircularProgress size={100} thickness={10} /></Progress>
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
