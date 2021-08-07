import React, { Fragment, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ReceiptSceletonLoader from '../../components/shared/loaders/receiptSceletonLoader';


import CreatePlanDialog from '../../components/componentPages/createPlan/index/createPlanDialog';

import styles from './styles'
import HTTP from '../../HTTP/http';

//import MealPlanCard from '../../components/shared/card/mealPlanCard/mealPlanCard';
import MealPlanCard from './mealPlanCard/mealPlanCard';
import SnackBar from "../../components/shared/snackbar/snackbar.jsx";

import ViewMealPlanDialogFullScreen from './viewPlanDialog/viewMealPlanDialog';

const mealPlanCountKey = 'mealPlanCount';

function createPlan() {
  const useStyles = styles;
  const classes = useStyles();

  const [mealPlans, setMealPlans] = useState([]);
  const [isLoading, setIsLoading] = useState(false) // letting us know when a receipt is saved to rerender dishes
  const [message, setMessage] = useState({});
  const [dialogOpen, setDialogOpen] = useState(false);

  const mealPlanCount: string | number | null = parseInt(localStorage.getItem(mealPlanCountKey)) || 0;

  // test

  useEffect(() => {
    getMealPlans()
  }, [])


  const getMealPlans = () => {
    setIsLoading(true)
    const token = localStorage.getItem('token');
    //const requestBody = HTTP.recipes.getRecipesAndReturnFields('_id name text image createdAt ingredients {name unit quantity} persons', 
    const requestBody = HTTP.mealPlans.getMealPlans('', {
      token: token
    })

    HTTP.post(requestBody)
      .then(res => {
        const weekPlans = res.data.weekPlans;
        console.log(res);
        setMealPlans(weekPlans);
        localStorage.setItem(mealPlanCountKey, JSON.stringify(weekPlans.length)) // for loading skeleton recipes
        setIsLoading(false);
        //localStorage.setItem('mealPlanCount', JSON.stringify(res.data.receipts.length)) // for loading skeleton recipes
      })
      .catch(e =>
        console.log(e)
      )
  }


  // onReceiptSave={(value) => setReceiptSaved(value) }
  return (
    <Fragment>
      {/* <h1 onClick={() => getMealPlans()} >Her kan du skabe din plan</h1> */}

      <Grid container className={classes.root} justify="center" >
        <Grid item xs={10}>

          <Grid container justify="center" spacing={5}>
            {
              isLoading ?
                Array(mealPlanCount)
                  .fill(mealPlanCount)
                  .map((recipe, index) => (
                    <Grid key={index} item>
                      <ReceiptSceletonLoader />
                    </Grid>))
                :
                mealPlans.map((mealPlan, index) => {
                  return <Grid
                    key={index}
                    item
                  >
                    <MealPlanCard
                      mealPlan={mealPlan}
                      dialogOpen={bool => setDialogOpen(bool)}
                    //onRecipeDelete={id => handleRecipeDeletion(id) }
                    />
           {/*          <ViewMealPlanDialogFullScreen
                      mealPlan={mealPlan}
                      visible={dialogOpen}
                      setVisible={bool => setDialogOpen(bool)}
                    /> */}
                  </Grid>
                })}
          </Grid>

        </Grid>
      </Grid>


      <div className={classes.addReceiptButton}>
        <CreatePlanDialog />
      </div>

      {message.msg ? <SnackBar key={message.key} type={message.type} message={message.msg} /> : null}


    </Fragment>
  )
}

export default createPlan;