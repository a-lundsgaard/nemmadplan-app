import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  Todo: {
    width: 'auto',
    //height: '2.5rem',
    display: 'flex',
    padding: '5px 0 5px 0',
    //alignItems: 'left',
    justifyContent: 'flex-start', // aligns items left when sales tooltip is enabled
    //justifyContent: 'space-between', // aligns items left when sales tooltip is enabled

    paddingLeft: '0.5rem',
    //paddingRight: '20px',
    color: '#34495e',
    fontSize: '1rem',
    //margin: '3px 0 0 0',
    //borderTop: '1px solid #69696938',
    borderBottom: '1px solid #69696938',
    //lineHeight: '2.5rem',
    //overflow: 'hidden',
    //display: 'inline-block',
    //wordWrap: 'normal',
    //whiteSpace: 'nowrap', /*writes ingredient on one line*/ No good as its mess up the left margin. Use overflow instead
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

  salesButtons: {
    width: '90px', // right aligns icons, when btn text is changing from "hent tilbud" to "henter tilbud"
    whiteSpace: 'nowrap'  // makes sure the text in the btn never line breakes
  },

  icons: {
    //width: '100%', // right aligns icons 
    //display: 'inline-flex',
   // alignItems: 'right',
    //justifyContent: 'flex-end', // right aligns icons
    //marginRight: '1rem',  
    //float: 'right',
    transition: 'all 0.3s',
    opacity: '0',
    margin: '5px 10px 0',
    marginLeft: 'auto',
    whiteSpace: 'nowrap'  // makes sure the icon btn's never line breakes

    //position: 'relative',
    //right: '5px'
   // marginLeft: 20,
   // marginTop: '4px',
   // marginRight: 30,
    //display: 'flex'
    //paddingRight: 15
  }
});
