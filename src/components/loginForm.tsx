import { Component } from "react";
//import { createRef, RefObject } from "react";
import Input from "./common/Form/Input";
import Joi from "joi-browser";

type Account = {
  username: string;
  password: string;
};
type AccountKeys = keyof Account;
type Error = {
  [K in keyof Account]?: Account[K];
};
//interface LoginFormProps {}
interface LoginFormState {
  account: Account;
  errors: Error;
}

class LoginForm extends Component<object, LoginFormState> {
  state: Readonly<LoginFormState> = {
    account: {
      username: "",
      password: "",
    },
    errors: {},
  };

  schema: { [k: string]: string } = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  //username: RefObject<HTMLInputElement> = createRef();
  //password: RefObject<HTMLInputElement> = createRef();

  validate = (): Error | null => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.account, this.schema, options);
    if (!error) return null;

    const errors: Error = {};

    error.details.forEach((d: any) => {
      errors[d.path[0] as AccountKeys] = d.message;
    });

    return errors;
  };

  validateProperty = ({ name, value }: HTMLInputElement): string | null => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleChange = ({
    currentTarget: input,
  }: React.ChangeEvent<HTMLInputElement>) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    const account = { ...this.state.account };

    if (errorMessage) {
      errors[input.name as AccountKeys] = errorMessage;
    } else {
      delete errors[input.name as AccountKeys];
    }

    if (input.name in account) {
      account[input.name as AccountKeys] = input.value;
    }

    this.setState({ account, errors });
  };

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = this.validate();

    console.log(errors);

    this.setState({ errors: errors || {} });

    if (errors) return;

    console.log("Submitted");

    //const username = this.username.current?.value;
    //console.log(username);
  };

  render() {
    const { account, errors } = this.state;

    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            type="text"
            autofocus
            id="username"
            name="username"
            value={account.username}
            onChange={this.handleChange}
            label="Username"
            error={errors.username}
          />
          <Input
            type="text"
            autofocus
            id="password"
            name="password"
            value={account.password}
            onChange={this.handleChange}
            label="Password"
            error={errors.password}
          />
          <button type="submit" className="btn btn-primary mt-2">
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
