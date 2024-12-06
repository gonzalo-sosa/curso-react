import { Component } from "react";
import UserContext from "./userContext";
import MovieRow from "./MovieRow";

class MovieList extends Component {
  static contextType = UserContext;

  render() {
    return (
      <UserContext.Consumer>
        {(userContext) => (
          <div>
            Movie List {userContext?.currentUser?.name ?? ""} <MovieRow />
          </div>
        )}
      </UserContext.Consumer>
    );
  }
}

// MovieList.contextType = UserContext

export default MovieList;
