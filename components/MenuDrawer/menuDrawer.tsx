import { Grid2, SwipeableDrawer } from "@mui/material";
import ListMenu from "../../components/ListMenu";
import { ListMenuLink } from "../../types/ListMenu";
import Hamburger from "../Hamburger";
import styles from "./menuDrawer.module.css";

type MenuDrawerProps = {
  links: Array<ListMenuLink>;
  open: boolean;
  showCloseIcon?: boolean;
  hamburgerOnClick: () => void;
  onClose: () => void;
  onOpen: () => void;
};

export const MenuDrawer: React.FC<MenuDrawerProps> = (
  props: MenuDrawerProps,
) => {
  const {
    links,
    open,
    showCloseIcon = false,
    hamburgerOnClick,
    onClose,
    onOpen,
  } = props;

  return (
    <SwipeableDrawer
      anchor="left"
      open={open}
      className={styles["menu-drawer"]}
      onClose={onClose}
      onOpen={onOpen}
    >
      {showCloseIcon && (
        <Grid2 container className={styles["hamburger-nav-container"]}>
          <Hamburger active={open} onClick={hamburgerOnClick} />
        </Grid2>
      )}
      <Grid2
        className={styles["list-menu-container"]}
        container
        justifyContent="center"
        size={{ xs: 12 }}
      >
        <ListMenu links={links} justifyText={"flex-start"} />
      </Grid2>
    </SwipeableDrawer>
  );
};
