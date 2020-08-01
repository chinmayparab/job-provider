import config from '../../config'

export const getSkills = () => {
	let myHeaders = new Headers()
	myHeaders.append('Content-Type', 'application/json')
	let raw = JSON.stringify({ skill: '' })

	let requestOptions = {
		method: 'POST',
		headers: myHeaders,
		body: raw,
		redirect: 'follow'
	}

	return fetch(config.root + '/allskills', requestOptions)
		.then((response) => response.json())
		.then((result) => result)
		.catch((error) => console.log('error', error))
}
