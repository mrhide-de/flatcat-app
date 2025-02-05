const Header = ({ preferences, toggleMenu }) => {
  return (
    <header className='fc_header'>

    <div
      className='header_svg'
      id='svg1'
    >
    <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
    <polygon points="0,100 28,40 70,0 100,0 0,0" />
    </svg>
    </div>
    <h1>{preferences.flatcat_name}</h1>
    <div
      className='header_svg'
      id='fc_triangle'
    >
    <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
    <polygon points="0,100 28,50 70,100 100,100" />
    </svg>
    </div>
    <button
      className={`fc_btn_option ${preferences.show_menu ? 'hidden' : ''}`}
      onClick={toggleMenu}>&#9881;
    </button>

    </header>
  )
}

export default Header
