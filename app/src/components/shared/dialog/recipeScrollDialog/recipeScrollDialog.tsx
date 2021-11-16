import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import IngredientListing from './ingredientItem/ingrdientListing';
import IngredientList from './ingredientList';

import placeholder from '../../../../../../resources/placeholder.png'


const useStyles = makeStyles((theme) => ({

  receiptText: {
    whiteSpace: "pre-wrap",
    fontSize: '120%',
    color: 'black'
  },

  image: {
    maxWidth: 350,
    width: '100%',
    borderRadius: 15
  },

  list: {
    //  display: "inline-block"
  },

  root: {
    "& .MuiPaper-rounded": {
      borderRadius: 25
    },
    fontSize: 18
  }


}));


export default function ScrollDialog({recipe, recipeToEdit,visitFromCreatePlanMealList, ...props}) {

  const classes = useStyles();


  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
    props.onChange(false)
  };

  useEffect(() => {
    console.log('Found dialog recipe: ', recipe);
    
    setOpen(props.boolean)
  }, [props.boolean])


  const handleCheckBoxChange = (event) => {
    //setChecked(event.target.checked);
  };


  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  // <Button onClick={handleClickOpen('paper')}>scroll=paper</Button>
  //<Button onClick={handleClickOpen('body')}>scroll=body</Button>

  return (
    <div >

      <Dialog
        //style={{borderRadius: 25}}
        className={classes.root}
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        maxWidth='lg'
      >
        <DialogTitle id="scroll-dialog-title">{recipe.name}</DialogTitle>
        <DialogContent
          dividers={scroll === 'paper'}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
            className={classes.receiptText}
            component={'div'}
          >

            <Grid
              container
              spacing={4}

            >
              <Grid item xs={6} >
                <img className={classes.image} src={recipe.image || placeholder} />
                <IngredientList ingredients={recipe.ingredients} originalPersonCount={recipe.persons} />
              </Grid>

              <Grid item xs={6}>
                <strong>Fremgangsmåde:</strong>
                <p>{recipe.text}</p>
              </Grid>
            </Grid>

          </DialogContentText>

        </DialogContent>
        <DialogActions>
          {visitFromCreatePlanMealList && <Button
            onClick={()=> recipeToEdit(recipe)}
            color="primary">
            Redigér
          </Button> }
          <Button onClick={handleClose} color="primary">
            Luk
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
