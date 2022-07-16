function DataTableColumn({ column }) {
  return (
    <th scope="col" className="py-3 px-6">
      {column.label}
    </th>
  );
}

export default DataTableColumn;
