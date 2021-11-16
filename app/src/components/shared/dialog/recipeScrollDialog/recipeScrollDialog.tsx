import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import IngredientListing from './ingrdientListing';
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
    borderRadius: 25
  },

  list: {
    //  display: "inline-block"
  },

  root: {
    "& .MuiPaper-rounded": {
      borderRadius: 25
    },
    fontSize: 20
  }


}));


export default function ScrollDialog(props) {

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
        <DialogTitle id="scroll-dialog-title">{props.title}</DialogTitle>
        <DialogContent
          dividers={scroll === 'paper'}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
            className={classes.receiptText}
            component={'div'}
          >

            <Grid container spacing={4}>

              <Grid item xs={6} >
                <img className={classes.image} src={props.image || placeholder} />
                <IngredientList ingredients={props.ingredients} originalPersonCount={props.persons} />

              </Grid>
              <Grid item xs={6}>
                <p>{props.text}</p>
              </Grid>
            </Grid>

          </DialogContentText>

        </DialogContent>
        <DialogActions>
          <Button color="primary">
            Redigér
          </Button>
          <Button onClick={handleClose} color="primary">
            Luk
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
