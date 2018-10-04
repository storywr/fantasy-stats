import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import Dialog from 'material-ui/Dialog';
import {GridList, GridTile} from 'material-ui/GridList';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

const VideoPlayer = styled.iframe`
  height: 45vh;
  width: 45vw;
  margin: 1%;
`

const HighlightsButton = styled.div`
  @media (max-width: 767px) {
    display: none;
  }
  margin-left: auto;
`

const SearchBoxes = styled.div`
  display: flex;

  @media (max-width: 767px) {
    display: block;
  }
`

const PositionSearch = styled(SelectField)`
  margin-bottom: 24px;

  @media (max-width: 767px) {
    margin-left: 8px;
  }
`

const PlayerName = styled(CardTitle)`
  padding-left: 0 !important;
`

const Text = styled(CardText)`
  line-height: 200%;
`

const TableText = styled(CardTitle)`
  font-weight: 500;
`

const PositionText = styled(CardTitle)`
  font-weight: 500;
  padding: 0px 0px 8px 0px !important;
`

const Player = styled(Card)`
  margin: 32px 0px 40px;
  padding: 8px 24px 16px;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 4px 24px, rgba(0, 0, 0, 0.12) 0px 4px 16px !important;
`

const TabCol = styled(TableRowColumn)`
  min-width: 32px;
  width: 32px;
`

const TabHeadCol = styled(TableHeaderColumn)`
  min-width: 32px;
  width: 32px;
`

const Flex = styled.div`
  display: flex;
  align-items: center;
`

const PlayerImg = styled(CardMedia)`
  margin-top: 16px;
  margin-bottom: 16px;
`

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    display: 'flex',
    flexWrap: 'nowrap',
    overflowX: 'auto',
  },
  titleStyle: {
    color: 'rgb(0, 188, 212)',
  },
}

