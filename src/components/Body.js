import React from 'react';
import Nav from './Nav';
import Content from './Content';
import {makeStyles} from '@material-ui/core/styles';
import Divider from "@material-ui/core/Divider";

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
    margin: '0 auto'
  },
  rightNav: {
    width: '70%',
    float: 'left',
    height: '100%',
    [theme.breakpoints.down('xs')]: {
      height: 'unset',
      width: '100%',
      float: 'unset',
    },
  }
}));
const Body = () => {
  const classes = useStyles();

  return (<div className={classes.remainingHeight}>
    <div className={classes.leftNav}>
      <Nav/>
    </div>
    <Divider className={classes.divider}/>
    <div className={classes.rightNav}>
      <Content/>
    </div>
  </div>);
}

export default Body;
