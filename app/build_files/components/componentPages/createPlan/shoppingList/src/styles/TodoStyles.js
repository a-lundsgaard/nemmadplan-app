"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styles_1 = require("@material-ui/core/styles");
exports.default = styles_1.makeStyles({
    Todo: {
        width: 'auto',
        display: 'flex',
        padding: '5px 0 5px 0',
        justifyContent: 'flex-start',
        paddingLeft: '0.5rem',
        color: '#34495e',
        fontSize: '1rem',
        borderBottom: '1px solid #69696938',
        transition: 'all 0.3s ease',
        '&:hover': {
            background: 'rgba(0, 0, 0, 0.03)',
            cursor: 'pointer',
        },
        '&:hover div': {
            opacity: '1'
        }
    },
    salesButtons: {
        width: '90px',
        whiteSpace: 'nowrap'
    },
    icons: {
        transition: 'all 0.3s',
        opacity: '0',
        margin: '5px 10px 0',
        marginLeft: 'auto',
        whiteSpace: 'nowrap'
    }
});
