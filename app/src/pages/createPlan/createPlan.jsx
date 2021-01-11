import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CreatePlanDialog from '../../components/componentPages/createPlan/index/createPlanDialog';


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
    bottom:0,
    left: "50%",
    marginLeft: -50
  },

}));

function createPlan() {

  const classes = useStyles();


  // onReceiptSave={(value) => setReceiptSaved(value) }
  return (
    <div>
      <h1>Her kan du skabe din plan</h1>
 
    <div className={classes.addReceiptButton}>
        <CreatePlanDialog/>
    </div>
    </div>
  )
}

export default createPlan;