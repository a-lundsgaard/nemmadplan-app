"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styles_1 = require("@material-ui/core/styles");
const Button_1 = __importDefault(require("@material-ui/core/Button"));
const Tooltip_1 = __importDefault(require("@material-ui/core/Tooltip"));
const salesList3_1 = __importDefault(require("./salesList/salesList3"));
const HtmlTooltip = styles_1.withStyles((theme) => ({
    tooltip: {
        //display: 'flex',
        // backgroundColor: '#f5f5f9',
        zIndex: '1',
        backgroundColor: '#f5f5f9',
        //backgroundColor: 'white',
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: "0px 0px 10px 1px #aaaaaa",
        //  maxWidth: 300,
        minWidth: 300,
        fontSize: theme.typography.pxToRem(12),
        border: '1px solid #dadde9',
    },
}))(Tooltip_1.default);
function CustomizedTooltips({ sales, id, onClick }) {
    const [open, setOpen] = react_1.default.useState(false);
    return (<div style={{ zIndex: '-1' }} onClick={(e) => e.stopPropagation()}>
            {sales.length ?
        <HtmlTooltip interactive 
        //placement="left"
        //arrow={true}
        title={<salesList3_1.default sales={sales} id={id}/>}>
                    <Button_1.default 
        //variant="outlined"
        color="primary">
                        <i>{sales.length < 10 ? sales.length + ' ' : sales.length} tilbud</i>
                    </Button_1.default>
                </HtmlTooltip> :
        <Button_1.default style={{ color: '#69696969', textDecoration: 'line-through' }} onClick={onClick}><i>0 tilbud</i></Button_1.default>}
        </div>);
}
exports.default = CustomizedTooltips;
