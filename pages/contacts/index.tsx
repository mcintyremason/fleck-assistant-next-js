import { Grid2 } from "@mui/material";

import React from "react";
import ContactsSearch from "../../components/ContactsSearch";
import HeaderBar from "../../components/HeaderBar";

const ContactsPage: React.FC = () => {
  return (
    <Grid2
      className="app height-full"
      itemScope
      itemType="http://schema.org/LocalBusiness"
    >
      <HeaderBar />
      <ContactsSearch />
    </Grid2>
  );
};

export default ContactsPage;
