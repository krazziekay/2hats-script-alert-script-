import React, {useEffect, useRef, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
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
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Fade from '../utils/Fade';
import Typography from '@material-ui/core/Typography';
import AddBtn from './AddBtn';
import Modal from './Modal';
import DATA from './../constants';
import {RoundedDivs} from "../utils/common";

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
    [theme.breakpoints.down('xs')]: {
      minWidth: 'unset',
      width: '100%',
      margin: '0 auto',
      paddingBottom: 0
    },
  },
  profileWrapper: {
    textAlign: 'center',
    display: 'none',
    [theme.breakpoints.down('xs')]: {
      display: 'block',
      width: '100%',
    },
  },
  flexWrapperSpaceBetween: {
    padding: 16,
    display: 'flex',
    justifyContent: 'space-between',
  },
  flexWrapperSpaceAround: {
    padding: 16,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  formInput: {
    display: 'flex',
    width: '100%',
    position: 'relative',
    zIndex: 6,
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
  },
  dayPicker: {
    marginTop: 12,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'transparent',
    color: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    [theme.breakpoints.down('xs')]: {
      marginTop: 0,
      backgroundColor: '#fff',
      color: '#000',
      padding: '14px 0 0'
    },
  },
  picture: {
    marginRight: '8%',
    borderRadius: '50%',
    height: 64,
    width: 64,
    background: '#fff'
  },
  todayIcon: {
    color: '#fff',
    padding: 10,
    [theme.breakpoints.down('xs')]: {
      color: '#6100ee'
    },
  }
}));


const Header = ({}) => {
  const classes = useStyles();
  const [search, setSearch] = useState('');
  const [selectedFood, setSelectedFood] = useState('');
  const [modal, setModal] = useState(false);
  const [searchList, setSearchList] = useState({display: false, list: []});
  const searchRef = useRef();

  /**
   * Set focus on the search text field
   */
  const focusSearch = () => {
    searchRef.current.focus();
  };


  /**
   * Function to fetch the data
   */
  const fetch = () => {
    console.log("Fetch new data");
  };

  /**
   * Function to handle the changes in Search input field
   * @param e
   */
  const handleChange = (e) => {
    e.persist();
    setSearchList(current => {
      let clone = {...current};
      clone.display = true;
      clone.list = [{id: 1, name: e.target.value}];
      return clone;
    });

  };

  /**
   * Function to remove the search List
   */
  const clearFade = () => {
    setSearchList(current => {
      let clone = {...current};
      clone.display = false;
      return clone;
    });
    toggleModal(false);
  };


  /**
   * Function to toggle the modal view
   */
  const toggleModal = (status) => {
    setModal(status);
  };


  /**
   * Function to open the modal to add a new item
   * @param food
   */
  const addFoodItem = (food = DATA.data_points[1].intake_list[0]) => {
    setSelectedFood(food);
    toggleModal(true);
  };

  return (
    <AppBar position="static">
      {
        searchList.display &&
        <>
          <Fade clearFade={clearFade}/>
          {
            modal && <Modal selectedFood={selectedFood} refetch={fetch} closeModal={toggleModal}/>
          }
        </>
      }
      <Toolbar
        className={classes.toolbar}>

        <Paper className={classes.formInput}>
          <IconButton className={classes.iconButton} aria-label="menu">
            <Search/>
          </IconButton>
          <InputBase
            fullWidth
            inputRef={searchRef}
            onChange={handleChange}
            placeholder={`Search foods...`}
          />
          {
            searchList.display &&
            <List className={classes.list}>
              <ListItem button onClick={() => addFoodItem()}>
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

        <div className={classes.profileWrapper}>
          <div className={classes.flexWrapperSpaceBetween}>
            <div className={classes.flexWrapperSpaceAround}>
              <div className={classes.picture}>
                Picture
              </div>
              <Typography variant="h6">{DATA.first_name}</Typography>
            </div>
            <div className={classes.flexWrapperSpaceAround}>
              <RoundedDivs data={{'unit': 'kg', 'data': DATA.weight_kg}}/>
              <RoundedDivs data={{'unit': 'cm', 'data': DATA.height_cm}}/>
            </div>
          </div>
        </div>

        <div className={classes.dayPicker}>
          <IconButton className={classes.todayIcon}><LeftArrow/></IconButton>
          <Typography variant="h5">Today</Typography>
          <IconButton className={classes.todayIcon}><RightArrow/></IconButton>
        </div>
      </Toolbar>

      <AddBtn clickHandler={focusSearch}/>

    </AppBar>);
};

export default Header;
