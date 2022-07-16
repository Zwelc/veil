import DataTableCell from "./Cell";

function DataTableRow({ row }) {
  const entries = Object.entries(row);
  return (
    <tr className="bg-white border-b">
      {entries.map((entry) => (
        <DataTableCell key={entry[0]} data={entry[1]} />
      ))}
    </tr>
  );
}

export default DataTableRow;
