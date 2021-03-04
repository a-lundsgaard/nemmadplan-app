import { makeStyles } from '@material-ui/core/styles';


export default makeStyles((theme) => ({
    appBar: {
      position: 'relative',
      background: '#c24e00' // dark orange // sj
    },
  
    paper: {
      padding: "15px 40px 0 40px"
    },
  
  
    shoppingList: {
      padding: "15px 40px 0 40px",
      width: 400
    },
  
    mainGrid: {
      marginTop: 20,
      overflowX: 'hidden',
      zIndex: 0
    },
  
    importButton: {
      marginLeft: 20
    },
  
    daysSelect: {
      marginLeft: 20,
    },
  
  
    imageInputField: {
      marginTop: 20,
      maxWidth: 280,
      width: "100%"
    },
  
  
    importUrlInput: {
      maxWidth: 280,
      marginBottom: 20,
      width: "100%"
    },
  
    textAreaGrid: {
      marginTop: 20,
      width: 'fit-content',
      marginLeft: "20px",
      // minWidth: 400
    },
  
    recipeFoodPlanImage: {
      maxWidth: 80,
      height: 'auto',
      marginRight: 8
    },
  
    numPicker: {
      marginTop: 1
    },
  
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
  }));