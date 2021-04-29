
import { makeStyles } from "@material-ui/core/styles";



const useStyles = makeStyles({

    shake: {
        animation: "shake 0.82s cubic-bezier(.36,.07,.19,.97) both",
        transform: "translate3d(0, 0, 0)",
        backfaceVisibility: "hidden",
        perspective: "1000px",
    },


    "@keyframes shake": {
      "10%, 90%": {
        opacity: 0,
        transform: "translate3d(-1px, 0, 0)"
      },
      "20%, 80%": {
        opacity: 1,
        transform: "translate3d(2px, 0, 0)"
      },
      "30%, 50%, 70%": {
        opacity: 1,
        transform: "translate3d(2px, 0, 0)"
      },
      "40%, 60%": {
        opacity: 1,
        transform: "translate3d(4px, 0, 0)"
      }

    }
  });