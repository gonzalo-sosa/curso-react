import { uniqueId } from "lodash";
import IGenre from "../../models/Genre";
import { getGenres } from "../../services/fakeGenreService";

export class Genre implements IGenre {
  public readonly _id: string;
  public name: string;

  constructor(name: string) {
    const genres = getGenres();
    const index = genres.findIndex((val) => val.name.toLowerCase() === name.toLowerCase());
    if (index) {
      this._id = genres[index]._id;
      this.name = name;
    }
    else {
      this._id = uniqueId();
      this.name = name;
    }
  }
}