import { Box, useMediaQuery, useTheme } from "@mui/material";
import { Contact } from "../../../types/contacts";
import ContactAccordion from "../../ContactAccordion";

type TabPanelProps = {
  index: number;
  value: number;
  contacts: Array<Contact>;
};

export function ContactsTabPanel(props: TabPanelProps) {
  const { value, index, contacts } = props;
  const theme = useTheme();
  const isExtraSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

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
            <Box key={`contact-accordion-${index}`}>
              <ContactAccordion
                contact={contact}
                hideTitles={isExtraSmallScreen}
              />
            </Box>
          ),
      )}
    </div>
  );
}
