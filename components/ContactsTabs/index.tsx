import { Box, Grid2, LinearProgress, Skeleton, Tab, Tabs } from "@mui/material";
import React from "react";
import { useFleckAssistantApi } from "../../hooks/useFleckAssistantApi";
import { Contact, StatusNames } from "../../types/contacts";
import { ContactsTabPanel } from "./ContactsTabPanel";

type ContactsTabs = {};

export const ContactsTabs: React.FC<ContactsTabs> = (_) => {
  const { getContactsApi, isLoading } = useFleckAssistantApi();
  const [contacts, setContacts] = React.useState<Array<Contact>>([]);
  const [value, setValue] = React.useState(0);

  const fetchContacts = React.useCallback(async () => {
    const contactsResponse = await getContactsApi();
    console.log(contactsResponse);
    setContacts(contactsResponse);
  }, [getContactsApi]);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <Box>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
      >
        {Object.values(StatusNames).map((status) => (
          <Tab label={status} id={status} />
        ))}
      </Tabs>
      {isLoading ? (
        <Grid2 container justifyContent="center">
          <Box sx={{ width: "100%" }}>
            <LinearProgress />
          </Box>
          <Skeleton animation="wave" width="95%" height={80} />
        </Grid2>
      ) : (
        Object.values(StatusNames).map((status, index) => {
          const contactsByStatus = contacts
            .filter((contact) => contact.status_name === status)
            .sort((a, b) => b.date_status_change - a.date_status_change);

          return (
            <ContactsTabPanel
              value={value}
              index={index}
              contacts={contactsByStatus}
            />
          );
        })
      )}
    </Box>
  );
};
