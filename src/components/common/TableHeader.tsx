import { Component } from "react";
import TableRow from "./TableRow";

export type Order = "asc" | "desc";

export type SortColumn = {
  path: string;
  order: Order;
};

interface TableHeaderProps {
  columns: Array<{ path?: string; label?: string; key?: string }>;
  sortColumn: SortColumn;
  onSort: (column: SortColumn) => void;
}

class TableHeader extends Component<TableHeaderProps, object> {
  raiseSort = (path: string) => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path)
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };

  render() {
    const { columns } = this.props;

    return (
      <thead>
        <TableRow>
          {columns.map((column) => (
            <th
              key={column?.path || column?.key}
              onClick={() => this.raiseSort(column.path as string)}
            >
              {column.label}
            </th>
          ))}
        </TableRow>
      </thead>
    );
  }
}

export default TableHeader;
