import config from '../../config'

export const addJob = (token, jobDetails) => {
	var myHeaders = new Headers()
	myHeaders.append('Authorization', token)
	myHeaders.append('Content-Type', 'application/json')

	var raw = JSON.stringify({
		...jobDetails,
		mode: 'add'
	})

	var requestOptions = {
		method: 'POST',
		headers: myHeaders,
		body: raw,
		redirect: 'follow'
	}

	return fetch(config.server + '/cud_job', requestOptions)
		.then((response) => (response.type === 200 ? true : false))
		.catch((err) => {
			console.log(err)
			return false
		})
}

export const getJobs = (token) => {
	var myHeaders = new Headers()
	myHeaders.append('Authorization', token)
	myHeaders.append('Content-Type', 'application/json')

	var requestOptions = {
		method: 'GET',
		headers: myHeaders,
		redirect: 'follow'
	}

	return fetch(config.server + '/joblist', requestOptions)
		.then((response) => response.json())
		.then((res) => res)
		.catch((err) => {
			console.log(err)
			return false
		})
}
