import { makeStyles, useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: { marginTop: "5vh" },
  root: {
    minWidth: 275,
  },
  card: {
    background:
      "linear-gradient(18deg, rgba(247,247,247,1) 0%, rgba(255,255,255,1) 100%)",
    boxShadow: "5px 5px 10px 2px rgba(0,0,0,.1)",
    height: "wrap-content",
    minHeight: "820px",
  },

  titles: { textAlign: "center" },
  label: { fontSize: "1em", color: "black", fontStyle: "Bold" },

  info: {
    minWidth: "100%",
  },
  button: {
    marginTop: "2em",
    marginBottom: "2em",
  },
}));

export { useStyles, useTheme };
