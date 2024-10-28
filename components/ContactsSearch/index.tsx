import SearchIcon from "@mui/icons-material/Search";
import { Grid2, InputBase, Paper } from "@mui/material";
import React from "react";
import { useFleckAssistantApi } from "../../hooks/useFleckAssistantApi";
import { ContactType } from "../../types/contacts";
import { sortContactsByDate } from "../../utils/contacts";
import ContactsTable from "../ContactsTable";

type ContactsSearchProps = {};

const ContactsSearch: React.FC<ContactsSearchProps> = (_) => {
  const [searchValue, setSearchValue] = React.useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const { getContactsApi } = useFleckAssistantApi();
  const [contacts, setContacts] = React.useState<Array<ContactType>>([]);

  const fetchContacts = React.useCallback(
    async (value: string) => {
      const hasDigitRegex = /\d+/g;
      const hasDigit = value.match(hasDigitRegex);

      const firstNameFilter = {
        must: [
          {
            regexp: {
              first_name: `.*${value}.*`,
            },
          },
        ],
      };

      const lastNameFilter = {
        must: [
          {
            regexp: {
              first_name: `.*${value}.*`,
            },
          },
        ],
      };

      const displayNameFilter = {
        must: [
          {
            regexp: {
              display_name: `.*${value}.*`,
            },
          },
        ],
      };

      const phoneNumberFilter = {
        must: [
          {
            regexp: {
              home_phone: `.*${value}.*`,
            },
          },
        ],
      };

      const addressFilter = {
        must: [
          {
            regexp: {
              address_line1: `.*${value}.*`,
            },
          },
        ],
      };

      const cityFilter = {
        must: [
          {
            regexp: {
              city: `.*${value}.*`,
            },
          },
        ],
      };

      let allContacts = [];
      if (hasDigit) {
        const phoneNumberResponse = await getContactsApi(phoneNumberFilter);
        const addressResponse = await getContactsApi(addressFilter);
        allContacts = [...phoneNumberResponse, ...addressResponse];
      } else {
        const firstNameResponse = await getContactsApi(firstNameFilter);
        const lastNameResponse = await getContactsApi(lastNameFilter);
        const displayNameResponse = await getContactsApi(displayNameFilter);
        const addressResponse = await getContactsApi(addressFilter);
        const cityResponse = await getContactsApi(cityFilter);
        allContacts = [
          ...firstNameResponse,
          ...lastNameResponse,
          ...displayNameResponse,
          ...addressResponse,
          ...cityResponse,
        ];
      }

      // const uniqueContacts = Array.from(new Set(allContacts));
      const uniqueContacts = [];
      allContacts.forEach((contact) => {
        if (!uniqueContacts.find((c) => c.jnid === contact.jnid)) {
          uniqueContacts.push(contact);
        }
      });

      setContacts(sortContactsByDate(uniqueContacts));
    },
    [getContactsApi],
  );

  return (
    <Grid2 container size={{ xs: 12 }}>
      <Grid2 container justifyContent="center" size={{ xs: 11 }}>
        <Paper
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: "95%",
          }}
        >
          <SearchIcon />
          <InputBase
            placeholder="Search Contacts"
            inputProps={{ "aria-label": "search contacts" }}
            value={searchValue}
            onChange={handleChange}
            onKeyUp={(event) => {
              if (event.key == "Enter") {
                fetchContacts(searchValue);
              }
            }}
          />
        </Paper>
      </Grid2>

      <ContactsTable contacts={contacts} />
    </Grid2>
  );
};

export default ContactsSearch;
