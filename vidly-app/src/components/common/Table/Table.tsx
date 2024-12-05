import TableBody from "./TableBody";
import TableHeader from "./TableHeader";
import { Column, SortColumn } from "./types";

interface TableProps<T> {
  columns: Column[];
  sortColumn: SortColumn;
  onSort: (column: SortColumn) => void;
  data: T[];
}

const Table = <T extends { _id: string }>({
  columns,
  sortColumn,
  onSort,
  data,
}: TableProps<T>): JSX.Element => {
  return (
    <table className="table table-striped">
      <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
      <TableBody columns={columns} data={data} />
    </table>
  );
};

export default Table;
