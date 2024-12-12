import formatCurrency from "@/components/elements/formatCurrency";
import ProductImage from "@/components/elements/ProductImage";
import ScrollToTop from "@/components/elements/ScrollToTop";
import Section from "@/components/elements/Section";
import AddToCartButton from "@/features/merch/AddToCartButton";
import ProductFilter from "@/features/merch/ProductFilter";
import ProductPagination from "@/features/merch/ProductPagination";
import ProductSearch from "@/features/merch/ProductSearch";
import {
  getCachedProductsforPagination,
  getCachedProductsforSearchbar,
} from "@/lib/functions/fetchDB/fetchProduct";
import Link from "next/link";



type MerchProps = {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
};
const Merch = async ({ searchParams }: MerchProps) => {
  const awaitedParams = await searchParams;

  const awaitedPage = awaitedParams.page;
  const page = awaitedPage ? Number(awaitedPage) : 1;

  const category: string | undefined = awaitedParams.category !== "undefined"
    ? (awaitedParams.category as string)
    : undefined;

  const search: string | undefined = awaitedParams.search !== "undefined"
    ? (awaitedParams.search as string)
    : undefined;


    // searchedProducts is only for adjusting the number of pagination numbers
  const [products, searchedProducts] = await Promise.all([
    getCachedProductsforPagination(page, 6, category, search),
    getCachedProductsforSearchbar(category, search),
  ]);



  return (
    <Section className="flex flex-col gap-12 p-12">

      <ScrollToTop page={page} search={search} />

      {/* Hero section start*/}
      <section className="flex flex-col justify-center items-center gap-24 py-24 text-center ">
        <p className="text-3xl bg-gradient-to-r from-lime-200  to-yellow-500  text-transparent bg-clip-text p-3">
          Merch page
        </p>
      </section>
      {/* Hero section end*/}


      {/* search and filter secion start */}
      <div className="flex flex-row justify-evenly items-center gap-3">
        <ProductSearch search={search}  category={category} />
        <ProductFilter products={products} search={search} category={category}/>
      </div>
      {/* search and filter secion end */}


      {products && products.length ? (
        <>
          <ul className="w-full flex flex-wrap justify-center items-center gap-5">
            {products.map((product) => {
              return (
                <li
                  key={product._id}
                  className="flex flex-col justify-center items-center gap-4 border-2 border-slate-300 rounded-2xl p-5 shadow-xl transiton duration-300 transform hover:scale-105"
                >
                  <p className="text-2xl">{product.name}</p>
                  <Link href={`/productslist/${product._id}`} prefetch={true}>
                    <ProductImage
                      product={product}
                      className="w-[450px] min-[929px]:w-[350px] h-auto"
                      width={450}
                      height={458}
                      sizes="(max-width:929px) 450px, 350px"
                    />
                  </Link>
                  <span>{formatCurrency(product.price)}</span>
                  <AddToCartButton product={product}/>
                </li>
              );
            })}
          </ul>


          <ProductPagination
            searchedProducts={searchedProducts}
            search={search}
            page={page}
            category={category}
          />
        </>
      ) : (
        <p className="text-2xl text-center">
          Your search does not match any products !!
        </p>
      )}
    </Section>
  );
};

export default Merch;
