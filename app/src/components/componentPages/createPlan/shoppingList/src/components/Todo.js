import React, { useContext, memo, useEffect, useState } from 'react';
import { DispatchContext } from '../contexts/todos.context';
import EditTodoForm from './EditTodoForm';
import useToggleState from '../hooks/useToggleState';
import useStyles from '../styles/TodoStyles.js';
import { REMOVE_TODO, TOGGLE_TODO, EDIT_TODO } from '../constants/actions';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SalesTooltip from './salesTooltip/htmlTooltip';

import HTTP from 'HTTP/http'
import Button from '@material-ui/core/Button';
//import { th } from 'date-fns/locale';


function Todo({ id, task, completed, initiator }) {

  const classes = useStyles();
  const dispatch = useContext(DispatchContext);
  const [isEditing, toggleEditing] = useToggleState(false);

  const [state, setState] = useState({
    sales: [],
    isLoading: false
  })

  // for showing btn "Hent tilbud" at the start. Increases by one when trying to re fetch sales in order for useEffect to use it
  const [shouldGetSale, setShouldGetSale] = useState(0); 



  // running sales crawler 
  const getSales = async (ingredientString) => {


    let removeCommaWords = ingredientString.replace(/\d+\sstk/g, '').trimLeft().trimRight().split(' ');
    removeCommaWords = removeCommaWords.map(el => el.match(/\d|\(|\)/) ? '' : el)

    if (!removeCommaWords) {
      return [];
    }
    const possibleIngredients = removeCommaWords.join(' ').match(/[a-zA-Z\u00C0-\u00ff]{3,20}|æg/gi);
    if (!possibleIngredients) {
      console.log('NO POSSIBLE INGREDIENTS, RETURNNING')
      return [];
    }


    // If the user adds an item, the crawler searchs for the whole string
    const searchString = initiator === 'USER' ? ingredientString : possibleIngredients.pop();
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
      if (mounted && initiator !== 'REPLACEMENT_FROM_SALES' ) {

        setState({ ...state, isLoading: true });

        getSales(task)
          .then(results => {
            if (mounted) {
              setState({
                ...state,
                isLoading: false,
                sales: results || []
              })

              // adding img to to do for using in the container sidebar (side bar showing first sale of every product)
              // redux dispatcher can be found in contexts folder
              dispatch({ type: EDIT_TODO, id, task: task, img: results[0]?.img || null });
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
    if (initiator === 'USER' ) {
      setShouldGetSale(shouldGetSale+1)
    }
    //}, [task])
  }, [task])



  // dette er en test

  if (isEditing) {
    return (
      <li
        className={classes.Todo}
        style={{ overflowY: 'hidden' }}
        onClick={(e) => { toggleEditing(); }}
        onBlur={() => {  toggleEditing(); }}
      >
        <EditTodoForm id={id} task={task} toggleEditForm={toggleEditing} />
      </li>
    );
  }


  return (
    <li
      className={classes.Todo}
      onClick={(e) => {
        //e.stopPropagation(); // stopping element from getting a line through
        toggleEditing();
      }}

    >
      <span className={classes.salesButtons}>
        {!shouldGetSale &&
          <Button
            //variant="outlined"
            //color="primary"
            //size={'small'}
            onClick={(e) => { e.stopPropagation(); setShouldGetSale(true); }}
          >
            Hent tilbud
          </Button>}

        {state.isLoading &&
          <Button
            //variant="outlined"
            fullWidth={false}
            color="secondary"
            onClick={(e) => { e.stopPropagation(); }}

          >
            <i>Henter tilbud...</i>
          </Button>}

        {shouldGetSale && !state.isLoading ? <SalesTooltip sales={state.sales} id={id} onClick={()=>setShouldGetSale(shouldGetSale+1)}/> : null} 
      </span>


      <span


        onClick={(e) => { e.stopPropagation(); dispatch({ type: TOGGLE_TODO, id }) }} // adding a line through, marking as completed

        style={{
          //width: '100%', // to left align items
          //marginLeft: 20,
          textDecoration: completed ? 'line-through' : '',
          color: completed ? '#bdc3c7' : '#34495e',
          cursor: 'pointer',
          overflow: 'hidden'
          //display: 'flex',
          // justifyContent: 'flex-start'
        }}
      >
        {task}
      </span>



      <div className={classes.icons}>
        <DeleteIcon
          style={{ color: '#c0392b' }}
          className="fas fa-trash"
          onClick={e => {
            e.stopPropagation();
            dispatch({ type: REMOVE_TODO, id });
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
