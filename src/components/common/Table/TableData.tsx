import { Component, ReactNode } from "react";

interface TableDataProps {
  children: ReactNode;
}

class TableData extends Component<TableDataProps, object> {
  //state = { :  }
  render() {
    return <td>{this.props.children}</td>;
  }
}

export default TableData;
