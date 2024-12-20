import { Component } from "react";
import IMovie from "../models/Movie";
import IGenre from "../models/Genre";
import { deleteMovie, getMovies } from "../services/movieService.js";
import { getGenres } from "../services/genreService.js";
import { Filter, FilterPerGenre } from "../utils/filter.js";
import paginate from "../utils/paginate.js";
import FilterBy from "./common/FilterBy";
import MoviesTable from "./MoviesTables";
import Pagination from "./common/Pagination";
import _ from "lodash";
import { SortColumn } from "./common/Table/types.js";
import { Link } from "react-router-dom";
import Search from "./common/Search.js";
import { toast } from "react-toastify";

type ListOfMoviesProps = {
  user: {
    [k: string]: string;
  };
};

type ListOfMoviesState = {
  genres: IGenre[];
  movies: IMovie[];
  pageSize: number;
  currentPage: number;
  selectedGenre: null | IGenre;
  sortColumn: SortColumn;
  searchQuery: string;
};

const DEFAULT_PAGE_SIZE = 4;
const DEFAULT_CURRENT_PAGE = 1;

class ListOfMovies extends Component<ListOfMoviesProps, ListOfMoviesState> {
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
    searchQuery: "",
  };

  async componentDidMount() {
    const { data } = await getGenres();

    const genres = [{ _id: "", name: "All Genres" }, ...data] as IGenre[];

    const { data: movies } = await getMovies();
    this.setState({
      genres,
      movies: movies as IMovie[],
    });
  }

  handleDeleteMovie = async (id: string) => {
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter(({ _id }) => _id !== id);
    this.setState({ movies });

    try {
      await deleteMovie(id);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response && error.response.status == 404)
        toast.error("This movie has already been deleted.");

      this.setState({ movies: originalMovies });
    }
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
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
  };

  handleSort = (sortColumn: SortColumn) => {
    this.setState({ sortColumn });
  };

  handleMovieSearch = (query: string) => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
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
      searchQuery,
    } = this.state;

    let filtered = allMovies;
    if (searchQuery)
      filtered = allMovies.filter((m) =>
        m.title.toLocaleLowerCase().startsWith(searchQuery.toLocaleLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filtered = this.filterGenre(selectedGenre as IGenre);

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
      searchQuery,
    } = this.state;
    const { user } = this.props;

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
          {user && (
            <Link className="btn btn-primary" to="/movies/new">
              New Movie
            </Link>
          )}
          <p>Showing {totalCount} in the database.</p>
          <Search value={searchQuery} onChange={this.handleMovieSearch} />
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
