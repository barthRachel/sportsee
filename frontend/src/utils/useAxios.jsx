import { useState, useEffect } from 'react'
import axios from 'axios';

function useAxios(urlAPI, userID, urlMockedData) {
	const [apiData, setApiData] = useState(null)
	const [mockedData, setMockedData] = useState(null)
	const [isLoading, setLoading] = useState(true)
	const [errorAPI, setErrorAPI] = useState(false)
	const [errorMocked, setErrorMocked] = useState(false)
	useEffect(() => {
		setLoading(true)
		async function fetchData(fetchURL, isDataMocked, errorSetState) {
			try {
				const response = await axios.get(fetchURL)
				if (isDataMocked === false) {
					setApiData(response.data)
				} else if (isDataMocked === true) {
					if (userID) {
 						setMockedData(
							(response.data).find(
								(item) =>
									item.id === parseInt(userID) ||
									item.userId === parseInt(userID)
							)
						) 
					}
				}
			} catch (err) {
				console.log(err)
				if (urlMockedData) {
					fetchData(urlMockedData, true, setErrorMocked)
				}
				errorSetState(true)
			} finally {
				setLoading(false)
			}
		}
		//fetchData(urlAPI, false, setErrorAPI)
        fetchData(urlAPI, true, setErrorAPI)
	}, [urlAPI, userID, urlMockedData])
	return { isLoading, apiData, mockedData, errorAPI, errorMocked }
}

export default useAxios