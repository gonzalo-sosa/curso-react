import IMovie from "../models/Movie";
import Table from "./common/Table";
import TableRow from "./common/TableRow";
import TableData from "./common/TableData";
import Like from "./common/Like";
import { Component } from "react";
import TableHeader, { SortColumn } from "./common/TableHeader";

interface MoviesTableProps {
  movies: IMovie[];
  onLike: (movie: IMovie) => void;
  onDelete: (movieID: string) => void;
  onSort: (column: SortColumn) => void;
  sortColumn: SortColumn;
}

class MoviesTable extends Component<MoviesTableProps, object> {
  columns = [
    { path: "title", label: "Title" },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    { key: "like" },
    { key: "delete" },
  ];

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

  render() {
    const { movies, onLike, onDelete, onSort, sortColumn } = this.props;

    return (
      <Table>
        <TableHeader
          columns={this.columns}
          sortColumn={sortColumn}
          onSort={onSort}
        />
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
