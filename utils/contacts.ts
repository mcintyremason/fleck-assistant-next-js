import { ContactType } from "../types/contacts";

export const sortContacts = (
  contacts: Array<ContactType>,
  field: string,
): Array<ContactType> => contacts.sort((a, b) => b[field] - a[field]);

export const sortContactsByDate = (
  contacts: Array<ContactType>,
): Array<ContactType> => sortContacts(contacts, "date_status_change");
