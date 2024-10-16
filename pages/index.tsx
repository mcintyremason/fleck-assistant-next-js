import {
  Grid2,
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from "@mui/material";

import ContactsTable from "../components/ContactsTable";
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

const IndexPage = () => (
  <ThemeProvider theme={theme}>
    <Layout title="nextjs-typescript-template">
      <Grid2
        className="app height-full"
        itemScope
        itemType="http://schema.org/LocalBusiness"
      >
        <Header />
        <ContactsTable />
        <Footer />
      </Grid2>
    </Layout>
  </ThemeProvider>
);

export default IndexPage;
