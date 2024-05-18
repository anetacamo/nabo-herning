type CardType = {
  category: string;
  title: string;
  link?: string;

  image?: string;
  credit?: string;

  address?: string;
  latitude?: number;
  longitude?: number;

  tags?: string;
  invisible?: string;

  description: string;
  howtouse?: string;

  email?: string;
};

export type Select = "category";
export type Inputs =
  | "title"
  | "link"
  | "credit"
  | "image"
  | "address"
  | "latitude"
  | "longitude"
  | "email";
export type MultiSelects = "tags";
export type TextAreas = "description" | "howtouse";
export type AllTypes = Select | Inputs | MultiSelects | TextAreas;

export const emptyMember = {
  category: "",
  title: "",
  link: "",

  image: "",
  credit: "",

  address: "",
  latitude: 0,
  longitude: 0,

  tags: "",

  description: "",
  howtouse: "",

  email: "",
};

export default CardType;
