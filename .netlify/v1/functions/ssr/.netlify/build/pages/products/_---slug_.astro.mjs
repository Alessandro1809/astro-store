/* empty css                                        */
import { c as createComponent, r as renderTemplate, d as renderComponent, b as createAstro, m as maybeRenderHead, a as addAttribute } from '../../chunks/astro/server_C4mxIzrl.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$MainLayout } from '../../chunks/MainLayout_CiYNpZ3z.mjs';
import { a as getProductById } from '../../chunks/getProductsByPage.action_CuCmYGY3.mjs';
import { $ as $$ProductSlideShow } from '../../chunks/ProductSlideShow_o6kKSWBL.mjs';
/* empty css                                     */
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$ = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$;
  const { slug } = Astro2.params;
  const { data, error } = await Astro2.callAction(getProductById, slug);
  if (error) {
    return Astro2.redirect("/404");
  }
  const { product, images } = data;
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": product.title, "description": product.description, "data-astro-cid-uq5bhyez": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<h1 class="pt-10 text-4xl bg-gradient-to-tr from-green-400 to-green-900 bg-clip-text text-transparent w-auto" data-astro-cid-uq5bhyez>${product.title}</h1> <div class="grid grid-cols-1 md:grid-cols-3 w-full gap-4" data-astro-cid-uq5bhyez> ${renderComponent($$result2, "ProductSlideShow", $$ProductSlideShow, { "images": images.map((img) => img.image), "data-astro-cid-uq5bhyez": true })} <section data-astro-cid-uq5bhyez> <h2 class="text-2xl font-bold" data-astro-cid-uq5bhyez>${product.title}</h2> <h2 class="font-bold" data-astro-cid-uq5bhyez>$${product.price}</h2> <h3 class="mt-5" data-astro-cid-uq5bhyez>Tallas</h3> <ul class="flex gap-3" data-astro-cid-uq5bhyez> ${product.sizes.split(",").map((size) => renderTemplate`<li${addAttribute(size, "data-size")} data-astro-cid-uq5bhyez>${size}</li>`)} </ul> <h3 class="mt-5" data-astro-cid-uq5bhyez>Cantidad</h3> <div data-astro-cid-uq5bhyez> <button class="btn-quantity" data-astro-cid-uq5bhyez>-</button> <input type="number" min="1" value="1" data-astro-cid-uq5bhyez> <button class="btn-quantity" data-astro-cid-uq5bhyez>+</button> </div> <button class="mt-5 bg-blue-500 text-white p-3 w-full disabled:bg-gray-500" data-astro-cid-uq5bhyez>Añadir al carrito</button> <h3 class="mt-10" data-astro-cid-uq5bhyez>Descripción</h3> <p data-astro-cid-uq5bhyez>${product.description}</p> </section> </div> <input type="hidden" id="product-id"${addAttribute(product.id, "value")} data-astro-cid-uq5bhyez> ` })}  `;
}, "C:/Users/dales/OneDrive/Escritorio/Astro/07-store/07-astro-store/src/pages/products/[...slug].astro", void 0);

const $$file = "C:/Users/dales/OneDrive/Escritorio/Astro/07-store/07-astro-store/src/pages/products/[...slug].astro";
const $$url = "/products/[...slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
