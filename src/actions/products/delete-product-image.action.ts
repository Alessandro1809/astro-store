
import { ImageUpload } from '@/utils/image-upload';
import { defineAction } from 'astro:actions';
import { db, eq, ProductImage, Product } from 'astro:db';
import { z } from 'astro:schema';
import { getSession } from 'auth-astro/server';

export const deleteProductImg = defineAction({
        accept: 'json',
        input: z.string(),
        handler: async (imageId, {request}) => {
            
            const session= await getSession(request);
            const user = session?.user;

            if(!user || user.role !== 'admin'){
                throw new Error('Sesion invalida: No estas logeado');
            }


            const [ prodcutImage ] = await db.select().from(ProductImage).where(eq(ProductImage.id, imageId));

            if (!prodcutImage) {
                throw new Error(`Imagen ${imageId} no encontrada`);
                
            }

            const deleted = await db.delete(ProductImage).where(eq(ProductImage.id, imageId));

            if(prodcutImage.image.includes('http')){
                await ImageUpload.delete(prodcutImage.image);//se manda a borrar la imagen de cloudinary
            }

          return {ok : true};
          
        }
      });