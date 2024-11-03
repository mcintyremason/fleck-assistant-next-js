import { Grid2 } from "@mui/material";

import { useRouter } from "next/router";
import React from "react";
import Contact from "../../../components/Contact";
import HeaderBar from "../../../components/HeaderBar";

const ContactPage: React.FC = () => {
  const router = useRouter();
  const contactId = router.query.id as string;
  return (
    <Grid2
      className="app height-full"
      itemScope
      itemType="http://schema.org/LocalBusiness"
    >
      {/* <Header /> */}
      <HeaderBar />
      <Contact id={contactId} />
    </Grid2>
  );
};

export default ContactPage;
