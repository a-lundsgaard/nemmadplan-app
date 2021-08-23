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
const Dialog_1 = __importDefault(require("@material-ui/core/Dialog"));
const AppBar_1 = __importDefault(require("@material-ui/core/AppBar"));
const Toolbar_1 = __importDefault(require("@material-ui/core/Toolbar"));
const IconButton_1 = __importDefault(require("@material-ui/core/IconButton"));
const Typography_1 = __importDefault(require("@material-ui/core/Typography"));
const Close_1 = __importDefault(require("@material-ui/icons/Close"));
const Slide_1 = __importDefault(require("@material-ui/core/Slide"));
const styles_1 = __importDefault(require("./styles"));
const ShoppingCart_1 = __importDefault(require("@material-ui/icons/ShoppingCart"));
const Edit_1 = __importDefault(require("@material-ui/icons/Edit"));
const recipies_1 = __importDefault(require("../../recipies/recipies"));
const mealPlanShoppingList_1 = __importDefault(require("./shoppingList/mealPlanShoppingList"));
const App_1 = __importDefault(require("../../../components/componentPages/createPlan/shoppingList/src/components/App"));
const Transition = react_1.default.forwardRef(function Transition(props, ref) {
    return <Slide_1.default direction="up" ref={ref} {...props}/>;
});
function ViewMealPlanDialogFullScreen({ visible, setVisible, chosenRecipe, mealPlan, ...props }) {
    const classes = styles_1.default();
    const [open, setOpen] = react_1.useState(false);
    const [shopListOpen, setShopListOpen] = react_1.useState(false);
    const [message, setMessage] = react_1.useState({});
    const [isLoading, setLoading] = react_1.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setMessage({});
        setOpen(false);
    };
    react_1.useEffect(() => {
        if (visible)
            setOpen(true);
    }, [visible]);
    react_1.useEffect(() => {
        console.log('Found custom shop list: ', mealPlan.customShoppingList);
    }, []);
    return (<div style={{ zIndex: 999 }}>
      <Dialog_1.default fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar_1.default className={classes.appBar}>
          <Toolbar_1.default>
            <IconButton_1.default edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <Close_1.default />
            </IconButton_1.default>
            <Typography_1.default variant="h6" className={classes.title}>
              {mealPlan.name}
            </Typography_1.default>
            <IconButton_1.default onClick={() => setShopListOpen(true)} edge="start" color="inherit" aria-label="close">
              <ShoppingCart_1.default />
            </IconButton_1.default>
            <IconButton_1.default edge="start" color="inherit" aria-label="close">
              <Edit_1.default />
            </IconButton_1.default>
          </Toolbar_1.default>
        </AppBar_1.default>

        <mealPlanShoppingList_1.default title={'Indkøbsliste'} visible={shopListOpen} onOpenChange={(bool) => setShopListOpen(bool)}>
          <App_1.default excludeTitle={true} defaultItems={mealPlan.customShoppingList}/>
        </mealPlanShoppingList_1.default>

        <span style={{ marginTop: 70 }}>
          <recipies_1.default getRecipesFromParent={mealPlan.plan.map((plan) => {
            return { ...plan.dish, date: plan.day };
        })} disableSettings={true} onClick={recipe => chosenRecipe(recipe)} visitFromCreatePlan={false} dialogOpen={(bool) => setVisible(bool)}/>
        </span>
      </Dialog_1.default>
    </div>);
}
exports.default = ViewMealPlanDialogFullScreen;
