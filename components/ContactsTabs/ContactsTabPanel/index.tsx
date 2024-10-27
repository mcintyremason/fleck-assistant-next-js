import styles from "./index.module.css";

import { TabPanel } from "@mui/lab";
import { Box, Grid2, LinearProgress, Skeleton } from "@mui/material";
import classNames from "classnames";
import React from "react";
import { useFleckAssistantApi } from "../../../hooks/useFleckAssistantApi";
import { Contact } from "../../../types/contacts";
import ContactAccordion from "../../ContactAccordion";

type TabPanelProps = {
  index: string;
  value: string;
  status: string;
  isActive: boolean;
};

export function ContactsTabPanel(props: TabPanelProps) {
  const { value, index, isActive, status } = props;
  const { getContactsApi, isLoading } = useFleckAssistantApi();
  const [contacts, setContacts] = React.useState<Array<Contact>>([]);

  const fetchContacts = React.useCallback(async () => {
    const contactsFilter = {
      must: [
        {
          term: {
            status_name: status,
          },
        },
      ],
    };

    const contactsResponse = await getContactsApi(contactsFilter);
    setContacts(contactsResponse);
  }, [getContactsApi]);

  React.useEffect(() => {
    if (isActive) {
      fetchContacts();
    }
  }, [isActive]);

  return isLoading && isActive ? (
    <Grid2 container justifyContent="center">
      <Box sx={{ width: "100%" }}>
        <LinearProgress />
      </Box>
      <Skeleton animation="wave" width="95%" height={80} />
    </Grid2>
  ) : (
    <Box className={classNames(styles["contacts-tab-panel-wrapper"])}>
      <TabPanel
        value={index}
        key={`tab-panel-${index}`}
        hidden={value !== index}
        className={classNames(styles["contacts-tab-panel"])}
      >
        {contacts.map(
          (contact) =>
            value === index && (
              <Box key={`contact-accordion-wrapper-${contact.jnid}`}>
                <ContactAccordion
                  key={`contact-accordion-${contact.jnid}`}
                  contact={contact}
                  hideTitles={true}
                />
              </Box>
            ),
        )}
      </TabPanel>
    </Box>
  );
}
