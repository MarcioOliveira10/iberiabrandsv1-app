import "./styles.css";

export default function Button(props) {
  return (
    <button disabled={props.disabled} className="button" onClick={props.event}>
      {props.text}
    </button>
  );
}
