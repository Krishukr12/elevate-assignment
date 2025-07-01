import React from "react";
import type { BookCardProps } from "../types/book.types";

export const BookCard: React.FC<BookCardProps> = ({
  title,
  author,
  genre,
  price,
}) => (
  <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col">
    <div className="p-6 flex-1 flex flex-col">
      <h2 className="text-lg font-bold text-gray-800 mb-2">{title}</h2>
      <p className="text-gray-600 mb-1">
        <span className="font-semibold">Author:</span> {author}
      </p>
      <p className="text-gray-500 mb-1">
        <span className="font-semibold">Genre:</span> {genre}
      </p>
      <div className="mt-auto pt-4">
        <span className="inline-block bg-blue-100 text-blue-700 text-sm font-semibold px-3 py-1 rounded-full">
          ${price.toFixed(2)}
        </span>
      </div>
    </div>
  </div>
);
