import React from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyle = makeStyles(theme => ({
  headerText: {
    fontSize: 14,
    color: '#000',
    margin: 0,
  },
  subText: {
    fontSize: 12,
    color: '#afafaf',
    margin: 0
  },

  measurementsWrapper: {
    borderRadius: '50%',
    background: '#ccc',
    height: 45,
    width: 45,
    display: 'table',
    [theme.breakpoints.down('xs')]: {
      height: 64,
      width: 64,
      marginLeft: '8%'
    },
  },
  measurementsBody: {
    display: 'table-cell',
    verticalAlign: 'middle'
  }
}));


export const RoundedDivs = ({data}) => {
  const classes = useStyle();

  return (<>
      <div className={classes.measurementsWrapper}>
        <div className={classes.measurementsBody}>
          <p className={classes.headerText}>{data.data}</p>
          <p className={classes.subText}>{data.unit}</p>
        </div>
      </div>


    </>
  )
    ;
};