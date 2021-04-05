import React, { useContext, useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import SalesList from './salesList/salesList3'


const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
        //display: 'flex',
        // backgroundColor: '#f5f5f9',
        zIndex: '1',
        backgroundColor: '#f5f5f9',
        //backgroundColor: 'white',

        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: "0px 0px 10px 1px #aaaaaa",

        //  maxWidth: 300,
        minWidth: 300,

        fontSize: theme.typography.pxToRem(12),
        border: '1px solid #dadde9',
    },
}))(Tooltip);




export default function CustomizedTooltips({ sales, id, onClick }) {

    const [open, setOpen] = React.useState(false);


    return (
        <div style={{ zIndex: '-1' }}
            onClick={(e) => e.stopPropagation()}
            onMouseLeave={()=> setOpen(false)} // no propagation when using leave instead of onmouseout
        >
            { sales.length ?
                <HtmlTooltip
                    interactive
                    //disableHoverListener={true}
                    //placement="left"
                    //arrow={true}
                    title={<SalesList sales={sales} id={id} />}
                    open={open}
                    onClick={()=> setOpen(true)}
                    //enterDelay={200}
                    //onMouseEnter={()=> { setTimeout(()=> setOpen(true), 200) }}                     
                >
                    <Button
                        color="primary"
                    >
                        <i>{sales.length < 10 ? sales.length + ' ' : sales.length} tilbud</i>
                    </Button>
                </HtmlTooltip> 
                :
                <Button
                    style={{ color: '#69696969', textDecoration: 'line-through' }}
                    onClick={onClick}
                ><i>0 tilbud</i></Button>
            }
        </div>
    );
}
