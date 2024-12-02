import { Component } from "react";
import "./App.css";
import ListOfMovies from "./components/ListOfMovies";
import NavBar from "./components/routes/navbar";
import ICounter from "./models/Counter";
import { Route, Routes } from "react-router-dom";
import Home from "./components/routes/home";
import Products from "./components/routes/products";
import Posts from "./components/routes/posts";
import Dashboard from "./components/routes/admin/dashboard";
import NotFound from "./components/routes/notFound";
import ProductDetails from "./components/routes/productDetails";

interface AppState {
  counters: ICounter[];
}

class App extends Component<object, AppState> {
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

    counters[index] = { ...counter };
    counters[index].value++;
    this.setState({ counters });
  };

  handleDecrement = (counter: ICounter) => {
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);

    counters[index] = { ...counter };
    counters[index].value--;
    this.setState({ counters });
  };

  // Si no es flecha pierde referencia del this
  handleDelete = (idToDelete: number) => {
    const counters = this.state.counters.filter(({ id }) => id !== idToDelete);
    this.setState({ counters });
  };

  render() {
    console.log("App - Rendered");

    return (
      <>
        {/* <NavBar
          totalCounters={this.state.counters.filter((c) => c.value > 0).length}
        /> */}
        <NavBar />
        <main className="container">
          <Routes>
            <Route index element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/posts/:year?/:month?" element={<Posts />} />
            <Route path="/admin" element={<Dashboard match={undefined} />} />
            <Route path="/movies" element={<ListOfMovies />} />
            <Route errorElement={<NotFound />} />
          </Routes>

          {/* <Counters
            counters={this.state.counters}
            onReset={this.handleReset}
            onIncrement={this.handleIncrement}
            onDecrement={this.handleDecrement}
            onDelete={this.handleDelete}
          /> */}
        </main>
      </>
    );
  }
}

export default App;
