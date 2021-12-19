const ButtonInteractive = ({ props, handleHandler, preferences }) => {
  if (preferences[props.preference]) { // WTF
    return (
      <div className='fc_btn_group' >
      <button
      className={`fc_btn ${preferences[props.preference].show_message && 'inactive' }
      ${preferences[props.preference].color}`}
      onClick={(event) => handleHandler(props.handler, preferences[props.preference])}
      >
      {`${preferences[props.preference].show_message ? preferences[props.preference].message : preferences[props.preference].label}`}
      </button>
      </div>
    )
  } else {
    return null
  }
}

export default ButtonInteractive
