export default function Checkbox({ classNmae, text, ...rest }) {
  return (
    <label classNmae={classNmae}>
      <input type="checkbox" {...rest} />
      <span> {text}</span>
    </label>
  );
}
