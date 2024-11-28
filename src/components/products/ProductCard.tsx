import type { ProductWithImg } from "@/interfaces"
import { useState } from "react";

interface Props {
    product: ProductWithImg
}
export const ProductCard = ({product}:Props) => {

    const images = product.images.split(',').map((image) => {
        return image.startsWith('http') ? image 
        : `${import.meta.env.PUBLIC_URL}/images/products/${image}`
    });
    
    const [currentImage, setCurrentImage] = useState(images[0]);

  return (
    <>

        <a className="rounded-t-full overflow-hidden " href={`/products/${product.slug}`}>
        <img src={currentImage} 
        alt={product.title} 
        className="h-auto rounded-t-full object-contain "
        onMouseEnter={() => setCurrentImage(images[1] ?? images[0])}
        onMouseLeave={() => setCurrentImage(images[0] ?? images[1])}/>
        <h4>{product.title}</h4>
        <p>${product.price}</p>
        </a>
    </>
  )
}
