import { Auth } from '@auth/core';
import { parseString } from 'set-cookie-parser';
import Credentials from '@auth/core/providers/credentials';
import { createRemoteDatabaseClient, asDrizzleTable } from '@astrojs/db/runtime';
import { eq } from '@astrojs/db/dist/runtime/virtual.js';
import bcrypt from 'bcryptjs';

const defineConfig = (config) => {
  config.prefix ??= "/api/auth";
  config.basePath = config.prefix;
  return config;
};

const db = await createRemoteDatabaseClient({
  dbType: "libsql",
  remoteUrl: "libsql://astro-store-alessandro1809.turso.io",
  appToken: process.env.ASTRO_DB_APP_TOKEN
});
const User = asDrizzleTable("User", { "columns": { "id": { "type": "text", "schema": { "unique": false, "deprecated": false, "name": "id", "collection": "User", "primaryKey": true } }, "name": { "type": "text", "schema": { "unique": false, "deprecated": false, "name": "name", "collection": "User", "primaryKey": false, "optional": false } }, "email": { "type": "text", "schema": { "unique": true, "deprecated": false, "name": "email", "collection": "User", "primaryKey": false, "optional": false } }, "password": { "type": "text", "schema": { "unique": false, "deprecated": false, "name": "password", "collection": "User", "primaryKey": false, "optional": false } }, "createdAt": { "type": "date", "schema": { "optional": false, "unique": false, "deprecated": false, "name": "createdAt", "collection": "User", "default": "2024-12-10T00:48:11.673Z" } }, "role": { "type": "text", "schema": { "unique": false, "deprecated": false, "name": "role", "collection": "User", "primaryKey": false, "optional": false, "references": { "type": "text", "schema": { "unique": false, "deprecated": false, "name": "id", "collection": "Role", "primaryKey": true } } } } }, "deprecated": false, "indexes": {} }, false);
asDrizzleTable("Role", { "columns": { "id": { "type": "text", "schema": { "unique": false, "deprecated": false, "name": "id", "collection": "Role", "primaryKey": true } }, "name": { "type": "text", "schema": { "unique": false, "deprecated": false, "name": "name", "collection": "Role", "primaryKey": false, "optional": false } } }, "deprecated": false, "indexes": {} }, false);
const Product = asDrizzleTable("Product", { "columns": { "id": { "type": "text", "schema": { "unique": false, "deprecated": false, "name": "id", "collection": "Product", "primaryKey": true } }, "description": { "type": "text", "schema": { "unique": false, "deprecated": false, "name": "description", "collection": "Product", "primaryKey": false, "optional": false } }, "gender": { "type": "text", "schema": { "unique": false, "deprecated": false, "name": "gender", "collection": "Product", "primaryKey": false, "optional": false } }, "price": { "type": "number", "schema": { "unique": false, "deprecated": false, "name": "price", "collection": "Product", "primaryKey": false, "optional": false } }, "sizes": { "type": "text", "schema": { "unique": false, "deprecated": false, "name": "sizes", "collection": "Product", "primaryKey": false, "optional": false } }, "slug": { "type": "text", "schema": { "unique": true, "deprecated": false, "name": "slug", "collection": "Product", "primaryKey": false, "optional": false } }, "stock": { "type": "number", "schema": { "unique": false, "deprecated": false, "name": "stock", "collection": "Product", "primaryKey": false, "optional": false } }, "tags": { "type": "text", "schema": { "unique": false, "deprecated": false, "name": "tags", "collection": "Product", "primaryKey": false, "optional": false } }, "title": { "type": "text", "schema": { "unique": false, "deprecated": false, "name": "title", "collection": "Product", "primaryKey": false, "optional": false } }, "type": { "type": "text", "schema": { "unique": false, "deprecated": false, "name": "type", "collection": "Product", "primaryKey": false, "optional": false } }, "user": { "type": "text", "schema": { "unique": false, "deprecated": false, "name": "user", "collection": "Product", "primaryKey": false, "optional": false, "references": { "type": "text", "schema": { "unique": false, "deprecated": false, "name": "id", "collection": "User", "primaryKey": true } } } } }, "deprecated": false, "indexes": {} }, false);
const ProductImage = asDrizzleTable("ProductImage", { "columns": { "id": { "type": "text", "schema": { "unique": false, "deprecated": false, "name": "id", "collection": "ProductImage", "primaryKey": true } }, "productId": { "type": "text", "schema": { "unique": false, "deprecated": false, "name": "productId", "collection": "ProductImage", "primaryKey": false, "optional": false, "references": { "type": "text", "schema": { "unique": false, "deprecated": false, "name": "id", "collection": "Product", "primaryKey": true } } } }, "image": { "type": "text", "schema": { "unique": false, "deprecated": false, "name": "image", "collection": "ProductImage", "primaryKey": false, "optional": false } } }, "deprecated": false, "indexes": {} }, false);

