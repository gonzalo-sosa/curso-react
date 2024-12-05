interface SearchProps {
  value: string;
  onChange: (value: string) => void;
}

const Search: React.FC<SearchProps> = ({ value, onChange }) => {
  return (
    <input
      type="text"
      name="query"
      className="form-control my-3"
      placeholder="Search..."
      value={value}
      onChange={(e) => onChange(e.currentTarget.value)}
    />
  );
};

export default Search;
