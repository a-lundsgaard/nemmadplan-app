import React, { useState, useEffect } from "react";

import { makeStyles } from '@material-ui/core/styles';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import listenToSales from 'Redux/helpers/variableSubscription'


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
    const [open, setOpen] = useState(false);

    const [sales, setSales] = useState(window.store.getState().sales); // getting search bar input


    useEffect(() => {
        //alert(sales)
        listenToSales(setSales, 'sales') // sets up redux listener on the sales change
    }, [])


    useEffect(() => {
        console.log('sales were set')
        //alert(sales);
    }, [sales])

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

                {
                    <div style={{
                        listStyle: 'none'
                            
                    }}>{
                        sales.map((sale, index) => {
                        return <div style={{
                            margin: '8px'
                        }}  key={index}>
                            <img style={{ 
                                maxHeight: 80, 
                                maxWidth: 80,
                                opacity: open ? 0 : 0.4,
                                transition: "opacity 0.8s ease-in-out",
                                //webkitTransition: "opacity 0.4s ease-in-out"
                                }} src={sale.img} />
                        </div> }
                    )} 
                    </div>
                }


            </div>
            <div style={{ width: 700, overflow: 'hidden' }}>
                {props.children}
            </div>

        </div>
    )
}