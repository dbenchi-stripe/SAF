export const average = (array, key) =>
  array.reduce((a, b) => a + b[key], 0) / array.length;

export const isDevMode = () =>
  !process.env.NODE_ENV || process.env.NODE_ENV === "development";
