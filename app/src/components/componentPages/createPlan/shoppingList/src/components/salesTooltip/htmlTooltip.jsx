import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import SalesList from './salesList/salesList';



const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
        //display: 'flex',
        // backgroundColor: '#f5f5f9',
        zIndex: '1',
        backgroundColor: '#f5f5f9',

        color: 'rgba(0, 0, 0, 0.87)',
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
        onClick={(e)=> e.stopPropagation()}
        >
            { sales.length ?
                <HtmlTooltip
                    interactive
                    placement="left"
                    title={
                        <SalesList sales={sales} id={id}
                        />}
                >
                    <Button
                        //variant="outlined"
                        color="primary"
                    >
                        <i>{sales.length < 10 ? sales.length + ' ' : sales.length} tilbud</i>
                    </Button>
                </HtmlTooltip> :

                <div
                    //variant="outlined"
                    color="standard"
                >
                    <i
                        onClick={onClick}
                    >Ingen tilbud</i>
                </div>}
        </div>
    );
}
