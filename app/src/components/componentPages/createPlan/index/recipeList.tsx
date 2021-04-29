import React, { useState, useEffect } from "react";
import Grid from '@material-ui/core/Grid';


export default function RecipeList(props) {

  const sortedArray = props.recipies.sort((a: any, b: any) => a.date - b.date);

  return (
    <Grid container spacing={3} >
      {

        sortedArray.map((recipe) => {
          < Grid
            key={index} 
            item
          >


          </Grid >
        })

      }
    </Grid>

  )

}