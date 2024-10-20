import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Grid2 } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import * as React from "react";
import { Contact } from "../../types/contacts";
import { dateDiffFromToday, formatAddress } from "../../utils/common";

type ContactAccordion = {
  contact: Contact;
};

export default function ContactAccordion(props: ContactAccordion) {
  const { contact } = props;
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <div>
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
              <Typography variant="h6">Contact Name</Typography>
              <Typography>{contact.display_name}</Typography>
            </Grid2>

            <Grid2 flexDirection="column" size={{ xs: 3 }}>
              <Typography variant="h6">Contact Type</Typography>
              <Typography>{contact.record_type_name}</Typography>
            </Grid2>

            <Grid2 flexDirection="column" size={{ xs: 3 }}>
              <Typography variant="h6">Sales Rep</Typography>
              <Typography>{contact.sales_rep_name}</Typography>
            </Grid2>

            <Grid2 flexDirection="column" size={{ xs: 3 }}>
              <Typography variant="h6">Last Status Change</Typography>
              <Typography>
                {dateDiffFromToday(contact.date_status_change)} Days
              </Typography>
            </Grid2>
          </Grid2>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <Grid2 container columns={{ xs: 12 }} flexGrow={1} spacing={1}>
              <Grid2 flexDirection="column" size={{ xs: 4, md: 3 }}>
                <Typography variant="h6">Home Address</Typography>
                <Link
                  target="_blank"
                  href={`https://www.google.com/maps/place/${formatAddress(
                    contact,
                  )}`}
                >
                  <Typography>{formatAddress(contact)}</Typography>
                </Link>
              </Grid2>

              <Grid2 flexDirection="column" size={{ xs: 4, md: 3 }}>
                <Typography variant="h6">Home Phone</Typography>
                <Link href={`tel:${contact.home_phone}`}>
                  <Typography>{contact.home_phone}</Typography>
                </Link>
              </Grid2>

              <Grid2 flexDirection="column" size={{ xs: 4, md: 3 }} wrap="wrap">
                <Typography variant="h6">Email</Typography>
                <Link href={`mailto:${contact.email}`}>
                  <Typography>{contact.email}</Typography>
                </Link>
              </Grid2>
            </Grid2>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
