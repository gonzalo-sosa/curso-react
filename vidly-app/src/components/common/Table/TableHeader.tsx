import { Component } from "react";
import TableRow from "./TableRow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortAsc, faSortDesc } from "@fortawesome/free-solid-svg-icons";
import { Column, SortColumn } from "./types";

interface TableHeaderProps {
  columns: Column[];
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

  renderSortIcon = (column: Column) => {
    const { sortColumn } = this.props;
    if (column.path !== sortColumn.path) return null;

    if (sortColumn.order === "asc") return <FontAwesomeIcon icon={faSortAsc} />;

    return <FontAwesomeIcon icon={faSortDesc} />;
  };

  render() {
    const { columns } = this.props;

    return (
      <thead>
        <TableRow>
          {columns.map((column) => (
            <th
              className="clickable"
              key={column?.path || column?.key}
              onClick={() => this.raiseSort(column.path as string)}
            >
              {column.label} {this.renderSortIcon(column)}
            </th>
          ))}
        </TableRow>
      </thead>
    );
  }
}

export default TableHeader;
