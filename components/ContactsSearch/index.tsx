import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Card,
  Grid2,
  InputBase,
  LinearProgress,
  Link,
  Paper,
  Skeleton,
  Typography,
} from "@mui/material";
import React from "react";
import { useFleckAssistantApi } from "../../hooks/useFleckAssistantApi";
import { ContactType } from "../../types/contacts";
import { formatAddress } from "../../utils/common";
import { sortContactsByDate } from "../../utils/contacts";

type ContactsSearchProps = {};

const ContactsSearch: React.FC<ContactsSearchProps> = (_) => {
  const [searchValue, setSearchValue] = React.useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const { getContactsApi, isLoading } = useFleckAssistantApi();
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
    <Grid2
      container
      justifyContent="center"
      size={{ xs: 12 }}
      padding="10px 0 0 "
    >
      <Grid2 container size={{ xs: 11 }}>
        <Paper
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: "100%",
          }}
        >
          <SearchIcon />
          <InputBase
            fullWidth={true}
            placeholder="Search Contacts"
            inputProps={{ "aria-label": "search contacts" }}
            value={searchValue}
            onChange={handleChange}
            onBlur={() => fetchContacts(searchValue)}
            onKeyUp={(event) => {
              if (event.key == "Enter") {
                event.preventDefault();
                event.currentTarget.blur();
              }
            }}
          />
        </Paper>
      </Grid2>

      <Grid2 container size={{ xs: 12 }} padding="5px 10px">
        {isLoading ? (
          <Grid2 container justifyContent="center" width="100%">
            <Box sx={{ width: "100%" }}>
              <LinearProgress />
            </Box>
            <Skeleton animation="wave" width="95%" height={80} />
          </Grid2>
        ) : (
          <Grid2 container size={{ xs: 12 }} flexDirection="column" spacing={1}>
            {contacts.map((contact) => {
              return (
                <Grid2
                  container
                  size={{ xs: 12 }}
                  width="100%"
                  justifyContent="center"
                >
                  <Card style={{ width: "100%", padding: "8px" }}>
                    <Link
                      href={`/contacts/${contact.jnid}`}
                      color="#000000"
                      style={{ textDecoration: "none" }}
                    >
                      <Grid2
                        container
                        columns={{ xs: 12 }}
                        flexGrow={1}
                        spacing={1}
                      >
                        <Grid2 flexDirection="column" size={{ xs: 4 }}>
                          <Typography variant="h6">Contact Name</Typography>
                          <Typography>{contact.display_name}</Typography>
                        </Grid2>

                        <Grid2 flexDirection="column" size={{ xs: 3 }}>
                          <Typography variant="h6">Phone Number</Typography>
                          <Typography>{contact.home_phone}</Typography>
                        </Grid2>

                        <Grid2 flexDirection="column" size={{ xs: 5 }}>
                          <Typography variant="h6">Address</Typography>
                          <Typography>{formatAddress(contact)}</Typography>
                        </Grid2>
                      </Grid2>
                    </Link>
                  </Card>
                </Grid2>
              );
            })}
          </Grid2>
        )}
      </Grid2>
    </Grid2>
  );
};

export default ContactsSearch;
