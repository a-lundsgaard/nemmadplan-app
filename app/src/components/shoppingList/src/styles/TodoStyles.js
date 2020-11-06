import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  Todo: {
    width: 'auto',
    height: '2.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: '0.5rem',
    //paddingRight: '20px',
    color: '#34495e',
    fontSize: '1rem',
    lineHeight: '2.5rem',
    //overflowX: 'hidden',
    //display: 'inline-block',
    //wordWrap: 'normal',
    whiteSpace: 'nowrap', /*writes ingredient on one*/
    transition: 'all 0.3s ease',
    '&:hover': {
      background: 'rgba(0, 0, 0, 0.03)',
      cursor: 'pointer',
      paddingRight: '20px',
     // marginRight: 50

    },
    '&:hover div': {
      opacity: '1'
    }
  },
  icons: {
    width: '40px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: '1rem',
    float: 'right',
    transition: 'all 0.3s',
    opacity: '0',
    marginLeft: 20,
    marginRight: 30,
    //display: 'flex'
    //paddingRight: 40
  }
});
