import { makeStyles } from '@material-ui/core/styles';

const arrowMarginLeft = 15;
const arrowColor = '#55555573';


export default makeStyles((theme) => ({


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
        //width: '40px'
        //marginRight: 5
        //width: 20
    },

    innerContainer: {
        //marginLeft: '5px',
        fontSize: '80%',
    },

    numberInput: {
        //padding: "0 0 0 3px",
        //fontSize: "90%",
        width: "40px",
        webkitAppearance: "none",
        outline: 'none',
        border: 'none',
        webkitInnerSpinButton: 'none',
        position: 'relative',
        textAlign: 'center'
    },

}))


