import { NextRouter } from "next/router";
import { ListMenuLink } from "../types/ListMenu";

export function logJson(
  data: any,
  message: string,
  optionsArg?: { depth: number | null; colors: boolean },
) {
  const optionsDefault = {
    depth: null,
    colors: true,
  };

  const options = {
    ...optionsDefault,
    ...optionsArg,
  };

  if (message) {
    console.log(message);
  }
  console.dir(data, options);
}

export function dateDiffInDays(a, b) {
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

export function dateDiffFromToday(epochTime: number) {
  var a = new Date(0); // The 0 there is the key, which sets the date to the epoch
  a.setUTCSeconds(epochTime);
  const b = new Date(Date.now());
  return dateDiffInDays(a, b);
}

export function formatAddress(contact: any) {
  return `${contact.address_line1}
  ${contact.city}, ${contact.state_text} ${contact.zip}`;
}

export function getInitials(name: string) {
  if (name) {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("");
  } else {
    return name;
  }
}

export const subLinksActive = (
  link: ListMenuLink,
  router: NextRouter,
): boolean => {
  const activeLink = link?.subLinks.find(
    (subLink) => subLink.href === router.pathname,
  );

  return activeLink ? true : false;
};
