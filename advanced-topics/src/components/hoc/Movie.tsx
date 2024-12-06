import { Component } from "react";
import withTooltip from "./withTooltip";

type MovieProps = {
  id: string;
  showTooltip: boolean;
};

type MovieState = {};

class Movie extends Component<MovieProps, MovieState> {
  render() {
    return (
      <div>
        Movie {this.props.id}
        {this.props.showTooltip && <div>ToolTip</div>}
      </div>
    );
  }
}

export default withTooltip(Movie);
