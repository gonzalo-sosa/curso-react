import { Component } from "react";
import auth from "../services/authService";

class Logout extends Component<object, object> {
  componentDidMount(): void {
    auth.logout();

    window.location = "/" as string & Location;
  }

  render() {
    return null;
  }
}

export default Logout;
