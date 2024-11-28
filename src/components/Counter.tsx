import { Component } from "react";
import ICounter from "../models/Counter";

interface CounterProps {
  counter: ICounter;
  onIncrement: (counter: ICounter) => void;
  onDelete: (id: number) => void;
}

interface CounterState {}

class Counter extends Component<CounterProps, CounterState> {
  render() {
    return (
      <div className="d-flex flex-column justify-content-center">
        <span className="text-dark text-center">{this.formatCount()}</span>
        <button
          className="btn btn-secondary btn-sm m-2"
          onClick={() => this.props.onIncrement(this.props.counter)}
        >
          Increment
        </button>
        <button
          className="btn btn-danger btn-sm m-2"
          onClick={() => this.props.onDelete(this.props.counter.id)}
        >
          Delete
        </button>
      </div>
    );
  }

  formatCount() {
    if (this.props.counter.value === 0) return "Zero";
    return this.props.counter.value;
  }
}

export default Counter;
