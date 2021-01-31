import React, { useState, useEffect } from "react";

import { makeStyles } from '@material-ui/core/styles';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import listenToSales from 'Redux/helpers/variableSubscription'
import shoppingListIconSelfMade from './shopping-list-icon.png'

import Divider from '@material-ui/core/Divider';

import ListIconAndItemCounter from '../components/listIconAndItemCounter/listIconAndItemCounter';
import SalesList from '../components/itemList/salesList';




const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: 'calc(100% - 65px)',
        background: 'white',
        right: 'calc(95px - 100%)', // 100px is the width of the sidebar
       // right: 'calc(100% - 100px)',
        bottom: 0,
        position: 'fixed',
        transition: '0.5s',
        // borderLeft: '1px solid',
        boxShadow: "0px 0px 10px 1px #aaaaaa",
        overflow: 'hidden',
        //zIndex: 2

        // float: 'right'
    },

    header: {
        margin: 0
    }

}));

export default function bar(props) {

    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [sales, setSales] = useState([1, 2, 3]); // 3 items in the array is equivalent to the amount of default items



    useEffect(() => {
        listenToSales(setSales, 'sales') // sets up redux listener on the sales change
    }, [])


    useEffect(() => {
        console.log('sales were set')
        //alert(sales);
        setSales(sales)
    }, [sales])

    return (
        <div
            className={classes.root}
            style={{
                //right: 
                right: open && 0,
                width: open && '50%',

                display: 'flex'
            }}
        >
            <div
                style={{
                    background: 'white',
                    borderRight: '2px solid #f0f0f5',
                    width: 100
                    //marginRight: 500
                }}
                 >

                <ListIconAndItemCounter
                 open={open} 
                 sales={sales} 
                 onClick={() => setOpen(!open)}
                 />

                <SalesList 
                sales={sales} 
                open={open} 
                />
                
            </div>

            <div style={{ width: '100%' }}>
                {props.children}
            </div>

        </div>
    )
}