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


import ScrollDialog from '../dialog/scrollDialog.jsx';
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { Link, NavLink, useHistory } from "react-router-dom";

import Divider from '@material-ui/core/Divider';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import PostAddIcon from '@material-ui/icons/PostAdd';

import ClearIcon from '@material-ui/icons/Clear';
import SwapVertIcon from '@material-ui/icons/SwapVert';
import CachedIcon from '@material-ui/icons/Cached';

import SmallNumPicker from "../pickers/number/smallNumPicker/smallNumPicker.jsx";

//import recipes from "../../HTTP/queries/recipes";

//import http from "../../HTTP";

import http from '../../../HTTP/http';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import Prompt from '../dialog/prompt/prompt'



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


interface Props {
  clikedDish: (recipe: any) => any,
  dialogOpen: (bool: boolean) => boolean;
  swappedRecipe?: (recipe: any) => any,
  onRecipeDelete: (recipeId: string) => any
  recipe: any,
  visitFromCreatePlan?: boolean
  visitFromCreatePlanMealList?: boolean;
  customDate?: string,
  recipeOnPlan: boolean // check if the recipe is on the plan
  children?: React.FC
}

// test
export default function ReceiptCard({ recipe, clikedDish, dialogOpen, swappedRecipe, customDate, ...props }: Props) {


  const classes = useStyles();

  const [scrollDialogOpen, setScrollDialogOpen] = React.useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const settingsOpen = Boolean(anchorEl);
  const [expanded, setExpanded] = React.useState(false);
  const [agreeOnRecipeDeletePrompt, setAgreeOnRecipeDeletePrompt] = useState(false);

  const handleAddReceipeToFoodPlan = () => {

    // sending recipe to recipe component
    clikedDish(recipe);
    // waiting a bit before removing dialog when add recipe btn is clicked
    /*     setTimeout(
          () => dialogOpen(false), 
          50
        ); */
    dialogOpen(false)

  }

  const handleSwapRecipeInFoodPlan = () => {
    // sending recipe to recipe component
    dialogOpen(true)

    swappedRecipe(recipe);

  }

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleMenu = (event: any) => {
    setAnchorEl(event.currentTarget);

  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteRecipe = (id: string) => {
    const token = localStorage.getItem('token')

    const query = http.recipes.deleteRecipe('name',
      {
        receiptId: id,
        token: token
      });
    //if (agreeOnRecipeDeletePrompt) alert('Deleted dish');
    setAgreeOnRecipeDeletePrompt(false)
    http.post(query).then(res => {
      props.onRecipeDelete(recipe._id)
      console.log(res)

    }).catch((err) => {
      console.log(err);

    })
    setAnchorEl(null);
  };


  useEffect(() => {
    console.log('The state of set scrolldialog changed: ' + scrollDialogOpen);

  }, [scrollDialogOpen])


  useEffect(() => {
    if (agreeOnRecipeDeletePrompt) {
      handleDeleteRecipe(recipe._id)
    }
  }, [agreeOnRecipeDeletePrompt])

  const navStyle = {
    textDecoration: "none",
    color: "inherit"
  }


  return (
    <>
      <ScrollDialog boolean={scrollDialogOpen} text={recipe.text} ingredients={recipe.ingredients} title={recipe.name} image={recipe.image} onChange={(bool: boolean) => setScrollDialogOpen(bool)} key={1} />

      <Card className={classes.card} >
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              R
            </Avatar>
          }
          action={
            props.visitFromCreatePlanMealList ?
              <IconButton aria-label="settings" onClick={() => clikedDish(recipe.listId)}>
                <ClearIcon />
              </IconButton> :
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
                    <Prompt
                      header={'Ønsker du virkelig at slette "' + recipe.name + '"?'}
                      infoText={'Hvis du fortsætter denne handlig slettes retten permanent. Dette kan ikke fortrydes'}
                      agree={(bool: boolean) => setAgreeOnRecipeDeletePrompt(bool)}
                    >
                      <MenuItem >
                        <DeleteForeverIcon />
                      </MenuItem>
                    </Prompt>

                  </NavLink>
                </Menu>
              </>
          }

          title={recipe.name}
          subheader={prettifyDate(customDate ? customDate : recipe.createdAt, props)}
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

          {props.visitFromCreatePlanMealList ?
            <>
              {props.children /*person picker*/}
              <IconButton aria-label="swap dish" > <CachedIcon onClick={() => handleSwapRecipeInFoodPlan()} /></IconButton>
            </> :
            <IconButton aria-label="add to favorites"> <FavoriteIcon /></IconButton>
          }

          {props.visitFromCreatePlan && <>
            {props.recipeOnPlan ?
              <IconButton disabled={true} aria-label="dish already added to plan"><PlaylistAddCheckIcon /></IconButton> :
              <IconButton aria-label="add dish to plan" onClick={handleAddReceipeToFoodPlan} title={'Tilføj ret til madplan'}>
                <PostAddIcon />
              </IconButton>

            }
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
          </>}



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
            {recipe.ingredients.map((ingredient: { quantity: number, unit: string, name: string }, index: number) =>
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



function prettifyDate(date: string) {

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

  if (!date) {
    return;
  }



  let dateArr = date.split('-')
  let year = dateArr[0]

  const monthNumber = Number(dateArr[1]) as keyof typeof months

  let month = months[monthNumber]
  let day = dateArr[2]
  const dayMatch = day.match(/.+(?=T)/);

  if (dayMatch) {
    day = dayMatch[0]
  }

  return `${day}. ${month} ${year}`
}