import { makeStyles } from '@material-ui/core/styles';
import sizes from '../helpers/sizes';

export default makeStyles({
  App: {
    width: '100%',
 /*   margin: '0 auto',
    [sizes.down('md')]: {
      width: 'auto'
    },
    [sizes.down('xs')]: {
      width: 'auto'
    }*/
  },

  paper: {
    maxHeight: 600,
    padding: "15px 0px 0 40px",
    overflowY: 'scroll',
    overflowX: 'hidden'
  },
  
  header: {
   // background: 'white',
 //   position: 'fixed',
    textAlign: 'left',
    '& h1': {
      color: '#2c3e50',
      margin: '5vh 0 10px 0',
      fontSize: '1.5rem',
      fontWeight: '300',
      '& span': {
        fontWeight: '700'
      },
      [sizes.down('xs')]: {
        fontSize: '4.5rem'
      }
    },
    '& h2': {
      color: '#9aa1a5',
      fontSize: '1rem',
      fontWeight: '300',
      [sizes.down('xs')]: {
        fontSize: '0.6rem'
      }
    }
  },
  link: {
    display: 'flex',
    justifyContent: 'center',
    backfaceVisibility: 'hidden',
    color: '#81b3d2',
    fontSize: '0.7rem',
    position: 'relative',
    textDecoration: 'none',
    transition: '0.5s color ease'
  }
});
