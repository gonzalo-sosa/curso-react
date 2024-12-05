import { Form } from "./common/Form";
import Joi from "joi-browser";
import { login } from "../services/authService";
import { NavigateOptions, useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();

  return <LoginFormClass navigate={navigate} />;
};

type LoginFormProps = {
  navigate: (path: string, options?: NavigateOptions) => void;
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
      const { data: jwt } = await login(data.username, data.password);
      localStorage.setItem("token", jwt);
      this.props.navigate("/"); // window.location = "/"
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        const errors = { ...this.state.errors } as { [k: string]: string };
        errors["username"] = error.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
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
