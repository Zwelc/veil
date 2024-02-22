import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdFirstPage,
  MdLastPage,
} from "react-icons/md";

export default function TablePagination({
  count,
  page,
  rowsPerPage,
  onPageChange,
}: {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (event: any, newPage: any) => void;
}) {
  const handleFirstPageButtonClick = (e: any) => {
    onPageChange(e, 0);
  };

  const handleBackPageButtonClick = (e: any) => {
    onPageChange(e, page - 1);
  };

  const handleNextPageButtonClick = (e: any) => {
    onPageChange(e, page + 1);
  };

  const handleLastPageButtonClick = (e: any) => {
    onPageChange(e, Math.max(Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className="flex justify-end rounded-md shadow-sm px-6 py-3 items-center">
      <div className="px-6">
        <button
          type="button"
          disabled={page === 0}
          onClick={handleFirstPageButtonClick}
          className="btn "
        >
          <MdFirstPage />
        </button>
        <button
          type="button"
          disabled={page === 0}
          onClick={handleBackPageButtonClick}
          className="btn"
        >
          <MdKeyboardArrowLeft />
        </button>
        <button
          type="button"
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          onClick={handleNextPageButtonClick}
          className="btn "
        >
          <MdKeyboardArrowRight />
        </button>
        <button
          type="button"
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          onClick={handleLastPageButtonClick}
          className="btn "
        >
          <MdLastPage />
        </button>
      </div>
    </div>
  );
}
