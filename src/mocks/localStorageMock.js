import {
  ACCESS_TOKEN_KEY,
  BEARER_TOKEN,
  USER_ID,
  EXPIRES_AT_KEY
} from '../constants/storageKeys';

import { regularUserId, adminUserId } from '../testData';

export const unauthenticated = {
  getItem: jest.fn(key => null),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn()
};

export const adminUser = {
  ...unauthenticated,
  getItem: jest.fn(key => {
    const adminLocalStorageData = {
      [ACCESS_TOKEN_KEY]: 'accessToken',
      [EXPIRES_AT_KEY]: '2535419869506',
      [USER_ID]: adminUserId,
      [BEARER_TOKEN]: 'bearerToken'
    };
    return adminLocalStorageData[key];
  })
};

export const regularUser = {
  ...unauthenticated,
  getItem: jest.fn(key => {
    const regularLocalStorageData = {
      [ACCESS_TOKEN_KEY]: 'accessToken',
      [EXPIRES_AT_KEY]: '2535419869506',
      [USER_ID]: regularUserId,
      [BEARER_TOKEN]: 'bearerToken'
    };
    return regularLocalStorageData[key] || 'asdf';
  })
};

export const mockAdminUser = () => {
  global.localStorage = adminUser;
};

export const mockRegularUser = () => {
  global.localStorage = regularUser;
};

export const mockUnauthenticated = () => {
  global.localStorage = unauthenticated;
};
