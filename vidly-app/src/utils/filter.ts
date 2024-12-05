import IMovie from "../models/Movie";
import IGenre from "../models/Genre";

export class Filter {
  filter<T>(list: T[], filter: (arg: T) => boolean, context: object): T[] {
    return list.filter((i) => filter.call(context, i));
  }
}

export class FilterPerGenre{
  constructor(private criteria: IGenre) {
  }

  exact(movie: IMovie): boolean {
    return this.criteria._id === movie.genre._id
  }
}

