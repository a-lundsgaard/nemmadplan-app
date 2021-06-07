"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styles_1 = require("@material-ui/core/styles");
exports.default = styles_1.makeStyles({
    App: {
        width: '100%',
        margin: "30px 0px 0 10px",
    },
    paper: {
        maxHeight: 600,
        padding: "15px 0px 0 40px",
        overflowY: 'scroll',
        overflowX: 'hidden'
    },
    header: {
        textAlign: 'left',
        '& h1': {
            color: '#2c3e50',
            margin: '0 0 10px 0',
            fontSize: '1.5rem',
            fontWeight: '300',
            '& span': {
                fontWeight: '700'
            },
        },
    },
    link: {
        display: 'flex',
        justifyContent: 'center',
        backfaceVisibility: 'hidden',
        color: '#81b3d2',
        fontSize: '0.7rem',
        position: 'relative',
        textDecoration: 'none',
        transition: '0.5s color ease'
    }
});
