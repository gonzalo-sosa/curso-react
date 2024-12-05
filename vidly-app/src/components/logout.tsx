import { Component } from "react";

class Logout extends Component<object, object> {
  componentDidMount(): void {
    localStorage.removeItem("token");

    window.location = "/" as string & Location;
  }

  render() {
    return null;
  }
}

export default Logout;
