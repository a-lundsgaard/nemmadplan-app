import React, { Fragment, useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';

import listenToSearchInput from 'Redux/helpers/subscribe'
import HTTP from '../../HTTP/http';

import RecipeCard from '../../components/shared/card/recipeCard';

import CreateRecipeDialog from '../../components/componentPages/createRecipe/index/createRecipeDialog';
import ReceiptSceletonLoader from '../../components/shared/loaders/receiptSceletonLoader';
import useStyles from './styles';
import SnackBar from "../../components/shared/snackbar/snackbar";

interface Props {
  onClick: (id: string) => void,
  dialogOpen: (boolean: boolean) => boolean,
  recipies: any,
  getRecipesFromParent: any
}

interface Ingredient {
  unit: string,
  quantity: number,
  name: string
}

export default function ViewRecipes({ onClick, dialogOpen, ...props }: Props) {
  // const [spacing, setSpacing] = React.useState(2);
  const classes = useStyles();

  const [searchString, setSearchString] = useState(window.store.getState().searchInput); // getting search bar input
  const [recipes, setRecipes] = useState([]);
  const [recipesInSearch, setRecipesInSearch] = useState([])
  const [isReceiptSavedOrDeleted, setRecipeSavedOrDeleted] = useState('') // letting us know when a recipe is saved to rerender dishes
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({});
  const [createRecipeDialogOpen, setCreateRecipeDialogOpen] = useState(0);
  const [recipeToUpdate, setRecipeToUpdate] = useState({});

  const [visitFromEditPage, setVisitFromEditPage] = useState(false);

  const lsCount = localStorage.getItem('recipeCount')
  const recipeCount: number = lsCount ? parseInt(lsCount) : 0;

  const handleRecipeCardClick = (id: string) => {
    onClick(id)
  }

  function recipeOnPlan(id: string) {
    return props.recipies ? props.recipies.find((recipe: any) => recipe._id === id) : false;
  }

  useEffect(() => {
    listenToSearchInput(setSearchString) // sets up redux listener on the search input
  }, [])


  // For filtering search results
  useEffect(() => {
    if (!searchString) {
      setRecipesInSearch(recipes);
      return;
    }
    const filteredRecipes = recipes.filter((recipe: any) => {
      const ingredientsString = recipe.ingredients.reduce((a: string, b: Ingredient) => {
        a += b.name
        return a
      }, '')

      if (searchString) {
        return recipe.name.toLowerCase().includes(searchString) || ingredientsString.includes(searchString)
      }
    })
    setRecipesInSearch(filteredRecipes)
  }, [searchString])


  useEffect(() => {
    getRecipes(true)
  }, [isReceiptSavedOrDeleted])

  const handleRecipeSave = (id: string) => {
    //setMessage({ msg: `Retten blev gemt`, type: 'success', key: Math.random() })
    setRecipeSavedOrDeleted(id)
  }

  const handleRecipeDeletion = (id: string) => {
    //setMessage({ msg: `Retten blev slettet`, type: 'success', key: Math.random() })
    setRecipeSavedOrDeleted(id)
  }

  const handleUpdateDish = (recipe) => {
    // dialogOpen(true);  
    setVisitFromEditPage(true)
    setRecipeToUpdate(recipe);
    setCreateRecipeDialogOpen(createRecipeDialogOpen + 1);
  }
/* 
  useEffect(() => {
    if(recipeToUpdate.image) {
      setCreateRecipeDialogOpen(createRecipeDialogOpen + 1); 
      //alert('hii')
    } 
   
  }, [recipeToUpdate.image]) */



  function getRecipes(showLoading: boolean) {
    if (props.getRecipesFromParent) {
      setRecipesInSearch(props.getRecipesFromParent);
      return;
    }

    if (showLoading) setIsLoading(true)

    const token = localStorage.getItem('token');
    const requestBody = HTTP.recipes.getRecipesAndReturnFields('_id name text image createdAt ingredients {name unit quantity} persons', { token: token })

    HTTP.post(requestBody)
      .then(res => {
        setRecipes(res.data.receipts);
        setRecipesInSearch(res.data.receipts);
        localStorage.setItem('recipeCount', JSON.stringify(res.data.receipts.length)) // for loading skeleton recipes
        setIsLoading(false)
      })
      .catch(e =>
        console.log(e)
      )
  }

  return (
    <Grid container className={classes.root} justify="center" component={'div'} >
      <Grid item xs={10}>

        <Grid container justify="center" spacing={5}>
          {
            isLoading ?
              Array(recipeCount).fill(recipeCount)
                .map((receipt, index) => (
                  <Grid key={index} item>
                    <ReceiptSceletonLoader />
                  </Grid>))
              :
              recipesInSearch.map((recipe, index) => {
                return <Grid
                  key={recipe._id}
                  item>
                  <RecipeCard
                    disableSettings={props.disableSettings}
                    recipeOnPlan={recipeOnPlan(recipe._id)}
                    recipe={recipe}
                    clikedDish={id => handleRecipeCardClick(id)}
                    clickedDishToUpdate={recipe => handleUpdateDish(recipe)}
                    visitFromCreatePlan={props.visitFromCreatePlan}
                    dialogOpen={bool => dialogOpen(bool)}
                    onRecipeDelete={id => handleRecipeDeletion(id)}
                    customDate={recipe.date}
                  />
                </Grid>
              })}
        </Grid>
      </Grid>
      { 
        !props.disableSettings &&
        <div className={classes.addReceiptButton} >

          <CreateRecipeDialog
            onReceiptSave={(value) => handleRecipeSave(value)} shouldOpen={createRecipeDialogOpen}
            recipeToUpdate={recipeToUpdate}
            editPage={visitFromEditPage}
            onClose = {() => {
              setRecipeToUpdate({});
              setVisitFromEditPage(false)
            }}
          />
        </div>
      }
      {message.msg ? <SnackBar key={message.key} type={message.type} message={message.msg} /> : null}
    </Grid>



  );
}