import { useState, useEffect } from 'react'
import axios from 'axios';

function useAxios(urlAPI, userID, urlMockedData) {
	const [apiData, setApiData] = useState(null)
	const [mockedData, setMockedData] = useState(null)
	const [isLoading, setLoading] = useState(true)
	const [error, setError] = useState(false)
	const [errorMessage, setErrorMessage] = useState("")
	
	useEffect(() => {
		setLoading(true)
		async function fetchData(fetchURL, isDataMocked, errorSetState) {
			try {
				const response = await axios.get(fetchURL)
				if (isDataMocked === false) {
					setApiData(response.data)
				} else if (isDataMocked === true) {
					if (userID) {
						let mockedData = (response.data).find(
							(item) =>
								item.id === parseInt(userID) ||
								item.userId === parseInt(userID)
						)

						if(mockedData === undefined) {
							throw new Error("Aucune données mockées trouvées.")
						}
						
 						setMockedData(mockedData)
					}
				}
			} catch (err) {
				errorSetState(true)
				if(typeof err === "string") {
					setErrorMessage(err)
				} else {
					setErrorMessage(err.message)
				}
			} finally {
				setLoading(false)
			}
		}
		//fetchData(urlAPI, false, setError)
        fetchData(urlMockedData, true, setError)
	}, [urlAPI, userID, urlMockedData])
	return { isLoading, apiData, mockedData, error, errorMessage}
}

export default useAxios