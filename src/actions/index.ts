import { loginUser, logout, registerUser } from './auth';
import { getProductById } from './products/getProductBySlug.action';
import { getProductsByPage } from './products/getProductsByPage.action';

export const server = {
 

  // Auth
  loginUser,
  logout,
  registerUser,
   // actions
  getProductsByPage,
  getProductById
};
