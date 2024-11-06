import styles from "./headerSearch.module.css";

import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Card, Grid2, InputBase, Link, Typography } from "@mui/material";
import classNames from "classnames";
import React, { useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useFleckAssistantApi } from "../../hooks/useFleckAssistantApi";
import { ContactType } from "../../types/contacts";
import { formatAddress } from "../../utils/common";

type HeaderSearch = {};

export function HeaderSearch(_: HeaderSearch) {
  const [searchValue, setSearchValue] = React.useState("");
  const [contacts, setContacts] = React.useState<Array<ContactType>>([]);

  const { searchContacts } = useFleckAssistantApi();

  const debouncedSearch = useDebouncedCallback(
    async () => {
      if (searchValue.length >= 3) {
        await fetchContacts(searchValue);
      }
    },
    // delay in ms
    250,
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  useEffect(() => {
    debouncedSearch();
  }, [searchValue]);

  const fetchContacts = React.useCallback(
    async (value: string) => {
      const sortedUniqueContacts = await searchContacts(value);

      setContacts(sortedUniqueContacts);
    },
    [searchContacts],
  );

  return (
    <Grid2
      size={{ xs: 12 }}
      className={classNames(styles["header-search-container"])}
    >
      <Grid2 container className={classNames(styles["search-container"])}>
        <Box className={classNames(styles["search-icon-container"])}>
          <SearchIcon />
        </Box>
        <InputBase
          placeholder="Search Contacts..."
          inputProps={{ "aria-label": "search contacts" }}
          value={searchValue}
          onChange={handleChange}
          onBlur={() => searchValue.trim() && fetchContacts(searchValue)}
          onKeyUp={(event) => {
            if (event.key == "Enter") {
              event.preventDefault();
              event.currentTarget.blur();
            }
          }}
          className={classNames(styles["search-input"])}
        />
        <Box
          onClick={(_) => {
            setSearchValue("");
            setContacts([]);
          }}
          className={classNames(styles["clear-search-icon-container"])}
        >
          <ClearIcon />
        </Box>
      </Grid2>

      <Grid2
        container
        size={{ xs: 11 }}
        flexDirection="column"
        className={classNames(styles["search-results-container"])}
      >
        {searchValue.trim()
          ? contacts.map((contact) => {
              return (
                <Grid2
                  container
                  size={{ xs: 12 }}
                  justifyContent="center"
                  key={`search-result-${contact.jnid}`}
                >
                  <Card className={classNames(styles["search-result-card"])}>
                    <Link
                      href={`/contacts/${contact.jnid}`}
                      className={classNames(styles["search-result-link"])}
                    >
                      <Grid2 container columns={{ xs: 12 }} flexGrow={1}>
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
            })
          : []}
      </Grid2>
    </Grid2>
  );
}
