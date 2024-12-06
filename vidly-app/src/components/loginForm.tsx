import { Form } from "./common/Form";
import Joi from "joi-browser";
import auth from "../services/authService";
import {
  useLocation,
  Location as LocationRouter,
  Navigate,
} from "react-router-dom";

const LoginForm = () => {
  const location = useLocation();

  return <LoginFormClass location={location} />;
};

type LoginFormProps = {
  location: LocationRouter;
};

type LoginFormState = {
  data: {};
  errors: {};
};

class LoginFormClass extends Form<LoginFormProps, LoginFormState> {
  state = {
    data: {
      username: "",
      password: "",
    },
    errors: {},
  };

  schema: { [k: string]: string } = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await auth.login(data.username, data.password);

      const { state } = this.props.location;

      window.location = state
        ? state.from.pathname
        : ("/" as string & Location); // full reload
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        const errors = { ...this.state.errors } as { [k: string]: string };
        errors["username"] = error.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    if (auth.getCurrentUser()) return <Navigate to="/" />;

    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput({
            name: "username",
            label: "Username",
            autoFocus: true,
          })}
          {this.renderInput({
            name: "password",
            label: "Password",
            type: "password",
          })}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
