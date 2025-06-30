import { useEffect, useState } from "react";
import { axiosInstance } from "../config/axios";
import type { IProduct } from "../types/product.type";
import { ProductCard } from "../components/ProductCard";
import { Pagination } from "../components/Pagination";
import { Search } from "../components/Search";
import { useDebounce } from "../hooks/useDebounce";

export const Product = () => {
  const [productData, setProductData] = useState<IProduct[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [currentPage, setCurrentPage] = useState<number>(1);

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

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const itemsPerPage = 10;
  const possiblePages = Math.ceil(productData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const filteredProduct = debouncedSearchTerm
    ? productData
        .filter((product) =>
          product.title
            .toLowerCase()
            .includes(debouncedSearchTerm.toLowerCase())
        )
        .slice(startIndex, endIndex)
    : productData.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <section className="">
      <section className="p-4 flex items-center ">
        <Search onChange={handleSearchChange} />
      </section>
      <section className="grid grid-cols-1 md:grid-cols-4 gap-2">
        {filteredProduct.map((product: IProduct) => {
          return (
            <ProductCard
              key={product.id}
              title={product.title}
              category={product.category}
              image={product.image}
              price={product.price}
            />
          );
        })}
      </section>
      <section className="p-2.5 flex justify-center items-center">
        <Pagination
          currentPage={currentPage}
          onChange={handlePageChange}
          endIndex={endIndex}
          itemsPerPage={itemsPerPage}
          startIndex={startIndex}
          possiblePages={possiblePages}
        />
      </section>
    </section>
  );
};
