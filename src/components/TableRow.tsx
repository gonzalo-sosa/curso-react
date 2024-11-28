import { Component, ReactNode } from "react";

interface TableRowProps {
  children: ReactNode;
}

interface TableRowState {}

class TableRow extends Component<TableRowProps, TableRowState> {
  //state = { :  }
  render() {
    return <tr>{this.props.children}</tr>;
  }
}

export default TableRow;
