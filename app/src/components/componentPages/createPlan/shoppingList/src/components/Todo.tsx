import React, { useContext, memo, useEffect, useState } from 'react';
import { DispatchContext } from '../contexts/todos.context';
import EditTodoForm from './EditTodoForm';
import useToggleState from '../hooks/useToggleState';
import useStyles from '../styles/TodoStyles';
import { REMOVE_TODO, TOGGLE_TODO, EDIT_TODO, ADD_SALES_TO_TODO } from '../constants/actions';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';
import CircularProgress from '@material-ui/core/CircularProgress';


import SalesTooltip from './salesTooltip/htmlTooltip';

import HTTP from 'HTTP/http'
import Button from '@material-ui/core/Button';

//import SmallNumberPicker from '../../../../../shared/pickers/number/smallNumPicker/smallNumPicker';

import SmallNumberPicker from './smallNumPicker/smallNumPicker';

//import { th } from 'date-fns/locale';

//const fs = require('fs');
// test


function Todo(props) {

  const classes = useStyles();
  const dispatch = useContext(DispatchContext);
  const [isEditing, toggleEditing] = useToggleState(false);

  const [state, setState] = useState({
    sales: [],
    isLoading: false
  })

  console.log('Fand unitprops. ' + props.unit, 'til : ' + props.task)

  // for showing btn "Hent tilbud" at the start. Increases by one when trying to re fetch sales in order for useEffect to use it
  const [shouldGetSale, setShouldGetSale] = useState(0);

  // running sales crawler 
  const getSales = async (ingredientString) => {

    let removeCommaWords = ingredientString.replace(/\d+\sstk/g, '').trimLeft().trimRight().split(' ');
    removeCommaWords = removeCommaWords.map(el => el.match(/\d|\(|\)/) ? '' : el)

    if (!removeCommaWords) {
      return [];
    }
    const possibleIngredients = removeCommaWords.join(' ').match(/[a-zA-Z\u00C0-\u00ff]{2,20}|æg/gi);
    if (!possibleIngredients) {
      console.log('NO POSSIBLE INGREDIENTS, RETURNNING')
      return [];
    }

    // If the user adds an item, the crawler searchs for the whole string
    const searchString = props.initiator === 'USER' ? ingredientString : possibleIngredients.pop();
    console.log(searchString);

    // for local server 
    // should make another server on heroku to handle just sales
    const query = JSON.stringify({
      products: [searchString],
      chains: {
        wanted: false,
        chainNames: []
      }
    })
    const results = await HTTP.post(query, "sales");
    console.log(results)


    /*   const query2 = HTTP.sales.getSales('title price unit quantity pricePrKg chain img date', {products: [searchString]})
      const results2 = await HTTP.post(query2);
      const results = results2.data.getSales; */

    //alert(JSON.stringify(results2))
    // sorts the sales  by cheapest first
    const sortedByCheapest = results.sort((a, b) => a.price < b.price ? -1 : (a.price > b.price ? 1 : 0));
    return sortedByCheapest
  }


  // loads sales when an item is added to the list 
  useEffect(() => {

    let mounted = true;

    if (shouldGetSale) {

      // replacement from sales = when you click "erstat" on the html sales tool tip
      // Make sales a btn instead, so the user have to click to get a sale
      if (mounted && props.initiator !== 'REPLACEMENT_FROM_SALES') {

        setState({ ...state, isLoading: true });

        getSales(props.task)
          .then(results => {
            if (mounted) {
              setState({
                ...state,
                isLoading: false,
                sales: results || []
              })

              // adding img to to do for using in the container sidebar (side bar showing first sale of every product)
              // redux dispatcher can be found in contexts folder
              dispatch({ type: ADD_SALES_TO_TODO, ...props, img: results[0]?.img || null });
            }

          }).catch(function (e) {
            setState({ ...state, isLoading: false, sales: [] })
            console.error(e)
          })

      }
    }

    return () => {
      mounted = false; // cleanup function, prevents setting state after component unmounts
    };
    //}, [task])
  }, [shouldGetSale])



  useEffect(() => {
    if (props.initiator === 'USER') {
      setShouldGetSale(shouldGetSale + 1)
    }

    //props.unit = 'stk'
    //}, [task])
  }, [props.task])



  // dette er en test

  if (isEditing) {
    return (
      <li
        className={classes.Todo}
        style={{ overflowY: 'hidden' }}
        //onClick={(e) => { toggleEditing(); }}
        onBlur={() => { toggleEditing(); }}
      >
        <EditTodoForm id={props.id} task={props.task} toggleEditForm={toggleEditing} restOfTask={props} />
      </li>
    );
  }


  return (
    <li
      className={classes.Todo}
/*       onClick={(e) => {
        //e.stopPropagation(); // stopping element from getting a line through
        toggleEditing();
      }} */

    >
      <span className={classes.salesButtons}>
        {!shouldGetSale &&
          <Button
            //variant="outlined"
            //color="primary"
            //size={'small'}
            onClick={(e) => { e.stopPropagation(); setShouldGetSale(true); }}
          >
            <TrendingDownIcon />
          </Button>}

        {state.isLoading &&   <CircularProgress style={{margin: '8px 0 0 23px'}} size={20} /> }

        {shouldGetSale && !state.isLoading ? <SalesTooltip sales={state.sales} id={props.id} onClick={() => setShouldGetSale(shouldGetSale + 1)} /> : null}
      </span>

      <SmallNumberPicker unit={props.unit} quantity={props.quantity} parentProps={props} />

      <span
        onClick={(e) => { e.stopPropagation(); dispatch({ type: TOGGLE_TODO, id: props.id }) }} // adding a line through, marking as completed
        style={{
          //width: '100%', // to left align items
          //marginLeft: 20,
          textDecoration: props.completed ? 'line-through' : '',
          color: props.completed ? '#bdc3c7' : '#34495e',
          cursor: 'pointer',
          overflow: 'hidden',
          margin: '7px 0 0 18px'
          //display: 'flex',
          // justifyContent: 'flex-start'
        }}
      >
        {props.task}
      </span>



      <div className={classes.icons}>
        <DeleteIcon
          style={{ color: '#c0392b' }}
          className="fas fa-trash"
          onClick={e => {
            e.stopPropagation();
            dispatch({ type: REMOVE_TODO, id: props.id });
          }}
        />
        <EditIcon
          style={{ color: '#58b2dc' }}
          className="fas fa-pen"
          onClick={e => {
            e.stopPropagation();
            toggleEditing();
          }}
        />
      </div>

    </li>
  );
}

export default memo(Todo);
