import './Header.css';
import logo from '../../assets/logo.png';

function Header() {
    return(
        <header>
            <img src={logo} alt='Logo SportSee'/>

            <nav>
                <ul>
                    <li>Accueil</li>
                    <li>Profil</li>
                    <li>Réglage</li>
                    <li>Communauté</li>
                </ul>
            </nav>
        </header>
    )
}

export default Header