import styles from "./index.module.css";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Grid2 } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import classNames from "classnames";
import Link from "next/link";
import * as React from "react";
import { Contact } from "../../types/contacts";
import { dateDiffFromToday, formatAddress } from "../../utils/common";

type ContactAccordion = {
  contact: Contact;
  hideTitles?: boolean;
};

export default function ContactAccordion(props: ContactAccordion) {
  const { contact, hideTitles } = props;
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const titlesDisplay = hideTitles ? "none" : "block";

  const handleChange =
    (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <div className={classNames(styles["contact-accordion-container"])}>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Grid2 container columns={{ xs: 12 }} flexGrow={1} spacing={1}>
            <Grid2 flexDirection="column" size={{ xs: 3 }}>
              <Typography variant="h6" display={titlesDisplay}>
                Contact Name
              </Typography>
              <Typography>{contact.display_name}</Typography>
            </Grid2>

            <Grid2 flexDirection="column" size={{ xs: 3 }}>
              <Typography variant="h6" display={titlesDisplay}>
                Contact Type
              </Typography>
              <Typography>{contact.record_type_name}</Typography>
            </Grid2>

            <Grid2 flexDirection="column" size={{ xs: 3 }}>
              <Typography variant="h6" display={titlesDisplay}>
                Sales Rep
              </Typography>
              <Typography>{contact.sales_rep_name}</Typography>
            </Grid2>

            <Grid2 flexDirection="column" size={{ xs: 3 }}>
              <Typography variant="h6" display={titlesDisplay}>
                Last Status Change
              </Typography>
              <Typography>
                {dateDiffFromToday(contact.date_status_change)} Days
              </Typography>
            </Grid2>
          </Grid2>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <Grid2
              container
              columns={{ xs: 12 }}
              flexGrow={1}
              spacing={1}
              padding={"0 24px 0 0"}
            >
              <Grid2 flexDirection="column" size={{ xs: 3 }}>
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

              <Grid2 flexDirection="column" size={{ xs: 3 }}>
                <Typography variant="h6" display={titlesDisplay}>
                  Home Phone
                </Typography>
                <Link href={`tel:${contact.home_phone}`}>
                  <Typography>{contact.home_phone}</Typography>
                </Link>
              </Grid2>

              <Grid2 flexDirection="column" size={{ xs: 3 }} wrap="wrap">
                <Typography variant="h6" display={titlesDisplay}>
                  Email
                </Typography>
                <Link href={`mailto:${contact.email}`}>
                  <Typography>{contact.email}</Typography>
                </Link>
              </Grid2>
              <Grid2 flexDirection="column" size={{ xs: 3 }} wrap="wrap">
                <Typography variant="h6" display={titlesDisplay}>
                  JobNimbus Link
                </Typography>
                <Link
                  href={`https://app.jobnimbus.com/contact/${contact.jnid}`}
                >
                  <Grid2 container>
                    <Grid2
                      size={{ xs: 6, sm: 5, lg: 4 }}
                      className={classNames(styles["job-nimbus-link-text"])}
                    >
                      <Typography>JobNimbus</Typography>
                    </Grid2>
                    <Grid2 size={{ xs: 1 }} margin="-3px 0 0">
                      <OpenInNewIcon />
                    </Grid2>
                  </Grid2>
                </Link>
              </Grid2>
            </Grid2>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
