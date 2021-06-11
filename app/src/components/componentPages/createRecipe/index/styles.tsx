import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    appBar: {
      position: 'relative',
      background: '#c24e00' // dark orange
    },
  
    mainGrid: {
      marginTop: -20,
      //overflow: 'hidden'
    },
  
    importButton: {
      marginLeft: 20,
      minWidth: 180
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
      marginLeft: 20
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
      flex: 1,
    },
  }));