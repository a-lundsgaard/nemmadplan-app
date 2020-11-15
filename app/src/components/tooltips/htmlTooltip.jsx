import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';



const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
        //display: 'flex',
        // backgroundColor: '#f5f5f9',
        backgroundColor: '#f5f5f9',

        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 220,
        fontSize: theme.typography.pxToRem(12),
        border: '1px solid #dadde9',
    },
}))(Tooltip);




export default function CustomizedTooltips({ sales }) {

    return (
        <div>
            { sales.length ? <HtmlTooltip
                interactive
                placement="left"
                title={
                    <ul style={{ overflow: 'scroll', maxHeight: 500 }}>
                        {
                            sales.map(item => (<div key={Math.random()}>
                                <li color="inherit">{item.price}kr, {item.quantity} {item.unit}, {item.title}, {item.chain}<img style={{maxHeight: 100}} src={item.img}/></li>

                            </div>))
                        }
                    </ul>
                }
            >
                <Button
                    //variant="outlined"
                    color="primary"
                >
                    <i>{sales.length} tilbud</i>
                </Button>

            </HtmlTooltip> : <div
                //variant="outlined"
                color="standard"
            >
                    <i>Ingen tilbud</i>
            </div>}
        </div>
    );
}
