export const colorRating = (rating = 0) => {
  if (rating == 0) {
    return "#000000";
  } else if (rating > 0 && rating <= 3) {
    return "#d42222";
  } else if (rating > 3 && rating <= 6) {
    return "#d9c321";
  } else if (rating > 6 && rating <= 10) {
    return "#13ce66";
  }
};
