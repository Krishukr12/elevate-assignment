import type { BookCardProps } from "../types/book.types";

import { useEffect, useState, useMemo } from "react";
import { axiosInstances } from "../config/axios";
import { BookCard } from "../components/BookCard";
import { Link } from "react-router";

export const HomePage = () => {
  const [data, setData] = useState<BookCardProps[]>([]);
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("title");

  useEffect(() => {
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
    getBooks();
  }, []);

  const genres = useMemo(() => {
    const allGenres = data.map((book) => book.genre);
    return ["All", ...Array.from(new Set(allGenres))];
  }, [data]);

  const filteredAndSortedBooks = useMemo(() => {
    let books = data;
    if (category !== "All") {
      books = books.filter((book) => book.genre === category);
    }
    if (sortBy === "title") {
      books = [...books].sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "price") {
      books = [...books].sort((a, b) => a.price - b.price);
    }
    return books;
  }, [data, category, sortBy]);

  const handleClearFilters = () => {
    setCategory("All");
    setSortBy("title");
  };

  const isFilterActive = category !== "All" || sortBy !== "title";

  return (
    <div className="p-5 md:p-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-end mb-6 gap-4">
        <div>
          <label className="font-semibold mr-2">Category:</label>
          <select
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="font-semibold mr-2">Sort by:</label>
          <select
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="title">Title</option>
            <option value="price">Price</option>
          </select>
        </div>
        <button
          onClick={handleClearFilters}
          disabled={!isFilterActive}
          className={`px-4 py-2 rounded font-semibold transition
            ${
              isFilterActive
                ? "bg-red-500 text-white hover:bg-red-600"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }
          `}
        >
          Clear Filter
        </button>
      </div>
      <section className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[75vh] overflow-scroll">
        {filteredAndSortedBooks.map((item: BookCardProps) => (
          <Link to={`/book/${item.id}`} key={item.id}>
            <BookCard
              author={item.author}
              genre={item.genre}
              price={item.price}
              title={item.title}
            />
          </Link>
        ))}
      </section>
    </div>
  );
};
