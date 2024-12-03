import { Component } from "react";
import "./App.css";
import ListOfMovies from "./components/ListOfMovies";
// import NavBar from "./components/routes/navbar";
import NavBar from "./components/NavBar";
import ICounter from "./models/Counter";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./components/routes/home";
import Products from "./components/routes/products";
import Posts from "./components/routes/posts";
import Dashboard from "./components/routes/admin/dashboard";
import NotFound from "./components/routes/notFound";
import ProductDetails from "./components/routes/productDetails";
import AdminUsers from "./components/routes/admin/users";
import AdminPosts from "./components/routes/admin/posts";
import Rentals from "./components/routes/rentals";
import Customers from "./components/routes/customers";
import Movie from "./components/routes/movie";
import LoginForm from "./components/loginForm";

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
            <Route path="/login" element={<LoginForm />} />
            <Route path="/movies" element={<ListOfMovies />} />
            <Route path="/movies/:id" element={<Movie />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/rentals" element={<Rentals />} />

            {/* Rutas anidadas */}
            <Route path="/admin" element={<Dashboard />}>
              <Route path="users" element={<AdminUsers />} />
              <Route path="posts" element={<AdminPosts />} />
            </Route>

            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/posts/:year?/:month?" element={<Posts />} />

            {/* Redirección */}
            <Route path="/messages" element={<Navigate to={"/posts"} />} />

            {/* Rutas para Error */}
            <Route path="/not-found" element={<NotFound />} />
            <Route path="/*" element={<Navigate to={"/not-found"} />} />
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
