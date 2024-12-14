import { getCachedIndividualProduct } from "@/lib/functions/fetchDB/fetchProduct";
import Section from "@/components/elements/Section";
import { connectToDatabase } from "@/lib/config/mongodb";
import Product from "@/models/Product";
import ProductImage from "@/components/elements/ProductImage";
import formatCurrency from "@/components/elements/formatCurrency";


export const generateMetadata = async ({ params }: SingleProductPageType) => {
  const { id } = await params;
  const product = await getCachedIndividualProduct(id);
  return {
    title: product.name,
    description: `${product.name} category: ${product.category}`,
  };
};

export const generateStaticParams = async () => {
  try {
    await connectToDatabase();
    const products = await Product.find({}, "_id");
    return products.map((product) => ({
      id: product._id.toString(),
    }));
  } catch (err) {
    throw new Error(`failed to generate static params, ${err}`);
  }
};




type SingleProductPageType = {
  params: Promise<{ id: string }>;
};
const SingleProductPage = async ({ params }: SingleProductPageType) => {
  const { id } = await params;
  const product = await getCachedIndividualProduct(id);


  return (
    <Section className="flex flex-col justify-center items-center gap-4 p-5 shadow-xl">
      <p className="text-2xl">{product.name}</p>
      <ProductImage
        product={product}
        className="w-[450px]  h-auto"
        width={450}
        height={458}
        sizes="450px"
      />
      <span>{formatCurrency(product.price)}</span>
    </Section>
  );
};

export default SingleProductPage;
