import React, { createContext, useReducer } from 'react'

import { SET_COURSES } from '../types'
import CourseReducer from './courseReducer'

import config from '../../config'

const initialState = {
	courses: []
}

export const CourseContext = createContext(initialState)

export const CourseProvider = ({ children }) => {
	const [state, dispatch] = useReducer(CourseReducer, initialState)

	const getAllCourses = () => {
		let raw = JSON.stringify({ category: '' })

		var myHeaders = new Headers()
		myHeaders.append('Content-Type', 'application/json')

		let requestOptions = {
			method: 'POST',
			headers: myHeaders,
			body: raw,
			redirect: 'follow'
		}

		fetch(config.root + '/allcourses', requestOptions)
			.then((response) => response.json())
			.then((result) =>
				dispatch({
					type: SET_COURSES,
					payload: result
				})
			)
			.catch((error) => console.log('error', error))
	}

	const addCourse = (data, token) => {
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
			.then((response) => (response.status === 200 ? true : false))
			.catch((error) => console.log('error', error))
	}

	const deleteCourse = (token, id) => {
		let myHeaders = new Headers()
		myHeaders.append('Authorization', token)
		myHeaders.append('Content-Type', 'application/json')

		let raw = JSON.stringify({ mode: 'delete', course_id: id })

		let requestOptions = {
			method: 'POST',
			headers: myHeaders,
			body: raw,
			redirect: 'follow'
		}

		return fetch(config.server + '/cud_courses', requestOptions)
			.then((response) => (response.status === 200 ? true : false))
			.catch((err) => {
				console.log(err)
				return false
			})
	}

	return (
		<CourseContext.Provider
			value={{
				courses: state.courses,
				getAllCourses,
				addCourse,
				deleteCourse
			}}
		>
			{children}
		</CourseContext.Provider>
	)
}
