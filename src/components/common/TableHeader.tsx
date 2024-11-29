import { Component, ReactNode } from "react";

interface TableHeaderProps {
  children: ReactNode;
}

interface TableHeaderState {}

class TableHeader extends Component<TableHeaderProps, TableHeaderState> {
  //state = { : }

  render() {
    return <th>{this.props.children}</th>;
  }
}

export default TableHeader;
