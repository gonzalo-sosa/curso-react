import IMovie from "../models/Movie";
import { Table } from "./common/Table/index";
import { Component } from "react";
import Like from "./common/Like";
import { SortColumn } from "./common/Table/types";
import { Link } from "react-router-dom";
import auth from "../services/authService";

interface MoviesTableProps {
  movies: IMovie[];
  onLike: (movie: IMovie) => void;
  onDelete: (movieID: string) => void;
  onSort: (column: SortColumn) => void;
  sortColumn: SortColumn;
}

class MoviesTable extends Component<MoviesTableProps, object> {
  columns = [
    {
      path: "title",
      content: (movie: IMovie) => (
        <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
      ),
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: (movie: IMovie) => (
        <Like
          liked={movie.liked ?? false}
          onClick={() => this.props.onLike(movie)}
        />
      ),
    },
  ];

  deleteColumn = {
    key: "delete",
    content: (movie: IMovie) => (
      <button
        onClick={() => this.props.onDelete(movie._id)}
        className="btn btn-danger"
      >
        Delete
      </button>
    ),
  };

  constructor(props: MoviesTableProps) {
    super(props);
    const user = auth.getCurrentUser();
    if (user && user.isAdmin) this.columns.push(this.deleteColumn);
  }

  render() {
    const { movies, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={movies}
        sortColumn={sortColumn}
        onSort={onSort}
      ></Table>
    );
  }
}

export default MoviesTable;
