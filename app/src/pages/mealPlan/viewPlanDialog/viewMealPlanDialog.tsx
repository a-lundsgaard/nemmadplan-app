import React, { useEffect, useState, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import useStyles from './styles'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import EditIcon from '@material-ui/icons/Edit';
import Recipes from '../../recipies/recipies';

import MealPlanShoppingListDialog from './shoppingList/mealPlanShoppingList';
import { MealPlan } from '../mealPlanCard/types';

import ShoppingList from '../../../components/componentPages/createPlan/shoppingList/src/components/App';



const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface Props {
  visible: boolean,
  setVisible: (bool: boolean) => boolean;
  chosenRecipe: (id: string) => string;
  mealPlan: MealPlan
}

export default function ViewMealPlanDialogFullScreen({ visible, setVisible, chosenRecipe, mealPlan, ...props }: Props) {

  const classes = useStyles();
  const [open, setOpen] = useState(visible); // set false when not testing

  const [shopListOpen, setShopListOpen] = useState(false); // set false when not testing

  

  // displaying server messages
  const [message, setMessage] = useState({});

  // for circular loader when scraping receipt
  const [isLoading, setLoading] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    // Clearing states and messages
    /*  setState({
        numPicker: 1
      })*/
    setMessage({})
    setVisible(false)
    setOpen(false);
  };

  useEffect(() => {
    setOpen(visible)
  }, [visible])

  useEffect(() => {
    console.log('Found custom shop list: ', mealPlan.customShoppingList)

  }, [])


  /*  useEffect(()=>{
        console.log(props.closeDialog)
  }, [props.closeDialog])*/



  return (
    <div style={{ zIndex: 999 }}>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {mealPlan.name}
            </Typography>
            <IconButton onClick={()=> setShopListOpen(true)} edge="start" color="inherit" aria-label="close">
              <ShoppingCartIcon />
            </IconButton>
            <IconButton edge="start" color="inherit" aria-label="close">
              <EditIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        <MealPlanShoppingListDialog
          title={'Indkøbsliste'}
          visible={shopListOpen}
          onOpenChange={(bool) => setShopListOpen(bool)}
        >
          <ShoppingList
          excludeTitle={true}
         //ingredientArray={mealPlan.customShoppingList}
          defaultItems={mealPlan.customShoppingList}
          />
        </MealPlanShoppingListDialog>

        <span style={{ marginTop: 70 }}>
          <Recipes
            getRecipesFromParent={mealPlan.plan.map((plan) => {
              return { ...plan.dish, date: plan.day }
            })}
            disableSettings={true}
            //recipies={recipes}
            onClick={recipe => chosenRecipe(recipe)}
            visitFromCreatePlan={false}
            dialogOpen={bool => setVisible(bool)}
          />
        </span>
      </Dialog>
    </div>
  );
}
