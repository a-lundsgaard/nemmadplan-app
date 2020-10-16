import React, {useState, useEffect} from "react";

import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import ScrollDialog from 'Components/dialog/scrollDialog';

import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { Link, NavLink, useHistory  } from "react-router-dom";

import Divider from '@material-ui/core/Divider';

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';




const useStyles = makeStyles((theme) => ({
    
    card: {
      maxWidth: 245,
  
    //  height: 200,
     // width: 200,
    },

    span: {
      cursor: 'pointer'
    },
  
    control: {
      padding: theme.spacing(2),
  
    },
  
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
  }));
  


export default function ReceiptCard() {


  const classes = useStyles();

  const [scrollDialogOpen, setScrollDialogOpen] = React.useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const settingsOpen = Boolean(anchorEl);
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);

  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(()=>{
    console.log('The state of set scrolldialog changed: ' + scrollDialogOpen);

  }, [scrollDialogOpen])

  const navStyle = {
    textDecoration: "none",
    color: "inherit"
  };
  

  return (
    <>
    <ScrollDialog boolean={scrollDialogOpen} onChange={bool => setScrollDialogOpen(bool)} key={1}/> 
    <Card className={classes.card}>
    <CardHeader
      avatar={
        <Avatar aria-label="recipe" className={classes.avatar}>
          R
        </Avatar>
      }
      action={
        <>
        <IconButton aria-label="settings" onClick={handleMenu}>
          <MoreVertIcon />
        </IconButton>
                 <Menu
                 id="menu-appbar"
                 anchorEl={anchorEl}
                 anchorOrigin={{
                   vertical: "top",
                   horizontal: "right"
                 }}
                 keepMounted
                 transformOrigin={{
                   vertical: "top",
                   horizontal: "right"
                 }}
                 open={settingsOpen}
                 onClose={handleClose}
               >
                 <MenuItem onClick={handleClose}><EditIcon/></MenuItem>
                 <Divider/>
                 <NavLink to="/receipts" style={navStyle} onClick={()=> { console.log('Recept settings clicked') }}>            
                   <MenuItem onClick={handleClose}><DeleteForeverIcon/></MenuItem>
                 </NavLink>
               </Menu>
               </>
      }
      title="Shrimp and Chorizo Paella"
      subheader="September 14, 2016"
    />


    <span className={classes.span} onClick={()=>setScrollDialogOpen(!scrollDialogOpen)}>

      <CardMedia
      className={classes.media}
      image="https://images.arla.com/recordid/96f498c04e7743fc9e8ca6ea0042c0d8/rejepaella.jpg?crop=(0,1258,0,-524)&w=1269&h=715&ak=6826258c&hm=d1853743"
      title="Paella dish"
      />
    </span>

    <CardContent>
      <Typography variant="body2" color="textSecondary" component="p">
          Nice cheap paella
      </Typography>
    </CardContent>
    <CardActions disableSpacing>
      <IconButton aria-label="add to favorites">
        <FavoriteIcon />
      </IconButton>
      <IconButton aria-label="share">
        <ShareIcon />
      </IconButton>
      <IconButton
        className={clsx(classes.expand, {
          [classes.expandOpen]: expanded,
        })}
        onClick={handleExpandClick}
        aria-expanded={expanded}
        aria-label="show more"
      >
        <ExpandMoreIcon />
      </IconButton>
    </CardActions>
    <Collapse in={expanded} timeout="auto" unmountOnExit>
      <CardContent>
        <Typography paragraph>Method:</Typography>
        <Typography paragraph>
          Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
          minutes.
        </Typography>
        <Typography paragraph>
          Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
          heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
          browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken
          and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and
          pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add
          saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
        </Typography>
        <Typography paragraph>
          Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook
          without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat to
          medium-low, add reserved shrimp and mussels, tucking them down into the rice, and cook
          again without stirring, until mussels have opened and rice is just tender, 5 to 7
          minutes more. (Discard any mussels that don’t open.)
        </Typography>
        <Typography>
          Set aside off of the heat to let rest for 10 minutes, and then serve.
        </Typography>
      </CardContent>
    </Collapse>
    </Card>
    </>
  )
  
}