import Papa from "papaparse";
import Blog from "../types/card.type";

const cachedData: Blog[] | null = null;

export async function fetchGoogleSheetData(): Promise<Blog[]> {
  if (cachedData) {
    console.log("cd");
    return cachedData;
  }

  //const cardsFetchUrl = process.env.NEXT_PUBLIC_CARDS_FETCH as string;
  const cardsFetchUrl =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSmXq4iLCNIJdSvEAVRpn9PpjQ__soIhd3A3Ae888A-5BVFl5c90KAkUkQyD_L2p_NQAHXVT1kaO7xd/pub?gid=0&single=true&output=csv";
  const response = await fetch(cardsFetchUrl);

  const csv = await response.text();
  const results = Papa.parse<Blog>(csv, { header: true });

  const parsedBlogs = results.data.filter(
    (card: Blog, index: number) => index > 0 && card?.title
  );

  const updated = results?.data[0]?.updated || null;

  //return cachedData;
  return { blogs: parsedBlogs, updated };
}
