import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';



const useStylesLinear = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));


export default function LinearIndeterminate() {
    const classes = useStylesLinear();

    return (
        <div className={classes.root}>
            <LinearProgress />
        </div>
    );
}







const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        size: '20em',
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
    },
}));

export function CircularLoader() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CircularProgress size={100}/>
        </div>
    );
}