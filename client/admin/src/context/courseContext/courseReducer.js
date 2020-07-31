import { SET_COURSES } from '../types'

export default (state, action) => {
	switch (action.type) {
		case SET_COURSES:
			return {
				...state,
				courses: action.payload
			}
		default:
			return state
	}
}
