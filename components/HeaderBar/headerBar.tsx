import React, { useState } from "react";
import MenuDrawer from "../../components/MenuDrawer";

import ContactPhoneOutlinedIcon from "@mui/icons-material/ContactPhoneOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import {
  AppBar,
  Box,
  Grid2,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import { ListMenuLink } from "../../types/ListMenu";
import Hamburger from "../Hamburger";
import HeaderSearch from "../HeaderSearch";
import styles from "./headerBar.module.css";

export const HeaderBar: React.FC = (_) => {
  const theme = useTheme();
  const isExtraSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

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
      <Grid2 container size={{ xs: 12 }}>
        <Grid2 container size={{ xs: 12 }}>
          <Grid2 className={styles["hamburger-nav-container"]}>
            <Hamburger active={hambugerActive} onClick={hamburgerOnClick} />
          </Grid2>
          <Grid2 size={{ xs: 6, md: 5, lg: 2 }}>
            <Grid2
              container
              direction="column"
              justifyContent="center"
              className={styles["menu-title"]}
            >
              <Grid2 container size={{ xs: 12 }}>
                <Link href="/">
                  <Box
                    component="img"
                    sx={{
                      height: 50,
                      width: 50,
                      maxHeight: { xs: 50 },
                      maxWidth: { xs: 50 },
                    }}
                    alt="FRC Logo"
                    src="/rwf180.png"
                  />
                </Link>
                <Grid2
                  container
                  flexDirection="column"
                  justifyContent="center"
                  className={styles["header-bar-title"]}
                >
                  <Link href="/">
                    <Typography variant="h4">Assistant</Typography>
                  </Link>
                </Grid2>
              </Grid2>
            </Grid2>
          </Grid2>
        </Grid2>
        <Grid2 container size={{ xs: 12 }} justifyContent="flex-end">
          <Grid2
            container
            size={{ xs: 12 }}
            flexDirection="column"
            justifyContent="center"
          >
            <HeaderSearch />
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
            showCloseIcon={!isExtraSmallScreen}
          />
        </Grid2>
      </Grid2>
    </AppBar>
  );
};
