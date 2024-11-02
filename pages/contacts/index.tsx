import { Grid2, ThemeProvider } from "@mui/material";

import React from "react";
import ContactsSearch from "../../components/ContactsSearch";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import originalTheme from "../../themes/original-theme";

const ContactsPage: React.FC = () => {
  return (
    <ThemeProvider theme={originalTheme}>
      <Layout title="FRC Assistant">
        <Grid2
          className="app height-full"
          itemScope
          itemType="http://schema.org/LocalBusiness"
        >
          <Header />
          <ContactsSearch />
        </Grid2>
      </Layout>
    </ThemeProvider>
  );
};

export default ContactsPage;
