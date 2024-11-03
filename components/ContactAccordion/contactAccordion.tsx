import styles from "./contactAccordion.module.css";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Grid2, useMediaQuery, useTheme } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import classNames from "classnames";
import Link from "next/link";
import * as React from "react";
import { ContactType } from "../../types/contacts";
import {
  dateDiffFromToday,
  formatAddress,
  getInitials,
} from "../../utils/common";

type ContactAccordion = {
  contact: ContactType;
  hideTitles?: boolean;
};

export function ContactAccordion(props: ContactAccordion) {
  const { contact, hideTitles } = props;
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const titlesDisplay = hideTitles ? "none" : "block";
  const theme = useTheme();
  const isExtraSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChange =
    (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <div
      key={`contact-accordion-wrapper-${contact.jnid}`}
      className={classNames(styles["contact-accordion-container"])}
    >
      <Accordion
        key={`contact-accordion-${contact.jnid}`}
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          key={`contact-accordion-summary-${contact.jnid}`}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Grid2 container columns={{ xs: 12 }} flexGrow={1} spacing={1}>
            <Grid2 flexDirection="column" size={{ xs: 4, sm: 3 }}>
              <Typography variant="h6" display={titlesDisplay}>
                Contact Name
              </Typography>
              <Link href={`/contacts/${contact.jnid}`}>
                <Typography>{contact.display_name}</Typography>
              </Link>
            </Grid2>

            <Grid2 flexDirection="column" size={{ xs: 4, sm: 3 }}>
              <Typography variant="h6" display={titlesDisplay}>
                Contact Type
              </Typography>
              <Typography>{contact.record_type_name}</Typography>
            </Grid2>

            <Grid2 flexDirection="column" size={{ xs: 2, sm: 3 }}>
              <Typography variant="h6" display={titlesDisplay}>
                Sales Rep
              </Typography>
              {isExtraSmallScreen ? (
                <Typography>{getInitials(contact.sales_rep_name)}</Typography>
              ) : (
                <Typography>{contact.sales_rep_name}</Typography>
              )}
            </Grid2>

            <Grid2 flexDirection="column" size={{ xs: 2, sm: 3 }}>
              <Typography variant="h6" display={titlesDisplay}>
                Last Status Change
              </Typography>
              <Typography>
                {dateDiffFromToday(contact.date_status_change)} Days
              </Typography>
            </Grid2>
          </Grid2>
        </AccordionSummary>
        <AccordionDetails key={`contact-accordion-details-${contact.jnid}`}>
          <Grid2
            container
            columns={{ xs: 12 }}
            flexGrow={1}
            spacing={1}
            className={classNames(styles["accordion-details-container"])}
          >
            <Grid2 flexDirection="column" size={{ xs: 4, sm: 3 }}>
              <Typography variant="h6" display={titlesDisplay}>
                Home Address
              </Typography>
              <Link
                target="_blank"
                href={`https://www.google.com/maps/place/${formatAddress(
                  contact,
                )}`}
              >
                <Typography>{formatAddress(contact)}</Typography>
              </Link>
            </Grid2>

            <Grid2 flexDirection="column" size={{ xs: 3, sm: 3 }}>
              <Typography variant="h6" display={titlesDisplay}>
                Home Phone
              </Typography>
              <Link href={`tel:${contact.home_phone}`}>
                <Typography>{contact.home_phone}</Typography>
              </Link>
            </Grid2>

            <Grid2 container wrap="wrap" size={{ xs: 3 }}>
              <Grid2 flexDirection="column" size={{ xs: 12 }}>
                <Typography variant="h6" display={titlesDisplay}>
                  Email
                </Typography>
                <Link href={`mailto:${contact.email}`}>
                  <Typography>{contact.email}</Typography>
                </Link>
              </Grid2>
            </Grid2>
            <Grid2
              container
              wrap="wrap"
              size={{ xs: 2, md: 3 }}
              justifyContent="flex-end"
            >
              <Grid2 size={{ xs: 12 }} flexDirection="column">
                <Link
                  target="_blank"
                  href={`https://app.jobnimbus.com/contact/${contact.jnid}`}
                >
                  <Grid2
                    container
                    className={classNames(styles["job-nimbus-link-container"])}
                  >
                    <Grid2
                      size={{ xs: 6, sm: 5, md: 4, lg: 3 }}
                      className={classNames(styles["job-nimbus-link-text"])}
                    >
                      <Typography>JobNimbus</Typography>
                    </Grid2>
                    <Grid2 size={{ xs: 1 }} justifyContent="end">
                      <OpenInNewIcon />
                    </Grid2>
                  </Grid2>
                </Link>
              </Grid2>
            </Grid2>
          </Grid2>
          <Grid2
            container
            columns={{ xs: 12 }}
            flexGrow={1}
            spacing={1}
            padding={"0 24px 0 0"}
          ></Grid2>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
