import React, { Fragment, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';

import listenToSearchInput from 'Redux/helpers/subscribe'
import HTTP from '../../HTTP/http';

import ReceiptCard from '../../components/shared/card/recipeCard';

import FullScreenDialog from '../../components/componentPages/createRecipe/index/createRecipeDialog.jsx';
import ReceiptSceletonLoader from '../../components/shared/loaders/receiptSceletonLoader';






const useStyles = makeStyles((theme) => ({

  fragment: {
    overflowX: "hidden",
    //boxSizing: "border-box"
  },

  root: {
    flexGrow: 1,
    //overflowX: "hidden"
    // marginLeft: -3,
  },

  card: {
    maxWidth: 245,
    //  height: 200,
    // width: 200,
  },

  /* Placing add button at bottom center */
  addReceiptButton: {
    position: 'fixed',
    bottom: 0,
    left: "50%",
    marginLeft: -50
  },

  control: {
    //padding: theme.spacing(2),

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



export default function SpacingGrid({ onClick, dialogOpen, ...props }) {
  // const [spacing, setSpacing] = React.useState(2);
  const classes = useStyles();

  const [search, setSearch] = useState(window.store.getState().searchInput); // getting search bar input
  const [receipts, setReceipts] = useState([])
  const [isReceiptSaved, setReceiptSaved] = useState('') // letting us know when a receipt is saved to rerender dishes
  const [isLoading, setIsLoading] = useState(false) // letting us know when a receipt is saved to rerender dishes

  const recipeCount = parseInt(localStorage.getItem('recipeCount')) || 0;

  function getReceitps() {

    setIsLoading(true)

    const token = localStorage.getItem('token');
    const requestBody = HTTP.recipes.getRecipesAndReturnFields('_id name text image createdAt ingredients {name unit quantity}', { token: token })

    HTTP.post(requestBody)
      .then(res => {
        setReceipts(res.data.receipts);
        localStorage.setItem('recipeCount', JSON.stringify(res.data.receipts.length)) // for loading skeleton recipes
        setIsLoading(false)
      })
      .catch(e =>
        console.log(e)
      )
  }

  const handleRecipeCardClick = (id) => {
    //console.log('ID of clicked dish: ' + id)
    onClick(id)
  }


  useEffect(() => {
    listenToSearchInput(setSearch) // sets up redux listener on the search input
  }, [])


  useEffect(() => {
    console.log(search);
  }, [search])

  useEffect(() => {
    console.log('Found receipts:')
    console.log(receipts);
  }, [receipts])


  useEffect(() => {
    //  getReceitps()
  }, [])


  useEffect(() => {
    getReceitps()
  }, [isReceiptSaved])

  // const [expanded, setExpanded] = React.useState(false);

  /*const handleExpandClick = () => {
    setExpanded(!expanded);
  };*/

  return (
    <Fragment>

      <Grid container className={classes.root} justify="center" >
        <Grid item xs={10}>

          <Grid container justify="center" spacing={5}>
            {
              isLoading ?
                Array(recipeCount).fill(recipeCount)
                  .map((receipt, index) => (
                    <Grid key={index} item>
                      <ReceiptSceletonLoader />
                    </Grid>))
                : receipts
                  .map((receipt, index) => (
                    <Grid
                      key={receipt._id}
                      item>
                      <ReceiptCard
                        recipe={receipt}
                        clikedDish={id => handleRecipeCardClick(id)}
                        visitFromCreatePlan={props.visitFromCreatePlan}
                        dialogOpen={bool => dialogOpen(bool)}
                      />
                    </Grid>
                  ))}
          </Grid>

        </Grid>


      </Grid>

      <div className={classes.addReceiptButton}>
        <FullScreenDialog onReceiptSave={(value) => setReceiptSaved(value)} />
      </div>

    </Fragment>
  );
}

