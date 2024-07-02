import { CategoryMapping } from "../types";

export const API_URL = `${process.env.API_ORIGIN}/api/weblarek`;
export const CDN_URL = `${process.env.API_ORIGIN}/content/weblarek`;

export const settings = {

};

export const categories = new Map([
  ['софт-скил', 'soft'],
  ['другое', 'other'],
  ['дополнительное', 'additional'],
  ['кнопка', 'button'],
  ['хард-скил', 'hard']
]);
