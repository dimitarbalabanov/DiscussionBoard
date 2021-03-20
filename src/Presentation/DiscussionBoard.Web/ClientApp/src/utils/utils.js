export const isNullOrUndefined = value => {
  return [null, undefined].includes(value);
}

export const isEmpty = obj => {
  return Object.keys(obj).length === 0;
}