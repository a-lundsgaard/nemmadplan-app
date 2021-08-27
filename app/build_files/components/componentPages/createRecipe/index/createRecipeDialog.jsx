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
const http_1 = __importDefault(require("../../../../HTTP/http"));
const CircularProgress_1 = __importDefault(require("@material-ui/core/CircularProgress"));
const styles_jsx_1 = __importDefault(require("./styles.jsx"));
const Transition = react_1.default.forwardRef(function Transition(props, ref) {
    return <Slide_1.default direction="up" ref={ref} {...props}/>;
});
const useStyles = styles_jsx_1.default;
function CreateRecipeDialog({ onReceiptSave, shouldOpen, recipeToUpdate, editPage, onClose }) {
    const classes = useStyles();
    const [open, setOpen] = react_1.useState(false);
    const [shouldUpdate, setShouldUpdate] = react_1.useState(true);
    const stateSkeleton = {
        image: {
            file: '',
            src: ''
        },
        numPicker: 1,
        title: '',
        receipt: '',
        source: '',
        ingredients: '',
        importUrl: ''
    };
    const [state, setState] = react_1.useState(stateSkeleton);
    react_1.useEffect(() => {
        if (recipeToUpdate._id) {
            setState({
                ...state,
                numPicker: recipeToUpdate.persons,
                title: recipeToUpdate.name,
                receipt: recipeToUpdate.text,
                image: { file: '', src: recipeToUpdate.image },
                source: recipeToUpdate.source,
                ingredients: formatIngredients(recipeToUpdate.ingredients)
            });
        }
    }, [open]);
    const [message, setMessage] = react_1.useState({});
    const [isLoading, setLoading] = react_1.useState(false);
    const [inputError, setInputError] = react_1.useState({
        importUrl: false,
        title: false,
        ingredients: false
    });
    react_1.useEffect(() => {
        if (shouldOpen) {
            setOpen(true);
        }
    }, [shouldOpen]);
    const onInputchange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        });
        setInputError({ ...inputError, [event.target.name]: false });
    };
    const onImageChange = (event) => {
        setState({
            ...state,
            image: { file: '', src: event.target.value }
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
            image: {},
            numPicker: 1
        });
        onClose(true);
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
            let formattedAttachments = formatIngredients(ingredients);
            setState({
                ...state,
                numPicker: persons,
                title: name,
                receipt: text,
                image: { ...state.image, src: image },
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
    const handleSaveRecipe = () => {
        console.log(state);
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
        const ingredientInputAsArray = state.ingredients.split('\n').filter(line => line !== "");
        console.log(ingredientInputAsArray);
        const transformedIngredients = transformedIngredientsInput(ingredientInputAsArray);
        console.log(transformedIngredients);
        const token = localStorage.getItem('token');
        const { title, type, numPicker, source, receipt, image } = state;
        const variables = {
            token: token,
            name: title,
            type: 'veg',
            persons: numPicker,
            source: source,
            text: receipt,
            image: image.src,
            ingredients: transformedIngredients
        };
        let query = http_1.default.recipes.createRecipeAndReturnFields('_id name persons source text image ingredients', variables);
        if (editPage) {
            variables._id = recipeToUpdate._id;
            query = http_1.default.recipes.updateRecipeAndReturnFields('_id name persons source text image ingredients', variables);
            console.log('Found query: ', query);
        }
        if (image.file && !editPage) {
            const formdata = new FormData();
            const serverFileName = 'IMG-' + Date.now();
            formdata.append("productImage", image.file, serverFileName);
            const requestOptions = {
                method: 'POST',
                body: formdata,
                redirect: 'follow'
            };
            fetch("http://localhost:8080/uploads", requestOptions)
                .then(response => response.json())
                .then(result => {
                console.log(result);
                variables.image = result.imageUrl;
                saveRecipeToDb(query);
            })
                .catch(error => console.log('error', error));
        }
        else {
            console.log('SAVING RECIPE TO DB WITHOUT FILE');
            saveRecipeToDb(query);
        }
        function saveRecipeToDb(query) {
            http_1.default.post(query)
                .then(res => {
                const msg = editPage ? 'opdateret' : 'gemt';
                setMessage({ msg: `${state.title} er ${msg}`, type: 'success', key: Math.random() });
                onReceiptSave(Date.now());
                handleClose();
            })
                .catch(error => {
                console.log(error);
                setMessage({ msg: error, type: 'error', key: Math.random() });
            });
        }
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
              {editPage ? 'Rediger opskrift' : 'Tilføj ny opskrift'}
            </Typography_1.default>
            <Button_1.default autoFocus color="inherit" onClick={handleSaveRecipe}>
              gem
            </Button_1.default>
          </Toolbar_1.default>
        </AppBar_1.default>

        <List_1.default>
          <ListItem_1.default className={classes.urlField}>
            <TextField_1.default name="importUrl" id="standard-basic" label="Web-adresse*" error={inputError.importUrl} onChange={onInputchange} className={classes.importUrlInput} value={state.importUrl}/>
            <Button_1.default className={classes.importButton} variant="contained" onClick={handleImportUrl} disabled={isLoading}>
              Importer opskrift
            </Button_1.default>
            <span style={{ margin: '5px 0 0 20px' }} className={classes.importButton}>{isLoading && <CircularProgress_1.default size={30} thickness={5}/>}</span>

          </ListItem_1.default>
        </List_1.default>

        <Divider_1.default />

        <div style={{ display: 'flex' }}>
          <div style={{ height: '100%' }}>
            <List_1.default>
              <ListItem_1.default className={classes.numPicker}>
                <numberPicker_jsx_1.default name="numPicker" onChange={(value) => onNumPickerChange(value)} value={recipeToUpdate.persons}/>
              </ListItem_1.default>

              <ListItem_1.default>
                <TextField_1.default name="title" id="standard-basic" label="Titel*" error={inputError.title} onChange={onInputchange} value={state.title} InputLabelProps={{ shrink: state.title ? true : false }}/>
              </ListItem_1.default>

              <ListItem_1.default>
                <TextField_1.default name="source" id="standard-basic" label="Kilde" onChange={onInputchange} value={state.source} InputLabelProps={{ shrink: state.source ? true : false }}/>
              </ListItem_1.default>
            </List_1.default>
          </div>


          <Grid_1.default container direction="row" spacing={5} className={classes.mainGrid}>



            <Grid_1.default item className={classes.textAreaGrid}>
              <TextField_1.default name="ingredients" className={classes.ingredientTextField} label="Ingredienser*" multiline rows={20} rowsMax={99} variant="outlined" size="medium" error={inputError.ingredients} onChange={onInputchange} helperText='Indtast * ved angivelse af enheder, f.eks. stk*' value={state.ingredients} InputLabelProps={{ shrink: state.ingredients ? true : false }}/>
            </Grid_1.default>

            <Grid_1.default item className={classes.textAreaGrid}>

              <TextField_1.default name="receipt" className={classes.prepareTextField} label="Tilberedning" multiline rows={20} rowsMax={99} variant="outlined" size="medium" onChange={onInputchange} value={state.receipt} InputLabelProps={{ shrink: state.receipt ? true : false }}/>
            </Grid_1.default>

            <Grid_1.default item className={classes.textAreaGrid}>

              <uploadImage_jsx_1.default name="receipt" src={state.image.src} onClose={() => setState({ ...state, image: { file: '', src: '' } })} onImageUpload={(imageObj) => setState({ ...state, image: imageObj })}/>

              <TextField_1.default name="image" id="standard-basic" placeholder="Link til billede" className={classes.imageInputField} onChange={onImageChange} value={state.image.src && state.image.src.includes('localhost') ? '' : state.image.src} InputLabelProps={{ shrink: state.image.src ? true : false }}/>
            </Grid_1.default>

          </Grid_1.default>

        </div>


        {message.msg ? <snackbar_jsx_1.default key={message.key} type={message.type} message={message.msg}/> : null}

      </Dialog_1.default>
    </div>);
}
exports.default = CreateRecipeDialog;
function formatIngredients(ingredients) {
    let formattedAttachments = '';
    ingredients.map(ingredient => {
        formattedAttachments += `${ingredient.quantity || ''} ${ingredient.unit || ''} ${ingredient.name} \n`.trimLeft();
    });
    return formattedAttachments;
}
function transformedIngredientsInput(ingrArray) {
    return ingrArray
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
}
