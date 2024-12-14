import "server-only";

import { ProductType } from "@/types/ProductType";
import Product from "@/models/Product";
import { connectToDatabase } from "@/lib/config/mongodb";
import { unstable_cache } from "next/cache";

const getProductsforPagination = async (
  page = 1,
  limit = 10,
  category: string | undefined,
  search: string | undefined
): Promise<ProductType[]> => {
  try {
    await connectToDatabase();

    /* eslint-disable @typescript-eslint/no-explicit-any */
    const query: Record<string, any> = {};
    /* eslint-enable @typescript-eslint/no-explicit-any */
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
      ];
    }
    if (category) {
      query.category = category;
    }

    const products = await Product.find(query)
      .limit(limit)
      .skip((page - 1) * limit);
    const serializedProducts: ProductType[] = products.map((product) => {
      return {
        _id: product._id.toString(),
        name: product.name,
        category: product.category,
        price: product.price,
      };
    });
    return serializedProducts;
  } catch (err) {
    throw new Error(`failed to fetch products for pagination,${err}`);
  }
};

export const getCachedProductsforPagination = unstable_cache(
  (
    page: number,
    limit: number,
    category: string | undefined,
    search: string | undefined
  ) => {
    return getProductsforPagination(page, limit, category, search);
  }
);

const getProductsForSearchbar = async (
  category: string | undefined,
  search: string | undefined
): Promise<ProductType[]> => {
  try {
    await connectToDatabase();

    /* eslint-disable @typescript-eslint/no-explicit-any */
    const query: Record<string, any> = {};
    /* eslint-enable @typescript-eslint/no-explicit-any */
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
      ];
    }
    if (category) {
      query.category = category;
    }

    const products = await Product.find(query);
    const serializedProducts: ProductType[] = products.map((product) => {
      return {
        _id: product._id.toString(),
        name: product.name,
        category: product.category,
        price: product.price,
      };
    });
    return serializedProducts;
  } catch (err) {
    throw new Error(
      `failed to fetch products for searchbar and category, ${err}`
    );
  }
};
export const getCachedProductsforSearchbar = unstable_cache(
  (category: string | undefined, search: string | undefined) =>
    getProductsForSearchbar(category, search)
);

const getIndividualProducts = async (id: string): Promise<ProductType> => {
  try {
    await connectToDatabase();
    const product = await Product.findOne({ _id: id });
    if (!product) {
      throw new Error(`Product with id ${id} not found`);
    }
    const serializedProduct: ProductType = {
      _id: product._id.toString(),
      name: product.name,
      category: product.category,
      price: product.price,
    };
    return serializedProduct;
  } catch (err) {
    throw new Error(`failed to fetch individual product, ${err}`);
  }
};
export const getCachedIndividualProduct = unstable_cache((id: string) =>
  getIndividualProducts(id)
);
