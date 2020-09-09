export const getItem = (key) => {
  return localStorage.getItem(key);
};

export const setItem = (key, data) => {
  if (data && typeof data !== 'string') {
      if (typeof data === 'object') {
          data = JSON.stringify(data);
      } else {
          data = data.toString();
      }
  }

  localStorage.setItem(key, data);
};

export const removeItem = (key) => {
  localStorage.removeItem(key);
};
