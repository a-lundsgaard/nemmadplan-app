import React, { useContext, memo, useEffect, useState } from 'react';
import { DispatchContext } from '../contexts/todos.context';
import EditTodoForm from './EditTodoForm';
import useToggleState from '../hooks/useToggleState';
import useStyles from '../styles/TodoStyles.js';
import { REMOVE_TODO, TOGGLE_TODO } from '../constants/actions';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';


//import SalesTooltip from 'Components/toolTips/salesTooltip/htmlTooltip';

import SalesTooltip from './salesTooltip/htmlTooltip';

import HTTP from '../../../../HTTP/http'
import Button from '@material-ui/core/Button';
import { th } from 'date-fns/locale';


function Todo({ id, task, completed, initiator }) {

  const classes = useStyles();
  const dispatch = useContext(DispatchContext);
  const [isEditing, toggle] = useToggleState(false);

  const [state, setState] = useState({
    sales: [],
    isLoading: true
  })


  // running sales crawler 
  const getSales = async (ingredientString) => {


    let removeCommaWords = ingredientString.split(' ');
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

    const query = JSON.stringify({
      products: [searchString],
      chains: {
        wanted: false,
        chainNames: []
      }
    })

    const results = await HTTP.post(query, "sales");

    // sorts the sales  by cheapest first
    const sortedByCheapest = results.sort((a, b) => a.price < b.price ? -1 : (a.price > b.price ? 1 : 0));
    return sortedByCheapest
  }



  // loads sales when an item is added to the list 
  useEffect(() => {

    let mounted = true;
    if (mounted && initiator !== 'REPLACEMENT_FROM_SALES') {

      setState({ ...state, isLoading: true });
      getSales(task)
        .then(results => {
          if (mounted) {
            setState({
              ...state,
              isLoading: false,
              sales: results || []
            })
          }
        }).catch(function (e) {
          console.error(e)
        })
    }

    return () => {
      mounted = false; // cleanup function, prevents setting state after component unmounts
    };
  }, [task])



  if (isEditing) {
    return (
      <li
        className={classes.Todo}
        style={{ overflowY: 'hidden' }}
        onClick={() => { toggle(); }}
        onBlur={() => { toggle(); }}
      >
        <EditTodoForm id={id} task={task} toggleEditForm={toggle} />
      </li>
    );
  }


  return (
    <li
      className={classes.Todo}
    >
      <span>
        {state.isLoading ?
          <Button
            //variant="outlined"
            color="secondary"
          >
            <i>Henter tilbud...</i>
          </Button> : <SalesTooltip sales={state.sales} id={id} />}
      </span>


      <span
        onClick={() => toggle()}
        style={{
          marginLeft: 20,
          textDecoration: completed ? 'line-through' : '',
          color: completed ? '#bdc3c7' : '#34495e',
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
            toggle();
          }}
        />
      </div>

    </li>
  );
}

export default memo(Todo);
