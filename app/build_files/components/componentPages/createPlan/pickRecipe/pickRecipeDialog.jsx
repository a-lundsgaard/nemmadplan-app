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
const styles_1 = require("@material-ui/core/styles");
const Dialog_1 = __importDefault(require("@material-ui/core/Dialog"));
const AppBar_1 = __importDefault(require("@material-ui/core/AppBar"));
const Toolbar_1 = __importDefault(require("@material-ui/core/Toolbar"));
const IconButton_1 = __importDefault(require("@material-ui/core/IconButton"));
const Typography_1 = __importDefault(require("@material-ui/core/Typography"));
const Close_1 = __importDefault(require("@material-ui/icons/Close"));
const Slide_1 = __importDefault(require("@material-ui/core/Slide"));
const recipies_jsx_1 = __importDefault(require("../../../../pages/recipies/recipies.jsx"));
const searchBar1_1 = __importDefault(require("../../../shared/searchBar/searchBar1"));
const useStyles = styles_1.makeStyles((theme) => ({
    appBar: {
        position: 'fixed',
        background: '#c24e00',
        marginBottom: 60
    },
    mainGrid: {
        marginTop: -20
    },
    importButton: {
        marginLeft: 20
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
    },
}));
const Transition = react_1.default.forwardRef(function Transition(props, ref) {
    return <Slide_1.default direction="up" ref={ref} {...props}/>;
});
function FullScreenDialog({ visible, setVisible, chosenRecipe, ...props }) {
    const classes = useStyles();
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
              Vælg opskrift
            </Typography_1.default>
            <searchBar1_1.default />

          </Toolbar_1.default>
        </AppBar_1.default>
        <div style={{ marginTop: 70 }}>
          <recipies_jsx_1.default recipies={props.recipies} onClick={recipe => chosenRecipe(recipe)} visitFromCreatePlan={true} dialogOpen={bool => setVisible(bool)}/>
        </div>
      </Dialog_1.default>
    </div>);
}
exports.default = FullScreenDialog;
