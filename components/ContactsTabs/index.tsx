import { TabContext, TabList } from "@mui/lab";
import { Box, Grid2, LinearProgress, Skeleton, Tab } from "@mui/material";
import React from "react";
import { useFleckAssistantApi } from "../../hooks/useFleckAssistantApi";
import { Contact, StatusNames } from "../../types/contacts";
import { ContactsTabPanel } from "./ContactsTabPanel";

type ContactsTabsProps = {};

const ContactsTabs: React.FC<ContactsTabsProps> = (_) => {
  const { getContactsApi, isLoading } = useFleckAssistantApi();
  const [contacts, setContacts] = React.useState<Array<Contact>>([]);
  const [value, setValue] = React.useState("0");

  const fetchContacts = React.useCallback(async () => {
    const contactsResponse = await getContactsApi();
    setContacts(contactsResponse);
  }, [getContactsApi]);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue.toString());
  };

  const getContactsByStatus = (
    contacts: Array<Contact>,
    status: StatusNames,
  ) => {
    return contacts
      .filter((contact) => contact.status_name === status)
      .sort((a, b) => b.date_status_change - a.date_status_change);
  };

  React.useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <Box>
      <TabContext value={value.toString()}>
        <TabList
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          {Object.values(StatusNames).map((status, index) => (
            <Tab
              label={status}
              id={status}
              key={status}
              value={index.toString()}
            />
          ))}
        </TabList>
        {isLoading ? (
          <Grid2 container justifyContent="center">
            <Box sx={{ width: "100%" }}>
              <LinearProgress />
            </Box>
            <Skeleton animation="wave" width="95%" height={80} />
          </Grid2>
        ) : (
          Object.values(StatusNames).map((status, index) => {
            return (
              <ContactsTabPanel
                key={`contacts-tab-panel${status}`}
                value={value.toString()}
                index={index.toString()}
                contacts={getContactsByStatus(contacts, status)}
              />
            );
          })
        )}
      </TabContext>
    </Box>
  );
};

export default ContactsTabs;
