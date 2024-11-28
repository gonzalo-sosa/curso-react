import { Component, ReactNode } from "react";

interface TableDataProps {
  children: ReactNode;
}

interface TableDataState {}

class TableData extends Component<TableDataProps, TableDataState> {
  //state = { :  }
  render() {
    return <td>{this.props.children}</td>;
  }
}

export default TableData;
