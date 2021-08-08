import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import PlusButton from '../../../shared/buttons/plusButton/plusButton'
import SnackBar from "../../../shared/snackbar/snackbar.jsx";
import NumberPicker from '../../../shared/pickers/number/numberPicker1/numberPicker.jsx'
import ImageUploader from '../upload/uploadImage.jsx'
import HTTP from '../../../../HTTP/http';

import CircularProgress from '@material-ui/core/CircularProgress';


import styles from './styles.jsx';




const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const useStyles = styles;


export default function FullScreenDialog({ onReceiptSave }) {

  const classes = useStyles();
  const [open, setOpen] = useState(false); // set false when not testing

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
    if (isLoading) return; // stops user from sending requests when already loading to get one
    if (!state.importUrl) {
      setInputError({ ...inputError, importUrl: true })
      return;
    }
    setLoading(true)
    const requestBody = HTTP.recipes.scrapeRecipesAndReturnFields('_id name text persons source text image ingredients { name unit quantity }', {
      crawlerInput: state.importUrl
    })


    HTTP.post(requestBody)
      .then(res => {
        setLoading(false)
        setMessage({ msg: `Opskrift blev hentet`, type: 'success', key: Math.random() })
        const { data: { scrapeReceipt: { _id, name, text, persons, source, image, ingredients } } } = res;

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
        Object.keys(inputError).forEach(key => obj = { ...obj, [key]: false })
        setInputError(obj)

      })
      .catch(error => {
        //  console.log(error)
        setMessage({ msg: error.message, type: 'error', key: Math.random() })
        setLoading(false)
      })
  }


  const handleSaveRecipe = () => {

    // checks for empty required fields upon saving a receipt
    console.log(state);
    console.log(HTTP.recipes.createRecipeQueryAndReturnFields('hej'))

    let errorState = inputError, stopScript = false;
    Object.keys(inputError)
      .forEach((key) => {
        if (key === 'importUrl') return;
        if (!state[key]) {
          errorState = { ...errorState, [key]: true }
          stopScript = true;
        }
      })
    setInputError(errorState);
    if (stopScript) return;


    // Script to transform ingredients into array with name, unit and quantity
    // Creating array from ingredient input field 
    const ingrArray = state.ingredients.split('\n').filter(line => line !== "");
    console.log(ingrArray)

    // returns array of ingredient objects from input field
    const transformedIngredients = ingrArray
      .map((str, i) => {
        let strArr = str.trimEnd().split(' ');
        let quantity = strArr.find(el => Number(el)) || null;
        let unit = strArr.find(el => el.includes('*')) || null;

        // removes quantity and unit from array and leaves name
        [quantity, unit].forEach((item) => {
          const index = strArr.indexOf(item);
          if (index != -1) {
            //console.log('Splicing element: ' + strArr[index])
            strArr.splice(index, 1);
          }
        })

        return { name: strArr.join(' ').toLowerCase(), unit: unit, quantity: parseFloat(quantity) }
      })

    console.log(transformedIngredients);

    const token = localStorage.getItem('token');
    const { title, type, numPicker, source, receipt, image } = state;

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
        setMessage({ msg: `${state.title} er gemt`, type: 'success', key: Math.random() })
        onReceiptSave(Date.now())
        handleClose();

        //setOpen(false)
      })
      .catch(error => {
        console.log(error)
        setMessage({ msg: error.message, type: 'error', key: Math.random() })
      })

  }

  return (
    <div>
      <span onClick={handleClickOpen}><PlusButton /></span>

      <Dialog style={{
        overflowY: 'visible'
      }} fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Tilføj ny opskrift
            </Typography>
            <Button autoFocus color="inherit" onClick={handleSaveRecipe}>
              gem
            </Button>
          </Toolbar>
        </AppBar>

        <List>
          <ListItem className={classes.urlField}>
            <TextField name="importUrl" id="standard-basic" label="Web-adresse*"
              error={inputError.importUrl}
              onChange={onInputchange}
              className={classes.importUrlInput}
              value={state.importUrl}
            />
            <Button className={classes.importButton} variant="contained" onClick={handleImportUrl} disabled={isLoading} >
              Importer opskrift
            </Button>
            <span style={{ margin: '5px 0 0 20px' }} className={classes.importButton}>{isLoading && <CircularProgress size={30} thickness={5} />}</span>

          </ListItem>
        </List>

        <Divider />

        <div style={{ display: 'flex' }}>
          <div style={{ height: '100%' }} >
            <List>
              <ListItem className={classes.numPicker}>
                <NumberPicker
                  name="numPicker"
                  onChange={(value) => onNumPickerChange(value)}
                  value={state.numPicker}
                />
              </ListItem>

              <ListItem>
                <TextField name="title" id="standard-basic" label="Titel*"
                  error={inputError.title}
                  onChange={onInputchange}
                  value={state.title}
                  InputLabelProps={{ shrink: state.title ? true : false }}
                />
              </ListItem>

              <ListItem>
                <TextField name="source" id="standard-basic" label="Kilde"
                  onChange={onInputchange}
                  value={state.source}
                  InputLabelProps={{ shrink: state.source ? true : false }}
                />
              </ListItem>
            </List>
          </div>


          <Grid
            container
            direction="row"
            //justify="flex-start"
            //alignItems="flex-start"
            spacing={5}
            className={classes.mainGrid}
          >



            <Grid item className={classes.textAreaGrid}>
              <TextField
                name="ingredients"
                className={classes.ingredientTextField}
                label="Ingredienser*"
                multiline
                rows={20}
                rowsMax={99}
                variant="outlined"
                size="medium"
                error={inputError.ingredients}
                onChange={onInputchange}
                helperText='Indtast * ved angivelse af enheder, f.eks. stk*'
                value={state.ingredients}
                InputLabelProps={{ shrink: state.ingredients ? true : false }}

              />
            </Grid>

            <Grid item className={classes.textAreaGrid}>

              <TextField
                name="receipt"
                className={classes.prepareTextField}
                label="Tilberedning"
                multiline
                rows={20}
                rowsMax={99}
                variant="outlined"
                size="medium"
                onChange={onInputchange}
                value={state.receipt}
                InputLabelProps={{ shrink: state.receipt ? true : false }}

              />
            </Grid>

            <Grid item className={classes.textAreaGrid}>

              <ImageUploader
                name="receipt"
                src={state.image}
                onImageUpload={(imageUrl) => setState({ ...state, image: imageUrl })}
              />

              <TextField name="image" id="standard-basic" placeholder="Link til billede"
                className={classes.imageInputField}
                onChange={onInputchange}
                value={state.image && state.image.includes('localhost') ? '' : state.image}
                InputLabelProps={{ shrink: state.image ? true : false }}
              />
            </Grid>

          </Grid>

        </div>


        {message.msg ? <SnackBar key={message.key} type={message.type} message={message.msg} /> : null}

      </Dialog>
    </div>
  );
}
