import { SET_LOADING, SET_JOB_DATA } from '../types'

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
		default:
			return state
	}
}
