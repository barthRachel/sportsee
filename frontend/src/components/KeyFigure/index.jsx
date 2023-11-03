import './KeyFigure.css'

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