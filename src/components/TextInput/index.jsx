import "./styles.css";

export default function TextInput({ searchValue, event }) {
  return (
    <input
      className="text-input"
      onChange={event}
      value={searchValue}
      type="search"
    />
  );
}
