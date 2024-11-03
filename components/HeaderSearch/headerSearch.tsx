import SearchIcon from "@mui/icons-material/Search";
import {
  Card,
  Grid2,
  InputBase,
  Link,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { alpha, styled, useTheme } from "@mui/material/styles";
import React, { useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useFleckAssistantApi } from "../../hooks/useFleckAssistantApi";
import { ContactType } from "../../types/contacts";
import { formatAddress } from "../../utils/common";
import { sortContactsByDate } from "../../utils/contacts";

type HeaderSearch = {};

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  },
}));

export function HeaderSearch(_: HeaderSearch) {
  const [searchValue, setSearchValue] = React.useState("");
  const theme = useTheme();
  const isExtraSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const debouncedSearch = useDebouncedCallback(
    // function
    async () => {
      if (searchValue.length >= 3) {
        await fetchContacts(searchValue);
      }
    },
    // delay in ms
    500,
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  useEffect(() => {
    debouncedSearch();
  }, [searchValue]);

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
        const phoneNumberResponse = await getContactsApi(
          phoneNumberFilter,
          10,
          false,
        );
        const addressResponse = await getContactsApi(addressFilter, 10, false);
        allContacts = [...phoneNumberResponse, ...addressResponse];
      } else {
        const firstNameResponse = await getContactsApi(
          firstNameFilter,
          10,
          false,
        );
        const lastNameResponse = await getContactsApi(
          lastNameFilter,
          10,
          false,
        );
        const displayNameResponse = await getContactsApi(
          displayNameFilter,
          10,
          false,
        );
        const addressResponse = await getContactsApi(addressFilter, 10, false);
        const cityResponse = await getContactsApi(cityFilter, 10, false);
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
    <Grid2>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search Contacts..."
          inputProps={{ "aria-label": "search" }}
          value={searchValue}
          onChange={handleChange}
          onBlur={() => searchValue.trim() && fetchContacts(searchValue)}
          onKeyUp={(event) => {
            if (event.key == "Enter") {
              event.preventDefault();
              event.currentTarget.blur();
            }
          }}
        />
      </Search>

      <Grid2
        container
        size={{ xs: 6 }}
        flexDirection="column"
        padding="5px 10px"
        position="absolute"
        zIndex={1000}
      >
        {searchValue.trim()
          ? contacts.map((contact) => {
              return (
                <Grid2
                  container
                  size={{ xs: 12 }}
                  width="100%"
                  justifyContent="center"
                >
                  <Card
                    style={{ width: "100%", padding: "8px", borderRadius: 0 }}
                  >
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
                        <Grid2 flexDirection="column" size={{ xs: 12, sm: 4 }}>
                          <Typography variant="h6">Contact Name</Typography>
                          <Typography>{contact.display_name}</Typography>
                        </Grid2>
                        {!isExtraSmallScreen && (
                          <Grid2 flexDirection="column" size={{ sm: 3 }}>
                            <Typography variant="h6">Phone Number</Typography>
                            <Typography>{contact.home_phone}</Typography>
                          </Grid2>
                        )}
                        {!isExtraSmallScreen && (
                          <Grid2 flexDirection="column" size={{ sm: 5 }}>
                            <Typography variant="h6">Address</Typography>
                            <Typography>{formatAddress(contact)}</Typography>
                          </Grid2>
                        )}
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
