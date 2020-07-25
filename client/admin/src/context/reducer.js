import { LOGIN_ADMIN, LOGOUT_ADMIN, SET_LOADING } from './types'

export default (state, action) => {
	switch (action.type) {
		case LOGIN_ADMIN:
			return {
				...state,
				authToken: action.payload
			}
		case LOGOUT_ADMIN:
			return {
				...state,
				authToken: ''
			}
		case SET_LOADING:
			return {
				...state,
				loading: action.payload
			}
		default:
			return state
	}
}
