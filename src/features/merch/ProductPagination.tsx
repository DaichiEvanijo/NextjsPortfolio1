import Button from "@/components/elements/Button";
import { ProductType } from "@/types/ProductType";
import Link from "next/link";


type ProductPaginationProps = {
  category?: string;
  search?: string;
  page: number;
  searchedProducts: ProductType[];
};
const ProductPagination = ({
  category,
  search,
  page,
  searchedProducts,
}: ProductPaginationProps) => {
  const pageNumbers = [];
  const offsetNumber = 3;
  for (let i = page - offsetNumber; i <= page + offsetNumber; i++) {
    if (i >= 1 && i <= Math.ceil(searchedProducts.length / 6)) {
      pageNumbers.push(i);
    }
  }
  

  return (
    <div className="flex justify-center items-center gap-3">
      <Button type="button" variant={page === 1 ? "disabled" : "default"}>
        <Link
          href={{
            pathname: "/productslist",
            query: {
              page: page > 1 ? page - 1 : 1,
              ...(category ? { category } : {}),
              ...(search ? { search } : {}),
            },
          }}
        >
          Back
        </Link>
      </Button>
      {pageNumbers.map((number, i) => (
        <Link
          key={i}
          href={{
            pathname: "/productslist",
            query: {
              page: number,
              ...(category ? { category } : {}),
              ...(search ? { search } : {}),
            },
          }}
        >
          {number}
        </Link>
      ))}
      <Button
        type="button"
        variant={
          page === Math.ceil(searchedProducts.length / 6)
            ? "disabled"
            : "default"
        }
      >
        <Link
          href={{
            pathname: "/productslist",
            query: {
              page:
                page === Math.ceil(searchedProducts.length / 6)
                  ? page
                  : page + 1,
              ...(category ? { category } : {}),
              ...(search ? { search } : {}),
            },
          }}
        >
          Next
        </Link>
      </Button>
    </div>
  );
};

export default ProductPagination;
