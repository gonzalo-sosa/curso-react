import IMovie from "../models/Movie";
import Table from "./common/Table";
import TableRow from "./common/TableRow";
import TableData from "./common/TableData";
import Like from "./common/Like";
import { Component } from "react";
import { SortColumn } from "./ListOfMovies";

interface MoviesTableProps {
  movies: IMovie[];
  onLike: (movie: IMovie) => void;
  onDelete: (movieID: string) => void;
  onSort: (column: { path: string; order: "asc" | "desc" }) => void;
  sortColumn: SortColumn;
}

class MoviesTable extends Component<MoviesTableProps, object> {
  renderMovieData = ({
    title,
    genre: { name },
    numberInStock,
    dailyRentalRate,
  }: IMovie) => {
    return (
      <>
        <TableData>{title}</TableData>
        <TableData>{name}</TableData>
        <TableData>{numberInStock}</TableData>
        <TableData>{dailyRentalRate}</TableData>
      </>
    );
  };

  raiseSort = (path: string) => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path)
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };

  render() {
    const { movies, onLike, onDelete } = this.props;

    return (
      <Table>
        <thead>
          <TableRow>
            <th onClick={() => this.raiseSort("title")}>Title</th>
            <th onClick={() => this.raiseSort("genre.name")}>Genre</th>
            <th onClick={() => this.raiseSort("numberInStock")}>Stock</th>
            <th onClick={() => this.raiseSort("dailyRentalRate")}>Rate</th>
            <th></th>
            <th></th>
          </TableRow>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <TableRow key={movie._id}>
              {this.renderMovieData(movie)}
              <TableData>
                <Like
                  liked={movie.liked ?? false}
                  onClick={() => onLike(movie)}
                />
              </TableData>
              <TableData>
                <button
                  onClick={() => onDelete(movie._id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </TableData>
            </TableRow>
          ))}
        </tbody>
      </Table>
    );
  }
}

export default MoviesTable;
