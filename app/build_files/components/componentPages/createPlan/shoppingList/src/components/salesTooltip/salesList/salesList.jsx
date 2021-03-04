import React, { useState, useEffect, Fragment as span } from "react";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import SalesItem from './salesItem'

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: '3'
  },

}));


export default function salesList({ sales, id }) {

  const classes = useStyles();

  return (
    <section style={{ overflow: 'scroll', maxHeight: 500, zIndex: '2' }}>
      {
        sales.map((item, index) => (
          <span key={index} className={classes.appBar}>
          {index ? <hr/> : null}
          <SalesItem key={index} item={item} id={id} />
          </span>
        ))
      }
    </section>
  )
}