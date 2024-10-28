import {
  Box,
  Breakpoint,
  Grid2,
  GridSize,
  LinearProgress,
  Link,
  Skeleton,
} from "@mui/material";

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
import { ContactType } from "../../types/contacts";
import { dateDiffFromToday, formatAddress } from "../../utils/common";

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

type ContactsTableProps = {
  contacts: Array<ContactType>;
} & React.HTMLAttributes<HTMLDivElement> &
  Partial<Record<Breakpoint, boolean | GridSize>>;

const ContactsTable: React.FC<ContactsTableProps> = (props) => {
  const { isLoading } = useFleckAssistantApi();

  const { contacts } = props;

  return (
    <Grid2 container size={{ xs: 12 }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: "100%" }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="right">Email</StyledTableCell>
              <StyledTableCell align="right">Phone</StyledTableCell>
              <StyledTableCell align="right">Address</StyledTableCell>
              <StyledTableCell align="right">Status</StyledTableCell>
              <StyledTableCell align="right">
                Last Status Change
              </StyledTableCell>
            </TableRow>
          </TableHead>
          {isLoading ? (
            <Grid2 container justifyContent="center" width="100%">
              <Box sx={{ width: "100%" }}>
                <LinearProgress />
              </Box>
              <Skeleton animation="wave" width="95%" height={80} />
            </Grid2>
          ) : (
            <TableBody>
              {contacts.map((contact) => (
                <StyledTableRow key={contact.jnid}>
                  <Link
                    href={`/contacts/${contact.jnid}`}
                    style={{
                      display: "contents",
                      border: "none",
                      width: "100%",
                    }}
                  >
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
                  </Link>
                </StyledTableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </Grid2>
  );
};

export default ContactsTable;
