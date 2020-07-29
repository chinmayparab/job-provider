import config from '../../config'

export const getAllCourses = () => {
	let raw = JSON.stringify({ category: '' })

	var myHeaders = new Headers()
	myHeaders.append('Content-Type', 'application/json')

	let requestOptions = {
		method: 'POST',
		headers: myHeaders,
		body: raw,
		redirect: 'follow'
	}

	return fetch(config.root + '/allcourses', requestOptions)
		.then((response) => response.json())
		.then((result) => result)
		.catch((error) => console.log('error', error))
}

export const addCourse = (data, token) => {
	let raw = JSON.stringify({
		mode: 'add',
		...data
	})

	var myHeaders = new Headers()
	myHeaders.append('Content-Type', 'application/json')
	myHeaders.append('Authorization', token)

	let requestOptions = {
		method: 'POST',
		headers: myHeaders,
		body: raw,
		redirect: 'follow'
	}

	return fetch(config.server + '/cud_courses', requestOptions)
		.then((response) => response.json())
		.then((result) => result)
		.catch((error) => console.log('error', error))
}
