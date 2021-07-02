import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({

  receiptText: {
    whiteSpace: "pre-wrap"
  },

  image: {
    maxWidth: 350
  },

  list: {
    //  display: "inline-block"
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
    setChecked(event.target.checked);
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
    <div>

      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        maxWidth='lg'
      >
        <DialogTitle id="scroll-dialog-title">{props.title}</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>


          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
            className={classes.receiptText}
            component={'div'}
          >

            <img className={classes.image} src={props.image || "https://images.arla.com/recordid/96f498c04e7743fc9e8ca6ea0042c0d8/rejepaella.jpg?crop=(0,1258,0,-524)&w=1269&h=715&ak=6826258c&hm=d1853743"} />

            <Grid container spacing={4}>

              <Grid item xs={6} >
                {props.ingredients.map((ingredient, index) =>
                  <li className={classes.list} key={index} variant={'body2'}>

                    {`${ingredient.quantity || ""} ${ingredient.unit ? ingredient.unit.replace("*", '') : ''} ${ingredient.name}`.trimLeft()}</li>

                )}
              </Grid>

              <Grid item xs={6}>
                <p>{props.text}</p>
              </Grid>



            </Grid>


          </DialogContentText>


        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
