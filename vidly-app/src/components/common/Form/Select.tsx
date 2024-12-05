const Select = ({
  name,
  label,
  error,
  options,
  id,
  ...rest
}: {
  name: string;
  label: string;
  error: string;
  options: { _id: string; value: string }[];
} & React.SelectHTMLAttributes<HTMLSelectElement>) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <select name={name} id={id} {...rest} className="form-control">
        <option value=""></option>
        <option value=""></option>
        {options.map((option) => (
          <option key={option._id} value={option.value}></option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Select;
