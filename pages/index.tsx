import { Grid2 } from "@mui/material";

import React from "react";
import ContactsTabs from "../components/ContactsTabs";
import HeaderBar from "../components/HeaderBar";

const IndexPage: React.FC = () => {
  return (
    <Grid2
      className="app height-full"
      itemScope
      itemType="http://schema.org/LocalBusiness"
    >
      <HeaderBar />
      <ContactsTabs />
    </Grid2>
  );
};

export default IndexPage;
