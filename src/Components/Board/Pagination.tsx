import React, { ReactElement } from "react";
interface Props {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  numberOfPages: number;
  maxToShow: number;
}

export default function Pagination({
  page,
  setPage,
  numberOfPages,
  maxToShow,
}: Props): ReactElement {
  const [pages, setPages] = React.useState<number[]>([]);

  const generatePages = (numberOfPages: number): void => {
    let pageList = [];
    for (let i = 1; i <= numberOfPages; i++) {
      pageList.push(i);
    }
    setPages(pageList);
  };

  const getShowingPageNumbers = (pages: number[]): number[] => {
    const PageIndex = Math.floor(page / maxToShow);
    const startingIndex =
      page % maxToShow === 0 ? page - maxToShow : PageIndex * maxToShow;
    const endingIndex =
      page % maxToShow === 0 ? page : (PageIndex + 1) * maxToShow;
    return pages.slice(startingIndex, endingIndex);
  };

  React.useEffect(() => {
    generatePages(numberOfPages);
  }, [numberOfPages]);

  if (!pages || !pages.length) return <div></div>;
  return (
    <div className="w-full mt-4">
      <div className="max-w-2xl mx-auto">
        <ul className="inline-flex">
          <li
            className="cursor-pointer select-none p-3 border-t border-l border-b rounded-l-lg bg-gray-100 flex items-center justify-center"
            onClick={() => setPage(page <= 1 ? page : page - 1)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              className="fill-current text-gray-600"
            >
              <title>nav-left</title>
              <g>
                <polygon points="7.92 0 1.92 6 7.92 12 10.02 9.9 6.12 6 10.02 2.1 7.92 0"></polygon>
              </g>
            </svg>
          </li>
          {pages.length &&
            getShowingPageNumbers(pages).map((pageNumber, i) => (
              <li
                key={i}
                onClick={() => setPage(pageNumber)}
                className={`cursor-pointer select-none p-3 px-4 border-t border-b text-gray-600 ${
                  pageNumber === page ? "font-medium bg-gray-100" : ""
                }`}
              >
                {pageNumber}
              </li>
            ))}
          <li
            className="cursor-pointer select-none p-3 flex justify-center items-center bg-gray-100 rounded-r-lg border-t border-r border-b"
            onClick={() => setPage(page >= numberOfPages ? page : page + 1)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              className="fill-current text-gray-600"
            >
              <title>nav-right</title>
              <g>
                <polygon points="1.98 2.1 5.88 6 1.98 9.9 4.08 12 10.08 6 4.08 0 1.98 2.1"></polygon>
              </g>
            </svg>
          </li>
        </ul>
      </div>
    </div>
  );
}
