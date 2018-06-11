import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

const TableText = styled(CardTitle)`
  font-weight: 500;
`

const TabCol = styled(TableRowColumn)`
  min-width: 32px;
  width: 32px;
`

const TabHeadCol = styled(TableHeaderColumn)`
  min-width: 32px;
  width: 32px;
`

const Section = styled.div`
  margin-top: 24px;
`

const StatCard = styled(Card)`
  margin-bottom: 50px;
  padding-left: 16px;
  padding-right: 16px;
  padding-bottom: 16px;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 4px 24px, rgba(0, 0, 0, 0.12) 0px 4px 16px !important;
`

const CardSection = styled.div`
`

export const Stats = ({ gameFeed, feedStats }) => (
  <div>
    {gameFeed && gameFeed.gamelogs && feedStats &&
      <Section>
        {gameFeed.gamelogs.map((game, idx) => (
          <StatCard>
            <CardTitle title={`Week ${idx + 1}: ${game.game.awayTeam.Name} at ${game.game.homeTeam.Name}`} />
            <CardSection>
              <div>
                <TableText>RUSHING</TableText>
                <Table bodyStyle={{overflow:'visible'}}>
                  <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                    <TableRow>
                      <TabHeadCol>Att</TabHeadCol>
                      <TabHeadCol>Yds</TabHeadCol>
                      <TabHeadCol>YPC</TabHeadCol>
                      <TabHeadCol>TD</TabHeadCol>
                      <TabHeadCol>1st Downs</TabHeadCol>
                      <TabHeadCol>1st Down %</TabHeadCol>
                      <TabHeadCol>20 YD Plus</TabHeadCol>
                      <TabHeadCol>40 YD Plus</TabHeadCol>
                      <TabHeadCol>Long</TabHeadCol>
                      <TabHeadCol>Fumbles Lost</TabHeadCol>
                    </TableRow>
                  </TableHeader>
                  <TableBody displayRowCheckbox={false} showRowHover>
                    <TableRow>
                      <TabCol>{game.stats.RushAttempts["#text"]}</TabCol>
                      <TabCol>{game.stats.RushYards["#text"]}</TabCol>
                      <TabCol>{game.stats.RushAverage["#text"]}</TabCol>
                      <TabCol>{game.stats.RushTD["#text"]}</TabCol>
                      <TabCol>{game.stats.Rush1stDowns["#text"]}</TabCol>
                      <TabCol>{game.stats.Rush1stDownsPct["#text"]}</TabCol>
                      <TabCol>{game.stats.Rush20Plus["#text"]}</TabCol>
                      <TabCol>{game.stats.Rush40Plus["#text"]}</TabCol>
                      <TabCol>{game.stats.RushLng["#text"]}</TabCol>
                      <TabCol>{game.stats.FumLost["#text"]}</TabCol>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              <div>
                <TableText>RECEIVING</TableText>
                <Table bodyStyle={{overflow:'visible'}}>
                  <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                    <TableRow>
                      <TabHeadCol>Rec</TabHeadCol>
                      <TabHeadCol>Yds</TabHeadCol>
                      <TabHeadCol>YPC</TabHeadCol>
                      <TabHeadCol>TD</TabHeadCol>
                      <TabHeadCol>1st Downs</TabHeadCol>
                      <TabHeadCol>1st Down %</TabHeadCol>
                      <TabHeadCol>20 YD Plus</TabHeadCol>
                      <TabHeadCol>40 YD Plus</TabHeadCol>
                      <TabHeadCol>Long</TabHeadCol>
                      <TabHeadCol>Targets</TabHeadCol>
                    </TableRow>
                  </TableHeader>
                  <TableBody displayRowCheckbox={false} showRowHover>
                    <TableRow>
                      <TabCol>{game.stats.Receptions["#text"]}</TabCol>
                      <TabCol>{game.stats.RecYards["#text"]}</TabCol>
                      <TabCol>{game.stats.RecAverage["#text"]}</TabCol>
                      <TabCol>{game.stats.RecTD["#text"]}</TabCol>
                      <TabCol>{game.stats.Rec1stDowns["#text"]}</TabCol>
                      <TabCol>{((game.stats.Rec1stDowns["#text"] / feedStats.playerstatsentry[0].stats.Targets["#text"]) * 100).toFixed(1)}</TabCol>
                      <TabCol>{game.stats.Rec20Plus["#text"]}</TabCol>
                      <TabCol>{game.stats.Rec40Plus["#text"]}</TabCol>
                      <TabCol>{game.stats.RecLng["#text"]}</TabCol>
                      <TabCol>{game.stats.Targets["#text"]}</TabCol>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardSection>
          </StatCard>
        ))}
      </Section>
    }
  </div>
)

export default Stats
