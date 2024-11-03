import React, { useState } from "react";
import MenuDrawer from "../../components/MenuDrawer";

import ContactPhoneOutlinedIcon from "@mui/icons-material/ContactPhoneOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { AppBar, Grid2, Typography } from "@mui/material";
import Link from "next/link";
import { ListMenuLink } from "../../types/ListMenu";
import Hamburger from "../Hamburger";
import styles from "./headerBar.module.css";

export const HeaderBar: React.FC = (_) => {
  const DEAULT_MENU_LINKS: Array<ListMenuLink> = [
    {
      text: "Home",
      href: "/",
      icon: <HomeOutlinedIcon color="primary" />,
      isExpanded: false,
    },
    {
      text: "Contacts",
      href: "/contacts",
      icon: <ContactPhoneOutlinedIcon color="primary" />,
      isExpanded: false,
    },
    {
      text: "Logout",
      href: "/api/auth/logout",
      icon: <LogoutOutlinedIcon color="primary" />,
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
      <Grid2 container>
        <Grid2 size={{ xs: 1 }} className={styles["hamburger-nav-container"]}>
          <Hamburger active={hambugerActive} onClick={hamburgerOnClick} />
        </Grid2>
        <Grid2 size={{ xs: 11 }}>
          <Grid2
            container
            direction="column"
            justifyContent="center"
            className={styles["menu-title"]}
          >
            <Link href="/">
              <Typography variant="h4">FRC Assistant</Typography>
            </Link>
          </Grid2>
        </Grid2>

        <Grid2>
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
        </Grid2>
      </Grid2>
    </AppBar>
  );
};
