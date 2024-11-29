import { Component } from "react";
import ICounter from "../models/Counter";

interface CounterProps {
  counter: ICounter;
  onIncrement: (counter: ICounter) => void;
  onDecrement: (counter: ICounter) => void;
  onDelete: (id: number) => void;
}

interface CounterState {}

class Counter extends Component<CounterProps, CounterState> {
  render() {
    return (
      <div className="row">
        <div className="col-3">
          <span className="badge badge-primary text-dark">
            {this.formatCount()}
          </span>
        </div>
        <div className="col">
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => this.props.onIncrement(this.props.counter)}
          >
            +
          </button>
          <button
            className="btn btn-secondary btn-sm m-2"
            disabled={this.props.counter.value === 0}
            onClick={() => this.props.onDecrement(this.props.counter)}
          >
            -
          </button>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => this.props.onDelete(this.props.counter.id)}
          >
            X
          </button>
        </div>
      </div>
    );
  }

  formatCount() {
    if (this.props.counter.value === 0) return "Zero";
    return this.props.counter.value;
  }
}

export default Counter;
