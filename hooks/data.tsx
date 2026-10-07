import Papa, { ParseResult } from "papaparse";
import Blog from "../types/card.type";

/**
 * The sheet's onEdit script writes the timestamp into row 2, column 14
 * (see README). That column has no header. The named `updated` column
 * beside it is a leftover value and does not change when the sheet is edited.
 */
const SCRIPT_TIMESTAMP_COLUMN = 13;

/** How often static pages refetch the sheet. Matches a short publish delay. */
export const SHEET_REVALIDATE_SECONDS = 60 * 10;

export async function fetchGoogleSheetData(): Promise<{
  blogs: Blog[];
  updated: string | null;
}> {
  const cardsFetchUrl =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSmXq4iLCNIJdSvEAVRpn9PpjQ__soIhd3A3Ae888A-5BVFl5c90KAkUkQyD_L2p_NQAHXVT1kaO7xd/pub?gid=0&single=true&output=csv";
  const response = await fetch(cardsFetchUrl);
  const csv = await response.text();
  const results = Papa.parse<Record<string, string>>(csv, { header: true });

  const parsedBlogs = results.data.filter(
    (card, index) => index > 0 && card?.title
  ) as Blog[];

  return { blogs: parsedBlogs, updated: readSheetTimestamp(results) };
}

function readSheetTimestamp(
  results: ParseResult<Record<string, string>>
): string | null {
  const firstRow = results.data[0];
  if (!firstRow) return null;

  const scriptField = results.meta.fields?.[SCRIPT_TIMESTAMP_COLUMN];
  const fromScript =
    scriptField !== undefined ? firstRow[scriptField]?.trim() : "";
  const fromUpdatedColumn = firstRow.updated?.trim() ?? "";

  return fromScript || fromUpdatedColumn || null;
}
