import { Component, ReactNode } from "react";

interface TableProps {
  children: ReactNode;
}

interface TableState {}

class Table extends Component<TableProps, TableState> {
  //state = { :  }
  render() {
    return <table className="table table-striped">{this.props.children}</table>;
  }
}

export default Table;
