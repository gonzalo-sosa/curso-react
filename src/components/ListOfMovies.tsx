import { Component } from "react";
import IMovie from "../models/Movie";
import IGenre from "../models/Genre";
import { getMovies } from "../services/fakeMovieService.js";
import { getGenres } from "../services/fakeGenreService.js";
import { Filter, FilterPerGenre } from "../utils/filter.js";
import paginate from "../utils/paginate.js";
import FilterBy from "./common/FilterBy";
import MoviesTable from "./MoviesTables";
import Pagination from "./common/Pagination";
import _ from "lodash";
import { SortColumn } from "./common/types.js";

interface ListOfMoviesState {
  genres: IGenre[];
  movies: IMovie[];
  pageSize: number;
  currentPage: number;
  selectedGenre: null | IGenre;
  sortColumn: SortColumn;
}

const DEFAULT_PAGE_SIZE = 4;
const DEFAULT_CURRENT_PAGE = 1;

class ListOfMovies extends Component<object, ListOfMoviesState> {
  state = {
    genres: [] as IGenre[],
    movies: [] as IMovie[],
    pageSize: DEFAULT_PAGE_SIZE,
    currentPage: DEFAULT_CURRENT_PAGE,
    selectedGenre: null as IGenre | null,
    sortColumn: {
      path: "title",
      order: "asc",
    } as SortColumn,
  };

  componentDidMount(): void {
    const genres = [
      { _id: "", name: "All Genres" },
      ...getGenres(),
    ] as IGenre[];

    this.setState({
      genres,
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
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleSort = (sortColumn: SortColumn) => {
    this.setState({ sortColumn });
  };

  filterGenre = (genre: IGenre) => {
    const filter = new Filter();
    const filterByGenre = new FilterPerGenre(genre);

    return filter.filter(this.state.movies, filterByGenre.exact, filterByGenre);
  };

  getPageData = () => {
    const {
      movies: allMovies,
      selectedGenre,
      sortColumn,
      currentPage,
      pageSize,
    } = this.state;

    const filtered =
      selectedGenre && selectedGenre._id
        ? this.filterGenre(selectedGenre as IGenre)
        : allMovies;

    const sorted = _.orderBy(
      filtered,
      [sortColumn.path],
      [sortColumn.order]
    ) as IMovie[];

    const movies = paginate(sorted, currentPage, pageSize);

    return {
      totalCount: filtered.length,
      data: movies,
    };
  };

  render() {
    const { length: count } = this.state.movies;
    const {
      genres: allGenres,
      selectedGenre,
      currentPage,
      sortColumn,
      pageSize,
    } = this.state;

    if (count === 0) return <p>There are no movies in the database.</p>;

    const { totalCount, data: movies } = this.getPageData();

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
          <p>Showing {totalCount} in the database.</p>
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onLike={this.handleLikeMovie}
            onDelete={this.handleDeleteMovie}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default ListOfMovies;
