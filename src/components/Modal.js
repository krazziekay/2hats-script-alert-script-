import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Clear from '@material-ui/icons/Clear';
import Divider from "@material-ui/core/Divider";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  modalWrapper: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 6,
    background: '#fff',
    padding: 12,
    minWidth: 300,
  },
  img: {
    height: 86,
    width: 86
  },
  modalHeader: {
    position: 'relative',
    marginBottom: 12
  },
  modalBody: {
    margin: '12px 0',
    display: 'flex',
    justifyContent: 'space-between'
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
    fontWeight: 500
  },
  mutedText: {
    fontSize: 12,
    color: '#afafaf'
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

}));


const Modal = ({selectedFood, refetch, closeModal}) => {
  const classes = useStyles();
  const [foodItem, setFoodItem] = useState(selectedFood);

  const handleChange = (e) => {
    e.persist();
    setFoodItem(food => {
      let clone = {...food};
      clone[e.target.name] = e.target.value;
      return clone;
    });
  };

  const addNewItem = () => {
    console.log("Add", foodItem);
    refetch();
  };

  return (
    <>
      {
        foodItem &&
        <div className={classes.modalWrapper}>
          <div className={classes.modalHeader}>
            <img src={foodItem.thumb} className={classes.img} alt="Item"/> <br/>
            <span>Cheese</span>
            <Clear color="primary" className={classes.crossIcon} onClick={() => closeModal(false)}/>
          </div>
          <Divider/>
          <div className={classes.modalBody}>
            <TextField
              type="number"
              label="Servings"
              name="serving_size"
              className={classes.servingSize}
              value={foodItem.serving_size}
              onChange={handleChange}
              helperText={foodItem.serving_unit}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <div>
              <span className={classes.headerText}>{foodItem.serving_weight_grams}</span><br/>
              <span className={classes.mutedText}>calories</span>
            </div>
            <div>
              <span className={classes.headerText}>{foodItem.nf_calories}</span><br/>
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
                value={foodItem.meal_type}
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
