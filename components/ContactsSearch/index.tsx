import SearchIcon from "@mui/icons-material/Search";
import { Grid2, InputBase, Paper } from "@mui/material";
import React from "react";
import { useFleckAssistantApi } from "../../hooks/useFleckAssistantApi";
import { ContactType } from "../../types/contacts";
import ContactsTable from "../ContactsTable";

type ContactsSearchProps = {};

const ContactsSearch: React.FC<ContactsSearchProps> = (_) => {
  const [searchValue, setSearchValue] = React.useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const { getContactsApi, isLoading } = useFleckAssistantApi();
  const [contacts, setContacts] = React.useState<Array<ContactType>>([]);

  const fetchContacts = React.useCallback(
    async (name: string) => {
      console.log("fetchContacts");
      const contactsFilter = {
        must: [
          {
            term: {
              first_name: name,
            },
          },
        ],
      };
      const contactsResponse = await getContactsApi(contactsFilter);
      setContacts(contactsResponse);
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
