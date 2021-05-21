interface IProps {
  countOfPages: number;
  currentPage: number;
  setPage: (page: number) => void;
}

export const Pagination = (props: IProps) => {
  const { countOfPages, currentPage, setPage } = props;
  const prevBtnHandler = () => {
    setPage(currentPage - 1);
  };

  const nextBtnHandler = () => {
    setPage(currentPage + 1);
  };
  const items = [];
  for (let i = 0; i < countOfPages; i++) {
    items.push(
      <li
        className={`transform transition duration-250 text-2xl border rounded-md w-8 text-center ml-1 mr-1 cursor-pointer  ${
          i + 1 === currentPage ? "bg-blue-400" : "hover:-translate-y-1"
        }`}
        key={i}
        onClick={setPage.bind(null, i + 1)}
      >
        {i + 1}
      </li>
    );
  }
  return (
    <ul className="flex justify-center mt-5 mb-5 items-center">
      <button
        onClick={prevBtnHandler}
        className="mr-4 text-3xl"
        disabled={currentPage <= 1}
      >
        &larr;
      </button>
      {items}
      <button
        onClick={nextBtnHandler}
        className="ml-4 text-3xl"
        disabled={currentPage >= countOfPages}
      >
        &rarr;
      </button>
    </ul>
  );
};
