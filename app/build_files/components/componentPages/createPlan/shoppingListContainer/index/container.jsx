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
const variableSubscription_1 = __importDefault(require("Redux/helpers/variableSubscription"));
const listIconAndItemCounter_1 = __importDefault(require("../components/listIconAndItemCounter/listIconAndItemCounter"));
const salesList_1 = __importDefault(require("../components/itemList/salesList"));
const useStyles = styles_1.makeStyles((theme) => ({
    root: {
        width: '100%',
        height: 'calc(100% - 65px)',
        background: 'white',
        right: 'calc(95px - 100%)',
        bottom: 0,
        position: 'fixed',
        transition: '0.5s',
        boxShadow: "0px 0px 10px 1px #aaaaaa",
        overflow: 'hidden',
    },
    header: {
        margin: 0
    }
}));
function bar(props) {
    const classes = useStyles();
    const [open, setOpen] = react_1.useState(false);
    const [sales, setSales] = react_1.useState([1, 2, 3]);
    react_1.useEffect(() => {
        variableSubscription_1.default(setSales, 'sales');
    }, []);
    react_1.useEffect(() => {
        console.log('sales were set');
        setSales(sales);
    }, [sales]);
    return (<div className={classes.root} style={{
            right: open && 0,
            width: open && '50%',
            display: 'flex'
        }}>
            <div style={{
            background: 'white',
            borderRight: '2px solid #f0f0f5',
            width: 100
        }}>

                <listIconAndItemCounter_1.default open={open} sales={sales} onClick={() => setOpen(!open)}/>

                <salesList_1.default sales={sales} open={open}/>
                
            </div>

            <div style={{ width: '100%' }}>
                {props.children}
            </div>

        </div>);
}
exports.default = bar;
