import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { DateTime } from "luxon";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatAuthors = (authors: string[]) => {
  if (authors.length === 1) return authors[0];
  if (authors.length === 2) return `${authors[0]} and ${authors[1]}`;

  let output = "";
  authors.forEach((author, index) => {
    if (index === authors.length - 1) {
      output = output + "and ";
    }

    output = output + `${author}, `;
  });
  output = output.substring(0, output.length - 2)
  return output;
};

export const formatPublicationDate = (date: string) => {
  if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return DateTime.fromFormat(date, "y-LL-dd").toFormat("DD");
  }
  if (/^\d{4}-\d{2}$/.test(date)) {
    return DateTime.fromFormat(date, "y-LL").toFormat("LLL y");
  }

  return date
};
