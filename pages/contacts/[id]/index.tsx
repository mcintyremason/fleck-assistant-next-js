import { Grid2, ThemeProvider } from "@mui/material";

import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";
import React from "react";
import Contact from "../../../components/Contact";
import Header from "../../../components/Header";
import Layout from "../../../components/Layout";
import originalTheme from "../../../themes/original-theme";

const ContactPage: React.FC = () => {
  const router = useRouter();
  const contactId = router.query.id as string;
  return (
    <ThemeProvider theme={originalTheme}>
      <Layout title="FRC Assistant">
        <Grid2
          className="app height-full"
          itemScope
          itemType="http://schema.org/LocalBusiness"
        >
          <Header />
          <Contact id={contactId} />
        </Grid2>
      </Layout>
    </ThemeProvider>
  );
};

export default ContactPage;
export const getServerSideProps = withPageAuthRequired();
