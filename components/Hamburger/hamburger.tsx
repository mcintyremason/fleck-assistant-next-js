import { Grid2 } from "@mui/material";
import classNames from "classnames";
import styles from "./hamburger.module.css";

type HamburgerNavProps = {
  active: boolean;
  onClick: (event: any) => void;
};

export const Hamburger: React.FC<HamburgerNavProps> = (
  props: HamburgerNavProps,
) => {
  const { active, onClick } = props;

  return (
    <Grid2
      container
      size={{ xs: 12 }}
      justifyContent={active ? "flex-end" : "center"}
      className={styles["hamburger-container"]}
    >
      <button
        onClick={onClick}
        type="button"
        aria-label="Hamburger Navigation"
        className={classNames(
          styles["hamburger"],
          styles["hamburger--collapse"],
          active ? styles["is-active"] : "",
        )}
      >
        <span className={styles["hamburger-box"]}>
          <span className={styles["hamburger-inner"]}></span>
        </span>
      </button>
    </Grid2>
  );
};
