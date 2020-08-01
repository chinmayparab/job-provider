import React, { createContext, useReducer } from 'react'

import { SET_LOADING, SET_JOB_DATA, SET_JOBS, SET_POSTED_JOBS } from '../types'
import JobReducer from './jobReducer'

import config from '../../config'

const initialState = {
	jobData: {},
	jobs: [],
	postedJobs: [],
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

	const getJobs = () => {
		let myHeaders = new Headers()
		myHeaders.append('Content-Type', 'application/json')

		let raw = JSON.stringify({ title: '', location: '', start: '', end: '' })

		let requestOptions = {
			method: 'POST',
			headers: myHeaders,
			body: raw,
			redirect: 'follow'
		}

		fetch(config.root + '/fetch-jobs', requestOptions)
			.then((response) => response.json())
			.then((res) =>
				dispatch({
					type: SET_JOBS,
					payload: res
				})
			)
			.catch((err) => {
				console.log(err)
				return false
			})
	}

	const getPostedJobs = (token) => {
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
					type: SET_POSTED_JOBS,
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

	const getApplicants = (token, id) => {
		let myHeaders = new Headers()
		myHeaders.append('Authorization', token)
		myHeaders.append('Content-Type', 'application/json')

		let raw = JSON.stringify({ job_id: id })

		let requestOptions = {
			method: 'POST',
			headers: myHeaders,
			body: raw,
			redirect: 'follow'
		}

		return fetch(config.server + '/applicants-jobs', requestOptions)
			.then((response) => response.json())
			.then((result) => {
				if (
					typeof result['jobs-applicants'] === 'object' &&
					result['jobs-applicants'].length > 0
				) {
					return result['jobs-applicants']
				} else {
					return false
				}
			})
			.catch((error) => {
				console.log('error', error)
				return false
			})
	}

	const getApplicantDetails = (token, id) => {
		var myHeaders = new Headers()
		myHeaders.append('Authorization', token)
		myHeaders.append('Content-Type', 'application/json')

		var raw = JSON.stringify({ user_id: id })

		var requestOptions = {
			method: 'POST',
			headers: myHeaders,
			body: raw,
			redirect: 'follow'
		}

		return fetch(config.server + '/applicants-details', requestOptions)
			.then((response) => response.json())
			.then((result) => {
				// console.log(result)
				if (result) {
					return result
				} else {
					return false
				}
			})
			.catch((error) => {
				console.log('error', error)
				return false
			})
	}

	return (
		<JobContext.Provider
			value={{
				scanJobPdf,
				setLoading,
				getJobs,
				getPostedJobs,
				addJob,
				deleteJob,
				getApplicants,
				getApplicantDetails,
				loading: state.loading,
				jobData: state.jobData,
				jobs: state.jobs,
				postedJobs: state.postedJobs
			}}
		>
			{children}
		</JobContext.Provider>
	)
}
