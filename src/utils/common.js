import React from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import ListItem from '@material-ui/core/ListItem';
import Divider from "@material-ui/core/Divider";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Grid from "@material-ui/core/Grid";


const useStyle = makeStyles(theme => ({
  headerText: {
    fontSize: 14,
    color: '#000',
    margin: 0,
  },
  wrapper: {},
  subText: {
    fontSize: 12,
    color: '#afafaf',
    margin: 0
  },
  listWrapper: {
    borderBottom: '1px solid #ccc'
  },
  list: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
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
  picDetailsWrapper: {
    minHeight: 65,
    display: 'table',
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
  },
  pic: {
    height: 65,
    width: 65,
    borderRadius: 4,
    objectFit: 'contain',
    marginRight: 24,
  },
  picDetails: {
    display: 'table-cell',
    verticalAlign: 'middle'
  },
  measurementsBody: {
    display: 'table-cell',
    verticalAlign: 'middle'
  },
  mutedText: {
    fontSize: 12,
    color: '#afafaf'
  },
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


export const FoodList = ({data, clickHandler}) => {
  const classes = useStyle();

  return (<>
    {
      data.map(food =>
        <ListItem onClick={() => clickHandler(food)} button className={classes.wrapper}>
          <ListItemAvatar>
            <img className={classes.pic} src={food.photo.thumb} alt="food_pic"/>
          </ListItemAvatar>
          <Grid container className={classes.picDetailsWrapper}>
            <Grid item xs={12} className={classes.picDetails}>
              {food.brand_name_item_name ?
                <>
                  <span>{food.brand_name_item_name}</span><br/>
                  <span className={classes.mutedText}>{food.food_name}</span>
                </> :
                <>
                  <span>{food.food_name}</span>
                </>
              }
            </Grid>
          </Grid>
        </ListItem>
      )
    }
  </>);
}