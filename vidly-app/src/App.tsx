// import NavBar from "./components/routes/navbar";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { Component } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AdminPosts from "./components/routes/admin/posts";
import AdminUsers from "./components/routes/admin/users";
import auth from "./services/authService";
import Customers from "./components/routes/customers";
import Dashboard from "./components/routes/admin/dashboard";
import Home from "./components/routes/home";
import ListOfMovies from "./components/ListOfMovies";
import LoginForm from "./components/loginForm";
import Logout from "./components/logout";
import MovieForm from "./components/movieForm";
import NavBar from "./components/NavBar";
import NotFound from "./components/routes/notFound";
import Posts from "./components/routes/posts";
import ProductDetails from "./components/routes/productDetails";
import Products from "./components/routes/products";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import RegisterForm from "./components/registerForm";
import Rentals from "./components/routes/rentals";

type AppState = {
  user: {
    [k: string]: string;
  };
};

class App extends Component<object, AppState> {
  componentDidMount(): void {
    try {
      const user = auth.getCurrentUser();
      this.setState({ user });
    } catch (error) {}
  }
  render() {
    console.log("App - Rendered");
    const { user } = this.state;

    return (
      <>
        <ToastContainer />
        <NavBar user={user} />
        <main className="container">
          <Routes>
            <Route index element={<Home />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/logout" element={<Logout />} />

            <Route path="/movies">
              <Route index element={<ListOfMovies user={user} />} />
              <ProtectedRoute path=":id" redirectTo="/login">
                <MovieForm />
              </ProtectedRoute>
              <Route path="new" element={<MovieForm />} />
            </Route>

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
        </main>
      </>
    );
  }
}

export default App;

/*
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

  
  {<NavBar
    totalCounters={this.state.counters.filter((c) => c.value > 0).length}
  />} 

  {<Counters
    counters={this.state.counters}
    onReset={this.handleReset}
    onIncrement={this.handleIncrement}
    onDecrement={this.handleDecrement}
    onDelete={this.handleDelete}
  />}
*/
