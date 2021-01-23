import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';


//import Recipes from 'Pages/receipts/receipts.jsx';

import Recipes from '../../../../pages/recipies/recipies.jsx';
import SearchBar from '../../../shared/searchBar/searchBar1'




const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'fixed',
    background: '#c24e00', // dark orange
    marginBottom: 60
  },

  mainGrid: {
    marginTop: -20
  },

  importButton: {
    marginLeft: 20
  },  
  
  urlField: {
    marginBottom: 20
  },

  imageInputField: {
    marginTop: 20,
    maxWidth: 280,
    width: "100%"
  },


  importUrlInput: {
    maxWidth: 500,
    width: "100%"
  },

  textAreaGrid: {
    marginTop: 32,
  },

  ImageUploader: {
    cursor: 'pointer'
  },


  ingredientTextField: {
    maxWidth: 300,
    width: "100%"
  },

  prepareTextField: {
    minWidth: 400,
    
  },

  numPicker: {
    marginTop: 20
  },

  title: {
    marginLeft: theme.spacing(2),
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});




export default function FullScreenDialog({visible, setVisible, chosenRecipe, ...props}) {

  const classes = useStyles();
  const [open, setOpen] = useState(visible); // set false when not testing


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

  useEffect(()=>{
    setOpen(visible)
}, [visible])


/*  useEffect(()=>{
      console.log(props.closeDialog)
}, [props.closeDialog])*/



  return (
    <div style={{zIndex: 999}}>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
       <Typography variant="h6" className={classes.title}>
           Vælg opskrift
            </Typography>
            <SearchBar/>
     
          </Toolbar>
        </AppBar>
        <div style={{marginTop: 70}}>
            <Recipes 
            onClick={recipe => chosenRecipe(recipe)} 
            visitFromCreatePlan={true}
            dialogOpen={bool => setVisible(bool) }
            />
        </div>
       </Dialog>
    </div>
  );
}
