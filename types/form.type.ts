import CardType, { Inputs, TextAreas, MultiSelects, Select } from "./card.type";
import { ChangeEvent } from "react";

/* form.json */
type FormItem = {
  label?: string;
  helper?: string;
  required?: boolean;
  type?: string | "select" | "multiselect" | "textarea";
};

/* indesend.tsx */
export type FormSelects = FormItem & {
  name: Select;
  data?: FormItem;
  onFieldChange?: (event: ChangeEvent<HTMLSelectElement>) => void;

  chosen?: string;
};

export type FormCategorySelects = {
  name: Select;
  data?: FormItem;
  onFieldChange?: (event: ChangeEvent<HTMLSelectElement>) => void;

  key?: Select;
  member?: CardType;

  onMemberSet: (type: string) => void;
  onTagClick: (t: string) => void;
  posts?: CardType[];
};

export type TagsProps = {
  posts: CardType[];
  onTagClick: (t: string) => void;
  tag: string;
  category?: string;
};

export type FormInputs = {
  name: Inputs;
  data?: FormItem;
  onFieldChange?: (event: ChangeEvent<HTMLInputElement>) => void;

  value?: string | number;
  success?: boolean;
  error?: boolean;
  key?: Inputs;
};

export type FormMultiSelects = {
  name: MultiSelects;
  data?: FormItem;
  onFieldChange?: (event: ChangeEvent<HTMLSelectElement>) => void;

  chosen?: string;
};

export type FormTextAreas = {
  name: TextAreas;
  data: FormItem;
  onFieldChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  value: string | number;
};

export type FormLabelType = {
  label?: string;
  name: keyof CardType;
  required?: boolean;
};
