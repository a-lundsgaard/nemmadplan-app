import React, { useState, useEffect } from "react";

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
import AddIcon from '@material-ui/icons/Add';

import ScrollDialog from 'Components/dialog/scrollDialog';
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { Link, NavLink, useHistory } from "react-router-dom";

import Divider from '@material-ui/core/Divider';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import PostAddIcon from '@material-ui/icons/PostAdd';
import recipes from "../../HTTP/queries/recipes";




const useStyles = makeStyles((theme) => ({

  card: {
    maxWidth: 245,
    minWidth: 245

    //  height: 200,
    //  width: 245,
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

function prettifyDate(date) {

  const months = {
    1: 'januar',
    2: 'februar',
    3: 'marts',
    4: 'april',
    5: 'maj',
    6: 'juni',
    7: 'juli',
    8: 'august',
    9: 'september',
    10: 'oktober',
    11: 'november',
    12: 'december'
  }

  let dateArr = date.split('-')
  let year = dateArr[0]
  let month = months[Number(dateArr[1])]
  let day = dateArr[2]
  day = day.match(/.+(?=T)/)[0]

  return `${day}. ${month} ${year}`
}



export default function ReceiptCard({ clikedDish, dialogOpen, recipe, ...props }) {



  const classes = useStyles();

  const [scrollDialogOpen, setScrollDialogOpen] = React.useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const settingsOpen = Boolean(anchorEl);
  const [expanded, setExpanded] = React.useState(false);

  const handleAddReceipeToFoodPlan =() => {

    // sending recipe to recipe component
    clikedDish(recipe); 
    // waiting a bit before removing dialog when add recipe btn is clicked
    setTimeout(
      () => dialogOpen(false), 
      200
    );

  }

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);

  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    console.log('The state of set scrolldialog changed: ' + scrollDialogOpen);

  }, [scrollDialogOpen])

  const navStyle = {
    textDecoration: "none",
    color: "inherit"
  }

  //const {recipe} = recipe;

  return (
    <>
      <ScrollDialog boolean={scrollDialogOpen} text={recipe.text} ingredients={recipe.ingredients} title={recipe.name} image={recipe.image} onChange={bool => setScrollDialogOpen(bool)} key={1} />

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
                <MenuItem onClick={handleClose}><EditIcon /></MenuItem>
                <Divider />
                <NavLink to="/receipts" style={navStyle} onClick={() => { console.log('Recept settings clicked') }}>
                  <MenuItem onClick={handleClose}><DeleteForeverIcon /></MenuItem>
                </NavLink>
              </Menu>
            </>
          }
          
          title={recipe.name}
          subheader={prettifyDate(recipe.createdAt)}
        />


        <span className={classes.span} onClick={() => setScrollDialogOpen(!scrollDialogOpen)}>

          <CardMedia
            className={classes.media}
            image={recipe.image || "https://images.arla.com/recordid/96f498c04e7743fc9e8ca6ea0042c0d8/rejepaella.jpg?crop=(0,1258,0,-524)&w=1269&h=715&ak=6826258c&hm=d1853743"}
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

          {props.visitFromCreatePlan ? <IconButton aria-label="add dish to plan" onClick={handleAddReceipeToFoodPlan} title={'Tilføj ret til madplan'}>
            <PostAddIcon />
          </IconButton> : null}

          <IconButton  aria-label="share">
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
            <i>Det skal du bruge:</i>
            {recipe.ingredients.map((ingredient, index) =>
              <p key={index}>
                {`${ingredient.quantity || ""} ${ingredient.unit ? ingredient.unit.replace("*", '') : ''} ${ingredient.name}`.trimLeft()}
              </p>
            )}
          </CardContent>
        </Collapse>
      </Card>
    </>
  )

}