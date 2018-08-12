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

export const Stats = ({ gameFeed }) => (
  <div>
    {gameFeed && gameFeed.gamelogs &&
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
                      <TabCol>{game.stats.rushing.rushAttempts}</TabCol>
                      <TabCol>{game.stats.rushing.rushYards}</TabCol>
                      <TabCol>{game.stats.rushing.rushAverage}</TabCol>
                      <TabCol>{game.stats.rushing.rushTD}</TabCol>
                      <TabCol>{game.stats.receiving.receptions}</TabCol>
                      <TabCol>{game.stats.receiving.recYards}</TabCol>
                      <TabCol>{game.stats.receiving.recAverage}</TabCol>
                      <TabCol>{game.stats.receiving.recTD}</TabCol>
                      <TabCol>{game.stats.receiving.targets}</TabCol>
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
