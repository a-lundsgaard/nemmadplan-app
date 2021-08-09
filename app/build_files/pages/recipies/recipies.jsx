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
const Grid_1 = __importDefault(require("@material-ui/core/Grid"));
const subscribe_1 = __importDefault(require("Redux/helpers/subscribe"));
const http_1 = __importDefault(require("../../HTTP/http"));
const recipeCard_jsx_1 = __importDefault(require("../../components/shared/card/recipeCard.jsx"));
const createRecipeDialog_jsx_1 = __importDefault(require("../../components/componentPages/createRecipe/index/createRecipeDialog.jsx"));
const receiptSceletonLoader_1 = __importDefault(require("../../components/shared/loaders/receiptSceletonLoader"));
const styles_1 = __importDefault(require("./styles"));
const snackbar_jsx_1 = __importDefault(require("../../components/shared/snackbar/snackbar.jsx"));
function SpacingGrid({ onClick, dialogOpen, ...props }) {
    const classes = styles_1.default();
    const [searchString, setSearchString] = react_1.useState(window.store.getState().searchInput);
    const [recipes, setRecipes] = react_1.useState([]);
    const [recipesInSearch, setRecipesInSearch] = react_1.useState([]);
    const [isReceiptSavedOrDeleted, setRecipeSavedOrDeleted] = react_1.useState('');
    const [isLoading, setIsLoading] = react_1.useState(false);
    const [clickedDishId, setClickedDishId] = react_1.useState('');
    const [message, setMessage] = react_1.useState({});
    const lsCount = localStorage.getItem('recipeCount');
    const recipeCount = lsCount ? parseInt(lsCount) : 0;
    const handleRecipeCardClick = (id) => {
        setClickedDishId(id);
        onClick(id);
    };
    function recipeOnPlan(id) {
        return props.recipies ? props.recipies.find((recipe) => recipe._id === id) : false;
    }
    react_1.useEffect(() => {
        subscribe_1.default(setSearchString);
    }, []);
    react_1.useEffect(() => {
        console.log('Found receipts:');
        console.log(recipes);
    }, [recipes]);
    react_1.useEffect(() => {
        if (!searchString) {
            setRecipesInSearch(recipes);
            return;
        }
        const filteredRecipes = recipes.filter((recipe) => {
            const ingredientsString = recipe.ingredients.reduce((a, b) => {
                a += b.name;
                return a;
            }, '');
            if (searchString) {
                return recipe.name.toLowerCase().includes(searchString) || ingredientsString.includes(searchString);
            }
        });
        setRecipesInSearch(filteredRecipes);
    }, [searchString]);
    react_1.useEffect(() => {
        getRecipes(true);
    }, [isReceiptSavedOrDeleted]);
    const handleRecipeSave = (id) => {
        setRecipeSavedOrDeleted(id);
    };
    const handleRecipeDeletion = (id) => {
        setRecipeSavedOrDeleted(id);
    };
    function getRecipes(showLoading) {
        if (props.getRecipesFromParent) {
            setRecipesInSearch(props.getRecipesFromParent);
            return;
        }
        if (showLoading)
            setIsLoading(true);
        const token = localStorage.getItem('token');
        const requestBody = http_1.default.recipes.getRecipesAndReturnFields('_id name text image createdAt ingredients {name unit quantity} persons', { token: token });
        http_1.default.post(requestBody)
            .then(res => {
            setRecipes(res.data.receipts);
            setRecipesInSearch(res.data.receipts);
            localStorage.setItem('recipeCount', JSON.stringify(res.data.receipts.length));
            setIsLoading(false);
        })
            .catch(e => console.log(e));
    }
    return (<Grid_1.default container className={classes.root} justify="center" component={'div'}>
      <Grid_1.default item xs={10}>

        <Grid_1.default container justify="center" spacing={5}>
          {isLoading ?
            Array(recipeCount).fill(recipeCount)
                .map((receipt, index) => (<Grid_1.default key={index} item>
                    <receiptSceletonLoader_1.default />
                  </Grid_1.default>))
            :
                recipesInSearch.map((recipe, index) => {
                    return <Grid_1.default key={recipe._id} item>
                  <recipeCard_jsx_1.default disableSettings={props.disableSettings} recipeOnPlan={recipeOnPlan(recipe._id)} recipe={recipe} clikedDish={id => handleRecipeCardClick(id)} visitFromCreatePlan={props.visitFromCreatePlan} dialogOpen={bool => dialogOpen(bool)} onRecipeDelete={id => handleRecipeDeletion(id)} customDate={recipe.date}/>
                </Grid_1.default>;
                })}
        </Grid_1.default>
      </Grid_1.default>
      {!props.disableSettings &&
            <div className={classes.addReceiptButton}>
          <createRecipeDialog_jsx_1.default onReceiptSave={(value) => handleRecipeSave(value)}/>
        </div>}
      {message.msg ? <snackbar_jsx_1.default key={message.key} type={message.type} message={message.msg}/> : null}
    </Grid_1.default>);
}
exports.default = SpacingGrid;
