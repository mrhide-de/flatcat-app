const Footer = ({ menu, theKey }) => {
  return (
    <footer className='fc_footer'>
    <ul>
    {menu.map((navItem, index) =>
      <li key={theKey+index} ><a href={navItem.url} target="_blank" rel="noreferrer">{navItem.name}</a></li>
    )}
    </ul>
    </footer>
  )
}
export default Footer
