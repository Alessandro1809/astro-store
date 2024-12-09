import { defineAction } from 'astro:actions';
import { db, eq, inArray, Product, ProductImage } from 'astro:db';
import { z } from 'astro:schema';

export const loadProductsFromCookies = defineAction({
        accept: 'json',
        input : z.array(z.object({
          id: z.string(),
          size: z.string(),
          quantity: z.number(),
        })),
        handler: async (cart, {cookies}) => {
            
          if (cart.length === 0) {
            return [];
          }
          const productID = cart.map(item => item.id);
          //load products
          const dbProducts = await db.select()
          .from(Product)
          .innerJoin(ProductImage, eq(Product.id,ProductImage.productId))
          .where(inArray(Product.id, productID));

          console.log(dbProducts);
          
          return cart.map(item => {
            const dbProduct = dbProducts.find(product => product.Product.id === item.id );

            if (!dbProduct) {
              throw new Error(`Producto ${item.id} no encontrado`);
            
            }

            const {title, price, slug}= dbProduct.Product;
            const image= dbProduct.ProductImage.image;

            return {
              productID: item.id,
              title: title,
              price: price,
              size: item.size,
              quantity: item.quantity,
              image: image.startsWith('http') ? image : `${import.meta.env.PUBLIC_URL}/images/products/${image}`,
              slug: slug
            }
          });
          
        }
      });
