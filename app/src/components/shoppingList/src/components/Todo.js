import React, { useContext, memo, useEffect, useState } from 'react';
import { DispatchContext } from '../contexts/todos.context';
import EditTodoForm from './EditTodoForm';
import useToggleState from '../hooks/useToggleState';
import useStyles from '../styles/TodoStyles.js';
import { REMOVE_TODO, TOGGLE_TODO } from '../constants/actions';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import IconButton from '@material-ui/core/IconButton';

import SalesTooltip from 'Components/toolTips/htmlTooltip'
import HTTP from '../../../../HTTP/http'
import CircularLoader from 'Components/loaders/circular/circularLoader'
import Button from '@material-ui/core/Button';


function Todo({ id, task, completed }) {

  const classes = useStyles();
  const dispatch = useContext(DispatchContext);
  const [isEditing, toggle] = useToggleState(false);

  const [state, setState] = useState({
    sales: [],
    isLoading: true
  })


  const getSales = async (ingredientString, isCancelled) => {

    let removeCommaWords = ingredientString.split(' ');
    removeCommaWords = removeCommaWords.map(el => el.match(/\d|\(|\)/) ? '' : el)
 
    if (!removeCommaWords) return [];
    const possibleIngredients = removeCommaWords.join(' ').match(/[a-zA-Z\u00C0-\u00ff]{3,20}|æg/gi);
    if (!possibleIngredients) return [];
    var controller = new AbortController();
    var signal = controller.signal

    /*function getBestIngredient() {
      let i = possibleIngredients.length;
      let arr = ['tern', 'saltlage']
      while (i--) {
        if (arr.includes(possibleIngredients[i])) {
        //  if(possibleIngredients[i].includes(''))
          possibleIngredients.splice(i, 1);
        }
      }
    }*/
    const query = HTTP.sales.getSales('title price unit quantity pricePrKg chain img date',
      {
        products: [possibleIngredients.pop()]
      });
    const data = await HTTP.post(query, signal);
    const results = data.data.getSales

    if(isCancelled) {
      console.warn('I WAS CANCELLED')
      controller.abort();
      return;
     }
    return results
  }

  

  // loads sales when an item is added to the list 
  useEffect(() => {
    //var controller = new AbortController();
  //  var signal = controller.signal
    let isCancelled = false;
    if(!isCancelled) {
      setState({ ...state, isLoading: true });
    } 

    getSales(task, isCancelled)
      .then(results => {
        if (!isCancelled) {
          setState({
            ...state,
            isLoading: false,
            sales: results || []
          })
        }
      }).catch(function(e) {
        console.log('Sales fetching cancelled!!!!')
       // reports.textContent = 'Download error: ' + e.message;
      })

      return () => {
        isCancelled = true;
      };
  }, [task])



  if (isEditing) {
    return (
      <li
        className={classes.Todo}
        style={{ overflowY: 'hidden' }}
        onClick={() => { toggle(); }}
        onBlur={() => { toggle(); }}
      // onFocus={()=>setState({...state, isLoading: true})}
      //  onSubmit={alert('hi')}
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
        {state.isLoading ? <Button
          //variant="outlined"
          color="secondary"
        >
          <i>Henter tilbud...</i>
        </Button> : <SalesTooltip sales={state.sales} />}
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
