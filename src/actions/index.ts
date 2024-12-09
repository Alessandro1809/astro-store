import { createUpdateProduct } from './products/create-updated-product.action';
import { deleteProductImg } from './products/delete-product-image.action';

export * from './auth/login.action';
export * from './auth/logout.action';
export * from './auth/register.action';
export * from './cart/load-cart-products.action';
export * from './products/create-updated-product.action';
export * from './products/getProductBySlug.action';
export * from './products/getProductsByPage.action';

export const server = {
    createUpdateProduct,
    deleteProductImg
}