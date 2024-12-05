import { Component, ReactNode } from "react";

interface TableRowProps {
  children: ReactNode;
}

class TableRow extends Component<TableRowProps, object> {
  //state = { :  }
  render() {
    return <tr>{this.props.children}</tr>;
  }
}

export default TableRow;
