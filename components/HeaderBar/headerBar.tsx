import React, { useState } from "react";
import MenuDrawer from "../../components/MenuDrawer";

import { AppBar, Grid, Typography } from "@mui/material";
import Link from "next/link";
import { ListMenuLink } from "../../types/ListMenu";
import Hamburger from "../Hamburger";
import styles from "./headerBar.module.css";

export const HeaderBar: React.FC = (_) => {
  const DEAULT_MENU_LINKS: Array<ListMenuLink> = [
    {
      text: "Home",
      href: "/",
      // icon: <HomeOutlinedIcon color="primary" />,
      isExpanded: false,
    },
    {
      text: "Contacts",
      href: "/contacts",
      // icon: <AccountBalanceWalletOutlinedIcon color="primary" />,
      isExpanded: false,
    },
    {
      text: "Logout",
      href: "/api/auth/logout",
      // icon: <AccountBalanceWalletOutlinedIcon color="primary" />,
      isExpanded: false,
    },
  ];

  const [hambugerActive, setHambugerActive] = useState(false);
  const [menuLinks, setMenuLinks] = useState<Array<ListMenuLink>>([
    ...DEAULT_MENU_LINKS,
  ]);

  const hamburgerOnClick = () => {
    setHambugerActive((hambugerActive) => !hambugerActive);
  };

  const resetMenuLinks = () => {
    const updatedListMenuLinks = menuLinks.map((_link) => {
      _link.isExpanded = false;
      return _link;
    });

    setMenuLinks(updatedListMenuLinks);
  };

  return (
    <AppBar
      position="static"
      color="transparent"
      className={styles["header-bar-container"]}
    >
      <Grid container>
        <Grid item xs={10} sm={4}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            className={styles["menu-title"]}
          >
            <Link href="/">
              <Typography variant="h4">FRC Assistant</Typography>
            </Link>
          </Grid>
        </Grid>
        <Grid item xs={2} sm={8} className={styles["hamburger-nav-container"]}>
          <Hamburger active={hambugerActive} onClick={hamburgerOnClick} />
        </Grid>
        <Grid>
          <MenuDrawer
            links={menuLinks}
            open={hambugerActive}
            hamburgerOnClick={hamburgerOnClick}
            onClose={() => {
              hamburgerOnClick();
              resetMenuLinks();
            }}
            onOpen={hamburgerOnClick}
          />
        </Grid>
      </Grid>
    </AppBar>
  );
};
