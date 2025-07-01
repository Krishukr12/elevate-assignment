import { useEffect, useState } from "react";
import { axiosInstances } from "../config/axios";
import { useParams, useNavigate } from "react-router";
import type { BookCardProps, SimpleBookCardProps } from "../types/book.types";
import { generateAISuggestionBooks } from "../utils/getAISuggestion";
import SimpleBookCard from "../components/SuggestionCard";
import { Loading } from "../components/Loading";

export const BookDetails = () => {
  const [book, setBook] = useState<BookCardProps | null>(null);
  const [suggestedBook, setSuggestedBook] = useState<SimpleBookCardProps[]>([]);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const getBookDetails = async () => {
      try {
        const res = await axiosInstances.get<BookCardProps>(`/books/${id}`);
        setBook(res.data);
        if (res.data) {
          const aiRes = await generateAISuggestionBooks(
            res.data.title,
            res.data.author
          );
          setSuggestedBook(aiRes);
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "error while fetching books details";
        console.log(errorMessage);
      }
    };

    getBookDetails();
  }, [id]);

  if (!book) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="text-gray-500">Loading...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center  bg-gray-50 py-8  gap-10 min-h-[91vh]">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-blue-700 mb-4">{book.title}</h2>
        <p className="text-gray-700 mb-2">
          <span className="font-semibold">Author:</span> {book.author}
        </p>
        <p className="text-gray-600 mb-2">
          <span className="font-semibold">Genre:</span> {book.genre}
        </p>
        <p className="text-blue-600 text-lg font-semibold mb-6">
          ${book.price}
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Back to Home
        </button>
      </div>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {suggestedBook.length === 0 ? (
          <Loading />
        ) : (
          suggestedBook.map((item: SimpleBookCardProps) => {
            return <SimpleBookCard author={item.author} title={item.title} />;
          })
        )}
      </section>
    </div>
  );
};
