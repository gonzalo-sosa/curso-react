import { Component } from "react";
import Counter from "./Counter";
import ICounter from "../models/Counter";

interface CountersProps {
  counters: ICounter[];
  onReset: () => void;
  onIncrement: (counter: ICounter) => void;
  onDecrement: (counter: ICounter) => void;
  onDelete: (idToDelete: number) => void;
}

class Counters extends Component<CountersProps, object> {
  render() {
    const { counters, onReset, onIncrement, onDecrement, onDelete } =
      this.props;

    return (
      <div className="container">
        <button className="btn btn-primary btn-sm m-2" onClick={onReset}>
          Reset
        </button>
        <div className="row justify-content-center align-items-center">
          {counters.map((counter) => (
            <div key={counter.id} className="col">
              <Counter
                key={counter.id}
                counter={counter}
                onIncrement={onIncrement}
                onDecrement={onDecrement}
                onDelete={onDelete}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Counters;
