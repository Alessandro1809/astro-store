import { g as getSession, d as db, P as Product, a as ProductImage } from './server_Che4RrdA.mjs';
import * as z from 'zod';
import { z as z$1 } from 'zod';
import { v4 } from 'uuid';
import { eq, inArray, count, sql } from '@astrojs/db/dist/runtime/virtual.js';
import { v2 } from 'cloudinary';
import { c as callSafely, a as ActionError, b as ActionInputError, g as getActionQueryString, d as ACTION_QUERY_PARAMS } from './shared_Dn2A0jua.mjs';
import { A as AstroError, p as ActionCalledFromServerError } from './astro/assets-service_DN06EriY.mjs';
import { i as isActionAPIContext } from './utils_Cwo9_uli.mjs';

v2.config({
  cloud_name: "drwd1wtvt",
  api_key: "227831484292533",
  api_secret: "Jay7TIiVYi_pZdSdKA5bFEC5YcY"
  // Click 'View API Keys' above to copy your API secret
});
class ImageUpload {
  static async upload(file) {
    const buffer = await file.arrayBuffer();
    const base64Image = Buffer.from(buffer).toString("base64");
    const imageType = file.type.split("/")[1];
    const resp = await v2.uploader.upload(
      `data:image/${imageType};base64,${base64Image}`
    );
    console.log(resp);
    return resp.secure_url;
  }
  static async delete(image) {
    try {
      const imgName = image.split("/").pop() ?? "";
      const imageId = imgName.split(".")[0];
      const resp = await v2.uploader.destroy(imageId);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

function defineAction({
  accept,
  input: inputSchema,
  handler
}) {
  const serverHandler = accept === "form" ? getFormServerHandler(handler, inputSchema) : getJsonServerHandler(handler, inputSchema);
  async function safeServerHandler(unparsedInput) {
    if (typeof this === "function" || !isActionAPIContext(this)) {
      throw new AstroError(ActionCalledFromServerError);
    }
    return callSafely(() => serverHandler(unparsedInput, this));
  }
  Object.assign(safeServerHandler, {
    orThrow(unparsedInput) {
      if (typeof this === "function") {
        throw new AstroError(ActionCalledFromServerError);
      }
      return serverHandler(unparsedInput, this);
    }
  });
  return safeServerHandler;
}
function getFormServerHandler(handler, inputSchema) {
  return async (unparsedInput, context) => {
    if (!(unparsedInput instanceof FormData)) {
      throw new ActionError({
        code: "UNSUPPORTED_MEDIA_TYPE",
        message: "This action only accepts FormData."
      });
    }
    if (!inputSchema) return await handler(unparsedInput, context);
    const baseSchema = unwrapBaseObjectSchema(inputSchema, unparsedInput);
    const parsed = await inputSchema.safeParseAsync(
      baseSchema instanceof z$1.ZodObject ? formDataToObject(unparsedInput, baseSchema) : unparsedInput
    );
    if (!parsed.success) {
      throw new ActionInputError(parsed.error.issues);
    }
    return await handler(parsed.data, context);
  };
}
function getJsonServerHandler(handler, inputSchema) {
  return async (unparsedInput, context) => {
    if (unparsedInput instanceof FormData) {
      throw new ActionError({
        code: "UNSUPPORTED_MEDIA_TYPE",
        message: "This action only accepts JSON."
      });
    }
    if (!inputSchema) return await handler(unparsedInput, context);
    const parsed = await inputSchema.safeParseAsync(unparsedInput);
    if (!parsed.success) {
      throw new ActionInputError(parsed.error.issues);
    }
    return await handler(parsed.data, context);
  };
}
function formDataToObject(formData, schema) {
  const obj = schema._def.unknownKeys === "passthrough" ? Object.fromEntries(formData.entries()) : {};
  for (const [key, baseValidator] of Object.entries(schema.shape)) {
    let validator = baseValidator;
    while (validator instanceof z$1.ZodOptional || validator instanceof z$1.ZodNullable || validator instanceof z$1.ZodDefault) {
      if (validator instanceof z$1.ZodDefault && !formData.has(key)) {
        obj[key] = validator._def.defaultValue();
      }
      validator = validator._def.innerType;
    }
    if (!formData.has(key) && key in obj) {
      continue;
    } else if (validator instanceof z$1.ZodBoolean) {
      const val = formData.get(key);
      obj[key] = val === "true" ? true : val === "false" ? false : formData.has(key);
    } else if (validator instanceof z$1.ZodArray) {
      obj[key] = handleFormDataGetAll(key, formData, validator);
    } else {
      obj[key] = handleFormDataGet(key, formData, validator, baseValidator);
    }
  }
  return obj;
}
function handleFormDataGetAll(key, formData, validator) {
  const entries = Array.from(formData.getAll(key));
  const elementValidator = validator._def.type;
  if (elementValidator instanceof z$1.ZodNumber) {
    return entries.map(Number);
  } else if (elementValidator instanceof z$1.ZodBoolean) {
    return entries.map(Boolean);
  }
  return entries;
}
function handleFormDataGet(key, formData, validator, baseValidator) {
  const value = formData.get(key);
  if (!value) {
    return baseValidator instanceof z$1.ZodOptional ? void 0 : null;
  }
  return validator instanceof z$1.ZodNumber ? Number(value) : value;
}
function unwrapBaseObjectSchema(schema, unparsedInput) {
  while (schema instanceof z$1.ZodEffects || schema instanceof z$1.ZodPipeline) {
    if (schema instanceof z$1.ZodEffects) {
      schema = schema._def.schema;
    }
    if (schema instanceof z$1.ZodPipeline) {
      schema = schema._def.in;
    }
  }
  if (schema instanceof z$1.ZodDiscriminatedUnion) {
    const typeKey = schema._def.discriminator;
    const typeValue = unparsedInput.get(typeKey);
    if (typeof typeValue !== "string") return schema;
    const objSchema = schema._def.optionsMap.get(typeValue);
    if (!objSchema) return schema;
    return objSchema;
  }
  return schema;
}

const ENCODED_DOT = "%2E";
function toActionProxy(actionCallback = {}, aggregatedPath = "") {
  return new Proxy(actionCallback, {
    get(target, objKey) {
      if (objKey in target || typeof objKey === "symbol") {
        return target[objKey];
      }
      const path = aggregatedPath + encodeURIComponent(objKey.toString()).replaceAll(".", ENCODED_DOT);
      function action(param) {
        return handleAction(param, path, this);
      }
      Object.assign(action, {
        queryString: getActionQueryString(path),
        toString: () => action.queryString,
        // Progressive enhancement info for React.
        $$FORM_ACTION: function() {
          const searchParams = new URLSearchParams(action.toString());
          searchParams.set(ACTION_QUERY_PARAMS.actionRedirect, "false");
          return {
            method: "POST",
            // `name` creates a hidden input.
            // It's unused by Astro, but we can't turn this off.
            // At least use a name that won't conflict with a user's formData.
            name: "_astroAction",
            action: "?" + searchParams.toString()
          };
        },
        // Note: `orThrow` does not have progressive enhancement info.
        // If you want to throw exceptions,
        //  you must handle those exceptions with client JS.
        async orThrow(param) {
          const { data, error } = await handleAction(param, path, this);
          if (error) throw error;
          return data;
        }
      });
      return toActionProxy(action, path + ".");
    }
  });
}
async function handleAction(param, path, context) {
  {
    const { getAction } = await import('./get-action_DgxVx5tA.mjs');
    const action = await getAction(path);
    if (!action) throw new Error(`Action not found: ${path}`);
    return action.bind(context)(param);
  }
}
toActionProxy();

const MAX_FILE_SIZE = 5e6;
const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/svg+xml"];
const createUpdateProduct = defineAction({
  accept: "form",
  input: z.object({
    id: z.string().optional(),
    description: z.string(),
    price: z.number(),
    sizes: z.string(),
    slug: z.string(),
    stock: z.number(),
    tags: z.string(),
    title: z.string(),
    type: z.string(),
    gender: z.string(),
    //TODO:IMAGEN
    imageFiles: z.array(
      z.instanceof(File).refine(
        (file) => file.size <= MAX_FILE_SIZE,
        "File size must be less than 5MB"
      ).refine(
        (file) => {
          if (file.size === 0) return true;
          return ACCEPTED_FILE_TYPES.includes(file.type), `File type must be one of: ${ACCEPTED_FILE_TYPES.join(", ")}`;
        }
      )
    ).optional()
  }),
  handler: async (form, { request }) => {
    const session = await getSession(request);
    const user = session?.user;
    if (!user) {
      throw new Error("Sesion invalida: No estas logeado");
    }
    const { id = v4(), imageFiles, ...rest } = form;
    rest.slug = rest.slug.toLowerCase().replaceAll(" ", "-").trim();
    const product = {
      id,
      user: user.id,
      ...rest
    };
    const queries = [];
    if (!form.id) {
      queries.push(db.insert(Product).values(product));
    } else {
      queries.push(db.update(Product).set(product).where(eq(Product.id, id)));
    }
    let secureUrl = [];
    if (form.imageFiles && form.imageFiles.length > 0 && form.imageFiles[0].size > 0) {
      const urls = await Promise.all(
        form.imageFiles.map((file) => ImageUpload.upload(file))
        //creamos una promesa para cada imagen para que se suban en paralelo 
      );
      secureUrl.push(...urls);
    }
    secureUrl.forEach((url) => {
      const imgObj = {
        id: v4(),
        image: url,
        productId: product.id
      };
      queries.push(db.insert(ProductImage).values(imgObj));
    });
    await db.batch(queries);
    return product;
  }
});

const deleteProductImg = defineAction({
  accept: "json",
  input: z.string(),
  handler: async (imageId, { request }) => {
    const session = await getSession(request);
    const user = session?.user;
    if (!user || user.role !== "admin") {
      throw new Error("Sesion invalida: No estas logeado");
    }
    const [prodcutImage] = await db.select().from(ProductImage).where(eq(ProductImage.id, imageId));
    if (!prodcutImage) {
      throw new Error(`Imagen ${imageId} no encontrada`);
    }
    await db.delete(ProductImage).where(eq(ProductImage.id, imageId));
    if (prodcutImage.image.includes("http")) {
      await ImageUpload.delete(prodcutImage.image);
    }
    return { ok: true };
  }
});

defineAction({
  accept: "form",
  input: z.object({
    email: z.string().email(),
    password: z.string().min(6)
  }),
  handler: async ({ email, password }, { cookies }) => {
    return { ok: true };
  }
});

defineAction({
  accept: "json",
  handler: async (_, { cookies }) => {
    return { ok: true };
  }
});

defineAction({
  accept: "form",
  input: z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6)
  }),
  handler: async ({ name, email, password }, { cookies }) => {
    return { ok: true };
  }
});

