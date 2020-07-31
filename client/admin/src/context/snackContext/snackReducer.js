import { SHOW_SNACK, HIDE_SNACK } from '../types'

export default (state, action) => {
	switch (action.type) {
		case SHOW_SNACK:
			return {
				...state,
				snackOpen: true,
				snackMsg: action.payload
			}
		case HIDE_SNACK:
			return {
				...state,
				snackOpen: false,
				snackMsg: action.payload
			}
		default:
			return state
	}
}
