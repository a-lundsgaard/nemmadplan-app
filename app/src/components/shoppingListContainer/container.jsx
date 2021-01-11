import React, { useState, useEffect } from "react";

import { makeStyles } from '@material-ui/core/styles';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles((theme) => ({
    root: {
        width: 800,
        height: 'calc(100% - 65px)',
        // background: 'dimgray',
        right: -700,
        bottom: 0,
        position: 'fixed',
        transition: '0.5s',
        borderLeft: '1px solid grey',
        overflow: 'hidden'

        // float: 'right'
    },

    header: {
        margin: 0
    }

}));

export default function bar(props) {

    const classes = useStyles();
    const [open, setOpen] = useState(false)


    return (
        <div
            className={classes.root}
            style={{
                right: open && 0,
                display: 'flex'
            }}
        >
            <div>
                <ArrowBackIcon
                    onClick={() => setOpen(!open)}
                    color={'primary'}
                    style={{
                        fontSize: 90,
                        cursor: 'pointer',
                        transition: '0.5s',
                        transform: open && "rotate(180deg)"
                    }} />
            </div>
            <div style={{width: 700, overflow: 'hidden'}}>
                {props.children}
            </div>

        </div>
    )
}