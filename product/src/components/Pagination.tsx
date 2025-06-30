export const Pagination = ({
  itemsPerPageChange,
  currentPage,
  possiblePages,
  onChange,
}: {
  itemsPerPageChange: (value: number) => void;
  currentPage: number;
  possiblePages: number;
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
    <div className="flex gap-12">
      <section>
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
              className={` ${
                currentPage === index + 1 ? "bg-amber-400" : ""
              } shadow px-2 py-1 cursor-pointer`}
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
      </section>
      <section className="flex gap-1">
        <span>Items per page</span>
        <select onChange={(e) => itemsPerPageChange(Number(e.target.value))}>
          <option value={5}>5</option>
          <option selected value={10}>
            10
          </option>
          <option value={20}>20</option>
        </select>
      </section>
    </div>
  );
};
