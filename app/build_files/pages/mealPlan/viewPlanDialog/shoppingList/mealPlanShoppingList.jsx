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
const DialogActions_1 = __importDefault(require("@material-ui/core/DialogActions"));
const DialogContent_1 = __importDefault(require("@material-ui/core/DialogContent"));
const DialogContentText_1 = __importDefault(require("@material-ui/core/DialogContentText"));
const DialogTitle_1 = __importDefault(require("@material-ui/core/DialogTitle"));
const styles_1 = require("@material-ui/core/styles");
const useStyles = styles_1.makeStyles((theme) => ({
    receiptText: {
        whiteSpace: "pre-wrap"
    },
    image: {
        maxWidth: 350
    },
    list: {}
}));
function MealPlanShoppingListDialog({ title, onOpenChange, visible, ...props }) {
    const classes = useStyles();
    const [open, setOpen] = react_1.default.useState(true);
    const [scroll, setScroll] = react_1.default.useState('paper');
    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    };
    const handleClose = () => {
        setOpen(false);
        onOpenChange(false);
    };
    react_1.useEffect(() => {
        setOpen(visible);
    }, [visible]);
    const descriptionElementRef = react_1.default.useRef(null);
    react_1.default.useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);
    return (<div>

            <Dialog_1.default open={open} onClose={handleClose} scroll={'body'} aria-labelledby="scroll-dialog-title" aria-describedby="scroll-dialog-description" maxWidth='lg' style={{
            overflow: 'hidden'
        }}>
                <DialogTitle_1.default id="scroll-dialog-title">{title}</DialogTitle_1.default>
                <DialogContent_1.default dividers={scroll === 'paper'}>
                    <DialogContentText_1.default id="scroll-dialog-description" ref={descriptionElementRef} tabIndex={-1} className={classes.receiptText}>

                        {props.children}


                    </DialogContentText_1.default>

                </DialogContent_1.default>
                <DialogActions_1.default>
                    <Button_1.default color="primary">
                        Redigér
                    </Button_1.default>
                    <Button_1.default onClick={handleClose} color="primary">
                        Luk
                    </Button_1.default>
                </DialogActions_1.default>
            </Dialog_1.default>
        </div>);
}
exports.default = MealPlanShoppingListDialog;
