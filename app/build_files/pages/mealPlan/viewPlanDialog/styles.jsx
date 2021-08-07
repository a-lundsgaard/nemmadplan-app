"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styles_1 = require("@material-ui/core/styles");
exports.default = styles_1.makeStyles((theme) => ({
    appBar: {
        position: 'fixed',
        background: '#c24e00',
        marginBottom: 60
    },
    mainGrid: {
        marginTop: -20
    },
    importButton: {
        marginLeft: 20
    },
    urlField: {
        marginBottom: 20
    },
    imageInputField: {
        marginTop: 20,
        maxWidth: 280,
        width: "100%"
    },
    importUrlInput: {
        maxWidth: 500,
        width: "100%"
    },
    textAreaGrid: {
        marginTop: 32,
    },
    ImageUploader: {
        cursor: 'pointer'
    },
    ingredientTextField: {
        maxWidth: 300,
        width: "100%"
    },
    prepareTextField: {
        minWidth: 400,
    },
    numPicker: {
        marginTop: 20
    },
    title: {
        marginLeft: theme.spacing(2),
    },
}));
