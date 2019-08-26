import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import DATA from './../constants';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import {calculatePercent, calculateConsumed, roundOff} from "../utils/helperFunctions";
import {RoundedDivs} from "../utils/common";

const useStyles = makeStyles(theme => ({
  wrapper: {},
  divider: {
    marginTop: 24
  },
  userName: {
    fontSize: 16,
  },
  profileWrapper: {
    textAlign: 'center',
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  pictureWrapper: {
    borderRadius: '50%',
    height: 90,
    width: 90,
    background: '#fff'
  },
  picture: {
    borderRadius: '50%',
    height: '100%',
    width: '100%'
  },
  flexWrapperSpaceAround: {
    padding: 16,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  flexWrapperSpaceBetween: {
    padding: 16,
    display: 'flex',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 16,
    fontWeight: 500,
    marginBottom: 0
  },
  mutedText: {
    fontSize: 12,
    color: '#afafaf',
    marginTop: 0

  },
  headerTextCapitalize: {
    fontSize: 16,
    fontWeight: 500,
    marginBottom: 0,
    textTransform: 'capitalize'

  },
  mutedTextCapitalize: {
    fontSize: 12,
    color: '#afafaf',
    marginTop: 0,
    textTransform: 'capitalize'
  },

  progress: {
    padding: '0 16px'
  }
}));

const ProgressBar = ({value}) => <div style={{display: 'flex', backgroundColor: '#d2baf3', margin: '8px 0 22px;'}}>
  <div style={{position: 'relative', height: 4, width: `${value}%`, backgroundColor: '#6000ef'}}>
    <span style={{position: 'absolute', top: 6, right: 0, color: '#afafaf', fontSize: 12}}>{value}%</span>
  </div>
</div>;


const Nav = ({userDetails, intakeDetails}) => {
  const [user, setUser] = useState(userDetails);
  const [intake, setIntake] = useState(intakeDetails);
  const classes = useStyles();

  useEffect(() => {
    setIntake(intakeDetails);
  }, [intakeDetails]);

  return (<div className={classes.wrapper}>
    <div className={classes.profileWrapper}>
      <div className={classes.flexWrapperSpaceAround}>
        <RoundedDivs data={{'unit': 'kg', 'data': DATA.weight_kg}}/>
        <div className={classes.pictureWrapper}>
          <img src={user.pp} className={classes.picture} alt=""/>
        </div>
        <RoundedDivs data={{'unit': 'cm', 'data': DATA.height_cm}}/>
      </div>
      <Typography variant="span" className={classes.userName}>{user.first_name} {user.last_name}</Typography>
      <Divider className={classes.divider}/>
    </div>
    <div>
      <div className={classes.flexWrapperSpaceBetween}>
        <div>
          <p className={classes.headerText}>{calculateConsumed(intake)} cal</p>
          <p className={classes.mutedText}>consumed</p>
        </div>
        <div className="right-align">
          <p className={classes.headerText}>{user.daily_goal} cal</p>
          <p className={classes.mutedText}>daily goal</p>
        </div>
      </div>
      <div className={classes.progress}>
        <ProgressBar value={calculatePercent(calculateConsumed(intake), user.daily_goal)}/>
      </div>
    </div>

    <div className={classes.flexWrapperSpaceAround}>
      {intake.intake_list.map(intake =>
        <div className="center-align">
          <p className={classes.headerTextCapitalize}>{roundOff(intake.nf_calories)}</p>
          <p className={classes.mutedTextCapitalize}>{intake.meal_type}</p>
        </div>
      )}
    </div>
  </div>);
};

export default Nav;
