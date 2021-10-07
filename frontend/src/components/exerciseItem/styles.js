import { makeStyles, useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  bg: {
    background: "#f0f0f0",
    width: "100%",
    height: "70px",
    marginTop: "2px",
    boxShadow: "1px 1px 1px 1px rgba(0,0,0,.12)",
    display: "flex",
    alignItems: "center",
    border: "1px solid #d1d1d1",
    borderRadius: "6px",
  },
  bgDate: {
    background: "#fafafa",
    width: "100%",
    height: "60px",
    marginTop: "2px",
    boxShadow: "1px 1px 1px 1px rgba(0,0,0,.12)",
    display: "flex",
    alignItems: "center",
    border: "1px solid #d1d1d1",
    borderRadius: "2px",
  },
  delButton: {
    color: "red",
    transition: "400ms",
    "&:hover": {
      color: "#8c0000",
      cursor: "pointer",
    },
  },
  button: {
    transition: "400ms",
    "&:hover": {
      color: "#8c0000",
      cursor: "pointer",
    },
  },
  txt: {
    fontSize: "0.8em",
  },
}));

export { useStyles, useTheme };
