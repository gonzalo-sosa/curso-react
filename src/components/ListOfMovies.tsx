import { Component } from "react";
import Table from "./common/Table.js";
import TableRow from "./common/TableRow.js";
import TableHeader from "./common/TableHeader.js";
import TableData from "./common/TableData.js";
import Like from "./common/Like.js";
import Pagination from "./common/Pagination.js";
import paginate from "../utils/paginate.js";
import FilterBy from "./common/FilterBy.js";
import { getMovies } from "../services/fakeMovieService.js";
import { getGenres } from "../services/fakeGenreService.js";
import IMovie from "../models/Movie";
import IGenre from "../models/Genre.js";
import { Filter, FilterPerGenre } from "../utils/filter.js";

interface ListOfMoviesProps {}

interface ListOfMoviesState {
  genres: IGenre[];
  movies: IMovie[];
  pageSize: number;
  currentPage: number;
  selectedGenre: null | IGenre;
}

const DEFAULT_PAGE_SIZE = 4;
const DEFAULT_CURRENT_PAGE = 1;

class ListOfMovies extends Component<ListOfMoviesProps, ListOfMoviesState> {
  state = {
    genres: [] as IGenre[],
    movies: [] as IMovie[],
    pageSize: DEFAULT_PAGE_SIZE,
    currentPage: DEFAULT_CURRENT_PAGE,
    selectedGenre: null,
  };

  componentDidMount(): void {
    this.setState({
      genres: getGenres() as IGenre[],
      movies: getMovies() as IMovie[],
    });
  }

  handleDeleteMovie = (id: string) => {
    const movies = this.state.movies.filter(({ _id }) => _id !== id);
    this.setState({ movies });
  };

  handleLikeMovie = (movie: IMovie) => {
    const movies = [...this.state.movies];
    const index = this.state.movies.indexOf(movie);

    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = (page: number) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre: IGenre) => {
    this.setState({ selectedGenre: genre });
  };

  filterGenre = (genre: IGenre) => {
    const filter = new Filter();
    const filterByGenre = new FilterPerGenre(genre);

    return filter.filter(this.state.movies, filterByGenre.exact, filterByGenre);
  };
  render() {
    const {
      genres: allGenres,
      movies: allMovies,
      pageSize,
      currentPage,
      selectedGenre,
    } = this.state;
    const { length: count } = allMovies;

    if (count === 0) return <p>There are no movies in he database.</p>;

    const filtered = selectedGenre
      ? this.filterGenre(selectedGenre as IGenre)
      : allMovies;

    console.log(filtered);

    const movies = paginate(filtered, currentPage, pageSize);

    return (
      <div className="row">
        <div className="col-2">
          <FilterBy
            items={allGenres}
            keys={allGenres.map((g) => g._id)}
            labels={allGenres.map((g) => g.name)}
            onItemSelect={this.handleGenreSelect}
            selectedItem={selectedGenre}
          />
        </div>
        <div className="col">
          <p>Showing {count} in the database.</p>
          <Table>
            <thead>
              <TableRow>{this.renderHeaders()}</TableRow>
            </thead>
            <tbody>
              {movies.map((movie) => (
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
          <Pagination
            itemsCount={filtered.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }

  renderHeaders() {
    const headers = ["Title", "Genre", "Stock", "Rate", "Like", "Action"];

    return headers.map((header, index) => (
      <TableHeader key={index}>{header}</TableHeader>
    ));
  }

  renderMovieData(movie: IMovie) {
    return (
      <>
        <TableData>{movie.title}</TableData>
        <TableData>{movie.genre.name}</TableData>
        <TableData>{movie.numberInStock}</TableData>
        <TableData>{movie.dailyRentalRate}</TableData>
        <TableData>
          <Like
            liked={movie.liked ?? false}
            onClick={() => this.handleLikeMovie(movie)}
          />
        </TableData>
      </>
    );
  }
}

export default ListOfMovies;
