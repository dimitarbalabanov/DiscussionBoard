import { 
  getItem,
  setItem,
  removeItem
} from './storageService';

const CONST = {
    EMAIL_KEY: 'email',
    TOKEN_KEY: 'token',
};

export const identityStorage = {
    getEmail: () => {
        return getItem(CONST.EMAIL_KEY);
    },

    getToken: () => {
        return getItem(CONST.TOKEN_KEY);
    },

    setIdentity: (email, token) => {
      setItem(CONST.EMAIL_KEY, email);
      setItem(CONST.TOKEN_KEY, token);
    },

    removeIdentity: () => {
      removeItem(CONST.EMAIL_KEY);
      removeItem(CONST.TOKEN_KEY);
    }
}
