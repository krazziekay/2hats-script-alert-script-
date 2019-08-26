import React, {useEffect, useRef, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Search from '@material-ui/icons/Search';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import LeftArrow from '@material-ui/icons/ChevronLeft';
import RightArrow from '@material-ui/icons/ChevronRight';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Fade from '../utils/Fade';
import Typography from '@material-ui/core/Typography';
import AddBtn from './AddBtn';
import Modal from './Modal';
import {RoundedDivs, FoodList} from "../utils/common";
import Request from './../services';
import Divider from '@material-ui/core/Divider';
import moment from 'moment';
import {isDateSame, roundOff} from '../utils/helperFunctions';

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
    maxHeight: '80vh',
    overflowY: 'scroll'
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
  },
  mutedText: {
    fontSize: 12,
    paddingLeft: 12,
    color: '#afafaf'
  },
  nullPlaceholder: {
    textAlign: 'center',
    fontSize: 14,
    padding: 14,
    color: '#afafaf'
  },
}));


const Header = ({userData, refetch, changeDate, currentDate}) => {
  const classes = useStyles();
  const [loader, setLoader] = useState(false);
  const [searchedFood, setSearchedFood] = useState('');
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
  const fetch = (userData) => {
    clearFade();
    setSearchedFood('');
    refetch(userData);
  };

  /**
   * Function to handle the changes in Search input field
   * @param e
   */
  const handleChange = (e) => {
    e.persist();
    setLoader(true);
    setSearchedFood(e.target.value);
    Request(`search/instant?query=${e.target.value}`).then(response => {
      setSearchList(current => {
        let clone = {...current};
        clone.display = true;
        clone.list = response.data;
        return clone;
      });
    }).catch(error => {
      console.log('Error', error);
    }).finally(() => {
      setLoader(false);
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
  const addFoodItem = (food) => {
    Request('natural/nutrients', 'POST', {query: food.food_name}).then(response => {
      let foodDetails = response.data.foods[0];
      foodDetails.unit_calories = roundOff(parseFloat(foodDetails.nf_calories) / parseFloat(foodDetails.serving_qty));
      setSelectedFood(foodDetails);
      toggleModal(true);
    }).catch(error => {
      console.log('Error', error);
    });
  };

  return (
    <AppBar position="static">
      {
        searchList.display &&
        <>
          <Fade clearFade={clearFade}/>
          {
            modal &&
            <>
              <Modal userData={userData} currentDate={currentDate} selectedFood={selectedFood} refetch={fetch}
                     closeModal={toggleModal}/>
            </>
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
            name="food_search"
            inputRef={searchRef}
            value={searchedFood}
            onChange={handleChange}
            placeholder={`Search foods...`}
          />
          {
            searchList.display &&
            <List className={classes.list}>
              {loader ? <ListItem><ListItemText primary="Loading"/></ListItem> :
                <>
                  <span className={classes.mutedText}>COMMON</span>
                  {searchList.list.common.length ?
                    <FoodList data={searchList.list.common} clickHandler={addFoodItem}/> :
                    <div className={classes.nullPlaceholder}>
                      No results found!
                    </div>}
                  <Divider/>
                  <>
                    <span className={classes.mutedText}>BRANDED</span>
                    {searchList.list.branded.length ?

                      <FoodList data={searchList.list.branded} clickHandler={addFoodItem}/> :
                      <div className={classes.nullPlaceholder}>
                        No results found!
                      </div>
                    }
                  </>
                </>
              }
            </List>
          }
        </Paper>

        <div className={classes.profileWrapper}>
          <div className={classes.flexWrapperSpaceBetween}>
            <div className={classes.flexWrapperSpaceAround}>
              <div className={classes.picture}>
                <img src={userData.pp} className={classes.picture} alt=""/>
              </div>
              <Typography variant="h6">{userData.first_name}</Typography>
            </div>
            <div className={classes.flexWrapperSpaceAround}>
              <RoundedDivs data={{'unit': 'kg', 'data': userData.weight_kg}}/>
              <RoundedDivs data={{'unit': 'cm', 'data': userData.height_cm}}/>
            </div>
          </div>
        </div>

        <div className={classes.dayPicker}>
          <IconButton className={classes.todayIcon}
                      onClick={() => changeDate(moment(currentDate).subtract(1, 'day').format('YYYY-MM-DD'))}><LeftArrow/></IconButton>
          <Typography variant="h5">
            {isDateSame(currentDate, moment()) ? 'Today' : moment(currentDate).format('D MMM, YY')}
          </Typography>
          <IconButton className={classes.todayIcon}
                      onClick={() => changeDate(moment(currentDate).add(1, 'day').format('YYYY-MM-DD'))}><RightArrow/></IconButton>
        </div>
      </Toolbar>

      <AddBtn clickHandler={focusSearch}/>

    </AppBar>);
};

export default Header;
