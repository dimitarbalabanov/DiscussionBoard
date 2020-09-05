import { storageService } from './storage-service';

const CONST = {
    EMAIL_KEY: 'email',
    TOKEN_KEY: 'token',
};

export const identityService = {

    getEmail: () => {
        return storageService.getItem(CONST.EMAIL_KEY);
    },

    getToken: () => {
        return storageService.getItem(CONST.TOKEN_KEY);
    },

    setIdentity: (email, token) => {
      storageService.setItem(CONST.EMAIL_KEY, email);
      storageService.setItem(CONST.TOKEN_KEY, token);
    },

    removeIdentity: () => {
      storageService.removeItem(CONST.EMAIL_KEY);
      storageService.removeItem(CONST.TOKEN_KEY);
    },
}
