import IMovie from "../models/Movie";
import IGenre from "../models/Genre";

export class Filter {
  filter<T>(list: T[], filter: Function, context: Object) {
    return list.filter((i) => filter.call(context, i));
  }
}

export class FilterPerGenre{
  constructor(private criteria: IGenre) {
  }

  exact(movie: IMovie) {
    console.log({ criteria: this.criteria, movie })
    return this.criteria._id === movie.genre._id
  }
}