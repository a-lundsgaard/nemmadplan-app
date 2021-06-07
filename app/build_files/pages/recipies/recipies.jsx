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
function SpacingGrid({ onClick, dialogOpen, ...props }) {
    const classes = styles_1.default();
    const [search, setSearch] = react_1.useState(window.store.getState().searchInput);
    const [receipts, setReceipts] = react_1.useState([]);
    const [isReceiptSaved, setReceiptSaved] = react_1.useState('');
    const [isLoading, setIsLoading] = react_1.useState(false);
    const [clickedDishId, setClickedDishId] = react_1.useState('');
    const recipeCount = parseInt(localStorage.getItem('recipeCount')) || 0;
    function getReceitps() {
        setIsLoading(true);
        const token = localStorage.getItem('token');
        const requestBody = http_1.default.recipes.getRecipesAndReturnFields('_id name text image createdAt ingredients {name unit quantity} persons', { token: token });
        http_1.default.post(requestBody)
            .then(res => {
            setReceipts(res.data.receipts);
            localStorage.setItem('recipeCount', JSON.stringify(res.data.receipts.length));
            setIsLoading(false);
        })
            .catch(e => console.log(e));
    }
    const handleRecipeCardClick = (id) => {
        setClickedDishId(id);
        onClick(id);
    };
    function recipeOnPlan(id) {
        return props.recipies ? props.recipies.find((recipe) => recipe._id === id) : false;
    }
    react_1.useEffect(() => {
        subscribe_1.default(setSearch);
    }, []);
    react_1.useEffect(() => {
        console.log(search);
    }, [search]);
    react_1.useEffect(() => {
        console.log('Found receipts:');
        console.log(receipts);
    }, [receipts]);
    react_1.useEffect(() => {
    }, []);
    react_1.useEffect(() => {
        getReceitps();
    }, [isReceiptSaved]);
    return (<react_1.Fragment>

      <Grid_1.default container className={classes.root} justify="center">
        <Grid_1.default item xs={10}>

          <Grid_1.default container justify="center" spacing={5}>
            {isLoading ?
            Array(recipeCount).fill(recipeCount)
                .map((receipt, index) => (<Grid_1.default key={index} item>
                      <receiptSceletonLoader_1.default />
                    </Grid_1.default>))
            : receipts.map((receipt, index) => (<Grid_1.default key={receipt._id} item>

                    <recipeCard_jsx_1.default recipeOnPlan={recipeOnPlan(receipt._id)} recipe={receipt} clikedDish={id => handleRecipeCardClick(id)} visitFromCreatePlan={props.visitFromCreatePlan} dialogOpen={bool => dialogOpen(bool)}/>

                  </Grid_1.default>))}
          </Grid_1.default>

        </Grid_1.default>
      </Grid_1.default>

      <div className={classes.addReceiptButton}>
        <createRecipeDialog_jsx_1.default onReceiptSave={(value) => setReceiptSaved(value)}/>
      </div>

    </react_1.Fragment>);
}
exports.default = SpacingGrid;
