type CardType = {
  category: string;
  title: string;
  link?: string;
  // supertag?: string;
  image?: string;
  credit?: string;

  address?: string;
  latitude?: number;
  longitude?: number;

  tags?: string;
  invisible?: string;

  description: string;
  howtouse?: string;
};

export type Select = "category";
export type Inputs =
  | "title"
  | "credit"
  | "image"
  | "link"
  | "address"
  | "latitude"
  | "longitude"
  | "email";
export type MultiSelects = "tags" | "invisible";
export type TextAreas = "description" | "howtouse";

export const emptyMember = {
  category: "",

  title: "",
  credit: "",
  image: "",
  link: "",
  address: "",
  latitude: 0,
  longitude: 0,

  tags: "",
  invisible: "",

  description: "",
  howtouse: "",
};

export default CardType;
