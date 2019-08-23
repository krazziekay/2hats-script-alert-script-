import React from 'react';
import Nav from './Nav';
import Content from './Content';
import AddBtn from './AddBtn';
import { makeStyles } from '@material-ui/core/styles';

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
    },
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
    <div className={classes.rightNav}>
      <Content/>
    </div>
    <AddBtn/>
  </div>);
}

export default Body;
