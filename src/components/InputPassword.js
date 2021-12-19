const InputPassword = ({ props, handleHandler, preferences }) => {
  return (
      <label>{props.label}:
      <input
      type='password'
      value={preferences[props.preference]}
      onChange={(event) => handleHandler(props.handler, event.target.value)} />
      </label>
  )
}
export default InputPassword
