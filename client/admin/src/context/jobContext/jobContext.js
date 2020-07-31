import React, { createContext, useReducer } from 'react'

import { SET_LOADING, SET_JOB_DATA, SET_JOBS } from '../types'
import JobReducer from './jobReducer'

import config from '../../config'

const initialState = {
	jobData: {},
	jobs: [],
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

	const addJob = (token, jobDetails) => {
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

	const getJobs = (token) => {
		let myHeaders = new Headers()
		myHeaders.append('Authorization', token)
		myHeaders.append('Content-Type', 'application/json')

		let requestOptions = {
			method: 'GET',
			headers: myHeaders,
			redirect: 'follow'
		}

		fetch(config.server + '/joblist', requestOptions)
			.then((response) => response.json())
			.then((res) =>
				dispatch({
					type: SET_JOBS,
					payload: res.alljobs
				})
			)
			.catch((err) => {
				console.log(err)
				return false
			})
	}

	const deleteJob = (token, id) => {
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

	return (
		<JobContext.Provider
			value={{
				scanJobPdf,
				setLoading,
				getJobs,
				addJob,
				deleteJob,
				loading: state.loading,
				jobData: state.jobData,
				jobs: state.jobs
			}}
		>
			{children}
		</JobContext.Provider>
	)
}
