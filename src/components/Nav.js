import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import DATA from './../constants';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import {calculateIntake} from "../utils/helperFunctions";
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
  picture: {
    borderRadius: '50%',
    height: 90,
    width: 90,
    background: '#fff'
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
    fontWeight: 500
  },
  mutedText: {
    fontSize: 12,
    color: '#afafaf'
  },

  progress: {
    padding: '0 16px'
  }
}));

const ProgressBar = ({value}) => <div style={{display: 'flex', backgroundColor: '#d2baf3', margin: '8px 0 22px;'}}>
  <div style={{position: 'relative', height: 4, width: `${value}%`, backgroundColor: '#6000ef'}}>
    <span style={{position: 'absolute', top: 6, right: 0}}>{value}</span>
  </div>
</div>;


const Nav = () => {
  const [user, setUser] = useState(DATA);
  const classes = useStyles();

  return (<div className={classes.wrapper}>
    <div className={classes.profileWrapper}>
      <div className={classes.flexWrapperSpaceAround}>
        <RoundedDivs data={{'unit': 'kg', 'data': DATA.weight_kg}}/>
        <div className={classes.picture}>
          Picture
        </div>
        <RoundedDivs data={{'unit': 'cm', 'data': DATA.height_cm}}/>
      </div>
      <Typography variant="span" className={classes.userName}>{DATA.first_name} {DATA.last_name}</Typography>
      <Divider className={classes.divider}/>
    </div>
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
      <div className={classes.progress}>
        <ProgressBar value={87}/>
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
