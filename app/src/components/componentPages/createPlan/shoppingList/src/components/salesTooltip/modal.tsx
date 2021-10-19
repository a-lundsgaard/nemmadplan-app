import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import ModalUnstyled from '@mui/core/ModalUnstyled';


import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: '2100 !important',
         "& .MuiModal-rounded": {
            borderRadius: 25
          } 
        },
    paper: {
        backgroundColor: theme.palette.background.paper,
        // border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        //borderRadius: 25
    },

    img2: {
        maxHeight: 500,
        borderRadius: 25,
    },


    img: {
        maxHeight: 80,
        display: 'block',
        position: 'relative',
        transition: "transform .2s",
        zIndex: "9",
        cursor:'pointer',
        // borderRadius: 25,

    }
}));

export default function TransitionsModal({ imageSource }) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    /*   useEffect(()=> {
          setOpen(boolean)
      }, [boolean]) */

    return (
        <div 
        //style={{borderRadius: 25}}
        >
            <img className={classes.img} src={imageSource} onClick={handleOpen} />
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                //onBlur={handleClose}
                //onMouseOut={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open} 
                //style={{borderRadius: 25}} 
                >
                    <div className={classes.paper}>
                        <img className={classes.img2} src={imageSource} />
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}