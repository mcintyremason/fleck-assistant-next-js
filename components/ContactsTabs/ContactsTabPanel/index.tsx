import { Box } from "@mui/material";
import { Contact } from "../../../types/contacts";
import ContactAccordion from "../../ContactAccordion";

type TabPanelProps = {
  index: number;
  value: number;
  contacts: Array<Contact>;
};

export function ContactsTabPanel(props: TabPanelProps) {
  const { value, index, contacts } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
    >
      {contacts.map(
        (contact) =>
          value === index && (
            <Box sx={{ p: 3 }}>
              <ContactAccordion contact={contact} hideTitles={true} />
            </Box>
          ),
      )}
    </div>
  );
}
