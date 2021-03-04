import React, { useState, useEffect } from "react";
import Divider from '@material-ui/core/Divider';
import styles from './styles'


export default function groceryCounter({ open, onClick, sales }) {

  const classes = styles(sales, open);

  return (
    <div style={{
      marginBottom: '0px',
    }}>
      <div
        onClick={onClick}
        style={classes.icon}
      >
        <span style={classes.counter}>
          {sales.length}
        </span>
      </div>

      <div style={classes.infoText}>
        Indkøbsliste
          <Divider style={{ marginLeft: '-10px', marginTop: 10, color: 'red' }} />
      </div>
    </div>
  )
}