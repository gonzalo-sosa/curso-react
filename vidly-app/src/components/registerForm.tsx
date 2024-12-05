import { Form } from "./common/Form";
import Joi from "joi-browser";
import * as userService from "../services/userService";
import { NavigateOptions, useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const navigate = useNavigate();

  return <RegisterFormClass navigate={navigate} />;
};

type RegisterFormProps = {
  navigate: (path: string, options?: NavigateOptions) => void;
};

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
      /* Utilizar el json web token si es existe */
      localStorage.setItem("token", response.headers["x-auth-token"]);
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
