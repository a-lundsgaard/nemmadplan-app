import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import ShoppingList from '../../../../components/componentPages/createPlan/shoppingList/src/components/App';

const useStyles = makeStyles((theme) => ({

    receiptText: {
        whiteSpace: "pre-wrap"
    },

    image: {
        maxWidth: 350
    },

    list: {
        //  display: "inline-block"
    }
}));


interface Props {
    title: string,
    onOpenChange: (bool: boolean) => void,
    visible: boolean,
    children: React.FC
}

export default function MealPlanShoppingListDialog({ title, onOpenChange, visible, ...props }: Props) {

    const classes = useStyles();


    const [open, setOpen] = React.useState(true);
    const [scroll, setScroll] = React.useState('paper');

    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    const handleClose = () => {
        setOpen(false);
        onOpenChange(false)
    };

    useEffect(() => {
        setOpen(visible)
    }, [visible])


    /*   const handleCheckBoxChange = (event) => {
        setChecked(event.target.checked);
      }; */


    const descriptionElementRef = React.useRef<HTMLElement>(null);
    React.useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    // <Button onClick={handleClickOpen('paper')}>scroll=paper</Button>
    //<Button onClick={handleClickOpen('body')}>scroll=body</Button>

    return (
        <div>

            <Dialog
                open={open}
                onClose={handleClose}
                scroll={'body'}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
                maxWidth='lg'
                style={
                    {
                        overflow: 'hidden'
                    }
                }
            >
                <DialogTitle id="scroll-dialog-title">{title}</DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>
                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                        className={classes.receiptText}
                    //component={'div'}
                    >

                        {
                            props.children
                        }


                    </DialogContentText>

                </DialogContent>
                <DialogActions>
                    <Button color="primary">
                        Redigér
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Luk
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
