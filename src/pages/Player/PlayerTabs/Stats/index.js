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

const Flex = styled.div`
  display: flex;
  margin-top: 1rem;
`

const TableText = styled(CardTitle)`
  width: 50%;
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
    {gameFeed && gameFeed.gamelogs && feedStats && feedStats.playerstatsentry &&
      <Section>
        <StatCard>
          <CardSection>
            <Flex>
              <TableText>RUSHING</TableText>
              <TableText>RECEIVING</TableText>
            </Flex>
            <Table fixedHeader={true} height='400px' bodyStyle={{overflowX:'visible'}}>
              <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                <TableRow>
                  <TabHeadCol>Wk</TabHeadCol>
                  <TabHeadCol>Att</TabHeadCol>
                  <TabHeadCol>Yds</TabHeadCol>
                  <TabHeadCol>YPC</TabHeadCol>
                  <TabHeadCol>TD</TabHeadCol>
                  <TabHeadCol>Rec</TabHeadCol>
                  <TabHeadCol>Yds</TabHeadCol>
                  <TabHeadCol>YPC</TabHeadCol>
                  <TabHeadCol>TD</TabHeadCol>
                  <TabHeadCol>Targets</TabHeadCol>
                </TableRow>
              </TableHeader>
                <TableBody displayRowCheckbox={false} showRowHover>
                  {gameFeed.gamelogs.map((game, idx) => (
                    <TableRow>
                      <TabCol>{idx + 1}</TabCol>
                      <TabCol>{game.stats.RushAttempts["#text"]}</TabCol>
                      <TabCol>{game.stats.RushYards["#text"]}</TabCol>
                      <TabCol>{game.stats.RushAverage["#text"]}</TabCol>
                      <TabCol>{game.stats.RushTD["#text"]}</TabCol>
                      <TabCol>{game.stats.Receptions["#text"]}</TabCol>
                      <TabCol>{game.stats.RecYards["#text"]}</TabCol>
                      <TabCol>{game.stats.RecAverage["#text"]}</TabCol>
                      <TabCol>{game.stats.RecTD["#text"]}</TabCol>
                      <TabCol>{game.stats.Targets["#text"]}</TabCol>
                    </TableRow>
                  ))}
                </TableBody>
            </Table>
          </CardSection>
        </StatCard>
      </Section>
    }
  </div>
)

export default Stats
