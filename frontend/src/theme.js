import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#163E24",
    },
    secondary: {
      main: "#E9760C",
      contrastText: "rgba(255,255,255,0.87)",
    },
    success: {
      main: "#2E653E",
    },
  },
  // Name of the component
  components: {
    MuiButton: {
      defaultProps: {
        variant: "contained",
      },
    },
  },
});

export const globalStyles = {
  body: {
    backgroundColor: theme.palette.primary.main,
  },
  img: {
    maxWidth: "100%",
  },
};

export default theme;
