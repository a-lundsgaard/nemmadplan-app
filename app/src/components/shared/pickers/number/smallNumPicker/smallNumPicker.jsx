import React, {useState, useEffect} from "react";
import './style.css'
import { makeStyles } from '@material-ui/core/styles';

//let size = '';

/*const useStyles = makeStyles((size) => ({
  triangleDown: {
    width: 0,
    height: 0,
    borderLeft: `6px solid transparent`,
    borderRight: `6px solid transparent`,
    borderTop: "9px solid #555",
      cursor: "pointer"
  }

}));*/


export default function smallNumPicker() {

 // const classes = useStyles(6);


  return (
    <div className="containerNum">
      <div className="triangle-up"></div>
        <div className= "number"><b>1</b></div>
      <div className={'triangle-down'}></div>
    </div>
  )
}