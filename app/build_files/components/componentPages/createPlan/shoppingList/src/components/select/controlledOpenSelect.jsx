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
const InputLabel_1 = __importDefault(require("@material-ui/core/InputLabel"));
const MenuItem_1 = __importDefault(require("@material-ui/core/MenuItem"));
const FormControl_1 = __importDefault(require("@material-ui/core/FormControl"));
const Select_1 = __importDefault(require("@material-ui/core/Select"));
const useStyles = styles_1.makeStyles((theme) => ({
    button: {
        display: 'block',
        marginTop: theme.spacing(2),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}));
function ControlledOpenSelect({ label, optionList, chosen, value }) {
    const classes = useStyles();
    const [age, setAge] = react_1.default.useState('');
    const [open, setOpen] = react_1.default.useState(false);
    console.log(label);
    console.log(optionList);
    const handleChange = (event) => {
        chosen(event.target.value);
        setAge(event.target.value);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };
    react_1.useEffect(() => {
        if (value) {
            setAge(value);
        }
    }, [value]);
    return (<div>
            <FormControl_1.default className={classes.formControl}>
                <InputLabel_1.default id="demo-controlled-open-select-label">{label}</InputLabel_1.default>

                <Select_1.default labelId="demo-controlled-open-select-label" id="demo-controlled-open-select" open={open} onClose={handleClose} onOpen={handleOpen} value={age} onChange={handleChange}>
                    <MenuItem_1.default selected value="">
                        <em>Ingen valgt</em>
                    </MenuItem_1.default>
                    {typeof optionList !== 'string' && optionList ? optionList.map((option, index) => <MenuItem_1.default key={index} value={option}>{option}</MenuItem_1.default>) : null}

                </Select_1.default>
            </FormControl_1.default>
        </div>);
}
exports.default = ControlledOpenSelect;
