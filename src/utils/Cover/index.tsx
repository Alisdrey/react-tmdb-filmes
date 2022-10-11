export const GetPoster = (size: string, image: string) => {
  if (image == undefined || image == null || image == "") return "";
  return `https://image.tmdb.org/t/p/${size}${image}`;
};