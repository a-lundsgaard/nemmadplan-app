import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


interface Props {
    agree: (bool: boolean) => boolean;
    children?: React.FC | React.ReactElement
    infoText: string
    header: string
}

export default function AlertDialog({ agree, infoText, header, ...props }: Props) {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        //e.stopPropagation()
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAgree = () => {
        agree(true)
        setOpen(false);
    };

    return (
        <div>
            <span onClick={handleClickOpen} >
                {props.children}
            </span>


            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{header}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                       {infoText}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Tilbage
                    </Button>
                    <Button onClick={handleAgree} color="primary" autoFocus>
                        Fortsæt
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
