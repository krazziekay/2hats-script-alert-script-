import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles(theme => ({
  fab: {
    position: 'fixed',
    bottom: '2%',
    right: '2%'
  }
}));

const AddBtn = () => {
  const classes = useStyles();
  return (<div>
    <Fab color="primary" aria-label="add" className={classes.fab}>
      <AddIcon/>
    </Fab>
  </div>);
};

export default AddBtn;
