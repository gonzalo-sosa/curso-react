import { Component } from "react";
import Joi from "joi-browser";
import Input from "./Input";
import Select from "./Select";

type Schema = {
  [k: string]: string;
};

type Data = {
  [k: string]: string | number;
};

type Error = {
  [k: string]: string;
};

type FormState = {
  data: Data;
  errors: Error;
};

class Form<Props, State extends FormState> extends Component<Props, State> {
  schema?: Schema;
  doSubmit?: () => void;

  state = {
    data: {},
    errors: {},
  } as State;

  validate = (): Error | null => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;

    const errors: Error = {};

    error.details.forEach((d: { path: string[]; message: string }) => {
      errors[d.path[0]] = d.message;
    });

    return errors;
  };

  validateProperty = ({
    name,
    value,
  }: HTMLInputElement | HTMLSelectElement): string | null => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema?.[name] };
    const { error } = Joi.validate(obj, schema);

    return error ? error.details[0].message : null;
  };

  handleChange = ({
    currentTarget: input,
  }: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);

    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };

    if (input.name in data) data[input.name] = input.value;

    this.setState({ data, errors });
  };

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    // Call the server
    this?.doSubmit?.();
  };

  renderDataList({ id, options }: { id: string; options: string[] }) {
    return (
      <datalist id={id}>
        {options.map((option, index) => (
          <option key={index} value={option}></option>
        ))}
      </datalist>
    );
  }

  renderSelect({
    name,
    label,
    options,
  }: {
    name: string;
    label: string;
    options: { _id: string; name: string }[];
  }) {
    const { data, errors } = this.state;

    return (
      <Select
        name={name}
        value={data[name]}
        label={label}
        error={errors[name]}
        options={options}
        onChange={this.handleChange}
      />
    );
  }

  renderInput({
    name,
    label,
    value,
    type = "text",
    autoFocus = false,
    ...rest
  }: {
    name: string;
    label: string;
  } & React.InputHTMLAttributes<HTMLInputElement>) {
    const { data, errors } = this.state;

    return (
      <Input
        {...rest}
        autoFocus={autoFocus}
        type={type}
        id={name}
        name={name}
        value={value ?? data[name]}
        onChange={this.handleChange}
        label={label}
        error={errors[name]}
      />
    );
  }

  renderButton(label: string) {
    return (
      <button
        disabled={!!this.validate()}
        type="submit"
        className="btn btn-primary mt-2"
      >
        {label}
      </button>
    );
  }
}

export default Form;
