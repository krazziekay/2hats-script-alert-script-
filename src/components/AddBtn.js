import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles(theme => ({
  fab: {
    position: 'fixed',
    bottom: '2%',
    right: '2%'
  }
}));

const AddBtn = ({clickHandler}) => {
  const classes = useStyles();


  return (<div>
    <Fab color="primary" aria-label="add" className={classes.fab} onClick={clickHandler}>
      <AddIcon/>
    </Fab>
  </div>);
};

export default AddBtn;
