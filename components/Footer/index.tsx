import { Grid } from "@mui/material";
import classNames from "classnames";
import React from "react";
import styles from "./index.module.css";

type FooterProps = {
  isAbsolute?: boolean;
};

const Footer: React.FC<FooterProps> = (props: FooterProps) => {
  const { isAbsolute } = props;

  return (
    <Grid
      container
      className={classNames(
        styles["footer"],
        isAbsolute ? styles["absolute"] : "",
      )}
    ></Grid>
  );
};

export default Footer;
