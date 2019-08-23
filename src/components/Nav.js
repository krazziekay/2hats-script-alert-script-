import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DATA from './../constants';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { calculateIntake } from "../utils/helperFunctions";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles(theme => ({
  wrapper: {},
  picture: {
    borderRadius: '50%',
  },
  measurements: {
    borderRadius: '50%',
  },
  profileWrapper: {
    textAlign: 'center'
  },
  flexWrapperSpaceAround: {
    padding: 12,
    display: 'flex',
    justifyContent: 'space-around',
  },
  flexWrapperSpaceBetween: {
    padding: 12,
    display: 'flex',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 16,
    fontWeight: 500
  },
  mutedText: {
    fontSize: 12,
    color: '#afafaf'
  },
}));


const Nav = () => {
  const [user, setUser] = useState(DATA);
  const classes = useStyles();

  return (<div className={classes.wrapper}>
    <div className={classes.profileWrapper}>
      <div className={classes.flexWrapperSpaceAround}>
        <div className={classes.measurements}>
          {DATA.weight_kg}
        </div>
        <div className={classes.picture}>
          Picture
        </div>
        <div className={classes.measurements}>
          {DATA.height_cm}
        </div>
      </div>
      <Typography variant="h6">{DATA.first_name} {DATA.last_name}</Typography>
    </div>
    <Divider/>
    <div>
      <div className={classes.flexWrapperSpaceBetween}>
        <div>
          <p className={classes.headerText}>1989 cal</p>
          <p className={classes.mutedText}>consumed</p>
        </div>
        <div className="right-align">
          <p className={classes.headerText}>1989 cal</p>
          <p className={classes.mutedText}>consumed</p>
        </div>
      </div>
      <div>
        <LinearProgress variant="determinate" value={50}/>
      </div>
    </div>

    <div className={classes.flexWrapperSpaceAround}>
      {DATA.data_points[1].intake_list.map(intake =>
        <div>
          <p className={classes.headerText}>{calculateIntake(intake)}</p>
          <p className={classes.mutedText}>{intake.meal_type}</p>
        </div>
      )}
    </div>
  </div>);
};

export default Nav;
