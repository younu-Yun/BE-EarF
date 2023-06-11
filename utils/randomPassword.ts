export const randomPassword = () => {
  return Math.floor(Math.random() * 10 ** 8)
    .toString()
    .padStart(8, "0");
};