export const PlayerCard = ({ bing, playerDetails, handleOpen, actions, open, handleClose, feedStats, playerFeed, year, handleYearChange, feedLoading }) => (
  <div>
    <Player>
      <Flex>
        <PlayerName title={playerDetails.name} />
        {/* <HighlightsButton>
          <RaisedButton label="Watch Highlights" onClick={handleOpen} />
          <Dialog
            title="Watch Highlights"
            actions={actions}
            modal={false}
            open={open}
            onRequestClose={handleClose}
          >
            <VideoPlayer id="player" type="text/html"
              src={`https://www.youtube.com/embed?listType=search&list=${playerDetails.name}+highlights`}
              frameborder="0">
            </VideoPlayer>
          </Dialog>
        </HighlightsButton> */}
      </Flex>
      {feedStats && feedStats.references &&
        <div>
          <PositionText>{`${feedStats.references.teamReferences[0].city} ${feedStats.references.teamReferences[0].name} | ${feedStats.references.playerReferences[0].primaryPosition} | #${feedStats.references.playerReferences[0].jerseyNumber}`}</PositionText>
          <PositionText>{`${feedStats.references.playerReferences[0].birthDate || ''} ${feedStats.references.playerReferences[0].age || ''} | ${feedStats.references.playerReferences[0].height} | ${feedStats.references.playerReferences[0].weight}`}</PositionText>
        </div>
      }  
      {bing && bing.value &&
        <PlayerImg>
          <GridList style={styles.gridList}>
            {bing.value.map((tile) => (
              <GridTile
                key={tile.img}
                titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
              >
                <img src={tile.thumbnailUrl} />
              </GridTile>
            ))}
          </GridList>
        </PlayerImg>
      }
    </Player>
    <Player>
      <SearchBoxes>
        <PositionSearch
          floatingLabelText="Year"
          value={year}
          onChange={handleYearChange}
        >
          <MenuItem value={'2014'} primaryText="2014" />
          <MenuItem value={'2015'} primaryText="2015" />
          <MenuItem value={'2016'} primaryText="2016" />
          <MenuItem value={'2017'} primaryText="2017" />
          <MenuItem value={'2018'} primaryText="2018" />
        </PositionSearch>
      </SearchBoxes>
      {feedStats && feedStats.references && feedStats.references.playerReferences[0].primaryPosition === 'RB' &&
        <div>
          <TableText>RUSHING</TableText>
          <Table bodyStyle={{overflow:'visible'}}>
            <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
              <TableRow>
                <TabHeadCol>Att</TabHeadCol>
                <TabHeadCol>Yds</TabHeadCol>
                <TabHeadCol>YPC</TabHeadCol>
                <TabHeadCol>TD</TabHeadCol>
                <TabHeadCol>20 YD+</TabHeadCol>
                <TabHeadCol>40 YD+</TabHeadCol>
                <TabHeadCol>Long</TabHeadCol>
                <TabHeadCol>1st Downs</TabHeadCol>
                <TabHeadCol>1st Down %</TabHeadCol>
                <TabHeadCol>Fumbles Lost</TabHeadCol>
              </TableRow>
            </TableHeader>
            {!feedLoading && feedStats.playerStatsTotals &&
              <TableBody displayRowCheckbox={false} showRowHover>
                <TableRow>
                  <TabCol>{feedStats.playerStatsTotals[0].stats.rushing.rushAttempts}</TabCol>
                  <TabCol>{feedStats.playerStatsTotals[0].stats.rushing.rushYards}</TabCol>
                  <TabCol>{feedStats.playerStatsTotals[0].stats.rushing.rushAverage}</TabCol>
                  <TabCol>{feedStats.playerStatsTotals[0].stats.rushing.rushTD}</TabCol>
                  <TabCol>{feedStats.playerStatsTotals[0].stats.rushing.rush20Plus}</TabCol>
                  <TabCol>{feedStats.playerStatsTotals[0].stats.rushing.rush40Plus}</TabCol>
                  <TabCol>{feedStats.playerStatsTotals[0].stats.rushing.rushLng}</TabCol>
                  <TabCol>{feedStats.playerStatsTotals[0].stats.rushing.rush1stDowns}</TabCol>
                  <TabCol>{feedStats.playerStatsTotals[0].stats.rushing.rush1stDownsPct}</TabCol>
                  <TabCol>{feedStats.playerStatsTotals[0].stats.rushing.rushFumbles}</TabCol>
                </TableRow>
              </TableBody>
            }
          </Table>
        </div>
      }
      {feedStats && feedStats.playerStatsTotals &&
        <div>
          <TableText>RECEIVING</TableText>
          <Table bodyStyle={{overflow:'visible'}}>
            <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
              <TableRow>
                <TabHeadCol>Rec</TabHeadCol>
                <TabHeadCol>Yds</TabHeadCol>
                <TabHeadCol>YPC</TabHeadCol>
                <TabHeadCol>TD</TabHeadCol>
                <TabHeadCol>20 YD+</TabHeadCol>
                <TabHeadCol>40 YD+</TabHeadCol>
                <TabHeadCol>Long</TabHeadCol>
                <TabHeadCol>1st Downs</TabHeadCol>
                <TabHeadCol>1st Down %</TabHeadCol>
                <TabHeadCol>Targets</TabHeadCol>
              </TableRow>
            </TableHeader>
            {!feedLoading && feedStats.playerStatsTotals &&
              <TableBody displayRowCheckbox={false} showRowHover>
                <TableRow>
                  <TabCol>{feedStats.playerStatsTotals[0].stats.receiving.receptions}</TabCol>
                  <TabCol>{feedStats.playerStatsTotals[0].stats.receiving.recYards}</TabCol>
                  <TabCol>{feedStats.playerStatsTotals[0].stats.receiving.recAverage}</TabCol>
                  <TabCol>{feedStats.playerStatsTotals[0].stats.receiving.recTD}</TabCol>
                  <TabCol>{feedStats.playerStatsTotals[0].stats.receiving.rec20Plus}</TabCol>
                  <TabCol>{feedStats.playerStatsTotals[0].stats.receiving.rec40Plus}</TabCol>
                  <TabCol>{feedStats.playerStatsTotals[0].stats.receiving.recLng}</TabCol>
                  <TabCol>{feedStats.playerStatsTotals[0].stats.receiving.rec1stDowns}</TabCol>
                  <TabCol>{(feedStats.playerStatsTotals[0].stats.receiving.rec1stDowns / feedStats.playerStatsTotals[0].stats.receiving.receptions).toFixed(3) * 100}</TabCol>
                  <TabCol>{feedStats.playerStatsTotals[0].stats.receiving.targets}</TabCol>
                </TableRow>
              </TableBody>
            }
          </Table>
        </div>
      }
    </Player>
  </div>
)

export default PlayerCard
