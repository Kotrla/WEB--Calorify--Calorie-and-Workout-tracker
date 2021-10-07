import { makeStyles, useTheme } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  bg: {
    width: "100%",
    minHeight: "100vh",
    margin: 0,
    padding: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
    padding: theme.spacing(3),
    background:
      "linear-gradient(18deg, rgba(247,247,247,1) 0%, rgba(255,255,255,1) 100%)",

    boxShadow: "5px 5px 10px 2px rgba(0,0,0,.1)",
    width: "fit-content",
    maxHeight: "400px",
    maxWidth: "300px",
  },

  title: {
    fontSize: "3em",
    fontWeight: "normal",
    color: "rgba(26, 17, 64, 1)",
    textTransform: "uppercase",
    fontStyle: "normal",
    textDecoration: "none",
    lineHeight: "2em",
    letterSpacing: "2.3px",
    textShadow: "0px 0px 7px #cae1e3",
    textAlign: "center",
  },
}));

export { useStyles, useTheme };
