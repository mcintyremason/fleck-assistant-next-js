import classNames from "classnames";
import styles from "./loginCard.module.css";

import { useUser } from "@auth0/nextjs-auth0/client";
import LoadingButton from "@mui/lab/LoadingButton";
import { Card, CardActions, CardMedia, Grid2, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const LoginCard = (_) => {
  const router = useRouter();
  const { user, isLoading } = useUser();

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user]);

  return (
    <Grid2
      size={{ xs: 4 }}
      className={classNames(styles["login-card-container"])}
    >
      <Card raised className={classNames(styles["login-card"])}>
        <Grid2 container size={{ xs: 12 }} justifyContent="center">
          <Grid2
            container
            size={{ xs: 6 }}
            flexDirection="column"
            justifyContent="center"
          >
            <CardMedia
              sx={{ height: 120, width: 120 }}
              component="img"
              image="/rwf180.png"
              title="roof with fleck logo"
              className={classNames(styles["login-card-media"])}
            />
          </Grid2>
          <Grid2 container size={{ xs: 6 }} justifyContent="center">
            <Grid2 container flexDirection="column" justifyContent="center">
              <Typography
                variant="h4"
                className={classNames(styles["login-card-text"])}
              >
                Assistant
              </Typography>
            </Grid2>
          </Grid2>
        </Grid2>

        <CardActions className={classNames(styles["login-card-actions"])}>
          <Grid2 container size={{ xs: 12 }} justifyContent="center">
            <Link
              href="/api/auth/login"
              className={classNames(styles["login-card-link"])}
            >
              <LoadingButton
                loading={isLoading}
                variant="contained"
                size="large"
                className={classNames(styles["login-card-button"])}
              >
                Login
              </LoadingButton>
            </Link>
          </Grid2>
        </CardActions>
      </Card>
    </Grid2>
  );
};
