import React from "react";
import type { SimpleBookCardProps } from "../types/book.types";

const SimpleBookCard: React.FC<SimpleBookCardProps> = ({ title, author }) => (
  <div className="bg-gradient-to-br from-blue-50 to-purple-100 rounded-xl shadow-md p-6 flex flex-col items-start hover:shadow-lg transition-shadow duration-300 ">
    <h2 className="text-xl font-bold text-blue-800 mb-2">{title}</h2>
    <p className="text-gray-700 text-base">
      <span className="font-semibold">Author:</span> {author}
    </p>
  </div>
);

export default SimpleBookCard;
