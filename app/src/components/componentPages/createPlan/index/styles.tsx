import { fade,makeStyles } from '@material-ui/core/styles';


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
      margin: '0 0 0 20px',
      overflowX: 'hidden',
      zIndex: 0,
      wrap: 'nowrap'
    },

    recipeCardGrid: {
      margin: '20px 0 0 5px'
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
      display: 'flex'
    },

    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },


    inputRoot: {
      color: 'white',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      //paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      paddingLeft: '15px',
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    }


  }));