const authConfig = defineConfig({
  providers: [
    //TODO:
    // GitHub({
    //   clientId: import.meta.env.GITHUB_CLIENT_ID,
    //   clientSecret: import.meta.env.GITHUB_CLIENT_SECRET,
    // }),
    Credentials({
      credentials: {
        //establece las credenciales que se pueden usar con el formulario de Auth js
        email: { label: "Correo", type: "email" },
        password: { label: "Password", type: "password" }
      },
      authorize: async ({ email, password }) => {
        const [user] = await db.select().from(User).where(eq(User.email, email));
        if (!user) {
          throw new Error("Usuario o encontrado");
        }
        if (!bcrypt.compareSync(password, user.password)) {
          throw new Error("Contraseña incorrecta");
        }
        const { password: _, ...userWithoutPassword } = user;
        return userWithoutPassword;
      }
    })
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.user = user;
      }
      return token;
    },
    session: ({ session, token }) => {
      session.user = token.user;
      console.log(session.user);
      return session;
    }
  }
});

const __vite_import_meta_env__ = {"ASSETS_PREFIX": undefined, "BASE_URL": "/", "DEV": false, "MODE": "production", "PROD": true, "PUBLIC_URL": "http://localhost:4321", "SITE": undefined, "SSR": true};
const actions = [
  "providers",
  "session",
  "csrf",
  "signin",
  "signout",
  "callback",
  "verify-request",
  "error"
];
function AstroAuthHandler(prefix, options = authConfig) {
  return async ({ cookies, request }) => {
    const url = new URL(request.url);
    const action = url.pathname.slice(prefix.length + 1).split("/")[0];
    if (!actions.includes(action) || !url.pathname.startsWith(prefix + "/")) return;
    const res = await Auth(request, options);
    if (["callback", "signin", "signout"].includes(action)) {
      const getSetCookie = res.headers.getSetCookie();
      if (getSetCookie.length > 0) {
        getSetCookie.forEach((cookie) => {
          const { name, value, ...options2 } = parseString(cookie);
          cookies.set(name, value, options2);
        });
        res.headers.delete("Set-Cookie");
      }
    }
    return res;
  };
}
function AstroAuth(options = authConfig) {
  const { AUTH_SECRET, AUTH_TRUST_HOST, VERCEL, NODE_ENV } = Object.assign(__vite_import_meta_env__, { AUTH_TRUST_HOST: "true", AUTH_SECRET: "asdhasbduasbdhb92w32bdbd981d912nd912n9dh129edh89hh9089", NODE: process.env.NODE, NODE_ENV: process.env.NODE_ENV, OS: process.env.OS });
  options.secret ??= AUTH_SECRET;
  options.trustHost ??= !!(AUTH_TRUST_HOST ?? VERCEL ?? NODE_ENV !== "production");
  const { prefix = "/api/auth", ...authOptions } = options;
  const handler = AstroAuthHandler(prefix, authOptions);
  return {
    async GET(context) {
      return await handler(context);
    },
    async POST(context) {
      return await handler(context);
    }
  };
}
async function getSession(req, options = authConfig) {
  options.secret ??= "asdhasbduasbdhb92w32bdbd981d912nd912n9dh129edh89hh9089";
  options.trustHost ??= true;
  const url = new URL(`${options.prefix}/session`, req.url);
  const response = await Auth(new Request(url, { headers: req.headers }), options);
  const { status = 200 } = response;
  const data = await response.json();
  if (!data || !Object.keys(data).length) return null;
  if (status === 200) return data;
  throw new Error(data.message);
}

export { AstroAuth as A, Product as P, ProductImage as a, db as d, getSession as g };
