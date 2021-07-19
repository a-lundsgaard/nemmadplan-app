"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Search_1 = __importDefault(require("@material-ui/icons/Search"));
const InputBase_1 = __importDefault(require("@material-ui/core/InputBase"));
const styles_1 = require("@material-ui/core/styles");
const useStyles = styles_1.makeStyles((theme) => ({
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: styles_1.fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: styles_1.fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    }
}));
function SearchBar({ keyword, setKeyword }) {
    const classes = useStyles();
    const storeSearchInputToRedux = e => {
        window.store.dispatch({ type: 'INPUT', data: e.target.value });
    };
    return (<div className={classes.search}>
    <div className={classes.searchIcon}>
      <Search_1.default />
    </div>
    <InputBase_1.default placeholder="Søg…" onChange={storeSearchInputToRedux} classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
        }} inputProps={{ 'aria-label': 'search' }}/>
  </div>);
}
exports.default = SearchBar;
