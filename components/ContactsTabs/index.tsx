import { TabContext, TabList } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import React from "react";
import { StatusNames } from "../../types/contacts";
import { ContactsTabPanel } from "./ContactsTabPanel";

type ContactsTabsProps = {};

const ContactsTabs: React.FC<ContactsTabsProps> = (_) => {
  const [value, setValue] = React.useState("0");

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue.toString());
    sessionStorage.setItem("contacts-tab", newValue.toString());
  };

  React.useEffect(() => {
    const contactsTab = sessionStorage.getItem("contacts-tab");
    if (contactsTab) {
      setValue(contactsTab);
    }
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
        {Object.values(StatusNames).map((status, index) => {
          return (
            <ContactsTabPanel
              key={`contacts-tab-panel-${status}`}
              value={value.toString()}
              index={index.toString()}
              status={status}
              isActive={value.toString() === index.toString()}
            />
          );
        })}
      </TabContext>
    </Box>
  );
};

export default ContactsTabs;
