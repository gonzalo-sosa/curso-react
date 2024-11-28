import { Component } from "react";
import Counter from "./Counter";
import ICounter from "../models/Counter";

interface CountersProps {
  counters: ICounter[];
  onReset: () => void;
  onIncrement: (counter: ICounter) => void;
  onDelete: (idToDelete: number) => void;
}

interface CountersState {}

class Counters extends Component<CountersProps, CountersState> {
  render() {
    return (
      <div className="container">
        <button
          className="btn btn-primary btn-sm m-2"
          onClick={this.props.onReset}
        >
          Reset
        </button>
        <div className="row justify-content-center align-items-center">
          {this.props.counters.map((counter) => (
            <div key={counter.id} className="col">
              <Counter
                key={counter.id}
                counter={counter}
                onIncrement={this.props.onIncrement}
                onDelete={this.props.onDelete}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Counters;
