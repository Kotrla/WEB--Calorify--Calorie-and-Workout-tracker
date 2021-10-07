import { useStyles } from "./styles.js";
function Backdrop(props) {
  const classes = useStyles();
  return <div className={classes.backdrop} onClick={props.onClick} />;
}

export default Backdrop;
