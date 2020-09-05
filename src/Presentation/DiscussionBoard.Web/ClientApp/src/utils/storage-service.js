export const storageService = {
  getItem: (key) => {
      return localStorage.getItem(key);
  },

  setItem: (key, data) => {
      if (data && typeof data !== 'string') {
          if (typeof data === 'object') {
              data = JSON.stringify(data);
          } else {
              data = data.toString();
          }
      }

      localStorage.setItem(key, data);
  },

  removeItem: (key) => {
      localStorage.removeItem(key);
  }
}
