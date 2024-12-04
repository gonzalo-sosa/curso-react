import { Form } from "./common/Form";
import Joi from "joi-browser";

type LoginFormState = {
  data: {};
  errors: {};
};

class LoginForm extends Form<object, LoginFormState> {
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

  doSubmit = () => {
    console.log("Submitted");
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
