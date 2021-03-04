import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
//import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import SnackBar from "../../../shared/snackbar/snackbar.jsx";
import PlusButton from '../../../shared/buttons/plusButton/plusButton.jsx'
import SmallNumberPicker from '../../../shared/pickers/number/smallNumPicker/smallNumPicker.jsx';

import RecipeCard from "../../../shared/card/recipeCard";

//import StaticDatePicker from '../../pickers/date/staticDatePicker.jsx'

import StaticDatePicker from '../datePicker/staticDatePicker.jsx'
import RecipeDialog from '../pickRecipe/pickRecipeDialog.jsx'
import ShoppingList from '../shoppingList/src/components/App.js'
import ShoppingListContainer from '../shoppingListContainer/index/container';
import Divider from '@material-ui/core/Divider';

import styles from './styles.jsx';

import { TransitionProps } from '@material-ui/core/transitions';
//import { render } from 'react-dom'
window.React = React;
// test

const useStyles = styles;

/* const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
}); */

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CreatePlanDialog({ onReceiptSave }) {

  const classes = useStyles();
  const [open, setOpen] = useState(true); // set false when not testing
  const [recipesOpen, setRecipesOpen] = useState(false); // set false when not testing

  // state for input fields
  const [state, setState] = useState({
    recipies: [],
    //  date: new Date()
  });

  // displaying server messages
  const [message, setMessage] = useState({});

  const [date, setDate] = useState(new Date());

  // for circular loader when scraping receipt
  const [isLoading, setLoading] = useState(false);


  const [inputError, setInputError] = useState({
    importUrl: false,
    title: false,
    ingredients: false
  });


  const onInputchange = (event) => {
    // sets state from by deriving the name of the input field when user entering input
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
    // removes error when text field is edited
    setInputError({ ...inputError, [event.target.name]: false });
  }

  const onNumPickerChange = (value) => {
    //setPersons(value)
    setState({ // individual state must be used here
      ...state,
      numPicker: value
    });
  }

  const handleSetNewRecipe = (recipe) => {
    recipe.date = date;
    setState({ ...state, recipies: [...state.recipies, recipe] })
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    // Clearing states and messages

    setState({
      recipies: [],
      date: new Date()
    })
    setMessage({})
    setOpen(false);
  };


  const handleSaveReceipt = () => {
    console.log('Saved')
    console.log(state.recipies.flatMap(recipe => recipe.ingredients))
    console.log(state)
  }

  return (
    <div style={{ position: 'relative' }}>
      <span onClick={handleClickOpen}><PlusButton /></span>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Opret madplan
            </Typography>
            <Button autoFocus color="inherit" onClick={handleSaveReceipt}>
              gem
            </Button>
          </Toolbar>
        </AppBar>


        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
          //spacing={10}
          className={classes.mainGrid}
        >

          <Grid style={{
            margin: '0 20px 0 20px'
          }} item >
                  <span className={classes.daysSelect}>
                    <StaticDatePicker hasDbClicked={setRecipesOpen} pickedDate={d => setDate(d)} selectedMeals={state.recipies} />
                  </span>
                <TextField label="Navn på madplan" style={{
                  margin: '0px 0 30px 40px',
                  maxWidth: 300
                }} />
          </Grid>



          <Grid style={{
            margin: '20px 0 0 0'
          }} item>

            <Grid container spacing={4} >


              {state.recipies
                .map((recipe: any, index) => (
                  <Grid
                    key={recipe._id}
                    item>
                    <RecipeCard
                      recipe={recipe}
                      clikedDish={id => id}
                      visitFromCreatePlan={false}
                      visitFromCreatePlanMealList={true}
                      dialogOpen={bool => bool}
                    />
                  </Grid>
                ))}

            </Grid>


          </Grid>



          <RecipeDialog
            visible={recipesOpen}
            setVisible={setRecipesOpen}
            chosenRecipe={handleSetNewRecipe}
          />


        </Grid>
        {message.msg ? <SnackBar key={message.key} type={message.type} message={message.msg} /> : null}

        <ShoppingListContainer>
          <ShoppingList ingredientArray={state?.recipies[state.recipies.length - 1]?.ingredients} />
        </ShoppingListContainer>
      </Dialog>

    </div>
  );
}
