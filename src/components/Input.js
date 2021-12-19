const Input = ({ props, handleHandler, preferences }) => {
  return (
      <label>{props.label}:
        <input
        type="text"
        name="flatcat_name"
        value={preferences[props.preference]}
        onChange={(event) => handleHandler(props.handler, event.target.value)}
        />
        </label>
  )
}
export default Input
