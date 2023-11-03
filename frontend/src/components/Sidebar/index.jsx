import './Sidebar.css';
import althera from '../../assets/althera.png';
import bike from '../../assets/bike.png';
import swim from '../../assets/swim.png';
import yoga from '../../assets/yoga.png';

function Sidebar() {
    return(
        <aside className='sidebar'>
            <div className='buttonWrapper'>
                <div>
                    <img src={yoga} alt='icon'/>
                </div>
                <div>
                    <img src={swim} alt='icon'/>
                </div>
                <div>
                    <img src={bike} alt='icon'/>
                </div>
                <div>
                    <img src={althera} alt='icon'/>
                </div>
            </div>
                
            <p className='copyright'>Copiryght, SportSee 2020</p>
        </aside>
    )
}

export default Sidebar