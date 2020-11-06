import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import PlusButton from 'Components/buttons/plusButton/plusButton'

import SnackBar from "Components/snackbar/snackbar";
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import CategorySelect from 'Components/select/categorySelect.jsx'
import SmallNumberPicker from 'Components/pickers/number/smallNumPicker/smallNumPicker.jsx'
import StaticDatePicker from 'Components/pickers/date/staticDatePicker.jsx'
import Paper from '@material-ui/core/Paper';

import HTTP from '../../HTTP/http';
import RecipeDialog from './recipeDialog'

import SaveIcon from '@material-ui/icons/Save';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import ShoppingList from 'Components/shoppingList/src/components/App.js'

import recipes from '../../HTTP/queries/recipes';
import { tr } from 'date-fns/esm/locale';
import { set } from 'lodash';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
    background: '#c24e00' // dark orange
  },

  paper: {
    padding: "15px 40px 0 40px"
  },

  
  shoppingList: {
    padding: "15px 40px 0 40px",
    width: 400
  },

  mainGrid: {
    marginTop: -5
  },

  importButton: {
    marginLeft: 20
  },

  daysSelect: {
    marginLeft: 20,
  },


  imageInputField: {
    marginTop: 20,
    maxWidth: 280,
    width: "100%"
  },


  importUrlInput: {
    maxWidth: 280,
    marginBottom: 20,
    width: "100%"
  },

  textAreaGrid: {
    marginTop: 20,
    width: 'fit-content'
   // minWidth: 400
  },

  recipeFoodPlanImage: {
    maxWidth: 80,
    height: 'auto',
    marginRight: 8
  },




  numPicker: {
    marginTop: 1
  },

  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});




export default function FullScreenDialog({ onReceiptSave }) {

  const classes = useStyles();
  const [open, setOpen] = useState(true); // set false when not testing
  const [recipesOpen, setRecipesOpen] = useState(false); // set false when not testing

  // state for input fields
  const [state, setState] = useState({
    recipes: [],
    date: new Date()
  });

  // displaying server messages
  const [message, setMessage] = useState({});

  // for circular loader when scraping receipt
  const [isLoading, setLoading] = useState(false);


  const [inputError, setInputError] = useState({
    importUrl: false,
    title: false,
    ingredients: false
  });



  useEffect(() => {
    // console.log('Recipe Dialog changed: ' + recipesOpen)
  }, [recipesOpen]);


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
    setState({
      ...state,
      numPicker: value
    });
  }

  const handleSetNewRecipe = (recipe) => {
    //if(!state.recipes) state.recipes = [recipe];
    // console.log('Found old array: ' + JSON.stringify(oldRecipeArray))
    //const newRecipeArray = oldRecipeArray[1] ? [recipe] : [...state.recipes, recipe]
    // let arr;
    //if(!state.recipes[0].name) {

    //}


    // let arr = state.recipes[0] === null? [recipe] : [...state.recipes, recipe]
    recipe.date = state.date;
    setState({ ...state, recipes: [...state.recipes, recipe] })
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    // Clearing states and messages
    setState({
      recipes: [],
      date: new Date()
    })
    setMessage({})
    setOpen(false);
  };



  const handleSaveReceipt = () => {
    console.log('Saved')
    console.log(state)
  }

  return (
    <div>
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
          spacing={10}
          className={classes.mainGrid}
        >

          <Grid item >
            <List>
              <div>
                <ListItem>
                  <span className={classes.daysSelect}>
                    <StaticDatePicker hasDbClicked={setRecipesOpen} pickedDate={d => setState({ ...state, date: d })} />
                    <span style={{ display: "flex" }}>
                      <CategorySelect label={'Vælg ret'} />
                      <IconButton>
                        <AddCircleOutlineIcon fontSize="large" />
                      </IconButton>
                    </span>
                  </span>
                </ListItem> )

          </div>
            </List>

          </Grid>

          <Grid item className={classes.textAreaGrid}>
            <Paper className={classes.paper} elevation={3} >
              <TextField name="importUrl" id="standard-basic" label="Navn på madplan*"
                error={inputError.importUrl}
                onChange={onInputchange}
                className={classes.importUrlInput}
                value={state.importUrl}
              />
              <List>

                {
                  state.recipes.map((recipe) =>
                    <div key={recipe._id}>
                      <h3>Mandag d. 12 okt</h3>
                      <span style={{ display: "flex" }}>

                        <img className={classes.recipeFoodPlanImage} src={recipe.image} />
                        <span>
                          <strong>{recipe.name}:</strong>
                        </span>

                        <SmallNumberPicker />
                      </span>
                    </div>
                  )
                }

              </List>
            </Paper>

          </Grid>




          <Grid item className={classes.textAreaGrid}>

              <ShoppingList ingredientArray={state.recipes.flatMap(recipe => recipe.ingredients)}/>

          </Grid>


          {recipesOpen ? <RecipeDialog
            visible={recipesOpen}
            setVisible={setRecipesOpen}
            chosenRecipe={handleSetNewRecipe}
          /> : null}


        </Grid>
        {message.msg ? <SnackBar key={message.key} type={message.type} message={message.msg} /> : null}

      </Dialog>





    </div>
  );
}
