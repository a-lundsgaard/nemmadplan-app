"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const Button_1 = __importDefault(require("@material-ui/core/Button"));
const Dialog_1 = __importDefault(require("@material-ui/core/Dialog"));
const AppBar_1 = __importDefault(require("@material-ui/core/AppBar"));
const Toolbar_1 = __importDefault(require("@material-ui/core/Toolbar"));
const IconButton_1 = __importDefault(require("@material-ui/core/IconButton"));
const Typography_1 = __importDefault(require("@material-ui/core/Typography"));
const Close_1 = __importDefault(require("@material-ui/icons/Close"));
const Slide_1 = __importDefault(require("@material-ui/core/Slide"));
const TextField_1 = __importDefault(require("@material-ui/core/TextField"));
const Grid_1 = __importDefault(require("@material-ui/core/Grid"));
const snackbar_jsx_1 = __importDefault(require("../../../shared/snackbar/snackbar.jsx"));
const plusButton_jsx_1 = __importDefault(require("../../../shared/buttons/plusButton/plusButton.jsx"));
const recipeCard_1 = __importDefault(require("../../../shared/card/recipeCard"));
//import StaticDatePicker from '../../pickers/date/staticDatePicker.jsx'
const staticDatePicker_jsx_1 = __importDefault(require("../datePicker/staticDatePicker.jsx"));
const pickRecipeDialog_jsx_1 = __importDefault(require("../pickRecipe/pickRecipeDialog.jsx"));
const App_js_1 = __importDefault(require("../shoppingList/src/components/App.js"));
const container_1 = __importDefault(require("../shoppingListContainer/index/container"));
const AddCircleOutline_1 = __importDefault(require("@material-ui/icons/AddCircleOutline"));
const styles_jsx_1 = __importDefault(require("./styles.jsx"));
//import { render } from 'react-dom'
window.React = react_1.default;
// test
const useStyles = styles_jsx_1.default;
/* const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
}); */
const Transition = react_1.default.forwardRef(function Transition(props, ref) {
    return <Slide_1.default direction="up" ref={ref} {...props}/>;
});
function CreatePlanDialog({ onReceiptSave }) {
    var _a;
    const classes = useStyles();
    const [open, setOpen] = react_1.useState(true); // set false when not testing
    const [recipesOpen, setRecipesOpen] = react_1.useState(false); // set false when not testing
    // state for input fields
    const [state, setState] = react_1.useState({
        recipies: [],
    });
    // displaying server messages
    const [message, setMessage] = react_1.useState({});
    const [date, setDate] = react_1.useState(new Date());
    // for circular loader when scraping receipt
    const [isLoading, setLoading] = react_1.useState(false);
    const [inputError, setInputError] = react_1.useState({
        importUrl: false,
        title: false,
        ingredients: false
    });
    const handleDeleteRecipe = (idOfDeletedDish) => {
        const newState = state.recipies.filter((recipe) => recipe._id !== idOfDeletedDish);
        setState({ ...state, recipies: newState });
    };
    const onInputchange = (event) => {
        // sets state from by deriving the name of the input field when user entering input
        setState({
            ...state,
            [event.target.name]: event.target.value
        });
        // removes error when text field is edited
        setInputError({ ...inputError, [event.target.name]: false });
    };
    const onNumPickerChange = (value) => {
        //setPersons(value)
        setState({
            ...state,
            numPicker: value
        });
    };
    const handleSetNewRecipe = (recipe) => {
        alert(date);
        recipe.date = date;
        /*     const newRecipeArray = state.recipies.map((oldRecipe) => {
              if(oldRecipe.date === recipe.date) {
                return recipe;
              }
              return oldRecipe;
            }); */
        /*     let newRecipeArray = state.recipies;
            let index: number | undefined;
            const duplicateDate = state.recipies.find((oldRecipe, i) => {
              if(oldRecipe.date === recipe.date) {
                newRecipeArray.splice(i, 1, recipe)
                //newRecipeArray = [recipe]
        
                index = i;
                return true
              }
            })
        
            if (duplicateDate) {
              setState({ ...state, recipies: newRecipeArray })
            } else { */
        setState({ ...state, recipies: [...state.recipies, recipe] });
        //}
        //setState({ ...state, recipies: [...state.recipies, recipe] })
    };
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        // Clearing states and messages
        setState({
            recipies: [],
            date: new Date()
        });
        setMessage({});
        setOpen(false);
    };
    const handleSaveReceipt = () => {
        console.log('Saved');
        console.log(state.recipies.flatMap(recipe => recipe.ingredients));
        console.log(state);
    };
    return (<div style={{ position: 'relative' }}>
      <span onClick={handleClickOpen}><plusButton_jsx_1.default /></span>
      <Dialog_1.default fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar_1.default className={classes.appBar}>
          <Toolbar_1.default>
            <IconButton_1.default edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <Close_1.default />
            </IconButton_1.default>
            <Typography_1.default variant="h6" className={classes.title}>
              Opret madplan
            </Typography_1.default>
            <Button_1.default autoFocus color="inherit" onClick={handleSaveReceipt}>
              gem
            </Button_1.default>
          </Toolbar_1.default>
        </AppBar_1.default>



        <div style={{
        display: 'flex',
        height: '100%',
        overflow: 'hidden'
    }}>

          <div style={{
        padding: '0 30px 0 20px',
        display: 'block',
        bottom: '0px',
        boxShadow: "0px 0px 7px 1px #aaaaaa94",
    }}>
            <span className={classes.daysSelect}>
              <staticDatePicker_jsx_1.default hasDbClicked={setRecipesOpen} pickedDate={d => { console.log(d); setDate(d); }} selectedMeals={state.recipies}/>
            </span>

            <span style={{
        display: 'flex'
    }}>
              <TextField_1.default label="Tilføj hurtig ret" style={{
        margin: '10px 0 0px 10px',
        maxWidth: 300
    }}/>
              <IconButton_1.default size='medium' edge='start' aria-label="add" style={{ margin: '19px 0 0 0' }}>
                <AddCircleOutline_1.default />
              </IconButton_1.default>
            </span>
          </div>

          <Grid_1.default container direction="row" justify="flex-start" alignItems="flex-start" 
    //spacing={10}
    className={classes.mainGrid}>

            {state.recipies.length === 0 && <h1>Vælg retter ved at dobbeltklikke på en dato</h1>}

            <Grid_1.default style={{
        margin: '20px 0 0 0'
    }} item>

              <Grid_1.default container spacing={3}>
                {state.recipies
        .sort((a, b) => a.date - b.date) // sorting by date
        .map((recipe, index) => (<Grid_1.default key={recipe._id} item>
                      <recipeCard_1.default recipe={recipe} clikedDish={handleDeleteRecipe} visitFromCreatePlan={false} visitFromCreatePlanMealList={true} dialogOpen={setRecipesOpen} customDate={recipe.date.toISOString()}/>
                    </Grid_1.default>))}
              </Grid_1.default>


            </Grid_1.default>



            <pickRecipeDialog_jsx_1.default visible={recipesOpen} setVisible={setRecipesOpen} chosenRecipe={handleSetNewRecipe}/>


          </Grid_1.default>

        </div>
        {message.msg ? <snackbar_jsx_1.default key={message.key} type={message.type} message={message.msg}/> : null}

        <container_1.default>
          <App_js_1.default ingredientArray={(_a = state === null || state === void 0 ? void 0 : state.recipies[state.recipies.length - 1]) === null || _a === void 0 ? void 0 : _a.ingredients}/>
        </container_1.default>
      </Dialog_1.default>

    </div>);
}
exports.default = CreatePlanDialog;
