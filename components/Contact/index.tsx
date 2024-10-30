import styles from "./index.module.css";

import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import {
  Box,
  FormControl,
  Grid2,
  LinearProgress,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Skeleton,
  Typography,
} from "@mui/material";

import classNames from "classnames";
import Link from "next/link";
import React from "react";
import { useFleckAssistantApi } from "../../hooks/useFleckAssistantApi";
import {
  ContactType,
  ContactTypeNames,
  IssueStatusNames,
  OtherStatusNames,
  RepeatCustomerStatusNames,
} from "../../types/contacts";
import { dateDiffFromToday, formatAddress } from "../../utils/common";

type ContactProps = {
  id: string;
};

const Contact: React.FC<ContactProps> = (props: ContactProps) => {
  const { id } = props;
  const { getContactByIdApi, updateContactApi, isLoading, errorMessage } =
    useFleckAssistantApi();

  const [contact, setContact] = React.useState<ContactType>(null);
  const [contactType, setContactType] = React.useState<string>(null);
  const [statusTypes, setStatusTypes] = React.useState<Array<string>>([]);
  const [statusType, setStatusType] = React.useState<string>(null);

  const fetchContact = React.useCallback(async () => {
    if (id) {
      const contactResponse = await getContactByIdApi(id);
      setContact(contactResponse);
      setContactType(contactResponse.record_type_name);
      setStatusType(contactResponse.status_name);
    }
  }, [getContactByIdApi]);

  const updateContact = React.useCallback(
    async (_contactType: string, _statusType: string) => {
      if (id) {
        const updatedFields = {
          record_type_name: _contactType,
          status_name: _statusType,
        };

        const updatedContact = await updateContactApi(id, updatedFields);
        setContact(updatedContact);
      }
    },
    [getContactByIdApi],
  );

  React.useEffect(() => {
    fetchContact();
  }, [id]);

  React.useEffect(() => {
    switch (contactType) {
      case ContactTypeNames.REPEAT_CUSTOMER:
        setStatusTypes(Object.values(RepeatCustomerStatusNames));
        break;
      case ContactTypeNames.ISSUE:
        setStatusTypes(Object.values(IssueStatusNames));
        break;
      default:
        setStatusTypes(Object.values(OtherStatusNames));
        break;
    }
  }, [contact]);

  React.useEffect(() => {
    if (contactType && contactType != contact.record_type_name) {
      let newStatusType = statusType;
      switch (contactType) {
        case ContactTypeNames.REPEAT_CUSTOMER:
          setStatusTypes(Object.values(RepeatCustomerStatusNames));
          newStatusType = Object.values(RepeatCustomerStatusNames)[0];
          setStatusType(newStatusType);

          break;
        case ContactTypeNames.ISSUE:
          setStatusTypes(Object.values(IssueStatusNames));
          newStatusType = Object.values(IssueStatusNames)[0];
          setStatusType(newStatusType);

          break;
        default:
          setStatusTypes(Object.values(OtherStatusNames));
          newStatusType = Object.values(OtherStatusNames)[0];

          setStatusType(newStatusType);

          break;
      }
      if (contactType && contactType != contact.record_type_name) {
        updateContact(contactType, newStatusType);
      }
    }
  }, [contactType]);

  React.useEffect(() => {
    if (statusType && statusType != contact.status_name) {
      updateContact(contactType, statusType);
    }
  }, [statusType]);

  const handleContactTypeChange = (event: SelectChangeEvent<string>) => {
    setContactType(event.target.value as string);
  };

  const handleStatusChange = (event: SelectChangeEvent<string>) => {
    setStatusType(event.target.value as string);
  };

  return errorMessage ? (
    <Grid2 container justifyContent="center">
      <Box padding="20px">
        <Typography variant="h4">{errorMessage}</Typography>
      </Box>
    </Grid2>
  ) : contact === null || isLoading ? (
    <Grid2 container justifyContent="center">
      <Box sx={{ width: "100%" }}>
        <LinearProgress />
      </Box>
      <Skeleton animation="wave" width="95%" height={80} />
    </Grid2>
  ) : (
    <Grid2
      container
      justifyContent="center"
      className={classNames(styles["contact-container"])}
    >
      <Grid2 container size={{ xs: 11 }}>
        <Grid2 container>
          <Typography variant="h2">{contact.display_name}</Typography>
        </Grid2>
        <Grid2 container size={{ xs: 12 }}>
          <Paper
            elevation={0}
            square={false}
            variant="outlined"
            className={classNames(styles["contact-details-container"])}
          >
            <Grid2
              container
              columns={{ xs: 12 }}
              flexGrow={1}
              spacing={1}
              className={classNames(styles["contact-details-row"])}
            >
              <Grid2 container columns={{ xs: 12 }} flexGrow={1} spacing={1}>
                <Grid2 flexDirection="column" size={{ xs: 4, md: 5 }}>
                  <Typography
                    variant="h5"
                    className={classNames(styles["contact-details-title"])}
                  >
                    Home Address
                  </Typography>
                  <Link
                    target="_blank"
                    href={`https://www.google.com/maps/place/${formatAddress(
                      contact,
                    )}`}
                  >
                    <Typography>{formatAddress(contact)}</Typography>
                  </Link>
                </Grid2>

                <Grid2 flexDirection="column" size={{ xs: 4, md: 3 }}>
                  <Typography
                    variant="h5"
                    className={classNames(styles["contact-details-title"])}
                  >
                    Home Phone
                  </Typography>
                  <Link href={`tel:${contact.home_phone}`}>
                    <Typography>{contact.home_phone}</Typography>
                  </Link>
                </Grid2>

                <Grid2 container wrap="wrap" size={{ xs: 4 }}>
                  <Grid2 flexDirection="column" size={{ xs: 12 }}>
                    <Typography
                      variant="h5"
                      className={classNames(styles["contact-details-title"])}
                    >
                      Email
                    </Typography>
                    <Link href={`mailto:${contact.email}`}>
                      <Typography>{contact.email}</Typography>
                    </Link>
                  </Grid2>
                </Grid2>
              </Grid2>
            </Grid2>
            <Grid2
              container
              columns={{ xs: 12 }}
              flexGrow={1}
              spacing={1}
              className={classNames(styles["contact-details-row"])}
            >
              <Grid2 flexDirection="column" size={{ xs: 6 }}>
                <Typography
                  variant="h5"
                  className={classNames(styles["contact-details-title"])}
                >
                  Contact Type
                </Typography>
                <Grid2 size={{ xs: 12, md: 10, lg: 6 }}>
                  <FormControl fullWidth>
                    <Select
                      id="contact-type-select"
                      className={classNames(styles["contact-type-select"])}
                      value={contactType}
                      onChange={handleContactTypeChange}
                      tabIndex={0}
                      MenuProps={{ disablePortal: true }}
                      inputProps={{ style: { padding: "5px" } }}
                    >
                      {Object.values(ContactTypeNames).map((contactType) => {
                        return (
                          <MenuItem key={contactType} value={contactType}>
                            {contactType}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Grid2>
              </Grid2>

              <Grid2 flexDirection="column" size={{ xs: 6 }}>
                <Typography
                  variant="h5"
                  className={classNames(styles["contact-details-title"])}
                >
                  Status
                </Typography>
                <Grid2 size={{ xs: 12, md: 10, lg: 6 }}>
                  <FormControl fullWidth>
                    <Select
                      id="contact-type-select"
                      className={classNames(styles["contact-type-select"])}
                      value={statusType}
                      onChange={handleStatusChange}
                      tabIndex={0}
                      MenuProps={{ disablePortal: true }}
                      inputProps={{ style: { padding: "5px" } }}
                    >
                      {statusTypes.map((statusType) => {
                        return (
                          <MenuItem key={statusType} value={statusType}>
                            {statusType}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Grid2>
              </Grid2>
            </Grid2>
            <Grid2
              container
              columns={{ xs: 12 }}
              flexGrow={1}
              spacing={1}
              className={classNames(styles["contact-details-row"])}
            >
              <Grid2 container wrap="wrap" size={{ xs: 12 }}>
                <Grid2 flexDirection="column" size={{ xs: 6 }}>
                  <Typography
                    variant="h5"
                    className={classNames(styles["contact-details-title"])}
                  >
                    Sales Rep
                  </Typography>
                  <Typography>{contact.sales_rep_name}</Typography>
                </Grid2>
                <Grid2 flexDirection="column" size={{ xs: 4 }}>
                  <Typography
                    variant="h5"
                    className={classNames(styles["contact-details-title"])}
                  >
                    Last Status Change
                  </Typography>
                  <Typography>
                    {dateDiffFromToday(contact.date_status_change)} Days
                  </Typography>
                </Grid2>
                <Grid2
                  container
                  wrap="wrap"
                  size={{ xs: 12 }}
                  justifyContent="flex-end"
                >
                  <Grid2 container>
                    <Grid2
                      container
                      flexDirection="column"
                      justifyContent="center"
                      alignContent="center"
                    >
                      <Link
                        target="_blank"
                        href={`https://app.jobnimbus.com/contact/${contact.jnid}`}
                        className={classNames(
                          styles["contact-details-jn-link"],
                        )}
                      >
                        <Grid2 container spacing={1} alignItems="center">
                          <Typography width="fit-content">JobNimbus</Typography>
                          <OpenInNewIcon />
                        </Grid2>
                      </Link>
                    </Grid2>
                  </Grid2>
                </Grid2>
              </Grid2>
            </Grid2>
          </Paper>
        </Grid2>
      </Grid2>
    </Grid2>
  );
};

export default Contact;
