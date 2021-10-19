import React, { useState, useEffect } from "react";
import './style.css'
import styles from './styles';
import PersonIcon from '@material-ui/icons/Person';

export default function smallNumPicker({ countValue, unit, quantity, onCountChange, listId }) {
  const classes = styles();
  // const [number, setNubmer] = useState(1);

  const [count, setCount] = useState(quantity || 1);
  const [localUnit, setLocalUnit] = useState(unit || 'stk')


  const decrementCount = (e) => {
    if (count < 2) return false;
    setCount(prevCount => prevCount - 1)
    //onChange(count)
  }

  const incrementCount = (e) => {
    setCount(prevCount => prevCount + 1)
    // onCha

  }

  const handleChange = (e) => {
    // console.log(e.target.value)
    setCount(e.target.value)
    /*     const changeUnit = e.target.value > 10 ? 'gram' : unit || 'stk';
        setLocalUnit(changeUnit) */
    console.log('Changed')
  }

/*   const handleAccept = () =>
    onUnitOrCountChange({
      unit: localUnit,
      count: count
    }) */


/*   useEffect(() => {
    if (countValue) {
      setCount(countValue);
    }
  }, [countValue]) */


  useEffect(() => {

    if(onCountChange) {
      onCountChange({
        count,
        listId
      })
    }

  }, [count])





  return (
    <div className={classes.containerNum} onClick={(e) => e.stopPropagation()}>
      <div className={classes.innerContainer}>
        <div
          className={classes.triangleUp}
          onClick={incrementCount}
        />
        <span style={{
          display: 'flex'
        }}>
          <input
            className={classes.numberInput}
            //onBlur={handleAccept}
            onChange={handleChange} type="number" name="productQty" value={count} min="1" max="10000" />
          <span>{<PersonIcon/>}</span>
        </span>
        <div
          className={classes.triangleDown}
          onClick={decrementCount}
        />
      </div>
    </div>
  )
}


