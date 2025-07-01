import { useEffect, useState } from "react";

import { axiosInstances } from "../config/axios";
import type { BookCardProps } from "../types/book.types";
import { BookCard } from "../components/BookCard";
import { Link } from "react-router";

export const HomePage = () => {
  const [data, setData] = useState<BookCardProps[]>([]);
  const getBooks = async () => {
    try {
      const res = await axiosInstances.get("/books");
      setData(res.data);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "error while fetching books";
      console.log(errorMessage);
    }
  };
  useEffect(() => {
    getBooks();
  }, []);

  return (
    <section className="grid grid-cols-1 md:grid-cols-4 gap-1 p-4 ">
      {data.map((item: BookCardProps) => {
        return (
          <Link to={`/book/${item.id}`}>
            <BookCard
              author={item.author}
              genre={item.genre}
              price={item.price}
              title={item.title}
            />
          </Link>
        );
      })}
    </section>
  );
};
