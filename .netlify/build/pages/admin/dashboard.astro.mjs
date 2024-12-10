/* empty css                                        */
import { c as createComponent, r as renderTemplate, d as renderComponent, b as createAstro, m as maybeRenderHead, a as addAttribute } from '../../chunks/astro/server_C4mxIzrl.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$MainLayout } from '../../chunks/MainLayout_CiYNpZ3z.mjs';
import { $ as $$Pagination } from '../../chunks/Pagination_BJyYZsEM.mjs';
import { g as getProductsByPage } from '../../chunks/getProductsByPage.action_CuCmYGY3.mjs';
import { F as Formatter } from '../../chunks/Formatter_Dyl5WtIG.mjs';
import 'js-cookie';
import { $ as $$ProductImage } from '../../chunks/ProductImage_DIlwfVOr.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$Dashboard = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Dashboard;
  const searchParams = Astro2.url.searchParams;
  const pageParam = Number(searchParams.get("page") ?? 1);
  const { data, error } = await Astro2.callAction(getProductsByPage, { page: pageParam });
  if (error) {
    return Astro2.redirect("/");
  }
  const { products, totalPages } = data;
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "Dashboard", "description": "Admin Dashboard" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<h1>Dashboard</h1> <p>Listado de productos</p> <div class=" flex justify-end "> <a class="bg-lime-300 hover:bg-lime-500 transition-all duration-300 text-black font-semibold p-2 rounded-md" href="/admin/products/new">
Nuevo producto
</a> </div> <table class="mt-5 w-full"> <thead class="bg-green-300 rounded-lg"> <tr class=""> <th class="text-left">Title</th> <th class="text-left">Price</th> <th class="text-left">Image</th> <th class="text-left">Inventario</th> </tr> </thead> <tbody> ${products.map((product) => renderTemplate`<tr> <td> <a class="hover:underline cursor-pointer"${addAttribute(`/admin/products/${product.slug}`, "href")}>${product.title}</a></td> <td>${Formatter.currency(product.price)}</td> <td>${renderComponent($$result2, "ProductImage", $$ProductImage, { "src": product.images.split(",")[0], "className": "w-16 h-16", "alt": product.title })}</td> <td> ${product.stock} </td> </tr>`)} </tbody> </table> ${renderComponent($$result2, "Pagination", $$Pagination, { "totalPages": totalPages })} ` })}`;
}, "C:/Users/dales/OneDrive/Escritorio/Astro/07-store/07-astro-store/src/pages/admin/dashboard.astro", void 0);

const $$file = "C:/Users/dales/OneDrive/Escritorio/Astro/07-store/07-astro-store/src/pages/admin/dashboard.astro";
const $$url = "/admin/dashboard";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Dashboard,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
