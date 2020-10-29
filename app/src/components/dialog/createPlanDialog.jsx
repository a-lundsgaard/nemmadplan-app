import React, {useEffect, useState} from 'react';
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



import SaveIcon from '@material-ui/icons/Save';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
    background: '#c24e00' // dark orange
  },

  paper: {
    padding: "15px 40px 0 40px"
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

  
  urlField: {
  },

  imageInputField: {
    marginTop: 20,
    maxWidth: 280,
    width: "100%"
  },


  importUrlInput: {
    maxWidth: 280,
    width: "100%"
  },

  textAreaGrid: {
    marginTop: 20,
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




export default function FullScreenDialog({onReceiptSave}) {

  const classes = useStyles();
  const [open, setOpen] = useState(true); // set false when not testing

  // state for input fields
  const [state, setState] = useState({
    //image: 'https://aosa.org/wp-content/uploads/2019/04/image-placeholder-350x350.png',
    numPicker: 1
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



 /* useEffect(()=> {
    setState({...state, importUrl: 'tester'})
  }, [])*/



  const onInputchange = (event) => {
    // sets state from by deriving the name of the input field when user entering input
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
    // removes error when text field is edited
    setInputError({...inputError, [event.target.name]: false});
  }

  const onNumPickerChange = (value) => {
    //setPersons(value)
   setState({
      ...state,
      numPicker: value
    });
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {

    // Clearing states and messages
    setState({
      numPicker: 1
    })
    setMessage({})
    setOpen(false);
  };



  const handleImportUrl = () => {

    if(isLoading) return; // stops user from sending requests when already loading to get one

    if(!state.importUrl) {
      setInputError({...inputError, importUrl: true})
      return;
    } 

    setLoading(true)

    const requestBody = HTTP.recipes.scrapeRecipesAndReturnFields('_id name text persons source text image ingredients { name unit quantity }', {
      crawlerInput: state.importUrl
    })


    HTTP.post(requestBody)
    .then(res => {
      setLoading(false)
      setMessage({msg: `Opskrift blev hentet`, type: 'success', key: Math.random()})
      const { data: { scrapeReceipt: {_id, name, text, persons, source, image, ingredients }} } = res;

      let formattedAttachments = '';
      ingredients.map(ingredient => {
        formattedAttachments += `${ingredient.quantity || ''} ${ingredient.unit || ''} ${ingredient.name} \n`.trimLeft();      
      });

      setState({
        ...state,
        numPicker: persons,
        title: name,
        receipt: text,
        image: image,
        source: source,
        ingredients: formattedAttachments
      })

      // Removing alle red borders from input fields, when these are filled out automatically by scraper
      let obj;
      Object.keys(inputError).forEach(key => obj = {...obj, [key] : false })
      setInputError(obj)

    })
    .catch(error => {
    //  console.log(error)
      setMessage({msg: error.message, type: 'error', key: Math.random()}) 
      setLoading(false)
    })
  }
  

  const handleSaveReceipt = () => {

    // checks for empty required fields upon saving a receipt
    console.log(state);
    console.log(HTTP.recipes.createRecipeQueryAndReturnFields('hej'))

    let errorState = inputError, stopScript = false;
    Object.keys(inputError)
    .forEach((key)=> {
      if(key === 'importUrl') return;
      if(!state[key]) {
        errorState = {...errorState, [key]: true}
         stopScript = true;
        }
    })
    setInputError(errorState);
    if(stopScript) return;


    // Script to transform ingredients into array with name, unit and quantity
    // Creating array from ingredient input field 
    const ingrArray = state.ingredients.split('\n').filter(line => line !=="");
    console.log(ingrArray)

    // returns array of ingredient objects from input field
    const transformedIngredients = ingrArray
      .map( (str, i)=> {
        let strArr = str.trimEnd().split(' ');
        let quantity = strArr.find(el => Number(el)) || null;
        let unit = strArr.find(el => el.includes('*')) || null;

        // removes quantity and unit from array and leaves name
        [quantity, unit].forEach((item)=>{
          const index = strArr.indexOf(item);
          if(index != -1 ) {
            //console.log('Splicing element: ' + strArr[index])
            strArr.splice(index, 1);
          } 
        })

        return { name: strArr.join(' ').toLowerCase(), unit: unit, quantity: parseFloat(quantity)}
      })

      console.log(transformedIngredients);

      const token = localStorage.getItem('token');
      const {title, type, numPicker, source, receipt, image} = state;

      const query = HTTP.recipes.createRecipeQueryAndReturnFields('_id name persons source text image ingredients', {
        token: token,
        name: title,
        type: 'veg',
        persons: numPicker,
        source: source,
        text: receipt, // text is required, but should probably not be
        image: image,
        ingredients: transformedIngredients
      })
  


      HTTP.post(query)
      .then(res => {
        setMessage({msg: `${state.title} er gemt`, type: 'success', key: Math.random()})
        onReceiptSave(Date.now())
      })
      .catch(error => {
        console.log(error)
        setMessage({msg: error.message, type: 'error', key: Math.random()}) 
      })
    
  }

  return (
    <div>
      <span onClick={handleClickOpen}><PlusButton/></span>
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
                <StaticDatePicker/>
                  <span style={{display:"flex"}}>
                    <CategorySelect label ={'Vælg ret'} />
                    <IconButton>
                      <AddCircleOutlineIcon fontSize="large"/>
                    </IconButton>
                    </span>
                </span>
                </ListItem> )
            
          </div>
          </List>

          </Grid>

          <Grid item className={classes.textAreaGrid}>
          <Grid item >
          <Paper className={classes.paper} elevation={3} >
          <TextField name="importUrl" id="standard-basic" label="Navn på madplan*" 
            error={inputError.importUrl}
            onChange={onInputchange}
            className={classes.importUrlInput}
            value={state.importUrl}
          />
            <List>
                <div>Mandag: boller i karry: <span><SmallNumberPicker/></span></div>

                <ListItem >
                    Ingrediens
                </ListItem> 
                <ListItem >
                    Ingrediens
                </ListItem> 
                <ListItem >
                    Ingrediens
                </ListItem> 
                <ListItem >
                    Ingrediens
                </ListItem> 
            </List>
          </Paper>

          </Grid>
          </Grid>

          <Grid item className={classes.textAreaGrid}>

          <Paper className={classes.paper} elevation={3} >
            <h2>Indkøbsliste</h2>
            <List>
                <div>Grøntsager og frugt</div>
                <ListItem >
                    Ingrediens
                </ListItem> 
                <ListItem >
                    Ingrediens
                </ListItem> 
                <ListItem >
                    Ingrediens
                </ListItem> 
                <ListItem >
                    Ingrediens
                </ListItem> 
                
            </List>

            <List>
                <div>Grøntsager og frugt</div>
                <ListItem >
                    Ingrediens
                </ListItem> 
                <ListItem >
                    Ingrediens
                </ListItem> 
                <ListItem >
                    Ingrediens
                </ListItem> 
                <ListItem >
                    Ingrediens
                </ListItem> 
                
            </List>
          </Paper>
          </Grid>


        </Grid>
        { message.msg ? <SnackBar key={message.key} type={message.type} message={message.msg}/> : null}

      </Dialog>
    </div>
  );
}
