import { makeStyles, useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  modal: {
    boxShadow: "0 1px 4px rgba(0, 0, 0, 0.2)",
    borderRadius: "6px",
    backgroundColor: "white",
    padding: "1rem",
    width: "20rem",
    zIndex: "10",
    height: "wrap-content",
    position: "fixed",
    marginTop: "20vh",
  },
  modalHistory: {
    boxShadow: "0 1px 4px rgba(0, 0, 0, 0.2)",
    borderRadius: "6px",
    backgroundColor: "white",
    padding: "1rem",
    width: "wrap-content",
    height: "500px",
    minWidth: "70%",
    zIndex: "10",
    position: "fixed",
    marginTop: "10vh",
    overflow: "auto",
  },
  backdrop: {
    position: "fixed",
    zIndex: "1",
    backgroundColor: " rgba(0, 0, 0, 0.75)",
    width: "100%",
    height: "100vh",
    top: "0",
    left: "0",
  },
  button: {
    transition: "400ms",
    "&:hover": {
      color: "#8c0000",
      cursor: "pointer",
    },
  },
  box: {
    marginTop: "1em",
  },
  btn: {
    marginTop: "2em",
  },
}));
export { useStyles, useTheme };
