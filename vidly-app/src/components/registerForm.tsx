import { Form } from "./common/Form";
import Joi from "joi-browser";
import * as userService from "../services/userService";
import auth from "../services/authService";
const RegisterForm = () => {
  return <RegisterFormClass />;
};

type RegisterFormProps = {};

type RegisterFormState = {
  data: {};
  errors: {};
};

class RegisterFormClass extends Form<RegisterFormProps, RegisterFormState> {
  state = {
    data: {
      email: "",
      password: "",
      name: "",
    },
    errors: {},
  };

  schema = {
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().min(5).label("Password"),
    name: Joi.string().required().label("Name"),
  };

  doSubmit = async () => {
    try {
      const response = await userService.register(this.state.data);
      auth.loginWithJwt(response.headers["x-auth-token"]);
      window.location = "/" as string & Location; // full reload
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
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput({ name: "email", label: "Email", type: "email" })}
          {this.renderInput({
            name: "password",
            label: "Password",
            type: "password",
          })}
          {this.renderInput({ name: "name", label: "Name" })}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
