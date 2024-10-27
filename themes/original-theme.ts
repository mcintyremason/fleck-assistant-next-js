import { createTheme, responsiveFontSizes } from "@mui/material";

const originalTheme = responsiveFontSizes(
  createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 425,
        md: 769,
        lg: 1280,
        xl: 1920,
      },
    },
    palette: {
      primary: {
        main: "#e43d30",
      },
      secondary: {
        main: "#ffd040",
      },
    },
    typography: {
      fontFamily:
        "San Frediano, BloggerSans, Helvetica Neue, Helvetica, Arial, sans-serif",
    },
  }),
);

originalTheme.typography.h5 = {
  fontSize: ".7rem",
  [originalTheme.breakpoints.up("md")]: {
    fontSize: "18px",
  },
};

originalTheme.typography.h6 = {
  fontSize: ".5rem",
  [originalTheme.breakpoints.up("md")]: {
    fontSize: "12px",
  },
};

originalTheme.typography.body1 = {
  fontSize: ".8rem",
  overflowWrap: "anywhere",
  [originalTheme.breakpoints.up("md")]: {
    fontSize: "16px",
  },
};

export default originalTheme;
