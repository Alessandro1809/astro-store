/* empty css                                     */
import { c as createComponent, r as renderTemplate, d as renderComponent, b as createAstro, m as maybeRenderHead, a as addAttribute } from '../chunks/astro/server_C4mxIzrl.mjs';
import 'kleur/colors';
import 'html-escaper';
import { l as loadProductsFromCookies } from '../chunks/getProductsByPage.action_CuCmYGY3.mjs';
import { $ as $$MainLayout } from '../chunks/MainLayout_CiYNpZ3z.mjs';
import { F as Formatter } from '../chunks/Formatter_Dyl5WtIG.mjs';
import 'js-cookie';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const cart = Astro2.cookies.get("cart")?.json() ?? [];
  const { data: products, error } = await Astro2.callAction(loadProductsFromCookies, cart);
  if (error || !products) {
    Astro2.redirect("/");
  }
  const total = products?.reduce((acc, product) => acc + product.price * product.quantity, 0);
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "Carrito", "description": "Carrito de compras" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<h1>Carrito</h1> <section class="grid grid-cols-1 md:grid-cols-2"> <div class="order-2 sm:order-1"> <h2>Productos</h2> <a href="javascript:history.back()" class="hover:underline text-green-700">Regresar</a> ${products?.map((product) => renderTemplate`<div class="flex gap-5 mt-5"> <img class="w-20 h-20 object-cover"${addAttribute(product.image, "src")}${addAttribute(product.title, "alt")}> <div> <a class="hover:underline"${addAttribute(`/products/${product.slug}`, "href")}> ${product.title}</a> <p class="text-green-600 font-semibold text-sm">$${product.price}</p> <p class="text-xs">Cantidad: ${product.quantity}</p> <p>
Talla: <span class="font-bold text-lg text-green-900">${product.size}</span> </p> <button${addAttribute(product.productID, "data-id")}${addAttribute(product.size, "data-size")} class="bg-red-500/60 hover:bg-red-500 transition-all duration-300 text-white p-1 rounded-md text-xs btn-remove">Remover</button> </div> </div>`)} </div> <div class="bg-black h-[330px] text-white p-6 rounded-lg shadow-lg order-1"> <h2 class="text-lg font-semibold mb-4">Resumen de compra</h2> <div class="flex justify-between text-gray-400 mb-2"> <span>Envío</span> <span>Gratis</span> </div> <div class="flex justify-between text-gray-400 mb-4"> <span>SubTotal </span> <span>${Formatter.currency(total)}</span> </div> <div class="flex justify-between text-gray-400 mb-4"> <span>Impuesto </span> <span>${Formatter.currency(total * 0.15)}</span> </div> <div class="flex justify-between text-xl font-bold"> <span>Total</span> <span>${Formatter.currency(total * 1.15)}</span> </div> <button class="mt-10 w-full bg-green-700 text-gray-300 py-3 rounded-lg hover:bg-gray-600 transition-all">
PAGAR
</button> </div> </section> ` })} `;
}, "C:/Users/dales/OneDrive/Escritorio/Astro/07-store/07-astro-store/src/pages/cart/index.astro", void 0);

const $$file = "C:/Users/dales/OneDrive/Escritorio/Astro/07-store/07-astro-store/src/pages/cart/index.astro";
const $$url = "/cart";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
