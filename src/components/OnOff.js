const OnOff = ({ onOffOption }) => {
  return (
    <div className='fc_btn_onoff_wrap'>
      <div className='explaination'>
        <p>{onOffOption.help}</p>
      </div>
      <button
        className="fc_btn_onoff"
        value={onOffOption.value}
        onClick={onOffOption.onclick}
      >
      {onOffOption.value ? 'on' : 'off'}
      </button>
      <p>{onOffOption.label}</p>
    </div>
  )
}

export default OnOff
