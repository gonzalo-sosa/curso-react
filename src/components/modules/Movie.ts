import { uniqueId } from "lodash";
import IGenre from "../../models/Genre";
import IMovie from "../../models/Movie";
import { Genre } from "./Genre";

export class Movie implements IMovie{
  public readonly _id: string;
  public genre: IGenre;
  public liked?: boolean | undefined;

  constructor(public title: string, genre: string, public numberInStock: number, public dailyRentalRate: number, liked = false) {
    this._id = uniqueId();
    this.genre = new Genre(genre);
    this.liked = liked;
  }
}