import styles from "./index.module.css";

import { TabPanel } from "@mui/lab";
import { Box } from "@mui/material";
import classNames from "classnames";
import { Contact } from "../../../types/contacts";
import ContactAccordion from "../../ContactAccordion";

type TabPanelProps = {
  index: string;
  value: string;
  contacts: Array<Contact>;
};

export function ContactsTabPanel(props: TabPanelProps) {
  const { value, index, contacts } = props;

  return (
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
