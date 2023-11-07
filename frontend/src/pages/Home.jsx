import { Link } from 'react-router-dom';
import '../css/Home.css';

/**
 * Page d'accueil où on peut faire le choix de l'utilisateur
 * @returns { React.Component }
 */
function Home() {
    return(
        <main className='mainHome'>
            <div className='homeContainer'>
                <h1>Quel utilisateur voulez-vous être ?</h1>
                
                <div className='linkContainer'>
                    <Link to='/dashboard/12'>Utilisateur 12</Link>
                    <Link to='/dashboard/18'>Utilisateur 18</Link>
                </div>
            </div>
        </main>
    )
}

export default Home