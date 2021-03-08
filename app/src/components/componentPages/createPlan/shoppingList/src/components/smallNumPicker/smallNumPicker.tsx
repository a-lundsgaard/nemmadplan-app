import React, { useContext, useState, useEffect } from "react";
import './style.css'; // for removing default chrome styles on input elements 
import styles from './styles.js';

import { EDIT_TODO } from '../../constants/actions';
import { DispatchContext } from '../../contexts/todos.context.jsx';



export default function smallNumPicker({unit, quantity, parentProps }) {
  const classes = styles();
  // const [number, setNubmer] = useState(1);

  const [count, setCount] = useState(parseFloat(quantity) || 1);
  const [localUnit, setLocalUnit] = useState(unit || 'stk');
  const [originalUnit, setOriginalUnit] = useState(unit || 'stk');


  const dispatch = useContext(DispatchContext);
  const handleAccept = () => dispatch({ type: EDIT_TODO, ...parentProps, unit: localUnit, quantity: count });


  const decrementCount = (e) => {
    if (count < 1.000001) return false;
    setCount(prevCount => prevCount - 1)
    //onChange(count)
    //handleAccept()
  }

  const incrementCount = (e) => {
    //alert(typeof count)
    setCount(prevCount => prevCount + 1);
   // handleAccept()
  }

  const handleChange = (e) => {
    // console.log(e.target.value)
    setCount(parseFloat(e.target.value))
    console.log('Changed')
  }


  // changes the unit based on the count number. E.g. you cant have 100 stk, the unit is changed to gram
  useEffect(() => {
    if (count < 10 && originalUnit === 'stk') {
      setLocalUnit(originalUnit);
    } else {
      if (originalUnit === 'stk') {
        setLocalUnit('gram');
      } else {
        setLocalUnit(originalUnit);
      }
    }
    handleAccept()
  }, [count])


  // for when adding a meal to shopping list, the count is changed to the countValue of the individual ingredients in the recipe
  useEffect(() => {
    if (quantity) {
      setCount(quantity);
    }
  }, [quantity])


  // for making sure to save the original unit
  useEffect(() => {
    if (unit) {
      setOriginalUnit(unit);
    }
  }, [])





  return (
    <div className={classes.containerNum} onClick={(e) => e.stopPropagation()}>
      <div className={classes.innerContainer}>
        <div
          className={classes.triangleUp}
          onClick={incrementCount}
        />
        <span style={{
          display: 'flex' // for aligning count and unit element
        }}>
          <input
            className={classes.numberInput}
            onBlur={handleAccept}
            onChange={handleChange} type="number" name="productQty" value={count} min="1" max="10000" />
          <span>{localUnit}</span>
        </span>
        <div
          className={classes.triangleDown}
          onClick={decrementCount}
        />
      </div>
    </div>
  )
}


