import { renderers } from './renderers.mjs';
import { s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_CvSoi7hX.mjs';
import { manifest } from './manifest_CtfzKhjW.mjs';
import { createExports } from '@astrojs/netlify/ssr-function.js';

const _page0 = () => import('./pages/_actions/_---path_.astro.mjs');
const _page1 = () => import('./pages/_image.astro.mjs');
const _page2 = () => import('./pages/api/auth/_---auth_.astro.mjs');
const _page3 = () => import('./pages/admin/dashboard.astro.mjs');
const _page4 = () => import('./pages/admin/products/_---slug_.astro.mjs');
const _page5 = () => import('./pages/cart.astro.mjs');
const _page6 = () => import('./pages/login.astro.mjs');
const _page7 = () => import('./pages/products/_---slug_.astro.mjs');
const _page8 = () => import('./pages/register.astro.mjs');
const _page9 = () => import('./pages/index.astro.mjs');

const pageMap = new Map([
    ["node_modules/astro/dist/actions/runtime/route.js", _page0],
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page1],
    ["node_modules/auth-astro/src/api/[...auth].ts", _page2],
    ["src/pages/admin/dashboard.astro", _page3],
    ["src/pages/admin/products/[...slug].astro", _page4],
    ["src/pages/cart/index.astro", _page5],
    ["src/pages/login.astro", _page6],
    ["src/pages/products/[...slug].astro", _page7],
    ["src/pages/register.astro", _page8],
    ["src/pages/index.astro", _page9]
]);
const serverIslandMap = new Map();
const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_astro-internal_middleware.mjs')
});
const _args = {
    "middlewareSecret": "289f26fa-14b6-4e54-bc7f-f508ffcfce41"
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (_start in serverEntrypointModule) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
