import React from 'react'
import styled from 'styled-components'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from 'recharts'

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

const TabCol = styled(TableRowColumn)`
  min-width: 32px;
  width: 32px;
`

const TabHeadCol = styled(TableHeaderColumn)`
  min-width: 32px;
  width: 32px;
`

const DfsTable = styled.div`
  margin-bottom: 32px;
`

const DfsChart = styled.div`
  margin-top: 32px;
  height: 100%;
  width: 100%;
  min-height: 100%;
  min-width: 100%;
`

const Daily = styled.div`
  @media (max-width: 767px) {
    display: none;
  }
  margin-top: 32px;
  height: 100%;
  width: 100%;
  min-height: 100%;
  min-width: 100%;
`

export const Dfs = ({ dfsStats, chartData }) => (
  <div>
    {dfsStats && chartData &&
      <DfsChart>
        <Daily>
          <ResponsiveContainer width='100%' aspect={2}>
            <LineChart data={chartData} margin={{top: 20, right: 20, bottom: 40, left: 20}}>
              <Tooltip />
              <Legend />
              <XAxis tick={{ fill: 'white' }} dataKey="name" tickCount={16} />
              <YAxis
                tick={{ fill: 'white' }}
                yAxisId="right"
                orientation='right'
                name='salary'
                label={{ value: 'Salary', angle: -90, position: 'right', fill: 'white' }} domain={["dataMin", "dataMax"]}
              />
              <YAxis
                tick={{ fill: 'white' }}
                yAxisId="left"
                orientation='left'
                name='fantasy points'
                label={{ value: 'Fantasy Points', angle: -90, position: 'insideLeft', fill: 'white' }}
              />
              <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
              <Line yAxisId="right" type="monotone" dataKey="Salary" stroke="#00bcd4" strokeWidth={2} />
              <Line yAxisId="left" type="monotone" dataKey="FantasyPoints" stroke="#fc4482" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Daily>
        <DfsTable>
          <Table>
            <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
              <TableRow>
                <TabHeadCol>Game</TabHeadCol>
                <TabHeadCol>Salary</TabHeadCol>
                <TabHeadCol>Pts</TabHeadCol>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false} showRowHover>
              {dfsStats.dfsEntries[0].dfsRows.filter((week, idx) => ( week.player )).map((week, idx) => (
                  <TableRow>
                    <TabCol>{idx + 1}</TabCol>
                    <TabCol>${week.salary}</TabCol>
                    <TabCol>{week.fantasyPoints}</TabCol>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </DfsTable>
      </DfsChart>
    }
  </div>
)

export default Dfs
