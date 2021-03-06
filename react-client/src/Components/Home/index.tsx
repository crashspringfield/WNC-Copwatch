import React from 'react'
import { Button, Grid, Paper, Typography } from '@material-ui/core'
import { StyleRulesCallback, Theme, withStyles } from '@material-ui/core/styles'

import {
  APDBulletinMapLink,
  HouselessStudiesLink,
  OfficerLink,
  RaceStudiesLink,
  TrafficStopMapLink,
  TrafficStopStudiesLink,
} from '../links'

const Home = ({ classes }) => (
  <div className={classes.wtfMaterial}>
    <Grid container spacing={24}>
      <Grid item xs={12} sm={6}>
        <Paper className={classes.paper}>
          <Typography variant="body1" >
            Our interactive map allows one to browse police reports from Asheville's
            police department.
          </Typography>
          <Button component={APDBulletinMapLink}>
            Explore
          </Button>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Paper className={classes.paper}>
          <Typography>
            Display and browse a map of traffic stops to see where searches and arrests
            are happening.
          </Typography>
          <Button component={TrafficStopMapLink}>
            Explore
          </Button>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Paper className={classes.paper}>
          <Typography>
            Various studies made from Asheville's open data on traffic stops,
            such as comparing instances of searches to arrests or seeing if motorists
            are actually consenting to searches carried out.
          </Typography>
          <Button component={TrafficStopStudiesLink}>
            Explore
          </Button>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Paper className={classes.paper}>
          <Typography>
            In response to complaints of profiling from Asheville's houseless community,
            we've examined issues they've raised.
          </Typography>
          <Button component={HouselessStudiesLink}>
            Explore
          </Button>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Paper className={classes.paper}>
          <Typography>
            Various studies comparing Asheville's makeup to police incidents.
          </Typography>
          <Button component={RaceStudiesLink}>
            Explore
          </Button>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Paper className={classes.paper}>
          <Typography>
            A community-driven tool looking at officers with a history of abuse.
          </Typography>
          <Button component={OfficerLink}>
            Explore
          </Button>
        </Paper>
      </Grid>
    </Grid>
  </div>
)

const styles: StyleRulesCallback = (theme: Theme) => ({
  root: {
    flexGrow: 1,
  },
  // https://github.com/mui-org/material-ui/issues/7466
  wtfMaterial: {
    padding: 12
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
})

export default withStyles(styles)(React.memo(Home))
