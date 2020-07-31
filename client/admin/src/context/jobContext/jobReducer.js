import { SET_LOADING, SET_JOB_DATA, SET_JOBS, SET_POSTED_JOBS } from '../types'

export default (state, action) => {
	switch (action.type) {
		case SET_LOADING:
			return {
				...state,
				loading: action.payload
			}
		case SET_JOB_DATA:
			return {
				...state,
				jobData: action.payload
			}
		case SET_JOBS:
			return {
				...state,
				jobs: action.payload
			}
		case SET_POSTED_JOBS:
			return {
				...state,
				postedJobs: action.payload
			}
		default:
			return state
	}
}
