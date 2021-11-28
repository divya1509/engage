import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background: "#40407a",
  },
  menuButton: {
    marginRight: theme.spacing(1),
    color: "black",
  },
  title: {
    fontSize: "1.38rem",
    color: "#ffdead",
    marginLeft: "5px",
    cursor: "pointer",
  },
  appBar: {
    backgroundColor: "#40407a",
    color: "#ffdead",
    fontSize: "1.5rem",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerWrapper: {
    display: "flex",
    alignItems: "center",
  },
  header__wrapper__right: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  icon: {
    marginRight: "15px",
    color: "##ffdead",
    cursor: "pointer",
  },

  btn: {
    color: "#ffdead",
    textDecoration: "none",
  },
}));
