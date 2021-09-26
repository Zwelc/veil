export default function Summary(props) {
  return (
    <div className={props.style}>
      <div className={props.items}>{props.children}</div>
    </div>
  );
}
