import './Header.css';
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';

/**
 * Header de l'application.
 * @returns { React.Component }
 */
function Header() {
    return(
        <header>
            <img src={logo} alt='Logo SportSee'/>

            <nav>
                <ul>
                    <Link to='/' className='homepageLink'><li>Accueil</li></Link>
                    <li>Profil</li>
                    <li>Réglage</li>
                    <li>Communauté</li>
                </ul>
            </nav>
        </header>
    )
}

export default Header