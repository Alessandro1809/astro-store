import { c as createComponent, r as renderTemplate, m as maybeRenderHead, d as renderComponent, g as createTransitionScope, b as createAstro, a as addAttribute, e as renderHead, f as renderSlot } from './astro/server_C4mxIzrl.mjs';
import 'kleur/colors';
import 'html-escaper';
import { jsxs, jsx } from 'react/jsx-runtime';
import { atom } from 'nanostores';
import { useStore } from '@nanostores/react';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
/* empty css                             */
import 'clsx';

const itemsIncart = atom(0);

class CartCoookiesClient {
  static getCart() {
    const cart = JSON.parse(Cookies.get("cart") || "[]");
    return cart;
  }
  static addItem(cartItem) {
    const cart = CartCoookiesClient.getCart();
    const existCartItem = cart.find((item) => item.id === cartItem.id && item.size === cartItem.size);
    if (existCartItem) {
      existCartItem.quantity += cartItem.quantity;
    } else {
      cart.push(cartItem);
    }
    Cookies.set("cart", JSON.stringify(cart));
    return cart;
  }
  static removeItem(productId, size) {
    const cart = CartCoookiesClient.getCart();
    const updatedCart = cart.filter((item) => !(item.id === productId && item.size === size));
    Cookies.set("cart", JSON.stringify(updatedCart));
    return updatedCart;
  }
}

const CartCounter = () => {
  const $itemsInCart = useStore(itemsIncart);
  useEffect(() => {
    const cart = CartCoookiesClient.getCart();
    itemsIncart.set(cart.length);
  }, []);
  return /* @__PURE__ */ jsxs("a", { href: "/cart", className: "relative inlline-block", children: [
    $itemsInCart > 0 && /* @__PURE__ */ jsx("span", { className: "absolute -top-2 -right-2 bg-green-500 rounded-full w-5 h-5 flex items-center justify-center text-white text-xs", children: $itemsInCart }),
    /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "1.5em", height: "1.5em", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { fill: "#000000", d: "M7 22q-.825 0-1.412-.587T5 20t.588-1.412T7 18t1.413.588T9 20t-.587 1.413T7 22m10 0q-.825 0-1.412-.587T15 20t.588-1.412T17 18t1.413.588T19 20t-.587 1.413T17 22M5.2 4h16.5l-4.975 9H8.1L7 15h12v2H3.625L6.6 11.6L3 4H1V2h3.25z" }) })
  ] });
};

const $$Astro$2 = createAstro();
const $$Navbar = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Navbar;
  const { isLoggedIn, isAdmin } = Astro2.locals;
  return renderTemplate`<!-- component -->${maybeRenderHead()}<nav class="flex justify-between px-20 py-10 items-center fixed top-0 w-full z-10 h-20 shadow-md" style="background-color: #F9F9F9;"> <h1 class="text-xl text-gray-800 font-bold"> <a href="/">AstroStore</a> </h1> <div class="flex items-center"> <ul class="flex items-center space-x-6"> ${renderComponent($$result, "CartCounter", CartCounter, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/dales/OneDrive/Escritorio/Astro/07-store/07-astro-store/src/components/products/cart/CartCounter", "client:component-export": "CartCounter", "data-astro-transition-persist": createTransitionScope($$result, "jzawfqn3") })} <li class="font-semibold text-gray-700"> <a href="/">Home</a> </li> ${isAdmin && renderTemplate`<li class="font-semibold text-gray-700"> <a href="/admin/dashboard">Admin</a> </li>`} ${!isLoggedIn ? renderTemplate`<li class="font-semibold text-gray-700"> <a href="/login">Ingresar</a> </li>` : renderTemplate`<li id="logout" class="font-semibold text-gray-700"> <a href="#">Salir</a> </li>`} </ul> </div> </nav> `;
}, "C:/Users/dales/OneDrive/Escritorio/Astro/07-store/07-astro-store/src/components/shared/Navbar.astro", "self");

const $$Astro$1 = createAstro();
const $$ViewTransitions = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$ViewTransitions;
  const { fallback = "animate" } = Astro2.props;
  return renderTemplate`<meta name="astro-view-transitions-enabled" content="true"><meta name="astro-view-transitions-fallback"${addAttribute(fallback, "content")}>`;
}, "C:/Users/dales/OneDrive/Escritorio/Astro/07-store/07-astro-store/node_modules/astro/components/ViewTransitions.astro", void 0);

const $$Astro = createAstro();
const $$MainLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$MainLayout;
  const { title = "Astro Store" } = Astro2.props;
  return renderTemplate`<html lang="es"> <head><meta charset="utf-8"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="viewport" content="width=device-width"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title>${renderComponent($$result, "ViewTransitions", $$ViewTransitions, {})}${renderHead()}</head> <body> ${renderComponent($$result, "Navbar", $$Navbar, {})} <main class="container m-auto max-w-5xl px-5 mt-20"> ${renderSlot($$result, $$slots["default"])} </main> </body></html>`;
}, "C:/Users/dales/OneDrive/Escritorio/Astro/07-store/07-astro-store/src/layouts/MainLayout.astro", void 0);

export { $$MainLayout as $ };
