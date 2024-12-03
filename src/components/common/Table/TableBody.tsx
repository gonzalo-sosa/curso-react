import { Component } from "react";
import TableRow from "./TableRow";
import TableData from "./TableData";
import _ from "lodash";

interface Column<T> {
  path?: string;
  label?: string;
  key?: string;
  content?: (item: T) => JSX.Element;
}

interface TableBodyProps<T> {
  data: T[];
  columns: Column<T>[];
}

// interface TableBodyState {}

class TableBody<T extends { _id: string }> extends Component<
  TableBodyProps<T>,
  object
> {
  renderCell = (item: T, column: Column<T>) => {
    if (column.content) return column.content(item);

    return _.get(item, column.path as string);
  };

  createKey(item: T, column: Column<T>) {
    return item._id + (column.path || column.key);
  }

  render() {
    const { data, columns } = this.props;

    return (
      <tbody>
        {data.map((item) => (
          <TableRow key={item._id}>
            {columns.map((column) => {
              return (
                <TableData key={this.createKey(item, column)}>
                  {this.renderCell(item, column)}
                </TableData>
              );
            })}
          </TableRow>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
