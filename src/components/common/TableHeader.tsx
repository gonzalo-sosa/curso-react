import { Component, ReactNode } from "react";

interface TableHeaderProps {
  children: ReactNode;
  name?: string;
  onClick?: (arg: string) => void;
}

class TableHeader extends Component<TableHeaderProps, object> {
  //state = { : }

  render() {
    return (
      <th onClick={() => this.props?.onClick?.(this.props.name ?? "")}>
        {this.props.children}
      </th>
    );
  }
}

export default TableHeader;
