import { Form } from "./common/Form";
import Joi from "joi-browser";
import { getMovie, saveMovie } from "../services/fakeMovieService";
import IMovie from "../models/Movie";
import { getGenres } from "../services/fakeGenreService";
import {
  NavigateOptions,
  Params,
  useNavigate,
  useParams,
} from "react-router-dom";
import IGenre from "../models/Genre";

const MovieForm = () => {
  const params = useParams();
  const navigate = useNavigate();

  return <MovieFormClass params={params} navigate={navigate} />;
};

interface MovieFormProps {
  params?: Readonly<Params<string>>;
  navigate?: (path: string, options?: NavigateOptions) => void;
}

interface MovieFormState {
  genres: IGenre[] | [];
  data: {};
  errors: {};
}

class MovieFormClass extends Form<MovieFormProps, MovieFormState> {
  movieId?: string;

  state = {
    genres: [],
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    errors: {},
  } as MovieFormState;

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number().min(0).max(100).required().label("Stock"),
    dailyRentalRate: Joi.number().min(1).max(10).required().label("Rate"),
  };

  constructor(props: MovieFormProps) {
    super(props);
    this.movieId = this.props?.params?.id;
  }

  doSubmit = () => {
    saveMovie(this.state.data);

    this.props.navigate?.("/movies");
  };

  render() {
    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput({ name: "title", label: "Title" })}
          {this.renderSelect({
            name: "genreId",
            label: "Genre",
            options: this.state.genres,
          })}
          {this.renderInput({
            name: "numberInStock",
            label: "Number in Stock",
            type: "number",
          })}
          {this.renderInput({
            name: "dailyRentalRate",
            label: "Rate",
            type: "number",
          })}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }

  mapToViewModel = (movie: IMovie) => {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  };

  componentDidMount(): void {
    const genres = getGenres();
    this.setState({ genres });

    if (!this.movieId || this.movieId === "new") return;

    const movie = getMovie(this.movieId) as IMovie;
    if (!movie) return this.props.navigate?.("/not-found", { replace: true });

    this.setState({
      data: this.mapToViewModel(movie),
    });
  }
}

export default MovieForm;
