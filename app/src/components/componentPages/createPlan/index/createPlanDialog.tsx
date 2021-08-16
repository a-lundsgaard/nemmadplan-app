import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import InputBase from '@material-ui/core/InputBase';
import { v4 as uuid } from 'uuid';
import SnackBar from "../../../shared/snackbar/snackbar.jsx";
import PlusButton from '../../../shared/buttons/plusButton/plusButton.jsx'
import SmallNumberPicker from '../../../shared/pickers/number/smallNumPicker/smallNumPicker.jsx';

import RecipeCard from "../../../shared/card/recipeCard";
import StaticDatePicker from '../datePicker/staticDatePicker.jsx'
import RecipeDialog from '../pickRecipe/pickRecipeDialog.jsx'
import ShoppingList from '../shoppingList/src/components/App'
import ShoppingListContainer from '../shoppingListContainer/index/container';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import styles from './styles.jsx';
import { TransitionProps } from '@material-ui/core/transitions';
import HTTP from '../../../../HTTP/http';

// defining react as global
window.React = React;

const useStyles = styles;
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface Props {
  onMealPlanSave: (id: string) => void;
}

export default function CreatePlanDialog({ onMealPlanSave }: Props ) {

  const classes = useStyles();
  const [open, setOpen] = useState(false); // set false when not testing
  const [recipesOpen, setRecipesOpen] = useState(false); // set false when not testing

  // state for input fields
  const [state, setState] = useState({
    recipies: [],
    //  date: new Date()
  });

  const [ingredientsWithUpdatedAmounts, setIngredientsWithUpdatedAmounts] = useState([]);
  const [ingredientsToDelete, setIngredientsToDelete] = useState([]);
  const [ingredientsToAdd, setIngredientsToAdd] = useState([]);
  const [recipeToSwap, setRecipeToSwap] = useState(null);
  const [mealPlanTitle, setMealPlanTitle] = useState('');


  // displaying server messages
  const [message, setMessage] = useState({});
  const [date, setDate] = useState(new Date());


  const [inputError, setInputError] = useState({
    importUrl: false,
    title: false,
    ingredients: false
  });


  function handleDeleteRecipeFromPlan(idOfDeletedDish: string) {
    console.log(idOfDeletedDish);

    const newState = state.recipies.filter((recipe: { listId: string }) => {
      if (recipe.listId == idOfDeletedDish) {
        setIngredientsToDelete(recipe.ingredients);
      }
      return recipe.listId !== idOfDeletedDish
    });
    setState({ ...state, recipies: newState });
  }



  // adding new recipe to plan - rename function
  function handleAddNewRecipeToPlan(newRecipe) {
    console.log(newRecipe)
    newRecipe.date = date;
    newRecipe.listId = uuid();
    newRecipe.ingredients = addIdToEachIngredient(newRecipe.ingredients)

    function addIdToEachIngredient(ingredientArray: any) {
      return ingredientArray.map((ingredient) => {
        return { ...ingredient, id: uuid() }
      })
    }
    // h

    const newRecipeArrayWithSwappedDish = state.recipies;

    if (recipeToSwap) {
      const index = state.recipies.findIndex(recipe => recipe.date === recipeToSwap.date);
      setIngredientsToDelete(recipeToSwap.ingredients);
      newRecipeArrayWithSwappedDish.splice(index, 1, newRecipe);
      setIngredientsToAdd(newRecipe.ingredients)
      setState({ ...state, recipies: newRecipeArrayWithSwappedDish });
      return;
    }

    for (const [i, oldRecipe] of state.recipies.entries()) {

      if (oldRecipe.date.toISOString() === newRecipe.date.toISOString()) {

        console.log('Duplicate date found : ', oldRecipe.name, newRecipe.name, i, newRecipe.date, newRecipeArrayWithSwappedDish)

        if (oldRecipe._id !== newRecipe._id) {
          setIngredientsToDelete(newRecipeArrayWithSwappedDish[i].ingredients);
          //newRecipe.date = oldRecipe.date;
          newRecipeArrayWithSwappedDish.splice(i, 1, newRecipe);

          console.log('Duplicate date found : ', oldRecipe.name, newRecipe.name, i, newRecipe.date, newRecipeArrayWithSwappedDish)
          //newRecipeArrayWithSwappedDish.slice().sort((a: any, b: any) => a.date - b.date) // sorting by date
          setIngredientsToAdd(newRecipe.ingredients)
          setState({ ...state, recipies: newRecipeArrayWithSwappedDish });

          return;
        } else {
          return;
        }
      }
    }


    setIngredientsToAdd(newRecipe.ingredients)
    setState({ ...state, recipies: [...state.recipies, newRecipe] })

  }



  function handleRecipePersonCountChange(originalPersonCountOnRecipe, newPersonCount, listId): void {
    //const ingredientItemsThatHaveChangedAmount = [];
    // updating amount on ingredient
    const newRecipeState = state.recipies.map((recipe) => {
      if (recipe.listId === listId) {
        //alert('Found recipe')
        const newIngredientArray = recipe.ingredients.map((ingredient) => {
          //for(const ingredient of recipe.ingredients) {
          const newQuantityCalculation = (ingredient.quantity / originalPersonCountOnRecipe) * newPersonCount;
          return { ...ingredient, quantity: newQuantityCalculation }
        })
        setIngredientsWithUpdatedAmounts(newIngredientArray)
        return { ...(recipe as object), persons: newPersonCount, ingredients: newIngredientArray }
      }
      return recipe;
    })

    setState({ ...state, recipies: newRecipeState })
    //setIngredientsWithUpdatedAmounts(ingredientItemsThatHaveChangedAmount)
  }




  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCloseAndClearState = () => {
    /*      setState({
          recipies: [],
          //date: new Date()
        })  */
    setMessage({})
    setOpen(false);
  };


  function handleSaveRecipe() {

    console.log('Saved')
    console.log(state.recipies.flatMap(recipe => recipe.ingredients))
    console.log(state)
    //alert(weekPlanTitle)
    console.log(mealPlanTitle);

    if (!mealPlanTitle) {
      setMessage({ msg: 'Angiv et navn for madplanen', type: 'error', key: Math.random() })
      return;
    }

    function transformTodosToIngredients(todos) {
      return todos.map((todo) => {
        return { name: todo.task, quantity: todo.quantity, unit: todo.unit }
      })
    }

    function transformRecipiesToDayPlan(recipes) {
      return recipes.map((recipe) => {
        return {
          day: recipe.date,
          persons: recipe.persons,
          dish: recipe._id
        }
      })
    }

    const requestBody = HTTP.recipes.saveWeekPlan('name', {
      name: mealPlanTitle,
      customShoppingList: transformTodosToIngredients(window.store.getState().sales),
      plan: transformRecipiesToDayPlan(state.recipies)
    })


    console.log('retur', requestBody)
    HTTP.post(requestBody)
      .then(res => {
        onMealPlanSave(Date.now())

        console.log('retur:', res);
        setMessage({ msg: `Madplanen "${mealPlanTitle}" blev gemt`, type: 'success', key: Math.random() })
        //const { data: { scrapeReceipt: { _id, name, text, persons, source, image, ingredients } } } = res;
      })
      .catch(error => {
        //  console.log(error)
        setMessage({ msg: error.message, type: 'error', key: Math.random() })
      })
  }




  return (
    <div style={{ position: 'relative' }}>
      <span onClick={handleClickOpen}><PlusButton /></span>
      <Dialog fullScreen open={open} onClose={handleCloseAndClearState} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleCloseAndClearState} aria-label="close">
              <CloseIcon />
            </IconButton>



            <div className={classes.title}>
              <Typography variant="h6" style={{
                margin: '0 0 0 0'
              }} >
                Opret madplan
              </Typography>


              <div className={classes.search}>
                <InputBase
                  placeholder="titel…"
                  onChange={(e) => setMealPlanTitle(e.target.value)}
                  // onBlur={storeSearchInputToRedux}
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ 'aria-label': 'search' }}
                />
              </div>

            </div>


            <Button autoFocus color="inherit" onClick={handleSaveRecipe}>
              gem
            </Button>
          </Toolbar>
        </AppBar>



        <div style={{
          display: 'flex',
          height: '100%',
          overflow: 'hidden'
        }}
        >
          <div style={{
            padding: '0 30px 0 20px',
            display: 'block',
            bottom: '0px',
            boxShadow: "0px 0px 7px 1px #aaaaaa94",
          }}  >
            <span className={classes.daysSelect}>
              <StaticDatePicker hasDbClicked={setRecipesOpen} pickedDate={d => { console.log(d); return setDate(d) }} selectedMeals={state.recipies} />
            </span>

            <span style={{
              display: 'flex'
            }}>
              <TextField label="Tilføj hurtig ret" style={{
                margin: '10px 0 0px 10px',
                maxWidth: 300
              }} />
              <IconButton size='medium' edge='start' aria-label="add" style={{ margin: '19px 0 0 0' }}>
                <AddCircleOutlineIcon />
              </IconButton>
            </span>
          </div>

          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
            //spacing={10}
            className={classes.mainGrid}
          >

            {
              //state.recipies.length === 0 && <h1>Vælg retter ved at dobbeltklikke på en dato</h1>
            }

            <Grid className={classes.recipeCardGrid} item>

              <Grid container spacing={3} >
                {
                  state.recipies && state.recipies
                    //state.recipies
                    .sort((a: any, b: any) => a.date - b.date) // sorting by date
                    .map((recipe: any) => (
                      <Grid
                        key={recipe.listId} // do not use index as we are changing the order of the recipies
                        item>
                        <RecipeCard
                          recipe={recipe}
                          clikedDish={handleDeleteRecipeFromPlan}
                          visitFromCreatePlan={false}
                          visitFromCreatePlanMealList={true}
                          dialogOpen={setRecipesOpen}
                          customDate={recipe.date.toISOString()}
                          swappedRecipe={setRecipeToSwap}
                        >
                          <SmallNumberPicker
                            unit={'personer'}
                            quantity={recipe.persons}
                            listId={recipe.listId}
                            onCountChange={({ count, listId }) => handleRecipePersonCountChange(recipe.persons, count, listId)}
                          />
                        </RecipeCard>
                      </Grid>
                    ))}
              </Grid>


            </Grid>

            <RecipeDialog
              recipies={state.recipies}
              visible={recipesOpen}
              setVisible={(bool) => { setRecipesOpen(bool); setRecipeToSwap(null); }}
              chosenRecipe={handleAddNewRecipeToPlan}
            />

          </Grid>

        </div>
        {message.msg ? <SnackBar key={message.key} type={message.type} message={message.msg} /> : null}

        <ShoppingListContainer>
          <ShoppingList ingredientArray={ingredientsToAdd} updateAmountOnIngredients={ingredientsWithUpdatedAmounts} ingredientsToDelete={ingredientsToDelete} />
        </ShoppingListContainer>
      </Dialog>

    </div>
  );
}

//state?.recipies[state.recipies.length - 1]?.ingredients