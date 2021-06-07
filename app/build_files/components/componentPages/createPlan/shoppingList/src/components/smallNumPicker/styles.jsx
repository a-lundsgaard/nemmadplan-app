"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styles_1 = require("@material-ui/core/styles");
const arrowMarginLeft = 15;
const arrowColor = '#55555573';
exports.default = styles_1.makeStyles((theme) => ({
    triangleDown: {
        width: 0,
        height: 0,
        borderLeft: "6px solid transparent",
        borderRight: "6px solid transparent",
        borderTop: `9px solid ${arrowColor}`,
        cursor: "pointer",
        marginLeft: arrowMarginLeft
    },
    triangleUp: {
        width: 0,
        height: 0,
        borderLeft: "6px solid transparent",
        borderRight: "6px solid transparent",
        borderBottom: `9px solid ${arrowColor}`,
        cursor: "pointer",
        marginLeft: arrowMarginLeft
    },
    containerNum: {
        display: "block",
    },
    innerContainer: {
        fontSize: '80%',
    },
    numberInput: {
        width: "40px",
        webkitAppearance: "none",
        outline: 'none',
        border: 'none',
        webkitInnerSpinButton: 'none',
        position: 'relative',
        textAlign: 'center'
    },
}));
