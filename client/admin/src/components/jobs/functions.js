import config from '../../config'

export const addJob = (token, jobDetails) => {
	let myHeaders = new Headers()
	myHeaders.append('Authorization', token)
	myHeaders.append('Content-Type', 'application/json')

	let raw = JSON.stringify({
		...jobDetails,
		mode: 'add'
	})

	let requestOptions = {
		method: 'POST',
		headers: myHeaders,
		body: raw,
		redirect: 'follow'
	}

	return fetch(config.server + '/cud_job', requestOptions)
		.then((response) => (response.status === 200 ? true : false))
		.catch((err) => {
			console.log(err)
			return false
		})
}

export const getJobs = (token) => {
	let myHeaders = new Headers()
	myHeaders.append('Authorization', token)
	myHeaders.append('Content-Type', 'application/json')

	let requestOptions = {
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

export const deleteJob = (token, id) => {
	let myHeaders = new Headers()
	myHeaders.append('Authorization', token)
	myHeaders.append('Content-Type', 'application/json')

	let raw = JSON.stringify({ mode: 'delete', job_id: id })

	let requestOptions = {
		method: 'POST',
		headers: myHeaders,
		body: raw,
		redirect: 'follow'
	}

	return fetch(config.server + '/cud_job', requestOptions)
		.then((response) => (response.status === 200 ? true : false))
		.catch((err) => {
			console.log(err)
			return false
		})
}
