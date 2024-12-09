
import { defineAction } from 'astro:actions';
import { db, Product,eq, ProductImage } from 'astro:db';
import { z } from 'astro:schema';

export const getProductById = defineAction({
        accept: 'json',
        input: z.string(),
        handler: async (slug) => {

          const newProduct={
              id:'',
              description:'Nueva Descripcion del producto',
              price:0,
              sizes:'L,M,S',
              slug:'nuevo-producto',
              stock:6,
              tags:'shirt-men-new',
              title:'nuevo producto',
              type:'shirts',
              gender:'men'
            }
          
          if (slug=== 'new') {
            return {
              images: [],
              product: newProduct
            }
          }

            const [product] = await db.select()
            .from(Product)
            .where(eq(Product.slug, slug));

            if (!product) {
                throw new Error(`Producto ${slug} no encontrado`);
        
            }

            const images = await db.select()
            .from(ProductImage)
            .where(eq(ProductImage.productId, product.id));

          return {product, images:images.map(image => image.image)};
          
        }
      });
