import {
  Grid2,
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from "@mui/material";

import React from "react";
import ContactsTabs from "../components/ContactsTabs";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Layout from "../components/Layout";

const theme = responsiveFontSizes(
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
  }),
);

theme.typography.h5 = {
  fontSize: ".7rem",
  [theme.breakpoints.up("md")]: {
    fontSize: "24px",
  },
};

theme.typography.h6 = {
  fontSize: ".5rem",
  [theme.breakpoints.up("md")]: {
    fontSize: "12px",
  },
};

theme.typography.body1 = {
  fontSize: ".8rem",
  overflowWrap: "anywhere",
  [theme.breakpoints.up("md")]: {
    fontSize: "14px",
  },
};

const IndexPage: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Layout title="nextjs-typescript-template">
        <Grid2
          className="app height-full"
          itemScope
          itemType="http://schema.org/LocalBusiness"
        >
          <Header />
          <ContactsTabs />
          <Footer />
        </Grid2>
      </Layout>
    </ThemeProvider>
  );
};

export default IndexPage;
