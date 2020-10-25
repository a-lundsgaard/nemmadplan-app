import React, { Fragment, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import ReceiptCard from 'Components/card/receiptCard';
import listenToSearchInput from 'Redux/helpers/subscribe'
import {HTTP} from '../../HTTP/http'

import AddCircleIcon from '@material-ui/icons/AddCircle';
import IconButton from '@material-ui/core/IconButton';

import PlusButton from 'Components/buttons/plusButton/plusButton'

import FullScreenDialog from 'Components/dialog/fullScreenDialog';

import ReceiptSceletonLoader from 'Components/loaders/receiptSceletonLoader'





const useStyles = makeStyles((theme) => ({

  fragment: {
    overflowX: "hidden",
    //boxSizing: "border-box"
  },
  
  root: {
    flexGrow: 1,
    //overflowX: "hidden"
   // marginLeft: -3,
  },
  
  card: {
    maxWidth: 245,
  //  height: 200,
   // width: 200,
  },

  addReceiptButton: {
    position: 'fixed',
    bottom:0,
    left: "50%",
    marginLeft: -50
  },

  control: {
    //padding: theme.spacing(2),

  },

  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));



export default function SpacingGrid() {
 // const [spacing, setSpacing] = React.useState(2);
  const classes = useStyles();

  const [search, setSearch] = useState(window.store.getState().searchInput); // getting search bar input
  const [receipts, setReceipts] = useState([])
  const [isReceiptSaved, setReceiptSaved] = useState('') // letting us know when a receipt is saved to rerender dishes

  const [isLoading, setIsLoading] = useState(false) // letting us know when a receipt is saved to rerender dishes



  function getReceitps() {

    setIsLoading(true)

    const token = localStorage.getItem('token')
    console.log('Sending request to: ' + process.env.API_URL)

    const requestBody = `query {
        receipts {
          _id
          name
          text
          image
          createdAt
          updatedAt
          ingredients {
            name
            unit
            quantity
          }
          creator {
            email
          }
        }
      }`;

    HTTP.post(requestBody, token)
      .then(res => {
        setReceipts(res.data.receipts)
        setIsLoading(false)
      })
      .catch(e => 
        console.log(e) 
        )
  }


  useEffect(()=> {
    listenToSearchInput(setSearch) // sets up redux listener on the search input
  }, [])
  

  useEffect(()=> {
    console.log(search);
  }, [search])

  useEffect(()=> {
    console.log('Found receipts:')
    console.log(receipts);
  }, [receipts])


  useEffect(()=> {
  //  getReceitps()
  }, [])


  useEffect(()=> {
    getReceitps()
  }, [isReceiptSaved])

 // const [expanded, setExpanded] = React.useState(false);

  /*const handleExpandClick = () => {
    setExpanded(!expanded);
  };*/

  return (
    <Fragment>

    <Grid container className={classes.root} justify="center" >
      <Grid item xs={10}>

        <Grid container justify="center" spacing={5}>
          {
          isLoading ? 
          Array(8).fill(8)
          .map((receipt, index) => (
            <Grid key={index} item>
              <ReceiptSceletonLoader/>
            </Grid>)) 
            : receipts
            .map((receipt, index) => (
                <Grid key={receipt._id} item>
                      <ReceiptCard 
                        title={receipt.name} 
                        createdAt={receipt.createdAt}
                        text={receipt.text}
                        image={receipt.image}
                        ingredients={receipt.ingredients}
                        title={receipt.name}
                      /> 
                </Grid>
          )) }
        </Grid>

      </Grid>


    </Grid>

    <div className={classes.addReceiptButton}>
    <FullScreenDialog onReceiptSave={(value) => setReceiptSaved(value) }/>
    </div>
    
    </Fragment>
  );
}

