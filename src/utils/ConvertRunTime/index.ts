export const convertRuntime = (min: number) => {

  if (min != 0) {
    let h = Math.floor(min / 60);
    let m = min % 60;

    let formattedHours = h < 10 ? "0" + h + "h" : h + "h";
    let formattedMinutes = m < 10 ? "0" + m + "min" : m + "min";

    if (formattedHours == "00h") formattedHours = "";
    if (formattedMinutes == "00min") formattedMinutes = "";

    return `${formattedHours} ${formattedMinutes}`;
  }
};