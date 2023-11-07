import '../css/Dashboard.css';
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
import { useParams } from 'react-router-dom';

/**
 * Tableau de bord de l'utilisateur
 * @returns { React.Component }
 */
function Dashboard() {

    const id = useParams().id

    const user = useFetch(
        `http://localhost:3000/user/${id}`,
        id,
        '/mocked-data/user-main.json'
    )

    const activity = useFetch(
        `http://localhost:3000/user/${id}/activity`,
        id,
        '/mocked-data/user-activity.json'
    )

    const average_sessions = useFetch(
        `http://localhost:3000/user/${id}/average-sessions`,
        id,
        '/mocked-data/user-average-sessions.json'
    )

    const performance = useFetch(
        `http://localhost:3000/user/${id}/performance`,
        id,
        '/mocked-data/user-performance.json'
    )

    /**
     * Standardise les données mockées et les données de l'API pour qu'elles soient mises en forme de la même manière.
     * @param { object } objectData 
     * @param { object } receiveData 
     * @returns { object }
     */
    const formatingData = (objectData, receiveData) => {
        if (receiveData.apiData) {
            objectData = receiveData.apiData
        } else if (receiveData.mockedData) {
            objectData = receiveData.mockedData
        }

        return objectData
    }

    let userData, activityData, average_sessionsData, performanceData = {};
    userData = formatingData(userData, user);
    activityData = formatingData(activityData, activity);
    average_sessionsData = formatingData(average_sessionsData, average_sessions);
    performanceData = formatingData(performanceData, performance);

    if (user.isLoading || activity.isLoading || average_sessions.isLoading || performance.isLoading) {
        return(
            <div className='loadingAndErrorContainer'>
                <h2>Chargement...</h2>
            </div>
        )
    }

    if ((user.errorAPI && user.errorMocked) || (activity.errorAPI && activity.errorMocked) || (average_sessions.errorAPI && average_sessions.errorMocked) || (performance.errorAPI && performance.errorMocked)) {
        console.log("user.errorMocked")
        return(
            <div className='loadingAndErrorContainer'>
                <h2>Une erreur est survenue !</h2>
            </div>
        )
    }

    return(
        <main className='mainDashboard'>
            <div className='dashboardContainer'>
                {
                    userData && (
                        <div className='profilContainer'>
                        <h1>Bonjour <span>{userData.userInfos.firstName}</span></h1>
                        <p>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
                    </div>
                    )
                }
                

                <div className='analyticsContainer'>
                    <div className='chartsContainer'>
                        {
                            activityData && (
                                <ActivityChart
                                    activityData={activityData.sessions}
                                />
                            )
                        }


                        <div className='miniCharts'>
                            {
                                average_sessionsData && (
                                    <div className='card'>
                                        <AverageSessionsChart 
                                            averageData={average_sessionsData.sessions}
                                        />
                                    </div>
                                )
                            }
                            

                            {
                                performanceData.kind && (
                                    <div className='card'>
                                        <KindActivityChart 
                                            kindData={performanceData}
                                        />
                                    </div>
                                )
                            }

                            {
                                userData && (
                                    <div className='card'>
                                        <ScoreChart
                                            data={userData}
                                        />
                                    </div>
                                )
                            }
                            
                            
                        </div>

                    </div>

                    {
                        userData && (
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
                        )
                    }
                </div>

            </div>
        </main>
    )
}

export default Dashboard