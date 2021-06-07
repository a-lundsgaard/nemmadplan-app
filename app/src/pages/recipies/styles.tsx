
import { makeStyles } from "@material-ui/core/styles";
import { red } from '@material-ui/core/colors';




export default makeStyles((theme) => ({

  fragment: {
    overflowX: "hidden",
    //boxSizing: "border-box"
  },

  root: {
    flexGrow: 1,
    //overflowX: "hidden"
    // marginLeft: -3,
  },
  // jkkj
  card: {
    maxWidth: 245,
    //  height: 200,
    // width: 200,
  },

  /* Placing add button at bottom center */
  addReceiptButton: {
    position: 'fixed',
    bottom: 0,
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