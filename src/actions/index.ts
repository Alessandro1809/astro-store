import { loginUser, logout, registerUser } from './auth';
import { getProductsByPage } from './products/getProductsByPage.action';

export const server = {
  // actions

  // Auth
  loginUser,
  logout,
  registerUser,
  getProductsByPage
};
