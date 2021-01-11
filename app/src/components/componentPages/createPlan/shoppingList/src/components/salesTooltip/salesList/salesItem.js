import React, { useState, useEffect, useContext } from "react";
import Button from '@material-ui/core/Button';
//import { DispatchContext } from '../contexts/todos.context';

import { DispatchContext } from '../../../contexts/todos.context';
import { EDIT_TODO } from '../../../constants/actions';
import ImageModal from '../modal';



import { withStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({

    salesItemContainer: {
        position: 'static',
        zIndex: "5",
        display: 'block',
        margin: '10px 0 0 4px',
        overflow: 'visible'
    },

    chain: {
        display: 'inline'
    },

    button: {
        color: 'green',
        margin: '10px 0 10px 0'
    }

}));


export default function salesItem({ item, id }) {

    const classes = useStyles();
    const dispatch = useContext(DispatchContext);
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <div key={Math.random()} className={classes.salesItemContainer}>

            <h3 className={classes.chain}>{item.chain}</h3>
            <div><b>{item.price}kr, {item.quantity} {item.unit}</b></div>
            <div><em>{item.title}</em></div>
            <ImageModal imageSource={item.img}/>
            <Button
                onClick={() => dispatch({ type: EDIT_TODO, initiator: 'REPLACEMENT_FROM_SALES', id, task: `${item.title} ${item.price}kr, ${item.quantity} ${item.unit}, ${item.chain}` })}
                className={classes.button}
                variant='outlined'
            >Erstat</Button>
        </div>
    )
}