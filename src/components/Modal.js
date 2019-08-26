import React, { useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Clear from '@material-ui/icons/Clear';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {isDateSame, roundOff} from "../utils/helperFunctions";

const useStyles = makeStyles(theme => ({
  modalWrapper: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 10,
    border: '1px solid #ddd',
    background: '#fff',
    padding: 12,
    minWidth: 300,
  },
  img: {
    height: 86,
    width: 86,
    objectFit: 'contain'
  },
  modalHeader: {
    position: 'relative',
    marginBottom: 12,
    color: '#000'
  },
  modalBody: {
    margin: '12px 0',
    display: 'flex',
    justifyContent: 'space-between'
  },
  mutedText: {
    fontSize: 12,
    color: '#afafaf'
  },
  modalFooter: {
    margin: '12px 0'
  },
  crossIcon: {
    cursor: 'pointer',
    position: 'absolute',
    right: 0,
    top: 0
  },
  headerText: {
    fontSize: 24,
    fontWeight: 500,
    color: '#000'
  },

  button: {
    margin: 12,
    float: 'right'
  },
  servingSize: {
    width: '15%'
  },
  formInput: {
    width: '100%',
  },
  capitalize: {
    textTransform: 'capitalize'
  }
}));


const Modal = ({userData, selectedFood, refetch, currentDate, closeModal}) => {
  const classes = useStyles();
  const [foodItem, setFoodItem] = useState(selectedFood);

  /**
   * Handles the changes in form input and calculates the total calories
   * @param e
   */
  const handleChange = (e) => {
    e.persist();
    setFoodItem(food => {
      let clone = {...food};
      clone[e.target.name] = e.target.value;
      if (e.target.name === 'serving_qty') {
        clone.nf_calories = roundOff(parseFloat(food.unit_calories) * parseFloat(e.target.value));
      }
      return clone;
    });
  };

  /**
   * Add a new food item
   */
  const addNewItem = () => {
    let cloneUserData = {...userData};
    cloneUserData.data_points.map(intake => {
      if (isDateSame(intake.date, currentDate)) {
        intake.intake_list.push(
          {
            "food_name": foodItem.food_name,
            "serving_qty": foodItem.serving_qty,
            "serving_unit": foodItem.serving_unit,
            "serving_weight_grams": foodItem.serving_weight_grams,
            "nf_calories": foodItem.nf_calories,
            "serving_size": foodItem.serving_size,
            "meal_type": foodItem.meal_type,
            "thumb": foodItem.photo.thumb
          });
      } else {
        intake[intake.date] = [].concat(
          {
            "food_name": foodItem.food_name,
            "serving_qty": foodItem.serving_qty,
            "serving_unit": foodItem.serving_unit,
            "serving_weight_grams": foodItem.serving_weight_grams,
            "nf_calories": foodItem.nf_calories,
            "serving_size": foodItem.serving_size,
            "meal_type": foodItem.meal_type,
            "thumb": foodItem.photo.thumb
          });
      }
    });
    refetch(cloneUserData);
  };


  return (
    <>
      {
        foodItem &&
        <div className={classes.modalWrapper}>
          <div className={classes.modalHeader}>
            <img src={foodItem.photo.thumb} className={classes.img} alt="food"/> <br/>
            <span className={classes.capitalize}>{foodItem.food_name}</span>
            <Clear color="primary" className={classes.crossIcon} onClick={() => closeModal(false)}/>
          </div>
          <Divider/>
          <div className={classes.modalBody}>
            <TextField
              type="number"
              label="Servings"
              name="serving_qty"
              className={classes.servingSize}
              value={foodItem.serving_qty}
              onChange={handleChange}
              helperText={foodItem.serving_unit}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <div>
              <span className={classes.headerText}>{roundOff(foodItem.serving_weight_grams)}</span><br/>
              <span className={classes.mutedText}>grams</span>
            </div>
            <div>
              <span className={classes.headerText}>{roundOff(foodItem.nf_calories)}</span><br/>
              <span className={classes.mutedText}>calories</span>
            </div>
          </div>
          <Divider/>
          <div className={classes.modalFooter}>
            <FormControl className={classes.formInput}>
              <InputLabel htmlFor="age-simple" className={classes.mutedText}>ADD TO TODAY</InputLabel>
              <Select
                color="primary"
                name="meal_type"
                value={foodItem.meal_type ? foodItem.meal_type : 'breakfast'}
                onChange={handleChange}
              >
                <MenuItem value={'breakfast'}>Breakfast</MenuItem>
                <MenuItem value={'lunch'}>Lunch</MenuItem>
                <MenuItem value={'dinner'}>Dinner</MenuItem>
                <MenuItem value={'snack'}>Snack</MenuItem>
              </Select>
            </FormControl>
          </div>
          <Button variant="contained" onClick={addNewItem} color="primary" className={classes.button}>
            ADD
          </Button>
        </div>
      }
    </>);
};

export default Modal;
