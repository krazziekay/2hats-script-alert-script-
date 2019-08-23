import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Search from '@material-ui/icons/Search';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import LeftArrow from '@material-ui/icons/ChevronLeft';
import RightArrow from '@material-ui/icons/ChevronRight';
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import Fade from "../utils/Fade";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  toolbar: {
    padding: '14px 0',
    margin: '0 auto',
    minWidth: 550,
    zIndex: 6,
    [theme.breakpoints.down('xs')]: {
      minWidth: 'unset',
      width: '100%',
      margin: '0 auto',
    },
  },
  formInput: {
    display: 'flex',
    width: '100%',
    position: 'relative',
    [theme.breakpoints.down('xs')]: {
      width: '96%',
    },
  },
  iconButton: {
    padding: 10,
  },
  list: {
    position: 'absolute',
    width: '100%',
    top: 48,
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    boxShadow: ''
  },
  dayPicker: {
    marginTop: 12,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'transparent',
    color: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  todayIcon: {
    color: '#fff',
    padding: 10,
  }
}));


const Header = () => {
  const [search, setSearch] = useState('');
  const [searchList, setSearchList] = useState({ display: false, list: [] });
  const classes = useStyles();

  const handleChange = (e) => {
    e.persist();
    setSearchList(current => {
      let clone = { ...current };
      clone.display = true;
      clone.list = [{ id: 1, name: e.target.value }];
      return clone;
    });

  };

  const clearFade = () => {
    setSearchList(current => {
      let clone = { ...current };
      clone.display = false;
      return clone;
    });
  };

  return (
    <AppBar position="static">
      {
        searchList.display && <Fade clearFade={clearFade}/>
      }
      <Toolbar
        className={classes.toolbar}>


        <Paper className={classes.formInput}>
          <IconButton className={classes.iconButton} aria-label="menu">
            <Search/>
          </IconButton>
          <InputBase
            fullWidth
            className={classes.inputWidth}
            onChange={handleChange}
            placeholder="Search foods..."
          />
          {
            searchList.display &&
            <List className={classes.list}>
              <ListItem button>
                <ListItemAvatar>
                  <Avatar>
                    <ImageIcon/>
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Photos" secondary="Jan 9, 2014"/>
              </ListItem>
            </List>
          }
        </Paper>

        <div className={classes.dayPicker}>
          <IconButton className={classes.todayIcon}><LeftArrow/></IconButton>
          <Typography variant="h5">Today</Typography>
          <IconButton className={classes.todayIcon}><RightArrow/></IconButton>
        </div>
      </Toolbar>
    </AppBar>);
};

export default Header;
