import { Grid2, ThemeProvider } from "@mui/material";

import { useRouter } from "next/router";
import React from "react";
import Contact from "../../../components/Contact";
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import Layout from "../../../components/Layout";
import originalTheme from "../../../themes/original-theme";

const IndexPage: React.FC = () => {
  const router = useRouter();
  const contactId = router.query.id as string;
  return (
    <ThemeProvider theme={originalTheme}>
      <Layout title="nextjs-typescript-template">
        <Grid2
          className="app height-full"
          itemScope
          itemType="http://schema.org/LocalBusiness"
        >
          <Header />
          <Contact id={contactId} />
          <Footer />
        </Grid2>
      </Layout>
    </ThemeProvider>
  );
};

export default IndexPage;
