/* empty css                                     */
import { c as createComponent, r as renderTemplate, d as renderComponent, b as createAstro, m as maybeRenderHead } from '../chunks/astro/server_C4mxIzrl.mjs';
import 'kleur/colors';
import 'html-escaper';
import { jsx, Fragment, jsxs } from 'react/jsx-runtime';
import { useState } from 'react';
import { $ as $$MainLayout } from '../chunks/MainLayout_CiYNpZ3z.mjs';
import 'js-cookie';
import { $ as $$Pagination } from '../chunks/Pagination_BJyYZsEM.mjs';
import { g as getProductsByPage } from '../chunks/getProductsByPage.action_CuCmYGY3.mjs';
export { renderers } from '../renderers.mjs';

const ProductCard = ({ product }) => {
  const images = product.images.split(",").map((image) => {
    return image.startsWith("http") ? image : `${"http://localhost:4321"}/images/products/${image}`;
  });
  const [currentImage, setCurrentImage] = useState(images[0]);
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("a", { className: "rounded-t-full overflow-hidden ", href: `/products/${product.slug}`, children: [
    /* @__PURE__ */ jsx(
      "img",
      {
        src: currentImage,
        alt: product.title,
        className: "h-auto rounded-t-full object-contain ",
        onMouseEnter: () => setCurrentImage(images[1] ?? images[0]),
        onMouseLeave: () => setCurrentImage(images[0] ?? images[1])
      }
    ),
    /* @__PURE__ */ jsx("h4", { children: product.title }),
    /* @__PURE__ */ jsxs("p", { children: [
      "$",
      product.price
    ] })
  ] }) });
};

const ProductList = ({ products }) => {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 place-items-center", children: products.map((product) => /* @__PURE__ */ jsx(ProductCard, { product }, product.id)) }) });
};

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const searchParams = Astro2.url.searchParams;
  const pageParam = Number(searchParams.get("page") ?? 1);
  const { data, error } = await Astro2.callAction(getProductsByPage, { page: pageParam });
  if (error) {
    return Astro2.redirect("/");
  }
  const { products, totalPages } = data;
  if (data.products.length === 0) {
    return Astro2.redirect(`/?page=${totalPages}`);
  }
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<h1 class="text-3xl pt-10 bg-gradient-to-tr from-green-400 to-green-900 bg-clip-text text-transparent w-96 mb-10">Productos disponibles</h1> ${renderComponent($$result2, "ProductList", ProductList, { "products": products, "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components", "client:component-export": "ProductList" })} ${renderComponent($$result2, "Pagination", $$Pagination, { "totalPages": totalPages })} ` })}`;
}, "C:/Users/dales/OneDrive/Escritorio/Astro/07-store/07-astro-store/src/pages/index.astro", void 0);

const $$file = "C:/Users/dales/OneDrive/Escritorio/Astro/07-store/07-astro-store/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
