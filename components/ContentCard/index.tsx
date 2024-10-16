import classNames from "classnames";
import styles from "./index.module.css";

import {
  Breakpoint,
  Card,
  CardContent,
  Grid,
  GridSize,
  Typography,
} from "@mui/material";
import React from "react";

type ContentCardProps = {
  description: string;
  imgurl: string;
  title: string;
} & React.HTMLAttributes<HTMLDivElement> &
  Partial<Record<Breakpoint, boolean | GridSize>>;

const ContentCard: React.FC<ContentCardProps> = (props) => {
  const { description, imgurl, title, xs, sm, md, lg, xl } = props;

  return (
    <Grid
      className={classNames(styles["content-card-container"])}
      item
      xs={xs}
      sm={sm}
      md={md}
      lg={lg}
      xl={xl}
    >
      <Card>
        <Grid
          container
          justifyContent="center"
          className={classNames(styles["content-card-image-container"])}
        >
          <img
            className={classNames(styles["content-card-image"])}
            src={imgurl}
            alt={title}
          />
        </Grid>
        <CardContent>
          <Typography
            variant="h5"
            component="h5"
            className={classNames(styles["title"])}
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            component="p"
            className={classNames(styles["description"])}
          >
            {description}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ContentCard;
