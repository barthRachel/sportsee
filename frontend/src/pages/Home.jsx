import '../css/Home.css';
import useFetch from '../utils/useFetch';

import ActivityChart from '../components/ActivityChart';
import AverageSessionsChart from '../components/AverageSessionsChart';
import KindActivityChart from '../components/KindActivityChart';
import ScoreChart from '../components/ScoreChart';
import KeyFigure from '../components/KeyFigure';

import apple from '../assets/apple.png';
import cheeseburger from '../assets/cheeseburger.png';
import chicken from '../assets/chicken.png';
import energy from '../assets/energy.png';


function Home() {
    // Id d'utilisateur ficitif pour pouvoir voir les données
    // A changer plus tard avec la récupération de celui-ci via la barre de recherche
    const userId = 18;

    // récupération des données de l'user via son id
    const user = useFetch(
        `http://localhost:3000/user/${userId}`,
        userId,
        '/mocked-data/user-main.json'
    )

    const activity = useFetch(
        `http://localhost:3000/user/${userId}/activity`,
        userId,
        '/mocked-data/user-activity.json'
    )

    const average_sessions = useFetch(
        `http://localhost:3000/user/${userId}/average-sessions`,
        userId,
        '/mocked-data/user-average-sessions.json'
    )

    const performance = useFetch(
        `http://localhost:3000/user/${userId}/performance`,
        userId,
        '/mocked-data/user-performance.json'
    )

    // retourne un objet objectData 
    const formatingData = (objectData, receiveData) => {
        if (receiveData.apiData) {
            objectData = receiveData.apiData
            return objectData
        } else if (receiveData.mockedData) {
            objectData = receiveData.mockedData
            return objectData
        }
    }

    let userData, activityData, average_sessionsData, performanceData = {};
    userData = formatingData(userData, user);
    activityData = formatingData(activityData, activity);
    average_sessionsData = formatingData(average_sessionsData, average_sessions);
    performanceData = formatingData(performanceData, performance);

    console.log(userData)
    console.log(activityData)
    console.log(average_sessionsData)
    console.log(performanceData)

    if (user.isLoading || activity.isLoading || average_sessions.isLoading || performance.isLoading) {
        return(
            <div className='loadingAndErrorContainer'>
                <h2>Chargement...</h2>
            </div>
        )
    }

    if ((user.errorAPI && user.errorMocked) || (activity.errorAPI && activity.errorMocked) || (average_sessions.errorAPI && average_sessions.errorMocked) || (performance.errorAPI && performance.errorMocked)) {
        return(
            <div className='loadingAndErrorContainer'>
                <h2>Chargement...</h2>
            </div>
        )
    }

    return(
        <main className='mainHome'>
            <div className='dashboardContainer'>
                
                <div className='profilContainer'>
                    <h1>Bonjour <span>{userData.userInfos.firstName}</span></h1>
                    <p>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
                </div>

                <div className='analyticsContainer'>
                    <div className='chartsContainer'>
                        <ActivityChart
                            activityData={activityData.sessions}
                        />

                        <div className='miniCharts'>
                            <div className='card'>
                                <AverageSessionsChart 
                                    averageData={average_sessionsData.sessions}
                                />
                            </div>

                            <div className='card'>
                                <KindActivityChart 
                                    kindData={performanceData}
                                />
                            </div>
                            
                            <div className='card'>
                                <ScoreChart
                                    data={userData}
                                />
                            </div>                            
                        </div>

                    </div>
                    <div className='keyFiguresContainer'>
                        <KeyFigure 
                            logo={energy}
                            count={userData.keyData.calorieCount}
                            unit='kCal'
                            title='Calories'
                            classname='calorie'
                        />

                        <KeyFigure 
                            logo={chicken}
                            count={userData.keyData.proteinCount}
                            unit='g'
                            title='Proteines'
                            classname='proteines'
                        />

                        <KeyFigure 
                            logo={apple}
                            count={userData.keyData.carbohydrateCount}
                            unit='g'
                            title='Glucides'
                            classname='glucide'
                        />

                        <KeyFigure 
                            logo={cheeseburger}
                            count={userData.keyData.lipidCount}
                            unit='g'
                            title='Lipides'
                            classname='lipide'
                        />
                    </div>
                </div>

            </div>
        </main>
    )
}

export default Home