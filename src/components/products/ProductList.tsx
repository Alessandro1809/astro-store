import type { ProductWithImg } from "@/interfaces"
import { ProductCard } from "./ProductCard"

interface Props {
    products: ProductWithImg[]
}
export const ProductList = ({products}:Props) => {


  return (
    <>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 place-items-center">

            {
                products.map(product => (
                     <ProductCard product={product} key={product.id} />
                ))
            }

        </div>
    </>
  )
}
