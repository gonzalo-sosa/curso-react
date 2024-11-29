type FilterByProps<T> = {
  items: T[];
  labels: string[];
  keys: string[];
  selectedItem: null | T;
  onItemSelect: (item: T) => void;
};

const FilterBy = <T extends object>({
  items,
  labels,
  keys,
  selectedItem,
  onItemSelect,
}: FilterByProps<T>): JSX.Element => {
  return (
    <ul className="list-group">
      {items.map((item, index) => {
        const classes =
          item === selectedItem ? "list-group-item active" : "list-group-item";

        return (
          <li
            key={keys[index]}
            className={classes}
            onClick={() => onItemSelect(item)}
          >
            {labels[index]}
          </li>
        );
      })}
    </ul>
  );
};

export default FilterBy;
