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
const Button_1 = __importDefault(require("@material-ui/core/Button"));
const Dialog_1 = __importDefault(require("@material-ui/core/Dialog"));
const ListItem_1 = __importDefault(require("@material-ui/core/ListItem"));
const List_1 = __importDefault(require("@material-ui/core/List"));
const Divider_1 = __importDefault(require("@material-ui/core/Divider"));
const AppBar_1 = __importDefault(require("@material-ui/core/AppBar"));
const Toolbar_1 = __importDefault(require("@material-ui/core/Toolbar"));
const IconButton_1 = __importDefault(require("@material-ui/core/IconButton"));
const Typography_1 = __importDefault(require("@material-ui/core/Typography"));
const Close_1 = __importDefault(require("@material-ui/icons/Close"));
const Slide_1 = __importDefault(require("@material-ui/core/Slide"));
const TextField_1 = __importDefault(require("@material-ui/core/TextField"));
const Grid_1 = __importDefault(require("@material-ui/core/Grid"));
const plusButton_1 = __importDefault(require("../../../shared/buttons/plusButton/plusButton"));
const snackbar_jsx_1 = __importDefault(require("../../../shared/snackbar/snackbar.jsx"));
const numberPicker_jsx_1 = __importDefault(require("../../../shared/pickers/number/numberPicker1/numberPicker.jsx"));
const uploadImage_jsx_1 = __importDefault(require("../upload/uploadImage.jsx"));
const circularLoader_jsx_1 = __importDefault(require("../../../shared/loaders/circular/circularLoader.jsx"));
const http_1 = __importDefault(require("../../../../HTTP/http"));
const useStyles = styles_1.makeStyles((theme) => ({
    appBar: {
        position: 'relative',
        background: '#c24e00'
    },
    mainGrid: {
        marginTop: -20,
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
        flex: 1,
    },
}));
const Transition = react_1.default.forwardRef(function Transition(props, ref) {
    return <Slide_1.default direction="up" ref={ref} {...props}/>;
});
function FullScreenDialog({ onReceiptSave }) {
    const classes = useStyles();
    const [open, setOpen] = react_1.useState(false);
    const [state, setState] = react_1.useState({
        numPicker: 1
    });
    const [message, setMessage] = react_1.useState({});
    const [isLoading, setLoading] = react_1.useState(false);
    const [inputError, setInputError] = react_1.useState({
        importUrl: false,
        title: false,
        ingredients: false
    });
    const onInputchange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        });
        setInputError({ ...inputError, [event.target.name]: false });
    };
    const onNumPickerChange = (value) => {
        setState({
            ...state,
            numPicker: value
        });
    };
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setState({
            numPicker: 1
        });
        setMessage({});
        setOpen(false);
    };
    const handleImportUrl = () => {
        if (isLoading)
            return;
        if (!state.importUrl) {
            setInputError({ ...inputError, importUrl: true });
            return;
        }
        setLoading(true);
        const requestBody = http_1.default.recipes.scrapeRecipesAndReturnFields('_id name text persons source text image ingredients { name unit quantity }', {
            crawlerInput: state.importUrl
        });
        http_1.default.post(requestBody)
            .then(res => {
            setLoading(false);
            setMessage({ msg: `Opskrift blev hentet`, type: 'success', key: Math.random() });
            const { data: { scrapeReceipt: { _id, name, text, persons, source, image, ingredients } } } = res;
            let formattedAttachments = '';
            ingredients.map(ingredient => {
                formattedAttachments += `${ingredient.quantity || ''} ${ingredient.unit || ''} ${ingredient.name} \n`.trimLeft();
            });
            setState({
                ...state,
                numPicker: persons,
                title: name,
                receipt: text,
                image: image,
                source: source,
                ingredients: formattedAttachments
            });
            let obj;
            Object.keys(inputError).forEach(key => obj = { ...obj, [key]: false });
            setInputError(obj);
        })
            .catch(error => {
            setMessage({ msg: error.message, type: 'error', key: Math.random() });
            setLoading(false);
        });
    };
    const handleSaveReceipt = () => {
        console.log(state);
        console.log(http_1.default.recipes.createRecipeQueryAndReturnFields('hej'));
        let errorState = inputError, stopScript = false;
        Object.keys(inputError)
            .forEach((key) => {
            if (key === 'importUrl')
                return;
            if (!state[key]) {
                errorState = { ...errorState, [key]: true };
                stopScript = true;
            }
        });
        setInputError(errorState);
        if (stopScript)
            return;
        const ingrArray = state.ingredients.split('\n').filter(line => line !== "");
        console.log(ingrArray);
        const transformedIngredients = ingrArray
            .map((str, i) => {
            let strArr = str.trimEnd().split(' ');
            let quantity = strArr.find(el => Number(el)) || null;
            let unit = strArr.find(el => el.includes('*')) || null;
            [quantity, unit].forEach((item) => {
                const index = strArr.indexOf(item);
                if (index != -1) {
                    strArr.splice(index, 1);
                }
            });
            return { name: strArr.join(' ').toLowerCase(), unit: unit, quantity: parseFloat(quantity) };
        });
        console.log(transformedIngredients);
        const token = localStorage.getItem('token');
        const { title, type, numPicker, source, receipt, image } = state;
        const query = http_1.default.recipes.createRecipeQueryAndReturnFields('_id name persons source text image ingredients', {
            token: token,
            name: title,
            type: 'veg',
            persons: numPicker,
            source: source,
            text: receipt,
            image: image,
            ingredients: transformedIngredients
        });
        http_1.default.post(query)
            .then(res => {
            setMessage({ msg: `${state.title} er gemt`, type: 'success', key: Math.random() });
            onReceiptSave(Date.now());
        })
            .catch(error => {
            console.log(error);
            setMessage({ msg: error.message, type: 'error', key: Math.random() });
        });
    };
    return (<div>
      <span onClick={handleClickOpen}><plusButton_1.default /></span>

      <Dialog_1.default style={{
            overflowY: 'visible'
        }} fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar_1.default className={classes.appBar}>
          <Toolbar_1.default>
            <IconButton_1.default edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <Close_1.default />
            </IconButton_1.default>
            <Typography_1.default variant="h6" className={classes.title}>
              Tilføj ny opskrift
            </Typography_1.default>
            <Button_1.default autoFocus color="inherit" onClick={handleSaveReceipt}>
              gem
            </Button_1.default>
          </Toolbar_1.default>
        </AppBar_1.default>

        <List_1.default>
          <ListItem_1.default className={classes.urlField}>
            <TextField_1.default name="importUrl" id="standard-basic" label="Web-adresse*" error={inputError.importUrl} onChange={onInputchange} className={classes.importUrlInput} value={state.importUrl}/>
            <Button_1.default className={classes.importButton} variant="contained" onClick={handleImportUrl}>
              Importér opskrift
            </Button_1.default>
            <span className={classes.importButton}>{isLoading ? <circularLoader_jsx_1.default /> : null}</span>

          </ListItem_1.default>
        </List_1.default>

        <Divider_1.default />


        <Grid_1.default container direction="row" spacing={8} xs={12} className={classes.mainGrid}>

          <Grid_1.default item>
            <List_1.default>
              <div>

                <ListItem_1.default className={classes.numPicker}>
                  <numberPicker_jsx_1.default name="numPicker" onChange={(value) => onNumPickerChange(value)} value={state.numPicker}/>
                </ListItem_1.default>

                <ListItem_1.default>
                  <TextField_1.default name="title" id="standard-basic" label="Titel*" error={inputError.title} onChange={onInputchange} value={state.title} InputLabelProps={{ shrink: state.title ? true : false }}/>
                </ListItem_1.default>

                <ListItem_1.default>
                  <TextField_1.default name="source" id="standard-basic" label="Kilde" onChange={onInputchange} value={state.source} InputLabelProps={{ shrink: state.source ? true : false }}/>
                </ListItem_1.default>


              </div>
            </List_1.default>

          </Grid_1.default>

          <Grid_1.default item className={classes.textAreaGrid}>
            <TextField_1.default name="ingredients" className={classes.ingredientTextField} label="Ingredienser*" multiline rows={20} rowsMax={99} variant="outlined" size="medium" error={inputError.ingredients} onChange={onInputchange} helperText='Indtast * ved angivelse af enheder, f.eks. stk*' value={state.ingredients} InputLabelProps={{ shrink: state.ingredients ? true : false }}/>
          </Grid_1.default>

          <Grid_1.default item className={classes.textAreaGrid}>

            <TextField_1.default name="receipt" className={classes.prepareTextField} label="Tilberedning" multiline rows={20} rowsMax={99} variant="outlined" size="medium" onChange={onInputchange} value={state.receipt} InputLabelProps={{ shrink: state.receipt ? true : false }}/>
          </Grid_1.default>

          <Grid_1.default item className={classes.textAreaGrid}>
            <uploadImage_jsx_1.default name="receipt" src={state.image}/>
            <TextField_1.default name="image" id="standard-basic" label="Billede" className={classes.imageInputField} onChange={onInputchange} value={state.image} InputLabelProps={{ shrink: state.image ? true : false }}/>
          </Grid_1.default>

        </Grid_1.default>
        {message.msg ? <snackbar_jsx_1.default key={message.key} type={message.type} message={message.msg}/> : null}

      </Dialog_1.default>
    </div>);
}
exports.default = FullScreenDialog;
