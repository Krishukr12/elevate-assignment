export const Pagination = ({
  currentPage,
  possiblePages,
  onChange,
}: {
  currentPage: number;
  itemsPerPage: number;
  possiblePages: number;
  startIndex: number;
  endIndex: number;

  onChange: (pageNumber: number) => void;
}) => {
  const pages = new Array(possiblePages).fill("");

  const handlePrevClick = () => {
    onChange(currentPage - 1);
  };

  const handleNextClick = () => {
    onChange(currentPage + 1);
  };

  return (
    <div className="flex gap-1">
      <button
        onClick={handlePrevClick}
        disabled={currentPage === 1}
        className="shadow p-1 cursor-pointer disabled:cursor-not-allowed disabled:opacity-25 "
      >
        Prev
      </button>
      {pages.map((_, index) => {
        return (
          <button
            key={index}
            onClick={() => onChange(index + 1)}
            className="shadow px-2 py-1 cursor-pointer"
          >
            {index + 1}
          </button>
        );
      })}
      <button
        onClick={handleNextClick}
        disabled={currentPage === possiblePages}
        className="shadow p-1 cursor-pointer disabled:cursor-not-allowed disabled:opacity-25 "
      >
        Next
      </button>
    </div>
  );
};
