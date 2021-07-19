import { MealPlan } from "./types";
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
//import MealPlanScrollDialog from '../dialog/scrollDialog.jsx';
import MealPlanScrollDialog from '../../dialog/mealPlanScrollDialog/mealPlanScrollDialog'

import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { Link, NavLink, useHistory } from "react-router-dom";

import Divider from '@material-ui/core/Divider';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import styles from './styles';


//import recipes from "../../HTTP/queries/recipes";

//import http from "../../HTTP";

import http from '../../../../HTTP/http';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import Prompt from '../../dialog/prompt/prompt'


interface Props {
  clikedPlan?: (recipe: any) => any,
  dialogOpen?: (bool: boolean) => boolean;
  onRecipeDelete?: (recipeId: string) => any
  mealPlan: MealPlan,
  visitFromCreatePlan?: boolean
  visitFromCreatePlanMealList?: boolean;
  customDate?: string,
  children?: React.FC,
  createPlanCard?: boolean
}




export default function MealPlanCard({ mealPlan, clikedPlan: clikedDish, dialogOpen, customDate, ...props }: Props) {

  const useStyles = styles;
  const classes = useStyles();

  const [scrollDialogOpen, setScrollDialogOpen] = React.useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const settingsOpen = Boolean(anchorEl);
  const [expanded, setExpanded] = React.useState(false);
  const [agreeOnRecipeDeletePrompt, setAgreeOnRecipeDeletePrompt] = useState(false);



  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleMenu = (event: any) => {
    setAnchorEl(event.currentTarget);

  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  const handleDeleteMealPlan = (id: string) => {
    const token = localStorage.getItem('token');

    const requestBody = http.mealPlans.deleteMealPlan('_id name', {
      weekPlanId: mealPlan._id,
      token: token
    });

    http.post(requestBody).then(res => {
      //props.onRecipeDelete(recipe._id)
      console.log('MEALPLAN DELETED');
      console.log(res);
    }).catch((err) => {
      console.log(err);

    })
    setAgreeOnRecipeDeletePrompt(false)

  };


  useEffect(() => {
    if (agreeOnRecipeDeletePrompt) {
      handleDeleteMealPlan(mealPlan._id)
    }
  }, [agreeOnRecipeDeletePrompt])

  useEffect(() => {
    console.log('The state of set scrolldialog changed: ' + scrollDialogOpen);
  }, [scrollDialogOpen])




  return (
    <>
      {/* <MealPlanScrollDialog
        boolean={scrollDialogOpen}
        text={mealPlan.text}
        ingredients={mealPlan.ingredients}
        title={mealPlan.name}
        image={mealPlan.image}
        onChange={(bool: boolean) => setScrollDialogOpen(bool)}
        key={1}
      /> */}

      <Card className={classes.card} >
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
                <MenuItem onClick={handleClose}>
                  <EditIcon />
                </MenuItem>
                <Divider />
                <MenuItem >
                  <Prompt
                    header={'Ønsker du virkelig at slette "' + mealPlan.name + '"?'}
                    infoText={'Hvis du fortsætter slettes retten permanent. Denne handling kan ikke fortrydes.'}
                    agree={(bool) => setAgreeOnRecipeDeletePrompt(bool)}
                  >
                    <DeleteForeverIcon />
                  </Prompt>
                </MenuItem>
              </Menu>
            </>
          }

          title={mealPlan.name}
          subheader={prettifyDate(customDate ? customDate : mealPlan.createdAt)}
        />


        <span className={classes.span} onClick={() => setScrollDialogOpen(!scrollDialogOpen)}>
          <CardMedia
            className={classes.media}
            image={"https://images.arla.com/recordid/96f498c04e7743fc9e8ca6ea0042c0d8/rejepaella.jpg?crop=(0,1258,0,-524)&w=1269&h=715&ak=6826258c&hm=d1853743"}
            title={mealPlan.name}
          />
        </span>

        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            Madplan for uge...
          </Typography>
        </CardContent>

        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites"> <FavoriteIcon /></IconButton>
          <IconButton aria-label="share"><ShareIcon /></IconButton>
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
            <i>Retter på denne plan:</i>
            {mealPlan.plan.map((plan, index: number) =>
              <p key={index}>
                {plan.dish.name}
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