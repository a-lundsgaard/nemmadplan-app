"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Button_1 = __importDefault(require("@material-ui/core/Button"));
const Dialog_1 = __importDefault(require("@material-ui/core/Dialog"));
const DialogActions_1 = __importDefault(require("@material-ui/core/DialogActions"));
const DialogContent_1 = __importDefault(require("@material-ui/core/DialogContent"));
const DialogContentText_1 = __importDefault(require("@material-ui/core/DialogContentText"));
const DialogTitle_1 = __importDefault(require("@material-ui/core/DialogTitle"));
function AlertDialog({ agree, infoText, header, ...props }) {
    const [open, setOpen] = react_1.default.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleAgree = () => {
        agree(true);
        setOpen(false);
    };
    return (<div>
            <span onClick={handleClickOpen}>
                {props.children}
            </span>


            <Dialog_1.default open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle_1.default id="alert-dialog-title">{header}</DialogTitle_1.default>
                <DialogContent_1.default>
                    <DialogContentText_1.default id="alert-dialog-description">
                       {infoText}
                    </DialogContentText_1.default>
                </DialogContent_1.default>
                <DialogActions_1.default>
                    <Button_1.default onClick={handleClose} color="primary">
                        Tilbage
                    </Button_1.default>
                    <Button_1.default onClick={handleAgree} color="primary" autoFocus>
                        Fortsæt
                    </Button_1.default>
                </DialogActions_1.default>
            </Dialog_1.default>
        </div>);
}
exports.default = AlertDialog;
