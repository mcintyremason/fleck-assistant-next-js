import { Contact } from "../types/contacts";

export const sortContacts = (
  contacts: Array<Contact>,
  field: string,
): Array<Contact> => contacts.sort((a, b) => b[field] - a[field]);

export const sortContactsByDate = (contacts: Array<Contact>): Array<Contact> =>
  sortContacts(contacts, "date_status_change");
