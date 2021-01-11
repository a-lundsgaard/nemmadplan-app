import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  Todo: {
    width: 'auto',
    height: '2.5rem',
    display: 'flex',
    //alignItems: 'left',
    justifyContent: 'flex-start', // aligns items left when sales tooltip is enabled
    //justifyContent: 'space-between', // aligns items left when sales tooltip is enabled

    paddingLeft: '0.5rem',
    //paddingRight: '20px',
    color: '#34495e',
    fontSize: '1rem',
    lineHeight: '2.5rem',
    //overflowX: 'hidden',
    //display: 'inline-block',
    //wordWrap: 'normal',
    whiteSpace: 'nowrap', /*writes ingredient on one line*/
    transition: 'all 0.3s ease',
    '&:hover': {
      background: 'rgba(0, 0, 0, 0.03)',
      cursor: 'pointer',
     // paddingRight: '20px',
     // marginRight: 50

    },
    '&:hover div': {
      opacity: '1'
    }
  },
  icons: {
    width: '100%', // right aligns icons 
    display: 'inline-flex',
   // alignItems: 'right',
    justifyContent: 'flex-end', // right aligns icons
    marginRight: '1rem',
    float: 'right',
    transition: 'all 0.3s',
    opacity: '0',
    margin: '5px 10px 0 10px',
   // marginLeft: 20,
   // marginTop: '4px',
   // marginRight: 30,
    //display: 'flex'
    paddingRight: 15
  }
});
