"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styles_1 = require("@material-ui/core/styles");
const Modal_1 = __importDefault(require("@material-ui/core/Modal"));
const Backdrop_1 = __importDefault(require("@material-ui/core/Backdrop"));
const Fade_1 = __importDefault(require("@material-ui/core/Fade"));
const useStyles = styles_1.makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: '2100 !important'
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    img2: {
        maxHeight: 500
    },
    img: {
        maxHeight: 80,
        display: 'block',
        position: 'relative',
        transition: "transform .2s",
        zIndex: "9",
        cursor: 'pointer'
    }
}));
function TransitionsModal({ imageSource }) {
    const classes = useStyles();
    const [open, setOpen] = react_1.default.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    /*   useEffect(()=> {
          setOpen(boolean)
      }, [boolean]) */
    return (<div>
            <img className={classes.img} src={imageSource} onClick={handleOpen}/>
            <Modal_1.default aria-labelledby="transition-modal-title" aria-describedby="transition-modal-description" className={classes.modal} open={open} onClose={handleClose} onMouseOut={handleClose} closeAfterTransition BackdropComponent={Backdrop_1.default} BackdropProps={{
        timeout: 500,
    }}>
                <Fade_1.default in={open}>
                    <div className={classes.paper}>
                        <img className={classes.img2} src={imageSource}/>
                    </div>
                </Fade_1.default>
            </Modal_1.default>
        </div>);
}
exports.default = TransitionsModal;
