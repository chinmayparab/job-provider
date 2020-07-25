import { LOGIN_ADMIN, LOGOUT_ADMIN } from '../types'

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
		default:
			return state
	}
}
