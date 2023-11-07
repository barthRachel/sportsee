import './KeyFigure.css'

/**
 * Composant des chiffres clés de l'utilisateur.
 * @param { Object }  
 * @returns { React.Component }
 */
function KeyFigure({logo, count, unit, title, classname}) {

    return (
        <div className='keyFigureWrapper'>
            <div className={`keyFigureLogoContainer ${classname}Logo`}>
                <img src={logo} alt={`${logo} figure`} />
            </div>
            <div className='countAndTitleContainer'>
                <p className='count'>{`${count}${unit}`}</p>
                <p className='subtitle'>{title}</p>
            </div>
        </div>
    )
}

export default KeyFigure