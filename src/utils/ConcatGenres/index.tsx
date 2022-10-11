import { GenresProps } from "../../pages/Details/interface";

export const concatGenres = (genres: GenresProps[]) => {
  if (genres == null || genres == undefined) return false;

  let list = "";
  genres.map((item, index) => {
    list += `${item.name}${index != genres.length - 1 ? "," : ""} `;
  });

  return list;
};