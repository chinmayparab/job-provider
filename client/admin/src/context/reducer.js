import { LOGIN_ADMIN, LOGOUT_ADMIN } from './types'

export default (state, action) => {
	switch (action.type) {
		case LOGIN_ADMIN:
			return {
				...state,
				isAuth: true
			}
		case LOGOUT_ADMIN:
			return {
				...state,
				isAuth: false
			}
		default:
			return state
	}
}
