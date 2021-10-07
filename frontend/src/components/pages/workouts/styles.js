import { makeStyles, useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: "5vh",
    marginBottom: "5vh",
    width: "100%",
    height: "wrap-content",
    minHeight: "80vh",
    background:
      "linear-gradient(18deg, rgba(247,247,247,1) 0%, rgba(255,255,255,1) 100%)",
    boxShadow: "5px 5px 10px 2px rgba(0,0,0,.1)",

    //overflow: "auto",
  },
  titleDiv: {
    display: "flex",
    alignItems: "center",
    border: "1px solid rgb(230, 230, 230)",
    marginTop: "1em",
    height: "50px",
    background:
      "linear-gradient(18deg, rgba(247,247,247,1) 0%, rgba(255,255,255,1) 100%)",
    boxShadow: "2px 2px 2px 2px rgba(0,0,0,.1)",
  },

  label: {
    fontSize: "1em",
    color: "black",
    fontStyle: "Bold",
  },
  smallContainer: {
    marginTop: "1em",
  },
  button: { marginRight: "1em" },
  info: {
    minWidth: "100%",
  },
}));

export { useStyles, useTheme };
