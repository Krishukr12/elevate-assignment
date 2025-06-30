import { useEffect, useState } from "react";
import { axiosInstance } from "../config/axios";
import type { IProduct } from "../types/product.type";
import { ProductCard } from "../components/ProductCard";

export const Product = () => {
  const [productData, setProductData] = useState<IProduct[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const getProducts = async () => {
    try {
      const res = await axiosInstance.get<IProduct[]>("/products");
      setProductData(res.data);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "error while fetching products";

      console.log(errorMessage);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const filteredProduct = searchTerm
    ? productData.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : productData;


    
  return (
    <section className="">
      <section className="p-4 flex items-center ">
        <input
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search Product"
          className="border p-2 outline-none"
        />
      </section>
      <section className="grid grid-cols-1 md:grid-cols-4 gap-2">
        {filteredProduct.map((product: IProduct) => {
          return (
            <ProductCard
              title={product.title}
              category={product.category}
              image={product.image}
              price={product.price}
            />
          );
        })}
      </section>
    </section>
  );
};