const loadProductsFromCookies = defineAction({
  accept: "json",
  input: z.array(z.object({
    id: z.string(),
    size: z.string(),
    quantity: z.number()
  })),
  handler: async (cart, { cookies }) => {
    if (cart.length === 0) {
      return [];
    }
    const productID = cart.map((item) => item.id);
    const dbProducts = await db.select().from(Product).innerJoin(ProductImage, eq(Product.id, ProductImage.productId)).where(inArray(Product.id, productID));
    console.log(dbProducts);
    return cart.map((item) => {
      const dbProduct = dbProducts.find((product) => product.Product.id === item.id);
      if (!dbProduct) {
        throw new Error(`Producto ${item.id} no encontrado`);
      }
      const { title, price, slug } = dbProduct.Product;
      const image = dbProduct.ProductImage.image;
      return {
        productID: item.id,
        title,
        price,
        size: item.size,
        quantity: item.quantity,
        image: image.startsWith("http") ? image : `${"http://localhost:4321"}/images/products/${image}`,
        slug
      };
    });
  }
});

const getProductById = defineAction({
  accept: "json",
  input: z.string(),
  handler: async (slug) => {
    const newProduct = {
      id: "",
      description: "Nueva Descripcion del producto",
      price: 0,
      sizes: "L,M,S",
      slug: "nuevo-producto",
      stock: 6,
      tags: "shirt-men-new",
      title: "nuevo producto",
      type: "shirts",
      gender: "men"
    };
    if (slug === "new") {
      return {
        images: [],
        product: newProduct
      };
    }
    const [product] = await db.select().from(Product).where(eq(Product.slug, slug));
    if (!product) {
      throw new Error(`Producto ${slug} no encontrado`);
    }
    const images = await db.select().from(ProductImage).where(eq(ProductImage.productId, product.id));
    return { product, images };
  }
});

const getProductsByPage = defineAction({
  accept: "json",
  input: z.object({
    page: z.number().optional().default(1),
    limit: z.number().optional().default(12)
  }),
  handler: async ({ page, limit }) => {
    page = page <= 0 ? 1 : page;
    const [totalRecords] = await db.select({ count: count() }).from(Product);
    const totalPages = Math.ceil(totalRecords.count / limit);
    if (page > totalPages) {
      return {
        products: [],
        totalPages
      };
    }
    const productsQuery = sql`
            select a.*,
            ( select GROUP_CONCAT(image,',') from 
              ( select * from ${ProductImage} where productId = a.id limit 2 )
            ) as images
            from ${Product} a
            LIMIT ${limit} OFFSET ${(page - 1) * limit};
            `;
    const { rows } = await db.run(productsQuery);
    console.log(rows);
    const products = rows.map((product) => {
      return {
        ...product,
        images: product.images ? product.images : "no-image.png"
      };
    });
    return {
      products,
      //rows as unknown as ProductWithImg[],
      totalPages
    };
  }
});

export { getProductById as a, createUpdateProduct as c, deleteProductImg as d, getProductsByPage as g, loadProductsFromCookies as l };
