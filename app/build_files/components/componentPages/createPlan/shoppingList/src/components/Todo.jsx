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
const todos_context_jsx_1 = require("../contexts/todos.context.jsx");
const EditTodoForm_jsx_1 = __importDefault(require("./EditTodoForm.jsx"));
const useToggleState_jsx_1 = __importDefault(require("../hooks/useToggleState.jsx"));
const TodoStyles_1 = __importDefault(require("../styles/TodoStyles"));
const actions_1 = require("../constants/actions");
const Delete_1 = __importDefault(require("@material-ui/icons/Delete"));
const Edit_1 = __importDefault(require("@material-ui/icons/Edit"));
const TrendingDown_1 = __importDefault(require("@material-ui/icons/TrendingDown"));
const CircularProgress_1 = __importDefault(require("@material-ui/core/CircularProgress"));
const htmlTooltip_1 = __importDefault(require("./salesTooltip/htmlTooltip"));
const http_1 = __importDefault(require("HTTP/http"));
const Button_1 = __importDefault(require("@material-ui/core/Button"));
const smallNumPicker_1 = __importDefault(require("./smallNumPicker/smallNumPicker"));
function Todo(props) {
    const classes = TodoStyles_1.default();
    const dispatch = react_1.useContext(todos_context_jsx_1.DispatchContext);
    const [isEditing, toggleEditing] = useToggleState_jsx_1.default(false);
    const [state, setState] = react_1.useState({
        sales: [],
        isLoading: false
    });
    console.log('Fand unitprops. ' + props.unit, 'til : ' + props.task);
    const [shouldGetSale, setShouldGetSale] = react_1.useState(0);
    const getSales = async (ingredientString) => {
        let removeCommaWords = ingredientString.replace(/\d+\sstk/g, '').trimLeft().trimRight().split(' ');
        removeCommaWords = removeCommaWords.map(el => el.match(/\d|\(|\)/) ? '' : el);
        if (!removeCommaWords) {
            return [];
        }
        const possibleIngredients = removeCommaWords.join(' ').match(/[a-zA-Z\u00C0-\u00ff]{2,20}|æg/gi);
        if (!possibleIngredients) {
            console.log('NO POSSIBLE INGREDIENTS, RETURNNING');
            return [];
        }
        const searchString = props.initiator === 'USER' ? ingredientString : possibleIngredients.pop();
        console.log(searchString);
        const query = JSON.stringify({
            products: [searchString],
            chains: {
                wanted: false,
                chainNames: []
            }
        });
        const results = await http_1.default.post(query, "sales");
        console.log(results);
        const sortedByCheapest = results.sort((a, b) => a.price < b.price ? -1 : (a.price > b.price ? 1 : 0));
        return sortedByCheapest;
    };
    react_1.useEffect(() => {
        let mounted = true;
        if (shouldGetSale) {
            if (mounted && props.initiator !== 'REPLACEMENT_FROM_SALES') {
                setState({ ...state, isLoading: true });
                getSales(props.task)
                    .then(results => {
                    var _a;
                    if (mounted) {
                        setState({
                            ...state,
                            isLoading: false,
                            sales: results || []
                        });
                        dispatch({ type: actions_1.ADD_SALES_TO_TODO, ...props, img: ((_a = results[0]) === null || _a === void 0 ? void 0 : _a.img) || null });
                    }
                }).catch(function (e) {
                    setState({ ...state, isLoading: false, sales: [] });
                    console.error(e);
                });
            }
        }
        return () => {
            mounted = false;
        };
    }, [shouldGetSale]);
    react_1.useEffect(() => {
        if (props.initiator === 'USER') {
            setShouldGetSale(shouldGetSale + 1);
        }
    }, [props.task]);
    if (isEditing) {
        return (<li className={classes.Todo} style={{ overflowY: 'hidden' }} onBlur={() => { toggleEditing(); }}>
        <EditTodoForm_jsx_1.default id={props.id} task={props.task} toggleEditForm={toggleEditing} restOfTask={props}/>
      </li>);
    }
    return (<li className={classes.Todo}>
      <span className={classes.salesButtons}>
        {!shouldGetSale &&
            <Button_1.default onClick={(e) => { e.stopPropagation(); setShouldGetSale(true); }}>
            <TrendingDown_1.default />
          </Button_1.default>}

        {state.isLoading && <CircularProgress_1.default style={{ margin: '8px 0 0 23px' }} size={20}/>}

        {shouldGetSale && !state.isLoading ? <htmlTooltip_1.default sales={state.sales} id={props.id} onClick={() => setShouldGetSale(shouldGetSale + 1)}/> : null}
      </span>

      <smallNumPicker_1.default unit={props.unit} quantity={props.quantity} parentProps={props}/>

      <span onClick={(e) => { e.stopPropagation(); dispatch({ type: actions_1.TOGGLE_TODO, id: props.id }); }} style={{
            textDecoration: props.completed ? 'line-through' : '',
            color: props.completed ? '#bdc3c7' : '#34495e',
            cursor: 'pointer',
            overflow: 'hidden',
            margin: '7px 0 0 18px'
        }}>
        {props.task}
      </span>



      <div className={classes.icons}>
        <Delete_1.default style={{ color: '#c0392b' }} className="fas fa-trash" onClick={e => {
            e.stopPropagation();
            dispatch({ type: actions_1.REMOVE_TODO, id: props.id });
        }}/>
        <Edit_1.default style={{ color: '#58b2dc' }} className="fas fa-pen" onClick={e => {
            e.stopPropagation();
            toggleEditing();
        }}/>
      </div>

    </li>);
}
exports.default = react_1.memo(Todo);
