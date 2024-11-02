import { Grid2, ThemeProvider } from "@mui/material";

import React from "react";
import ContactsTabs from "../components/ContactsTabs";
import Header from "../components/Header";
import Layout from "../components/Layout";
import originalTheme from "../themes/original-theme";

const IndexPage: React.FC = () => {
  return (
    <ThemeProvider theme={originalTheme}>
      <Layout title="FRC Assistant">
        <Grid2
          className="app height-full"
          itemScope
          itemType="http://schema.org/LocalBusiness"
        >
          <Header />
          <ContactsTabs />
        </Grid2>
      </Layout>
    </ThemeProvider>
  );
};

export default IndexPage;
