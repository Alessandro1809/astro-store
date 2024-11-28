
import type { ProductWithImg } from '@/interfaces';
import { defineAction } from 'astro:actions';
import { count, db, eq, Product, ProductImage, sql } from 'astro:db';
import { z } from 'astro:schema';

export const getProductsByPage = defineAction({
        accept: 'json',
        input: z.object({
          page:z.number().optional().default(1),
          limit:z.number().optional().default(12),
        }),
        handler: async ({page, limit}) => {
            //Validaciones de paginacion, si es menor a 0 se pone en 1
            page = page <= 0 ? 1 : page;

            const [totalRecords] = await db.select({count:count()}).from(Product);
            //variable para calcular el total de paginas redondeando hacia arrriba con ceil dividido por el limit uqe definimos 
            const totalPages = Math.ceil(totalRecords.count / limit);
            //Si no hay mas paginas se muestra un array vacio
            if (page > totalPages) {
                return {
                    products:[] as ProductWithImg[],
                    totalPages: totalPages,
                }
                
            }

            //con rawquery
            const productsQuery = sql`
            select a.*,
            ( select GROUP_CONCAT(image,',') from 
              ( select * from ${ProductImage} where productId = a.id limit 2 )
            ) as images
            from ${Product} a
            LIMIT ${limit} OFFSET ${(page - 1) * limit};
            `
            const {rows} = await db.run( productsQuery );
             console.log(rows);
             
            //manera de hacer la paginacion con limit y offset
            // const products = await db
            // .select()
            // .from(Product)
            // .innerJoin(ProductImage, eq(Product.id,ProductImage.productId))
            // .limit(limit)
            // .offset((page - 1) * limit);//offset es para paginacion tomado los siguientes resultados y el page - 1 es para que empiece en la pagina 1


          return {
            products: rows as unknown as ProductWithImg[],
            totalPages
          }
          
        }
      });
