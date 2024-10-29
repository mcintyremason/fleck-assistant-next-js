import styles from "./index.module.css";

import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import {
  Box,
  Grid2,
  LinearProgress,
  Paper,
  Skeleton,
  Typography,
} from "@mui/material";

import classNames from "classnames";
import Link from "next/link";
import React from "react";
import { useFleckAssistantApi } from "../../hooks/useFleckAssistantApi";
import { ContactType } from "../../types/contacts";
import { dateDiffFromToday, formatAddress } from "../../utils/common";

type ContactProps = {
  id: string;
};

const Contact: React.FC<ContactProps> = (props: ContactProps) => {
  const { id } = props;
  const { getContactByIdApi, isLoading, errorMessage } = useFleckAssistantApi();

  const [contact, setContact] = React.useState<ContactType>(null);

  const fetchContact = React.useCallback(async () => {
    if (id) {
      const contactResponse = await getContactByIdApi(id);
      setContact(contactResponse);
    }
  }, [getContactByIdApi]);

  React.useEffect(() => {
    fetchContact();
  }, [id]);

  console.log(errorMessage);

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
              <Grid2 flexDirection="column" size={{ xs: 4, md: 5 }}>
                <Typography
                  variant="h5"
                  className={classNames(styles["contact-details-title"])}
                >
                  Contact Type
                </Typography>
                <Typography>{contact.record_type_name}</Typography>
              </Grid2>

              <Grid2 flexDirection="column" size={{ xs: 4, md: 3 }}>
                <Typography
                  variant="h5"
                  className={classNames(styles["contact-details-title"])}
                >
                  Status
                </Typography>
                <Typography>{contact.status_name}</Typography>
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
            </Grid2>
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
                <Grid2
                  container
                  wrap="wrap"
                  size={{ xs: 6 }}
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
