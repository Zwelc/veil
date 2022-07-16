import { useState } from "react";
import DataTableColumn from "./Column";
import DataTableRow from "./Row";
import TablePagination from "./Pagination";
import { getComparator } from "../../lib/sort";

function DataTable({ columns, rows }) {
  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState("hero");
  const [page, setPage] = useState(0);
  const [filter, setFilter] = useState(null);
  const rowsPerPage = 5;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleRequestSort = (e, name) => {
    const isAsc = orderBy === name && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(name);
  };

  const handleSort = (e, name) => {
    handleRequestSort(e, name);
  };
  const emptyRows = Math.max(0, (1 + page) * rowsPerPage - rows.length);
  return (
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
          <tr>
            {columns.map((column) => (
              <DataTableColumn column={column} key={column.id} />
            ))}
          </tr>
        </thead>
        <tbody>
          {rows
            .sort(getComparator(order, orderBy))
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row) => (
              <DataTableRow key={row.id} row={row} />
            ))}
          {emptyRows > 0 && (
            <tr
              className="bg-white border-b "
              style={{ height: 59 * emptyRows }}
            >
              <td className="px-6 py-3" colSpan={columns.length}></td>
            </tr>
          )}
        </tbody>

        <tfoot>
          <tr className="bg-white border-b  w-full">
            <td colSpan={columns.length}>
              <TablePagination
                span={2}
                count={rows.length}
                page={page}
                rowsPerPage={rowsPerPage}
                onPageChange={handleChangePage}
              />
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default DataTable;
