import React, { Component, Fragment } from 'react'
import { Grid, Paper, Typography } from '@material-ui/core'
import { StyleRulesCallback, Theme, withStyles } from '@material-ui/core/styles'
import { Query } from 'react-apollo'

import TimelineContainer from './TimelineContainer'
import PieChart from './PieChart'
import { getdailyTrafficStopStats, getAllTrafficStopStats } from '../../utils/queries'
import { Styled } from '../../utils/types'

const extractStopDetails = arr => arr.filter(v =>
  (v.key === 'combined') ||
  (v.key === 'uneventful') ||
  (v.key === 'searchWithoutArrest') ||
  (v.key === 'arrestWithoutSearch')
)

const extractSearchDetails = arr => arr.filter(v =>
  (v.key === 'seachWithConsent') ||
  (v.key === 'searchWithProbableCause') ||
  (v.key === 'searchWithWarrant') ||
  (v.key === 'searchWithoutConsentWarrantOrProbableCause')
)

interface Dimensions {
  width: number,
  height: number
}

const lineGraphDimensions: Dimensions = {
  width: 1000,
  height: 400
}

const pieChartDimensions: Dimensions = {
  width: 1000,
  height: 400
}

const TrafficStopStudies = () => (
  <Grid container spacing={24}>
    <Grid item xs={12}>
      <Paper>
        <Query query={getdailyTrafficStopStats}>
          {({ data, loading, error}) => {
            if (!data) return null
            if (loading) return <span>loading</span>
            if (error) <span>error</span>

            return (
              <TimelineContainer
                dimensions={lineGraphDimensions}
                stats={data.dailyTrafficStopStats}
              />
            )
          }}
        </Query>
        <Query query={getAllTrafficStopStats}>
          {({ data, loading, error }) => {
            if (!data) return null
            if (loading) return <span>loading</span>
            if (error) <span>error</span>

            const stops = extractStopDetails(data.allTrafficStopStats)
            const searches = extractSearchDetails(data.allTrafficStopStats)

            return (
              <Fragment>
                <PieChart
                  dimensions={pieChartDimensions}
                  stats={stops}
                />
                <PieChart
                  dimensions={pieChartDimensions}
                  stats={searches}
                />
              </Fragment>
            )
          }}
        </Query>
      </Paper>
    </Grid>
  </Grid>
)

const styles: StyleRulesCallback = (theme: Theme) => ({
  paper: {
    height: "calc(100vh - 64px)"
  }
})

export default withStyles(styles)(TrafficStopStudies)
