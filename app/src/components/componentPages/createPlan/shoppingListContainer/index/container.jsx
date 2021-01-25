import React, { useState, useEffect } from "react";

import { makeStyles } from '@material-ui/core/styles';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import listenToSales from 'Redux/helpers/variableSubscription'
import shoppingListIcon from './shopping-list-icon-14.jpg'

import shoppingListIconSelfMade from './shopping-list-icon.png'



const useStyles = makeStyles((theme) => ({
    root: {
        width: 800,
        height: 'calc(100% - 65px)',
        background: 'white',
        right: -700,
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

    const [sales, setSales] = useState(window.store.getState().sales); // getting search bar input



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
                right: open && 0,
                display: 'flex'
            }}
        >
            <div
                style={{
                    background: 'white',
                    //borderRight: '2px solid #f0f0f5',
                    width: 100
                    //marginRight: 500
                }}

            >
                <div
                    onClick={() => setOpen(!open)}
                    //color={'primary'}
                    style={{
                        height: 50,
                        width: 50,
                        // fontSize: 90,
                        cursor: 'pointer',
                        //transition: '0.5s',
                        //transform: open && "rotate(180deg)",
                        background: `url(${shoppingListIconSelfMade})`,
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                        margin: '10px 0 0 28px',
                        //borderBottom: '1px solid #ccc'
                        //paddingRight: '20px'

                    }}
                >
                    <span
                        style={{
                       /*      height: '10px',
                            width: '10px', */
                            marginLeft: 25,
                            padding: sales.length < 10 ? '7px 10px 7px 10px' : '7px 7px 7px 7px',
                            background: '#3f51bf',
                            color: 'white',
                            borderRadius: '50%'
                        }}
                    >
                        {sales.length}
                    </span>
                </div>

                <div style={{
                    margin: '5px 0 30px 10px', 
                    fontSize: 14,                                         
                    opacity: open ? 0 : 0.8,
                    transition: "opacity 0.8s ease-in-out",
                    }}>Indkøbsliste</div>

                {
                    <div style={{
                        listStyle: 'none'

                    }}>{
                            sales.map((sale, index) => { 
                                return <div style={{
                                    margin: '8px'
                                }} key={index}>
                                    <img style={{
                                        maxHeight: 80,
                                        maxWidth: 80,
                                        //opacity: 0.4,

                                        opacity: open ? 0 : 0.4,
                                        transition: "opacity 0.8s ease-in-out",
                                        //webkitTransition: "opacity 0.4s ease-in-out"
                                    }} src={sale.img} />
                                </div>
                            }
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