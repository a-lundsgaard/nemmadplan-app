"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styles_1 = require("@material-ui/core/styles");
exports.default = styles_1.makeStyles((theme) => ({
    appBar: {
        position: 'relative',
        background: '#c24e00' // dark orange // sj
    },
    paper: {
        padding: "15px 40px 0 40px"
    },
    shoppingList: {
        padding: "15px 40px 0 40px",
        width: 400
    },
    mainGrid: {
        margin: '0 0 0 20px',
        overflowX: 'hidden',
        zIndex: 0,
        wrap: 'nowrap'
    },
    recipeCardGrid: {
        margin: '20px 0 0 5px'
    },
    importButton: {
        marginLeft: 20
    },
    daysSelect: {
        marginLeft: 20,
    },
    imageInputField: {
        marginTop: 20,
        maxWidth: 280,
        width: "100%"
    },
    importUrlInput: {
        maxWidth: 280,
        marginBottom: 20,
        width: "100%"
    },
    textAreaGrid: {
        marginTop: 20,
        width: 'fit-content',
        marginLeft: "20px",
    },
    recipeFoodPlanImage: {
        maxWidth: 80,
        height: 'auto',
        marginRight: 8
    },
    numPicker: {
        marginTop: 1
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));
