import React from 'react';
import { makeStyles } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/core/SvgIcon/SvgIcon";
import List from "@material-ui/core/List";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles(theme => ({}));

const CustomizedListItem = () => <ListItem>
  <ListItemAvatar>
    <Avatar>
      <ImageIcon/>
    </Avatar>
  </ListItemAvatar>
  <Grid container>
    <Grid item xs={12}>
      <Grid container>
        <Grid xs={10}>
          <p>First Item</p>
          <p>Second Item</p>
        </Grid>
        <Grid className="right-align" xs={2}>
          <p>First Item</p>
          <p>Second Item</p>
        </Grid>
      </Grid>
      <Divider/>
    </Grid>
  </Grid>
</ListItem>;

const Content = () => {
  const classes = useStyles;

  return (<div>
    <List>
      <CustomizedListItem img={<ImageIcon/>} data={''}/>
      <CustomizedListItem img={<ImageIcon/>} data={''}/>
    </List>
  </div>);
};

export default Content;
