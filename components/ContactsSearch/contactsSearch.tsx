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

type ContactsSearchProps = {};

export const ContactsSearch: React.FC<ContactsSearchProps> = (_) => {
  const [searchValue, setSearchValue] = React.useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const { searchContacts, isLoading } = useFleckAssistantApi();
  const [contacts, setContacts] = React.useState<Array<ContactType>>([]);

  const fetchContacts = React.useCallback(
    async (value: string) => {
      const sortedUniqueContacts = await searchContacts(value);

      setContacts(sortedUniqueContacts);
    },
    [searchContacts],
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
      <Grid2 container size={{ xs: 12 }}>
        {isLoading ? (
          <Grid2 container justifyContent="center" width="100%">
            <Box sx={{ width: "100%" }}>
              <LinearProgress />
            </Box>
            <Skeleton animation="wave" width="95%" height={80} />
          </Grid2>
        ) : (
          <Grid2
            container
            size={{ xs: 12 }}
            flexDirection="column"
            spacing={1}
            padding="5px 10px"
          >
            {contacts.map((contact) => {
              return (
                <Grid2
                  key={`search-result-${contact.jnid}`}
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
