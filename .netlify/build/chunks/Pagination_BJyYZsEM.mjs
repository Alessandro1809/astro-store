import { c as createComponent, r as renderTemplate, m as maybeRenderHead, a as addAttribute, b as createAstro } from './astro/server_C4mxIzrl.mjs';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';

const $$Astro = createAstro();
const $$Pagination = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Pagination;
  const { totalPages } = Astro2.props;
  const url = Astro2.url;
  const pageParam = Number(url.searchParams.get("page") ?? 1);
  const currentPage = Math.max(pageParam > totalPages ? totalPages : pageParam, 1);
  const path = url.pathname;
  return renderTemplate`${maybeRenderHead()}<div class="flex justify-between my-32"> <a class="hover:bg-green-500 transition-all duration-300 p-2 bg-green-300 text-black font-semibold rounded-md"${addAttribute(`${path}?page=${Math.max(currentPage - 1, 1)}`, "href")}>Anteriores</a> <span>${pageParam} de ${totalPages}</span> <a class="hover:bg-green-500 transition-all duration-300 p-2 bg-green-300 text-black font-semibold rounded-md"${addAttribute(`${path}?page=${Math.min(currentPage + 1, totalPages)}`, "href")}>Siguientes</a> </div>`;
}, "C:/Users/dales/OneDrive/Escritorio/Astro/07-store/07-astro-store/src/components/shared/Pagination.astro", void 0);

export { $$Pagination as $ };
