import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Contact } from "../../../types/contacts";
import { dateDiffFromToday } from "../../../utils/common";

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
              <Typography>{contact.display_name}</Typography>
              <Typography>{contact.record_type_name}</Typography>
              <Typography>{contact.sales_rep_name}</Typography>
              <Typography>{`${dateDiffFromToday(
                contact.date_status_change,
              )} Days`}</Typography>
            </Box>
          ),
      )}
    </div>
  );
}
