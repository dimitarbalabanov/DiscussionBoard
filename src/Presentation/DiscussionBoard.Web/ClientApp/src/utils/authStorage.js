const CONST = {
    USERNAME_KEY: 'username',
    TOKEN_KEY: 'token',
    EXPIRES_AT_KEY: 'expiresAt'
};

const setItem = (key, data) => {
  if (data && typeof data !== 'string') {
    if (typeof data === 'object') {
      data = JSON.stringify(data);
    } else {
      data = data.toString();
    }
  }

  localStorage.setItem(key, data);
};

export const  getUsername = () => {
  return localStorage.getItem(CONST.USERNAME_KEY);
}

export const  getToken = () => {
  return localStorage.getItem(CONST.TOKEN_KEY);
}

export const  getExpiresAt = () => {
  return localStorage.getItem(CONST.EXPIRES_AT_KEY);
}

export const  setAuthorization = (username, token, expiresAt) => {
  setItem(CONST.USERNAME_KEY, username);
  setItem(CONST.TOKEN_KEY, token);
  setItem(CONST.EXPIRES_AT_KEY, expiresAt);
}

export const removeAuthorization = () => {
  removeItem(CONST.USERNAME_KEY);
  removeItem(CONST.TOKEN_KEY);
  removeItem(CONST.EXPIRES_AT_KEY);
}
