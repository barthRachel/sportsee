import './ScoreChart.css';
import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts';

/**
 * Affichage du remplissage de l'objectif moyen de l'utilisateur sous la forme d'un RadialBarChart en utilisant Recharts.
 * @param { Object } data 
 * @returns { React.Component }
 */
function ScoreChart({data}) {    
    const score = data.todayScore ? data.todayScore : data.score
	const dataArray = [{ name: 'score', value: score }]
	return (
		<div className='scoreChartContainer'>
			<h3 className="scoreChartTitle">Score</h3>
			<ResponsiveContainer width="100%" height="100%" className={"centerChart"}>
				<RadialBarChart
					innerRadius="0%"
					outerRadius="0%"
					data={dataArray}
					startAngle={90}
					endAngle={450}
				>
					<RadialBar
						data={[{ value: 1 }]}
						dataKey="value"
						barSize={170}
						fill="#FFF"
						isAnimationActive={false}
					/>
					<RadialBar
						dataKey="value"
						barSize={10}
						cornerRadius={100}
						fill="#FF0000"
					/>
				</RadialBarChart>
			</ResponsiveContainer>
			<div className="scoreChartLabel centerChart">
				<p className="percent">
					{data.score && data.score * 100}
					{data.todayScore && data.todayScore * 100}%
				</p>
				<p>de votre</p>
				<p>objectif</p>
			</div>
		</div>
	)
}

export default ScoreChart