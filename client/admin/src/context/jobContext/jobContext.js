import React, { createContext, useReducer } from 'react'

import { SET_LOADING, SET_JOB_DATA } from '../types'
import JobReducer from './jobReducer'

import config from '../../config'

const initialState = {
	jobData: {},
	loading: false
}

export const JobContext = createContext(initialState)

export const JobProvider = ({ children }) => {
	const [state, dispatch] = useReducer(JobReducer, initialState)

	const setLoading = (value) => {
		dispatch({
			type: SET_LOADING,
			payload: value
		})
	}

	const scanJobPdf = (file, fileInput, token) => {
		let myHeaders = new Headers()

		myHeaders.append('Authorization', token)

		let formdata = new FormData()
		for (let i = 0; i < file.length; i++) {
			formdata.append('file', fileInput.files[0], file[i].name)
		}

		let requestOptions = {
			method: 'POST',
			body: formdata,
			headers: myHeaders,
			redirect: 'follow'
		}
		setLoading(true)
		fetch(config.server + '/post-job', requestOptions)
			.then((response) => response.json())
			.then((result) => {
				dispatch({
					type: SET_JOB_DATA,
					payload: result
				})
				setLoading(false)
			})
			.catch((error) => console.log('error', error))
	}

	return (
		<JobContext.Provider
			value={{
				scanJobPdf,
				setLoading,
				loading: state.loading,
				jobData: state.jobData
			}}
		>
			{children}
		</JobContext.Provider>
	)
}
