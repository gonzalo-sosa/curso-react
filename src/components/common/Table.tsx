import { Component, ReactNode } from "react";

interface TableProps {
  children: ReactNode;
}

class Table extends Component<TableProps, object> {
  //state = { :  }
  render() {
    return <table className="table table-striped">{this.props.children}</table>;
  }
}

export default Table;
