import config from '../../config'

export const getStatus = (token, userId, jobId) => {
	let myHeaders = new Headers()
	myHeaders.append('Authorization', token)
	myHeaders.append('Content-Type', 'application/json')

	let raw = JSON.stringify({ mode: 'fetch', user_id: userId, job_id: jobId })

	let requestOptions = {
		method: 'POST',
		headers: myHeaders,
		body: raw,
		redirect: 'follow'
	}

	return fetch(config.server + '/update-status', requestOptions)
		.then((response) => response.json())
		.then((res) => res.status)
}

export const setDBStatus = (token, userId, jobId, status) => {
	let myHeaders = new Headers()
	myHeaders.append('Authorization', token)
	myHeaders.append('Content-Type', 'application/json')

	let raw = JSON.stringify({
		mode: 'update',
		user_id: userId,
		job_id: jobId,
		ustatus: status
	})

	let requestOptions = {
		method: 'POST',
		headers: myHeaders,
		body: raw,
		redirect: 'follow'
	}

	return fetch(config.server + '/update-status', requestOptions)
		.then((response) => (response.status === 200 ? true : false))
		.catch((err) => {
			console.log(err)
			return false
		})
}
