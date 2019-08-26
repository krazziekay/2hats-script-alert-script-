import React from 'react';
import {makeStyles} from "@material-ui/core";
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import Divider from "@material-ui/core/Divider";
import { roundOff} from "../utils/helperFunctions";

const useStyles = makeStyles(theme => ({
  nullPlaceholder: {
    textAlign: 'center',
    fontSize: 24,
    padding: 24,
    color: '#afafaf'
  },
  pic: {
    height: 65,
    width: 65,
    borderRadius: 4,
    objectFit: 'contain',
    marginRight: 24,
  },
  mutedText: {
    marginTop: 0,
    fontSize: 14,
    color: '#afafaf',
    textTransform: 'capitalize'
  },
  headerText: {
    marginBottom: 0,
    textTransform: 'capitalize'
  },
}));


const CustomizedListItem = ({classes, data}) => <ListItem>
  <ListItemAvatar>
    <img className={classes.pic} src={data.thumb} alt="food_pic"/>
  </ListItemAvatar>
  <Grid container>
    <Grid item xs={12}>
      <Grid container>
        <Grid xs={10}>
          <p className={classes.headerText}>{data.food_name}</p>
          <p className={classes.mutedText}>{data.serving_unit} ({roundOff(data.serving_weight_grams)}g)</p>
        </Grid>
        <Grid className="right-align" xs={2}>
          <p className={classes.headerText}>{roundOff(data.nf_calories)} cal</p>
          <p className={classes.mutedText}>{data.meal_type}</p>
        </Grid>
      </Grid>
      <Divider/>
    </Grid>
  </Grid>
</ListItem>;

const Content = ({intake}) => {
  const classes = useStyles();

  return (<div>
    <List>
      {
        intake && intake.intake_list.length ? intake.intake_list.map(intake =>
            <CustomizedListItem classes={classes} data={intake}/>
          ) :
          <div className={classes.nullPlaceholder}>
            No plans yet!
          </div>
      }
    </List>
  </div>);
};

export default Content;
