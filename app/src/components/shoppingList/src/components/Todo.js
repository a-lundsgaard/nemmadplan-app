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


//import CircularPr



function Todo({ id, task, completed }) {

  const classes = useStyles();
  const dispatch = useContext(DispatchContext);
  const [isEditing, toggle] = useToggleState(false);

  const [state, setState] = useState({
    sales: [],
    isLoading: true
  })


  const getSales = async (ingredient) => {
    const query = HTTP.sales.getSales('title price unit quantity pricePrKg chain img date', { products: [ingredient] });
    const results = await HTTP.post(query)
    return results.data.getSales
  }

  useEffect(() => {
    setState({...state, isLoading: true})
    getSales(task)
      .then(results => {
        setState({
          ...state,
          isLoading: false,
          sales: results || []
        })
      })
  }, [task])


  if (isEditing) {
    return (
      <li
        className={classes.Todo}
        style={{ overflowY: 'hidden' }}
        onClick={() => {toggle();}}
        onBlur={() =>{toggle();} }
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
