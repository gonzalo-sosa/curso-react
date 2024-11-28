import { Component } from "react";
import "./App.css";
import Counters from "./components/Counters";
import ListOfMovies from "./components/ListOfMovies";
import NavBar from "./components/NavBar";
import ICounter from "./models/Counter";

interface AppProps {}

interface AppState {
  counters: ICounter[];
}

class App extends Component<AppProps, AppState> {
  state = {
    counters: [
      { id: 1, value: 4 },
      { id: 2, value: 0 },
      { id: 3, value: 0 },
      { id: 4, value: 0 },
    ],
  };

  handleReset = () => {
    const counters = this.state.counters.map((counter) => {
      counter.value = 0;
      return counter;
    });
    this.setState({ counters });
  };

  handleIncrement = (counter: ICounter) => {
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);

    if (index) {
      counters[index] = { ...counter };
      counters[index].value++;
      this.setState({ counters });
    }
  };

  // Si no es flecha pierde referencia del this
  handleDelete = (idToDelete: number) => {
    const counters = this.state.counters.filter(({ id }) => id !== idToDelete);
    this.setState({ counters });
  };

  render() {
    return (
      <>
        <NavBar />
        <main className="container">
          <ListOfMovies />
          <Counters
            counters={this.state.counters}
            onReset={this.handleReset}
            onIncrement={this.handleIncrement}
            onDelete={this.handleDelete}
          />
        </main>
      </>
    );
  }
}

export default App;
