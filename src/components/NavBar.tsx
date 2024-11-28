import { Component } from "react";

interface NavBarProps {}

interface NavBarState {}

class NavBar extends Component<NavBarProps, NavBarState> {
  //state = { :  }
  render() {
    return (
      <nav className="navbar navbar-light bg-light">
        <a className="navbar-brand" href="#"></a>
      </nav>
    );
  }
}

export default NavBar;
