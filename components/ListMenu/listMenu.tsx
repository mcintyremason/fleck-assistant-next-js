import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Collapse, Grid2, List, ListItem, ListItemIcon } from "@mui/material";
import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { ListMenuLink } from "../../types/ListMenu";
import { subLinksActive } from "../../utils/common";
import styles from "./listMenu.module.css";

type ListMenuProps = {
  justifyText?:
    | "center"
    | "flex-start"
    | "flex-end"
    | "space-between"
    | "space-around"
    | "space-evenly";
  links: Array<ListMenuLink>;
};

export const ListMenu: React.FC<ListMenuProps> = (props: ListMenuProps) => {
  const { links, justifyText = "flex-start" } = props;
  const router = useRouter();

  const [menuLinks, setListMenuLinks] = useState<Array<ListMenuLink>>(links);

  const expandLinkHandler = (link: ListMenuLink) => {
    const updatedListMenuLinks = menuLinks.map((_link) => {
      if (link === _link) {
        _link.isExpanded = !_link.isExpanded;
      }
      return _link;
    });

    setListMenuLinks(updatedListMenuLinks);
  };

  const linkClickHandler = (e: any, link: ListMenuLink) => {
    e.preventDefault();
    router.push(link.href);
  };

  return (
    <Grid2
      className={styles["list-menu-container"]}
      container
      direction="column"
      wrap="nowrap"
    >
      {menuLinks.map((link: ListMenuLink) => (
        <Grid2 key={`${link.text}-link`} container>
          {link?.subLinks?.length ? (
            // if there are sublinks
            <List
              aria-labelledby={`${link.text}-menu-item`}
              className={classNames(styles["list-menu"])}
            >
              <ListItem
                disableGutters
                onClick={() => expandLinkHandler(link)}
                className={styles["list-menu-item"]}
              >
                <Grid2
                  container
                  justifyContent="space-between"
                  className={classNames(
                    styles["list-menu-link"],
                    link.isExpanded ? styles["active"] : "",
                    subLinksActive(link, router) && styles["active"],
                  )}
                  onClick={(e: any) => {
                    link.onClick ? link.onClick() : linkClickHandler(e, link);
                  }}
                >
                  <Grid2
                    container
                    size={{ xs: 3 }}
                    direction="column"
                    justifyContent="center"
                  >
                    {link.icon ? (
                      <ListItemIcon>{link.icon}</ListItemIcon>
                    ) : null}
                  </Grid2>
                  <Grid2
                    container
                    size={{ xs: 9 }}
                    justifyContent={justifyText}
                  >
                    <Grid2
                      container
                      size={{ xs: 10 }}
                      direction="column"
                      justifyContent="center"
                      className={styles["list-menu-link-text"]}
                    >
                      {link.text}
                    </Grid2>
                    <Grid2
                      container
                      size={{ xs: 2 }}
                      direction="column"
                      justifyContent="center"
                    >
                      {link.isExpanded ? <ExpandLess /> : <ExpandMore />}
                    </Grid2>
                  </Grid2>
                </Grid2>
              </ListItem>
              <Collapse in={link.isExpanded} timeout="auto" unmountOnExit>
                {link?.subLinks.map((subLink) => (
                  <List
                    key={`${subLink.text}-sublink`}
                    component="div"
                    disablePadding
                  >
                    <ListItem>
                      <Link
                        className={classNames(
                          styles["list-menu-link"],
                          subLink.href === router.pathname
                            ? styles["active"]
                            : "",
                        )}
                        href={subLink.href}
                      >
                        <Grid2 container justifyContent="space-between">
                          <Grid2
                            container
                            size={{ xs: 3 }}
                            direction="column"
                            justifyContent="center"
                          >
                            {subLink.icon ? (
                              <ListItemIcon>{subLink.icon}</ListItemIcon>
                            ) : null}
                          </Grid2>
                          <Grid2
                            container
                            size={{ xs: 9 }}
                            direction="column"
                            justifyContent="center"
                          >
                            <Grid2 container justifyContent={justifyText}>
                              {subLink.text}
                            </Grid2>
                          </Grid2>
                        </Grid2>
                      </Link>
                    </ListItem>
                  </List>
                ))}
              </Collapse>
            </List>
          ) : (
            // if there are no subLinks
            <Grid2
              key={`${link.text}-link`}
              container
              size={{ xs: 12 }}
              className={styles["list-menu-link-container"]}
            >
              <List
                aria-labelledby={`${link.text}-menu-item`}
                className={classNames(styles["list-menu"])}
              >
                <ListItem
                  disableGutters
                  onClick={() =>
                    link.onClick ? link.onClick() : expandLinkHandler(link)
                  }
                  className={classNames(
                    styles["list-menu-item"],
                    styles["list-menu-link"],
                  )}
                >
                  <a
                    className={classNames(
                      styles["list-menu-link"],
                      link.href === router.pathname ? styles["active"] : "",
                    )}
                    href={link.onClick ? "#" : link.href}
                  >
                    <Grid2
                      container
                      size={{ xs: 12 }}
                      justifyContent="space-between"
                      spacing={4}
                    >
                      <Grid2
                        container
                        size={{ xs: 2 }}
                        direction="column"
                        justifyContent="center"
                      >
                        {link.icon ? (
                          <ListItemIcon
                            className={classNames(
                              styles["list-menu-item-icon"],
                            )}
                          >
                            {link.icon}
                          </ListItemIcon>
                        ) : null}
                      </Grid2>
                      <Grid2
                        container
                        size={{ xs: 10 }}
                        direction="column"
                        justifyContent="center"
                      >
                        <Grid2 container justifyContent={justifyText}>
                          {link.text}
                        </Grid2>
                      </Grid2>
                    </Grid2>
                  </a>
                </ListItem>
              </List>
            </Grid2>
          )}
        </Grid2>
      ))}
    </Grid2>
  );
};
