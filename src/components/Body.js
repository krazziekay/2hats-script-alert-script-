import React, {useEffect, useState} from 'react';
import Nav from './Nav';
import Content from './Content';
import {makeStyles} from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import {isDateSame} from "../utils/helperFunctions";
import moment from 'moment';

const useStyles = makeStyles(theme => ({
  remainingHeight: {
    height: 'calc(100vh - 128px)'
  },
  leftNav: {
    backgroundColor: '#f5f5f5',
    width: '30%',
    float: 'left',
    height: '100%',
    [theme.breakpoints.down('xs')]: {
      height: 'unset',
      width: '100%',
      float: 'unset',
      backgroundColor: '#fff'
    },
  },
  divider: {
    width: '90%',
    margin: '0 auto',
    display: 'none',
    [theme.breakpoints.down('xs')]: {
      display: 'block'
    }
  },
  rightNav: {
    width: '70%',
    float: 'left',
    height: '100%',
    overflowY: 'scroll',
    [theme.breakpoints.down('xs')]: {
      height: 'unset',
      width: '100%',
      float: 'unset',
    },
  }
}));

const Body = ({userData, currentDate}) => {
  const [data, setData] = useState(userData.data_points.filter(d => isDateSame(d.date, moment(currentDate)))[0]);
  const classes = useStyles();

  useEffect(() => {
    setData(userData.data_points.filter(d => isDateSame(d.date, moment(currentDate)))[0]);
  }, [currentDate]);

  return (<div className={classes.remainingHeight}>
    <div className={classes.leftNav}>
      <Nav userDetails={userData} intakeDetails={data}/>
    </div>
    <Divider className={classes.divider}/>
    <div className={classes.rightNav}>
      <Content intake={data}/>
    </div>
  </div>);
}

export default Body;
