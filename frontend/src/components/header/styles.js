import { makeStyles, useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "7vh",
    minHeight: "60px",
    background:
      "linear-gradient(18deg,rgba(247, 247, 247, 1) 0%, rgba(255, 255, 255, 1) 100%)",
    boxShadow: "5px 5px 10px 2px rgba(0, 0, 0, 0.1)",
    display: "flex",
    alignItems: "center",
    zIndex: "1",
  },

  txt: {
    fontSize: "1em",
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

  link: {
    marginRight: "1em",
    fontSize: "1em",
    fontWeight: "normal",
    color: "rgba(26, 17, 64, 1)",
    fontStyle: "normal",
    textDecoration: "none",

    "&:hover": {
      color: "#4626d4",
    },
  },
}));

export { useStyles, useTheme };
