import { ImageUpload } from '@/utils/image-upload';
import { defineAction } from 'astro:actions';
import { db, eq, Product, ProductImage } from 'astro:db';
import { z } from 'astro:schema';
import { getSession } from 'auth-astro/server';
import { v4 as UUID } from 'uuid';

const MAX_FILE_SIZE = 5_000_000;
const ACCEPTED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/webp','image/svg+xml'];

export const createUpdateProduct = defineAction({
        accept: 'form',
        input: z.object({
            id : z.string().optional(),
            description: z.string(),
            price: z.number() ,
            sizes: z.string(),
            slug: z.string(),
            stock: z.number() ,
            tags: z.string(),
            title: z.string(),
            type: z.string(),
            gender: z.string(),
            //TODO:IMAGEN
            imageFiles: z.array(
              z.instanceof(File).refine(
                (file) => file.size <= MAX_FILE_SIZE,'File size must be less than 5MB'
              ).refine(
                (file) => {
                  if (file.size === 0) return true
                  return ACCEPTED_FILE_TYPES.includes(file.type),`File type must be one of: ${ACCEPTED_FILE_TYPES.join(', ')}`
                }
              ),
            ).optional(),
        }),
        handler: async (form,{request}) => {

            const session= await getSession(request);
            const user = session?.user;

            if(!user){
                throw new Error('Sesion invalida: No estas logeado');
            }

            const {id = UUID(), imageFiles, ...rest} = form;
            rest.slug = rest.slug.toLowerCase().replaceAll(' ', '-').trim();

            const product = {
              id:id,
              user:user.id!,
              ...rest
            };

            const queries:any =[];



            if (!form.id) {
              queries.push( db.insert(Product).values(product));
            }else{
              queries.push(db.update(Product).set(product).where(eq(Product.id, id)));
            }
            //TODO:Tratamiento de imagenes
            let secureUrl:string[] = [];//creamos un array para almacenar las urls
            if (form.imageFiles //si hay imagenes
              && form.imageFiles.length > 0 
              && form.imageFiles[0].size > 0) {
              
                const urls = await Promise.all(
                  form.imageFiles.map( (file) => ImageUpload.upload(file)) //creamos una promesa para cada imagen para que se suban en paralelo 
                )
                secureUrl.push(...urls);
            } 
            secureUrl.forEach((url) => {
                const imgObj = {
                  id: UUID(),
                  image: url,
                  productId: product.id,
                }
                queries.push(db.insert(ProductImage).values(imgObj));
            });

              
            // imageFiles?.forEach(async (image)=>{
            //   if (image.size===0) {
            //     return;
            //   }



            //  const url = await ImageUpload.upload(image);
            // })

            await db.batch(queries);
          return product;
          
        }
      });
