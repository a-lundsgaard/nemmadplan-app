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
const recipies_1 = __importDefault(require("../../recipies/recipies"));
const Transition = react_1.default.forwardRef(function Transition(props, ref) {
    return <Slide_1.default direction="up" ref={ref} {...props}/>;
});
function ViewMealPlanDialogFullScreen({ visible, setVisible, chosenRecipe, recipes, ...props }) {
    const classes = styles_1.default();
    const [open, setOpen] = react_1.useState(visible);
    const [message, setMessage] = react_1.useState({});
    const [isLoading, setLoading] = react_1.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setMessage({});
        setVisible(false);
        setOpen(false);
    };
    react_1.useEffect(() => {
        setOpen(visible);
    }, [visible]);
    return (<div style={{ zIndex: 999 }}>
      <Dialog_1.default fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar_1.default className={classes.appBar}>
          <Toolbar_1.default>
            <IconButton_1.default edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <Close_1.default />
            </IconButton_1.default>
            <Typography_1.default variant="h6" className={classes.title}>
              Min madplan
            </Typography_1.default>
          </Toolbar_1.default>
        </AppBar_1.default>
        
        <span style={{ marginTop: 70 }}>
          <recipies_1.default recipies={recipes} onClick={recipe => chosenRecipe(recipe)} visitFromCreatePlan={true} dialogOpen={bool => setVisible(bool)}/>
        </span>
      </Dialog_1.default>
    </div>);
}
exports.default = ViewMealPlanDialogFullScreen;
