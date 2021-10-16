import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

export default makeStyles((theme) => ({

  card: {
    maxWidth: 245,
    minWidth: 245,
    borderRadius: 25,
    // maxHeight: 320
    minHeight: 325


    //  height: 200,
    //  width: 245,
  },

  span: {
    cursor: 'pointer'
  },

  control: {
    padding: theme.spacing(2),

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