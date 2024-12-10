import { c as createComponent, r as renderTemplate, m as maybeRenderHead, a as addAttribute, b as createAstro } from './astro/server_C4mxIzrl.mjs';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';
/* empty css                          */

const $$Astro = createAstro();
const $$ProductSlideShow = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ProductSlideShow;
  const { images } = Astro2.props;
  const fullImages = images.map((image) => {
    return image.startsWith("http") ? image : `${"http://localhost:4321"}/images/products/${image}`;
  });
  return renderTemplate`<!-- Slider main container -->${maybeRenderHead()}<div class="swiper mt-10 col-span-1 sm:col-span-2" data-astro-cid-joyz6o6m> <!-- Additional required wrapper --> <div class="swiper-wrapper" data-astro-cid-joyz6o6m> <!-- Slides --> ${fullImages.map((image) => renderTemplate`<div class="swiper-slide" data-astro-cid-joyz6o6m> <img${addAttribute(image, "src")} alt="Product image" class="w-full h-full object-cover px-10" data-astro-cid-joyz6o6m> </div>`)} </div> <!-- If we need pagination --> <div class="swiper-pagination" data-astro-cid-joyz6o6m></div> </div>  `;
}, "C:/Users/dales/OneDrive/Escritorio/Astro/07-store/07-astro-store/src/components/products/ProductSlideShow.astro", void 0);

export { $$ProductSlideShow as $ };
