import { faFaceAngry } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer data-testid='footer-element' className='footer footer-center p-10 bg-base-100 text-base-content rounded'>
      <nav className='grid grid-flow-col gap-4'>
        <Link to='/movies'>Movies</Link>
        <li>
          <Link to='/tv-shows'>Tv Shows</Link>
        </li>
        <li>
          <Link to='/people'>People</Link>
        </li>
      </nav>
      <nav>
        <div className='grid grid-flow-col gap-4'>
          <a target='_blank' href='https://github.com/frank-mendez'>
            <FontAwesomeIcon icon={faFaceAngry} />
          </a>
          <a target='_blank' href='https://www.linkedin.com/in/frank-mendez-47b62090/'>
            <FontAwesomeIcon icon={faFaceAngry} />
          </a>
          <a target='_blank' href='https://www.facebook.com/frankmendezzz/'>
            <FontAwesomeIcon icon={faFaceAngry} />
          </a>
          <a target='_blank' href='https://www.instagram.com/frankmendezph/'>
            <FontAwesomeIcon icon={faFaceAngry} />
          </a>
        </div>
      </nav>
      <aside>
        <p data-testid='copyright-element'>Copyright © 2024 - Frank Mendez</p>
      </aside>
    </footer>
  )
}

export default Footer
