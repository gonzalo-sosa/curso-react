import { Component } from "react";
import Table from "./Table";
import TableRow from "./TableRow";
import TableHeader from "./TableHeader";
import TableData from "./TableData";
import IMovie from "../models/Movie";
import MOVIES from "../services/fakeMovieService.js";

interface ListOfMoviesProps {}

interface ListOfMoviesState {}

class ListOfMovies extends Component<ListOfMoviesProps, ListOfMoviesState> {
  state = { movies: MOVIES as IMovie[] };

  handleDeleteMovie(id: string) {
    const movies = this.state.movies.filter(({ _id }) => _id !== id);
    this.setState({ movies });
  }

  render() {
    const { length: count } = this.state.movies;

    return count === 0 ? (
      <p>There are no movies in he database.</p>
    ) : (
      <>
        <p>Showing {count} in the database.</p>
        <Table>
          <thead>
            <TableRow>{this.renderHeaders()}</TableRow>
          </thead>
          <tbody>
            {this.state.movies.map((movie) => (
              <TableRow key={movie._id}>
                {this.renderMovieData(movie)}
                <TableData>
                  <button
                    onClick={() => this.handleDeleteMovie(movie._id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </TableData>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </>
    );
  }

  renderHeaders() {
    const headers = ["Title", "Genre", "Stock", "Rate", "Action"];

    return headers.map((header, index) => (
      <TableHeader key={index}>{header}</TableHeader>
    ));
  }

  renderMovieData({ title, genre, numberInStock, dailyRentalRate }: IMovie) {
    return (
      <>
        <TableData>{title}</TableData>
        <TableData>{genre.name}</TableData>
        <TableData>{numberInStock}</TableData>
        <TableData>{dailyRentalRate}</TableData>
      </>
    );
  }
}

export default ListOfMovies;
