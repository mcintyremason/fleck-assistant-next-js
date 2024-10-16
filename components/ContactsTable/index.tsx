import classNames from "classnames";
import styles from "./index.module.css";

import { Breakpoint, Grid2, GridSize } from "@mui/material";

import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import * as React from "react";
import { useFleckAssistantApi } from "../../hooks/useFleckAssistantApi";
import { dateDiffFromToday } from "../../utils/common";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function formatAddress(contact: any) {
  return `${contact.address_line1}
  ${contact.city}, ${contact.state_text} ${contact.zip}`;
}

type ContactsTableProps = {} & React.HTMLAttributes<HTMLDivElement> &
  Partial<Record<Breakpoint, boolean | GridSize>>;

const ContactsTable: React.FC<ContactsTableProps> = (_) => {
  const { getContactsApi } = useFleckAssistantApi();
  const [contacts, setContacts] = React.useState<Array<any>>([]);

  const fetchContacts = React.useCallback(async () => {
    const contactsResponse = await getContactsApi();
    console.log(contactsResponse);
    setContacts(contactsResponse.results);
  }, [getContactsApi]);

  React.useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <Grid2 className={classNames(styles["contacts-table-container"])}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name)</StyledTableCell>
              <StyledTableCell align="right">Email</StyledTableCell>
              <StyledTableCell align="right">Phone</StyledTableCell>
              <StyledTableCell align="right">Address</StyledTableCell>
              <StyledTableCell align="right">Status</StyledTableCell>
              <StyledTableCell align="right">
                Last Status Change
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contacts.slice(0, 10).map((contact) => (
              <StyledTableRow key={contact.jnid}>
                <StyledTableCell component="th" scope="row">
                  {contact.display_name}
                </StyledTableCell>
                <StyledTableCell align="right">{`${contact.email}`}</StyledTableCell>
                <StyledTableCell align="right">
                  {contact.home_phone}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {formatAddress(contact)}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {contact.status_name}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {`${dateDiffFromToday(contact.date_status_change)} Days`}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid2>
  );
};

export default ContactsTable;
