import React, {useEffect, useState} from 'react';
//import Button from '@material-ui/core/Button';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

function CustomizedSnackbars({message, type, postion}) {
    const classes = useStyles();    
    const [open, setOpen] = useState(true);

    const pos = {
        vertical:  postion?.y || 'bottom',
        horizontal: postion?.x || 'left'
      }
    const { vertical, horizontal } = pos;


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setOpen(false);
    };



    return (
        <div className={classes.root}>
            <Snackbar 
            open={open} autoHideDuration={5000} onClose={handleClose}
            anchorOrigin={{ vertical, horizontal }}
            >
                <Alert onClose={handleClose} severity={type}>
                    {message}
                </Alert>
            </Snackbar>
        </div>
    );
}

export default CustomizedSnackbars;