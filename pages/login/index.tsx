import styles from "./index.module.css";

import { Grid2 } from "@mui/material";

import classNames from "classnames";
import React from "react";
import LoginCard from "../../components/LoginCard";

const ContactsPage: React.FC = () => {
  return (
    <Grid2
      className="app height-full"
      itemScope
      itemType="http://schema.org/LocalBusiness"
    >
      <Grid2
        container
        justifyContent="center"
        className={classNames(styles["height-full"], styles["login-page"])}
      >
        <Grid2 container flexDirection="column" justifyContent="center">
          <Grid2 container>
            <LoginCard />
          </Grid2>
        </Grid2>
      </Grid2>
    </Grid2>
  );
};

export default ContactsPage;
