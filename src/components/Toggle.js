const Toggle = ({ props, handleHandler, preferences }) => {
  return (
    <div className='fc_btn_onoff_wrap' >
      <div className='explaination'>
        <p>{props.help}</p>
      </div>
      <button
        className="fc_btn_onoff"
        value={preferences[props.preference]}
        onClick={(event) => handleHandler(props.handler, event.target.value)}
      >
      {preferences[props.preference] ? 'on' : 'off'}
      </button>
      <p>{props.label}</p>
    </div>
  )
}

export default Toggle
