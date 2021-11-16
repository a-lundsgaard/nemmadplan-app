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
import RecipeScrollDialog from '../dialog/recipeScrollDialog/recipeScrollDialog';
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

import Divider from '@material-ui/core/Divider';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import PostAddIcon from '@material-ui/icons/PostAdd';

import ClearIcon from '@material-ui/icons/Clear';
import CachedIcon from '@material-ui/icons/Cached';

import http from '../../../HTTP/http';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import Prompt from '../dialog/prompt/prompt';

//import 
import placeholder from '../../../../../resources/placeholder.png';



const useStyles = makeStyles((theme) => ({

  card: {
    maxWidth: 245,
    minWidth: 245,
    borderRadius: 25
    //border: "1px solid dimgray"
    //  height: 200,
    //  width: 245,
  },

  control: {
    padding: theme.spacing(2),

  },

  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    cursor: 'pointer'

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
  clikedDish: (recipe: any) => void,
  clickedDishToUpdate: (recipe: any) => void,
  dialogOpen: (bool: boolean) => boolean;
  swappedRecipe: (recipe: any) => void,
  onRecipeDelete: (recipeId: string) => any
  recipe: any,
  visitFromCreatePlan?: boolean
  visitFromCreatePlanMealList?: boolean;
  customDate?: string,
  recipeOnPlan: boolean // check if the recipe is on the plan
  children?: React.FC,
  createPlanCard?: boolean,
  disableSettings: boolean,
  currentDateOnPlan?: Date
}

// function (date )

function fromSameDate(today: Date, cachedResultsDate: Date): boolean {
  console.log('Found the two dates ', today, cachedResultsDate);
  const same = (cachedResultsDate.getDate() == today.getDate() &&
    cachedResultsDate.getMonth() == today.getMonth() &&
    cachedResultsDate.getFullYear() == today.getFullYear()
  )
  return same;
}

export default function RecipeCard({ recipe, customDate, clikedDish, dialogOpen, swappedRecipe, clickedDishToUpdate, ...props }: Props) {


  const classes = useStyles();

  const [scrollDialogOpen, setScrollDialogOpen] = React.useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const settingsOpen = Boolean(anchorEl);
  const [expanded, setExpanded] = React.useState(false);
  const [agreeOnRecipeDeletePrompt, setAgreeOnRecipeDeletePrompt] = useState(false);

  const handleAddReceipeToFoodPlan = () => {
    // sending recipe to recipe component
    clikedDish(recipe);
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
    http.post(query).then(res => {
      props.onRecipeDelete(recipe._id)
      console.log(res);
    }).catch((err) => {
      console.log(err);
    })
    //setAnchorEl(null);
    setAgreeOnRecipeDeletePrompt(false)

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
      {!props.createPlanCard &&
        <RecipeScrollDialog
          boolean={scrollDialogOpen}
          text={recipe.text}
          ingredients={recipe.ingredients}
          title={recipe.name}
          persons={recipe.persons}
          image={recipe.image}
          onChange={(bool: boolean) => setScrollDialogOpen(bool)}
          key={1}
        />}
      <Card className={classes.card} style={{
            border: customDate && props.currentDateOnPlan && fromSameDate(new Date(customDate), new Date(props.currentDateOnPlan)) ? "3px solid #90c200" : ""
      }} >
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              R
            </Avatar>
          }
          action={
            props.visitFromCreatePlanMealList ?
              <IconButton aria-label="delete" onClick={() => clikedDish(recipe.listId)}>
                <ClearIcon />
              </IconButton>
              :
              !props.disableSettings && <>
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
                  <MenuItem onClick={()=> clickedDishToUpdate(recipe)}>
                    <EditIcon />
                  </MenuItem>
                  <Divider />
                  <MenuItem >
                    <Prompt
                      header={'Ønsker du virkelig at slette "' + recipe.name + '"?'}
                      infoText={'Hvis du fortsætter slettes retten permanent. Denne handling kan ikke fortrydes.'}
                      agree={(bool: boolean) => setAgreeOnRecipeDeletePrompt(bool)}
                    >
                      <DeleteForeverIcon />
                    </Prompt>
                  </MenuItem>
                </Menu>
              </>
          }

          title={displayTitleWithoutBreak(recipe.name, 17)}
          subheader={prettifyDate(customDate ? customDate : recipe.createdAt)}
        />


        <CardMedia
          onClick={() => setScrollDialogOpen(!scrollDialogOpen)}
          className={classes.media}
          image={recipe.image || placeholder}
          //image={recipe.image || "https://m3placement.com/wp-content/uploads/2021/03/image-placeholder-350x350-1.png"}
          title={recipe.name}
          component={'div'}
        />        
        

        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            Beskrivelse af ret
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
            {/*             <IconButton aria-label="share">
              <ShareIcon />
            </IconButton> */}
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

function displayTitleWithoutBreak(string: string, maxStringLength: number) {
  if(string.length > maxStringLength) {
    const newTitle = string.slice(0, (maxStringLength-2)).trimRight() + "..";
    return newTitle
  } else {
    return string;
  }
}

function prettifyDate(date: string) {

  const months = {
    1: 'jan',
    2: 'feb',
    3: 'mar',
    4: 'apr',
    5: 'maj',
    6: 'jun',
    7: 'jul',
    8: 'aug',
    9: 'sep',
    10: 'okt',
    11: 'nov',
    12: 'dec'
  }

  const days = {
    0: 'Søn',
    1: 'Man',
    2: 'Tir',
    3: 'Ons',
    4: 'Tor',
    5: 'Fre',
    6: 'Lør'
  }

  if (!date) {
    return;
  }

  let d = new Date(date);
  let dayNumber = d.getDate();
  let month = months[d.getMonth() as keyof typeof months];
  let year = d.getFullYear();
  let dayName = days[d.getDay() as keyof typeof days];
  const loc = location.href;

  if (loc.includes('recipes')) return `${dayNumber}. ${month} ${year}`
  return `${dayName.toLowerCase()}. ${dayNumber}. ${month}`
}