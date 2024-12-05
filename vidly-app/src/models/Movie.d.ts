import IGenre from "./Genre"

export default interface IMovie{
  readonly _id: string
  title: string
  genre: IGenre
  numberInStock: number
  dailyRentalRate: number
  publishDate?: string
  liked?: boolean
}
