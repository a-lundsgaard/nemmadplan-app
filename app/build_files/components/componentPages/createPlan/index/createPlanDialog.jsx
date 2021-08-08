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
const InputBase_1 = __importDefault(require("@material-ui/core/InputBase"));
const uuid_1 = require("uuid");
const snackbar_jsx_1 = __importDefault(require("../../../shared/snackbar/snackbar.jsx"));
const plusButton_jsx_1 = __importDefault(require("../../../shared/buttons/plusButton/plusButton.jsx"));
const smallNumPicker_jsx_1 = __importDefault(require("../../../shared/pickers/number/smallNumPicker/smallNumPicker.jsx"));
const recipeCard_1 = __importDefault(require("../../../shared/card/recipeCard"));
const staticDatePicker_jsx_1 = __importDefault(require("../datePicker/staticDatePicker.jsx"));
const pickRecipeDialog_jsx_1 = __importDefault(require("../pickRecipe/pickRecipeDialog.jsx"));
const App_1 = __importDefault(require("../shoppingList/src/components/App"));
const container_1 = __importDefault(require("../shoppingListContainer/index/container"));
const AddCircleOutline_1 = __importDefault(require("@material-ui/icons/AddCircleOutline"));
const styles_jsx_1 = __importDefault(require("./styles.jsx"));
const http_1 = __importDefault(require("../../../../HTTP/http"));
window.React = react_1.default;
const useStyles = styles_jsx_1.default;
const Transition = react_1.default.forwardRef(function Transition(props, ref) {
    return <Slide_1.default direction="up" ref={ref} {...props}/>;
});
function CreatePlanDialog({ onReceiptSave }) {
    const classes = useStyles();
    const [open, setOpen] = react_1.useState(false);
    const [recipesOpen, setRecipesOpen] = react_1.useState(false);
    const [state, setState] = react_1.useState({
        recipies: [],
    });
    const [ingredientsWithUpdatedAmounts, setIngredientsWithUpdatedAmounts] = react_1.useState([]);
    const [ingredientsToDelete, setIngredientsToDelete] = react_1.useState([]);
    const [ingredientsToAdd, setIngredientsToAdd] = react_1.useState([]);
    const [recipeToSwap, setRecipeToSwap] = react_1.useState(null);
    const [mealPlanTitle, setMealPlanTitle] = react_1.useState('');
    const [message, setMessage] = react_1.useState({});
    const [date, setDate] = react_1.useState(new Date());
    const [inputError, setInputError] = react_1.useState({
        importUrl: false,
        title: false,
        ingredients: false
    });
    function handleDeleteRecipeFromPlan(idOfDeletedDish) {
        console.log(idOfDeletedDish);
        const newState = state.recipies.filter((recipe) => {
            if (recipe.listId == idOfDeletedDish) {
                setIngredientsToDelete(recipe.ingredients);
            }
            return recipe.listId !== idOfDeletedDish;
        });
        setState({ ...state, recipies: newState });
    }
    function handleAddNewRecipeToPlan(newRecipe) {
        console.log(newRecipe);
        newRecipe.date = date;
        newRecipe.listId = uuid_1.v4();
        newRecipe.ingredients = addIdToEachIngredient(newRecipe.ingredients);
        function addIdToEachIngredient(ingredientArray) {
            return ingredientArray.map((ingredient) => {
                return { ...ingredient, id: uuid_1.v4() };
            });
        }
        const newRecipeArrayWithSwappedDish = state.recipies;
        if (recipeToSwap) {
            const index = state.recipies.findIndex(recipe => recipe.date === recipeToSwap.date);
            setIngredientsToDelete(recipeToSwap.ingredients);
            newRecipeArrayWithSwappedDish.splice(index, 1, newRecipe);
            setIngredientsToAdd(newRecipe.ingredients);
            setState({ ...state, recipies: newRecipeArrayWithSwappedDish });
            return;
        }
        for (const [i, oldRecipe] of state.recipies.entries()) {
            if (oldRecipe.date.toISOString() === newRecipe.date.toISOString()) {
                console.log('Duplicate date found : ', oldRecipe.name, newRecipe.name, i, newRecipe.date, newRecipeArrayWithSwappedDish);
                if (oldRecipe._id !== newRecipe._id) {
                    setIngredientsToDelete(newRecipeArrayWithSwappedDish[i].ingredients);
                    newRecipeArrayWithSwappedDish.splice(i, 1, newRecipe);
                    console.log('Duplicate date found : ', oldRecipe.name, newRecipe.name, i, newRecipe.date, newRecipeArrayWithSwappedDish);
                    setIngredientsToAdd(newRecipe.ingredients);
                    setState({ ...state, recipies: newRecipeArrayWithSwappedDish });
                    return;
                }
                else {
                    return;
                }
            }
        }
        setIngredientsToAdd(newRecipe.ingredients);
        setState({ ...state, recipies: [...state.recipies, newRecipe] });
    }
    function handleRecipePersonCountChange(originalPersonCountOnRecipe, newPersonCount, listId) {
        const newRecipeState = state.recipies.map((recipe) => {
            if (recipe.listId === listId) {
                const newIngredientArray = recipe.ingredients.map((ingredient) => {
                    const newQuantityCalculation = (ingredient.quantity / originalPersonCountOnRecipe) * newPersonCount;
                    return { ...ingredient, quantity: newQuantityCalculation };
                });
                setIngredientsWithUpdatedAmounts(newIngredientArray);
                return { ...recipe, persons: newPersonCount, ingredients: newIngredientArray };
            }
            return recipe;
        });
        setState({ ...state, recipies: newRecipeState });
    }
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleCloseAndClearState = () => {
        setMessage({});
        setOpen(false);
    };
    function handleSaveRecipe() {
        console.log('Saved');
        console.log(state.recipies.flatMap(recipe => recipe.ingredients));
        console.log(state);
        console.log(mealPlanTitle);
        if (!mealPlanTitle) {
            setMessage({ msg: 'Angiv et navn for madplanen', type: 'error', key: Math.random() });
            return;
        }
        function transformTodosToIngredients(todos) {
            return todos.map((todo) => {
                return { name: todo.task, quantity: todo.quantity, unit: todo.unit };
            });
        }
        function transformRecipiesToDayPlan(recipes) {
            return recipes.map((recipe) => {
                return {
                    day: recipe.date,
                    persons: recipe.persons,
                    dish: recipe._id
                };
            });
        }
        const requestBody = http_1.default.recipes.saveWeekPlan('name', {
            name: mealPlanTitle,
            customShoppingList: transformTodosToIngredients(window.store.getState().sales),
            plan: transformRecipiesToDayPlan(state.recipies)
        });
        console.log('retur', requestBody);
        http_1.default.post(requestBody)
            .then(res => {
            console.log('retur:', res);
            setMessage({ msg: `Madplanen "${mealPlanTitle}" blev gemt`, type: 'success', key: Math.random() });
        })
            .catch(error => {
            setMessage({ msg: error.message, type: 'error', key: Math.random() });
        });
    }
    return (<div style={{ position: 'relative' }}>
      <span onClick={handleClickOpen}><plusButton_jsx_1.default /></span>
      <Dialog_1.default fullScreen open={open} onClose={handleCloseAndClearState} TransitionComponent={Transition}>
        <AppBar_1.default className={classes.appBar}>
          <Toolbar_1.default>
            <IconButton_1.default edge="start" color="inherit" onClick={handleCloseAndClearState} aria-label="close">
              <Close_1.default />
            </IconButton_1.default>



            <div className={classes.title}>
              <Typography_1.default variant="h6" style={{
            margin: '0 0 0 0'
        }}>
                Opret madplan
              </Typography_1.default>


              <div className={classes.search}>
                <InputBase_1.default placeholder="titel…" onChange={(e) => setMealPlanTitle(e.target.value)} classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
        }} inputProps={{ 'aria-label': 'search' }}/>
              </div>

            </div>


            <Button_1.default autoFocus color="inherit" onClick={handleSaveRecipe}>
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
              <staticDatePicker_jsx_1.default hasDbClicked={setRecipesOpen} pickedDate={d => { console.log(d); return setDate(d); }} selectedMeals={state.recipies}/>
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

          <Grid_1.default container direction="row" justify="flex-start" alignItems="flex-start" className={classes.mainGrid}>

            

            <Grid_1.default className={classes.recipeCardGrid} item>

              <Grid_1.default container spacing={3}>
                {state.recipies && state.recipies
            .sort((a, b) => a.date - b.date)
            .map((recipe) => (<Grid_1.default key={recipe.listId} item>
                        <recipeCard_1.default recipe={recipe} clikedDish={handleDeleteRecipeFromPlan} visitFromCreatePlan={false} visitFromCreatePlanMealList={true} dialogOpen={setRecipesOpen} customDate={recipe.date.toISOString()} swappedRecipe={setRecipeToSwap}>
                          <smallNumPicker_jsx_1.default unit={'personer'} quantity={recipe.persons} listId={recipe.listId} onCountChange={({ count, listId }) => handleRecipePersonCountChange(recipe.persons, count, listId)}/>
                        </recipeCard_1.default>
                      </Grid_1.default>))}
              </Grid_1.default>


            </Grid_1.default>

            <pickRecipeDialog_jsx_1.default recipies={state.recipies} visible={recipesOpen} setVisible={(bool) => { setRecipesOpen(bool); setRecipeToSwap(null); }} chosenRecipe={handleAddNewRecipeToPlan}/>

          </Grid_1.default>

        </div>
        {message.msg ? <snackbar_jsx_1.default key={message.key} type={message.type} message={message.msg}/> : null}

        <container_1.default>
          <App_1.default ingredientArray={ingredientsToAdd} updateAmountOnIngredients={ingredientsWithUpdatedAmounts} ingredientsToDelete={ingredientsToDelete}/>
        </container_1.default>
      </Dialog_1.default>

    </div>);
}
exports.default = CreatePlanDialog;
