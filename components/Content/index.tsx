import classNames from "classnames";
import styles from "./index.module.css";

import { Grid } from "@mui/material";
import ContentCard from "../ContentCard";

import React from "react";

type ContentProps = {};

const Content: React.FC<ContentProps> = (_: ContentProps) => (
  <Grid className={classNames(styles["main-container"])}>
    <Grid
      container
      direction="column"
      className={classNames(styles["main"], "height-full")}
    >
      <Grid
        container
        item
        xs={12}
        md={6}
        justifyContent="space-evenly"
        alignItems="center"
        className={classNames(
          styles["content-cards-container"],
          styles["cards-left"],
        )}
      >
        <ContentCard imgurl="" title="" description={``} xs={6} md={12} />
        <ContentCard imgurl="" title="" description={``} xs={6} md={12} />
        <ContentCard imgurl="" title="" description={``} xs={6} md={12} />
        <ContentCard imgurl="" title="" description={``} xs={6} md={12} />
      </Grid>
      <Grid
        container
        item
        xs={12}
        md={6}
        justifyContent="space-evenly"
        alignItems="center"
        className={classNames(
          styles["content-cards-container"],
          styles["cards-right"],
        )}
      >
        <ContentCard imgurl="" title="" description={``} xs={6} md={12} />
        <ContentCard imgurl="" title="" description={``} xs={6} md={12} />
        <ContentCard imgurl="" title="" description={``} xs={6} md={12} />
        <ContentCard imgurl="" title="" description={``} xs={6} md={12} />
      </Grid>
    </Grid>
  </Grid>
);

export default Content;
