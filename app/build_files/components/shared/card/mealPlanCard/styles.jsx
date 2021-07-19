"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styles_1 = require("@material-ui/core/styles");
const colors_1 = require("@material-ui/core/colors");
exports.default = styles_1.makeStyles((theme) => ({
    card: {
        maxWidth: 245,
        minWidth: 245
    },
    span: {
        cursor: 'pointer'
    },
    control: {
        padding: theme.spacing(2),
    },
    media: {
        height: 0,
        paddingTop: '56.25%',
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: colors_1.red[500],
    },
}));
